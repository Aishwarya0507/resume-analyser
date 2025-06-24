import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [text, setText] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume.");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      const result = response.data;

      if (!result.matched_skills) {
        alert("Backend did not return matched_skills.");
        return;
      }

      setSkills(result.matched_skills);
      setText(result.extracted_text);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Resume Analyzer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Analyze</button>

      <h2>Matched Skills:</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2>Extracted Text:</h2>
      <p>{text}</p>
    </div>
  );
}

export default App;