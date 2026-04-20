# APR Dataset Creation — Automated Program Repair Dataset Builder

A **Python-based data collection and preprocessing pipeline** that automatically mines GitHub repositories to build a structured dataset of buggy and fixed Python code pairs, formatted for training Automated Program Repair (APR) models.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Pipeline](#running-the-pipeline)
- [How It Works](#how-it-works)
- [Dataset Format](#dataset-format)
- [Configuration](#configuration)
- [Use Cases](#use-cases)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

**Automated Program Repair (APR)** is the task of automatically finding and fixing bugs in source code. Training APR models requires large datasets of (buggy code, fixed code) pairs — collecting and formatting these pairs is a significant data engineering challenge.

This project automates that process by:
- Mining Python repositories on GitHub for bug-fix commits
- Extracting the buggy and fixed versions of changed code
- Storing pairs in a structured CSV format compatible with sequence-to-sequence APR models (e.g., RepairLLaMA)

The pipeline is resumable — it tracks previously seen commits to avoid duplication across multiple runs.

---

## Features

- **Automated GitHub Mining** — Crawls public Python repositories for commits that fix bugs (filtered by commit message keywords)
- **Buggy/Fixed Pair Extraction** — Extracts the before and after state of changed Python files from each bug-fix commit
- **Incremental Collection** — Tracks seen commits in `seen_commits.txt` so the pipeline can be stopped and resumed without duplicate entries
- **Auto-dated Output** — Output CSV files are timestamped automatically
- **Backup & Restore** — Built-in scripts for backing up and restoring collection state
- **CSV Combination** — Utility script to merge multiple collected CSV batches into a single dataset file
- **RepairLLaMA-compatible Format** — Output format designed to work with the RepairLLaMA fine-tuning pipeline

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Jupyter Notebook | Exploratory analysis and preprocessing |
| GitHub API (PyGithub / requests) | Repository and commit data collection |
| Pandas | Data manipulation and CSV management |
| JSON | Collection state persistence |

---

## Project Structure

```
APR-DATASET-Creation/
│
├── collect_apr_dataset_auto_date.py    # Main collection script (mines GitHub for bug-fix commits)
├── Combined_CSVs.py                    # Merges multiple CSV output files into one dataset
├── reset_tracker_files.py              # Resets seen_commits.txt and collector state
├── restore_tracker_backup.py           # Restores collection state from a backup
├── collector_state.json                # Tracks current collection progress (repo cursor, etc.)
├── seen_commits.txt                    # Log of all previously processed commit hashes
├── python_repairllama_dataset.csv      # Final collected dataset (buggy/fixed pairs)
├── backups/                            # Timestamped backups of collection state
├── Untitled.ipynb                      # Exploratory notebook for dataset analysis
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- A GitHub Personal Access Token (for API access)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/APR-DATASET-Creation.git
   cd APR-DATASET-Creation
   ```

2. Install dependencies:
   ```bash
   pip install requests pandas PyGithub
   ```

3. Set your GitHub token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_personal_access_token
   ```

### Running the Pipeline

**Start or resume data collection:**
```bash
python collect_apr_dataset_auto_date.py
```

**Combine multiple CSV batches into one file:**
```bash
python Combined_CSVs.py
```

**Reset the tracker (start fresh):**
```bash
python reset_tracker_files.py
```

**Restore from a backup:**
```bash
python restore_tracker_backup.py
```

---

## How It Works

1. **Repository Discovery** — The collector queries the GitHub API for public Python repositories above a minimum star threshold
2. **Commit Filtering** — For each repository, commits are filtered by keywords in the commit message (e.g., "fix", "bug", "patch", "error", "issue")
3. **Diff Extraction** — For each matching commit, the file-level diff is extracted to get the code before and after the fix
4. **Pair Construction** — The buggy version (before) and fixed version (after) are stored as a row in the output CSV
5. **State Persistence** — The commit SHA is added to `seen_commits.txt` and the current position is saved in `collector_state.json`
6. **Auto-dated Output** — Each run saves a new timestamped CSV file; `Combined_CSVs.py` merges all batches

---

## Dataset Format

The output CSV (`python_repairllama_dataset.csv`) has the following columns:

| Column | Description |
|---|---|
| `repo` | GitHub repository name |
| `commit_sha` | SHA hash of the bug-fix commit |
| `commit_message` | The commit message |
| `file_path` | Path of the changed file |
| `buggy_code` | The code before the fix |
| `fixed_code` | The code after the fix |
| `date` | Commit date |

---

## Configuration

You can modify the collection behavior in `collect_apr_dataset_auto_date.py`:

```python
# Keywords used to identify bug-fix commits
BUG_FIX_KEYWORDS = ["fix", "bug", "patch", "error", "issue", "resolve", "repair"]

# Minimum stars for a repo to be included
MIN_STARS = 10

# Programming language filter
LANGUAGE = "Python"
```

---

## Use Cases

This dataset is suitable for training and evaluating:
- **Sequence-to-sequence repair models** (T5, CodeT5, RepairLLaMA)
- **Code diff prediction models**
- **Bug localization research**
- **LLM fine-tuning for code repair tasks**

---

## Contributing

Contributions are welcome! Ideas for improvement:
- Add support for Java, JavaScript, and other languages
- Implement diff granularity filters (line-level vs function-level)
- Add automated deduplication of similar code pairs
- Integrate with HuggingFace Datasets for easy sharing

---

## Author

**Muneeb Ur Rehman**  
GitHub: [@muneeb1481](https://github.com/muneeb1481)
