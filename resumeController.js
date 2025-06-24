// backend/utils/resumeController.js
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

// Upload handler
const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Here you can add code to parse the resume (PDF/DOCX)
  // For now, we just return the file info
  res.status(200).json({
    message: 'Resume uploaded successfully!',
    file: req.file
  });
};

module.exports = {
  upload: upload.single('resume'), // Use 'resume' as the form-data field name
  uploadResume
};