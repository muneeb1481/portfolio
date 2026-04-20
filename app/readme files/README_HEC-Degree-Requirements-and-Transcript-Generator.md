# HEC Degree Requirements and Transcript Generator

A **Streamlit-based web application** that automatically validates a student's academic transcript against the Higher Education Commission (HEC) Pakistan degree requirements for a Computer Science degree and generates an official PDF transcript.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [How It Works](#how-it-works)
- [HEC Degree Requirements](#hec-degree-requirements)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

Managing and verifying degree completion can be tedious for both students and academic advisors. This tool automates the entire process — a student uploads their course data as a CSV file and the application instantly:

- Categorizes every course against the official HEC CS curriculum
- Calculates the student's cumulative GPA
- Checks whether each of the 7 HEC-required course categories has enough credit hours
- Displays visual charts of credit distribution
- Generates a downloadable PDF transcript if all requirements are met

This project was built as part of coursework at the **National University of Computer and Emerging Sciences (FAST-NUCES)**.

---

## Features

- **Automatic Course Categorization** — Maps course names to one of 7 HEC-defined categories using keyword matching
- **GPA Calculation** — Computes overall CGPA on a 4.0 scale with proper handling of repeated and failed courses
- **HEC Compliance Check** — Validates credit hours for all 7 categories and shows a clear pass/fail status table
- **Credit Distribution Charts** — Bar chart comparison and pie chart of credits obtained vs required
- **Status Report Download** — One-click download of a `.txt` compliance report
- **PDF Transcript Generation** — Full academic transcript in PDF format, only unlocked when all HEC requirements are met
- **Handles Repeated Courses** — Automatically takes the best grade for repeated courses

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Streamlit | Web application framework |
| Pandas | Data manipulation and CSV processing |
| Matplotlib | Bar chart visualizations |
| Seaborn | GPA distribution histogram |
| FPDF | PDF transcript generation |

---

## Project Structure

```
HEC-Degree-Requirements-and-Transcript-Generator/
│
├── app.py                  # Main Streamlit application
├── requirements.txt        # Python dependencies
├── .devcontainer/          # Dev container configuration
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/HEC-Degree-Requirements-and-Transcript-Generator.git
   cd HEC-Degree-Requirements-and-Transcript-Generator
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the App

```bash
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`.

---

## How It Works

1. **Upload CSV** — Upload your student transcript as a CSV with columns: `courseName`, `creditHour`, `grade`, `points`
2. **Course Categorization** — The app maps each course to one of the 7 HEC categories using a predefined keyword mapping
3. **GPA Calculation** — Grades are converted to grade points (A=4.0, A-=3.7, etc.) and CGPA is calculated weighted by credit hours
4. **Compliance Validation** — Total credit hours per category are compared against HEC minimums
5. **Report Generation** — A compliance table, charts, and downloadable files are displayed
6. **Transcript PDF** — If all requirements are met, a formatted PDF transcript is generated

---

## HEC Degree Requirements

The app validates against the following HEC-defined CS degree categories:

| Category | Required Credits |
|---|---|
| General Education | 19 |
| University Electives | 12 |
| Mathematics & Science Foundation | 12 |
| Computing Core | 39 |
| Domain CS Core | 24 |
| Domain CS Electives | 15 |
| Domain CS Supporting | 9 |
| **Total** | **130** |

---

## Usage

Prepare your CSV file in the following format:

```
courseName,creditHour,grade,points
Programming Fundamentals,3,A,4.0
Calculus & Analytical Geometry,3,B+,3.3
Data Structures & Algorithms,3,A-,3.7
...
```

Then upload it through the sidebar of the running Streamlit application.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements such as:
- Support for more degree programs (EE, SE, etc.)
- Improved course-name matching using NLP
- Support for multiple universities' grading schemes

---

## Author

**Muneeb Ur Rehman**  
GitHub: [@muneeb1481](https://github.com/muneeb1481)
