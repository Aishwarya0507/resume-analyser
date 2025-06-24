import os
from flask import Flask, request, jsonify
from flask_cors import CORS 
from resume_analyzer import extract_text_from_resume, analyze_resume

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['resume']
    job_description = request.form['job_description']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    resume_text = extract_text_from_resume(file_path)
    result = analyze_resume(resume_text, job_description)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)