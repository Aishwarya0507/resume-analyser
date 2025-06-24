import docx
import PyPDF2
import os
import fitz

# Stop words to ignore
STOP_WORDS = {
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "has", "he", "in", "is", "it", "its", "of", "on", "that",
    "the", "to", "was", "were", "will", "with", "i", "you", "your"
}

def extract_text_from_resume(file_path):
    text = ""
    if file_path.endswith('.pdf'):
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    elif file_path.endswith('.docx'):
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + '\n'
    return text

def analyze_resume(resume_text, job_description):
    resume_words = set(word.lower() for word in resume_text.split() if word.lower() not in STOP_WORDS)
    job_words = set(word.lower() for word in job_description.split() if word.lower() not in STOP_WORDS)
    matched_words = resume_words.intersection(job_words)
    score = len(matched_words) / len(job_words) * 100 if job_words else 0
    return {
        "matched_skills": list(matched_words),
        "match_score": round(score, 2)
    }