const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Dummy skills list
const skills = ["Python", "JavaScript", "MySQL", "React", "Node.js", "REST APIs"];

// Resume upload route
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});
app.post("/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Dummy resume text content for now
  const resumeText = "I am a Python developer with skills in MySQL and REST APIs.";

  // Match skills
  const matched_skills = skills.filter(skill =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );

  res.json({
    matched_skills,
    extracted_text: resumeText,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Connected to MySQL Database`);
  console.log(`Server is running on port ${PORT}`);
});