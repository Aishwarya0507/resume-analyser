// client/src/components/UploadResume.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setResult(res.data);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setResume(e.target.files[0])} required />
        <br /><br />
        <textarea
          placeholder="Paste job description here..."
          rows="5"
          cols="40"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Upload & Analyze</button>
      </form>

      {result && (
        <div>
          <h2>Results</h2>
          <p><strong>Match Score:</strong> {result.match_score}%</p>
          <p><strong>Matched Skills:</strong> {result.matched_skills.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default UploadResume;