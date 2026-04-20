# Resume–Job Matching: AI-Powered with LLMs

A **full-stack AI-powered web application** that intelligently matches resumes to job descriptions using Large Language Models (LLMs). Built with Flask, it parses resumes, analyzes job postings, and produces a detailed compatibility report with skill gap analysis — deployed on Vercel.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [How It Works](#how-it-works)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

Traditional resume screening is slow, inconsistent, and misses nuanced skill matches. This project uses Large Language Models to understand both a resume and a job description at a semantic level — going beyond simple keyword matching to identify genuine compatibility, transferable skills, and specific gaps.

A recruiter or job seeker can upload a resume (or paste text) alongside a job description, and the system returns a structured match report in seconds. The app is structured as a modular Flask application with a clean separation between API logic, services, models, blueprints, and cloud functions.

---

## Features

- **LLM-Powered Matching** — Uses large language models to semantically compare resume content to job requirements
- **Skill Gap Analysis** — Identifies skills present in the job description but missing from the resume
- **Match Score** — Produces a quantified compatibility score between resume and job posting
- **Structured Reports** — Returns well-structured JSON responses with match details, matched skills, and missing skills
- **Resume Parsing** — Extracts structured information from raw resume text
- **Job Description Analysis** — Parses required skills, experience, and qualifications from job postings
- **Skill Graph** — Models relationships between skills for smarter gap identification
- **REST API** — Clean API endpoints for integration with other tools
- **Vercel Deployment Ready** — Includes `vercel.json` configuration for serverless deployment
- **Modular Codebase** — Separated into blueprints, services, models, and cloud functions for maintainability

---

## Tech Stack

| Category | Technology |
|---|---|
| Backend | Python, Flask |
| AI / LLM | LLM API integration (via `services/`) |
| Frontend | HTML5, CSS3 (Tailwind), JavaScript |
| Styling | Tailwind CSS |
| Deployment | Vercel (serverless) |
| Testing | pytest (`tests/`) |
| Configuration | python-dotenv (`.env`) |

---

## Architecture

```
User (Browser)
      │
      ▼
┌─────────────────────────────────────┐
│         Flask Web Application        │
│                                      │
│  ┌──────────────┐  ┌──────────────┐  │
│  │  Blueprints  │  │  Templates   │  │
│  │  (routing)   │  │  (HTML/CSS)  │  │
│  └──────┬───────┘  └──────────────┘  │
│         │                            │
│  ┌──────▼───────────────────────┐    │
│  │         API Layer             │    │
│  │    (api/ endpoints)           │    │
│  └──────┬───────────────────────┘    │
│         │                            │
│  ┌──────▼───────────────────────┐    │
│  │       Services Layer          │    │
│  │  • Resume parser              │    │
│  │  • JD analyzer                │    │
│  │  • LLM matching engine        │    │
│  │  • Skill graph builder        │    │
│  └──────┬───────────────────────┘    │
│         │                            │
│  ┌──────▼───────────────────────┐    │
│  │       Models Layer            │    │
│  │  (data structures / schemas)  │    │
│  └──────┬───────────────────────┘    │
└─────────┼───────────────────────────┘
          │
          ▼
     LLM API (External)
```

---

## Project Structure

```
Resume-Job-Matching-AI-Powered-LLMs--master/
│
├── app.py                  # Flask application entry point
├── config.py               # App configuration (loads from .env)
├── extensions.py           # Flask extensions initialization
├── prompt.py               # LLM prompt templates
│
├── api/                    # API endpoint handlers
├── blueprints/             # Flask blueprints (route groups)
├── services/               # Core business logic
│   ├── resume_parser.py    # Resume text extraction and structuring
│   ├── jd_analyzer.py      # Job description parsing
│   ├── matching_engine.py  # LLM-powered matching logic
│   └── skill_graph.py      # Skill relationship modelling
│
├── models/                 # Data models and schemas
├── cloud_functions/        # Serverless function handlers
│
├── templates/              # Jinja2 HTML templates
├── static/                 # CSS, JS, and assets
│
├── data/                   # Sample resumes and job descriptions
├── test_data/              # Test fixtures
├── tests/                  # pytest test suite
│
├── .env.example            # Environment variable template
├── requirements.txt        # Python dependencies
├── package.json            # Frontend/Tailwind dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment configuration
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js (for Tailwind CSS compilation)
- An LLM API key (e.g., Anthropic Claude, OpenAI GPT)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/Resume-Job-Matching-AI-Powered-LLMs--master.git
   cd Resume-Job-Matching-AI-Powered-LLMs--master
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate       # Linux/Mac
   venv\Scripts\activate          # Windows
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Install frontend dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Copy the example environment file and fill in your values:
```bash
cp .env.example .env
```

Edit `.env`:
```env
LLM_API_KEY=your_llm_api_key_here
FLASK_SECRET_KEY=your_secret_key_here
FLASK_ENV=development
```

### Running the App

```bash
python app.py
```

Visit `http://localhost:5000` in your browser.

---

## How It Works

1. **Input** — User pastes or uploads a resume and a job description via the web UI
2. **Resume Parsing** — The `resume_parser` service extracts structured fields: skills, experience, education, certifications
3. **JD Analysis** — The `jd_analyzer` service extracts required skills, experience level, qualifications from the job posting
4. **Skill Graph** — Both skill sets are mapped onto a skill graph to identify synonyms and related technologies (e.g., "React" relates to "JavaScript")
5. **LLM Matching** — A structured prompt (defined in `prompt.py`) is sent to the LLM with both the parsed resume and parsed JD. The LLM returns a match score, matched skills, missing skills, and a narrative explanation
6. **Response** — The structured result is returned to the UI and displayed as a compatibility report

---

## API Reference

### `POST /api/match`

Match a resume against a job description.

**Request Body:**
```json
{
  "resume": "Full resume text here...",
  "job_description": "Job posting text here..."
}
```

**Response:**
```json
{
  "match_score": 82,
  "matched_skills": ["Python", "Flask", "REST APIs", "SQL"],
  "missing_skills": ["Kubernetes", "AWS Lambda"],
  "experience_match": true,
  "education_match": true,
  "summary": "Strong match. Candidate has core backend skills but lacks cloud infrastructure experience."
}
```

### `POST /api/parse-resume`

Parse and structure a raw resume.

### `POST /api/analyze-jd`

Analyze and extract requirements from a job description.

---

## Deployment

The project is configured for **Vercel** serverless deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

The `vercel.json` file handles routing and Python runtime configuration automatically.

---

## Contributing

Ideas for contribution:
- PDF/DOCX resume upload support
- Bulk matching (multiple resumes against one JD)
- Resume improvement suggestions based on gap analysis
- ATS (Applicant Tracking System) score simulation
- Dashboard for recruiters to manage multiple candidates

---

## Author

**Muneeb Ur Rehman**
GitHub: [@muneeb1481](https://github.com/muneeb1481)
