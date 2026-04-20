# Video Game Content-Based Recommender System

A **content-based filtering recommendation system** for video games that suggests similar games based on genre overlap, developer matching, and TF-IDF text similarity on game summaries — with full Precision@K evaluation.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
  - [Preprocessing Pipeline](#preprocessing-pipeline)
  - [Recommendation Algorithm](#recommendation-algorithm)
  - [Similarity Scoring Strategy](#similarity-scoring-strategy)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the System](#running-the-system)
- [Dataset](#dataset)
- [Evaluation](#evaluation)
- [Example Output](#example-output)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

Finding the next game to play after finishing one you loved is a common problem for gamers. This project solves it by implementing a **content-based recommendation system** that understands what makes games similar — their genres, developers, and narrative/gameplay descriptions.

Unlike collaborative filtering (which requires user ratings), this system works purely from game metadata, meaning it can recommend games with zero user interaction data — solving the **cold-start problem**.

The system is built from scratch using TF-IDF vectorization and cosine similarity, with a tiered scoring strategy that prioritizes exact genre+developer matches before falling back to text-level similarity.

---

## Features

- **Multi-signal similarity** — Combines genre overlap, developer matching, and text (summary) similarity into a single ranked score
- **Tiered recommendation scoring** — Prioritizes exact matches, then partial genre matches, then developer-only matches, then text similarity fallback
- **Fuzzy game title search** — If a game title is not found exactly, suggests close matches using difflib
- **Pre-built TF-IDF matrix** — Matrix stored as `.npz` for instant loading without recomputation
- **Precision@K evaluation** — `evaluation.py` measures recommendation quality with Precision@5 and Precision@10
- **Interactive CLI** — Menu-driven command-line interface for exploring recommendations
- **Random game explorer** — Discover games randomly and get instant recommendations

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Pandas | Dataset loading and manipulation |
| Scikit-learn | TF-IDF vectorization, cosine similarity |
| SciPy (sparse) | Efficient compressed matrix storage (`.npz`) |
| difflib | Fuzzy string matching for game title search |
| Jupyter Notebook | Data preprocessing and exploration |

---

## How It Works

### Preprocessing Pipeline

The `preprocessing.ipynb` notebook:
1. Loads the raw `games.csv` dataset
2. Cleans and standardizes genre and developer fields (handles JSON list strings and comma-separated values)
3. Fills missing summaries with empty strings
4. Builds a TF-IDF matrix from game summaries (max 5,000 features, English stopwords removed)
5. Saves the matrix as `tfidf_matrix.npz` and the cleaned dataset as `modified_games.csv`

### Recommendation Algorithm

For a given input game, the system:

1. Extracts the game's **genres list** and **developers list**
2. Iterates through all other games and categorizes them into 4 buckets:
   - **Tier 1** — Genre AND developer match (score: 0.9)
   - **Tier 2** — Perfect genre match only (score: 0.8)
   - **Tier 3** — Partial genre match (score: 0.7 × genre overlap ratio)
   - **Tier 4** — Developer-only match (score: 0.6)
3. If fewer candidates than `numRecs × 2` are found, adds games ranked by **cosine similarity** on TF-IDF summaries (score: 0.4 × cosine score)
4. Sorts all candidates by score descending and returns the top N

### Similarity Scoring Strategy

```
Score = 0.9  →  Genre + Developer exact match
Score = 0.8  →  Perfect genre match
Score = 0.7×r → Partial genre match (r = overlap ratio)
Score = 0.6  →  Developer match only
Score = 0.4×s → TF-IDF text similarity fallback (s = cosine score)
```

---

## Project Structure

```
Video-Game-Content-Based-RS-main/
│
├── games_contentBased.py       # Main recommendation engine + CLI
├── evaluation.py               # Precision@K evaluation script
├── preprocessing.ipynb         # Data cleaning and TF-IDF index building
├── games.csv                   # Raw games dataset
├── modified_games.csv          # Cleaned dataset (output of preprocessing)
├── tfidf_matrix.npz            # Pre-built TF-IDF matrix (compressed sparse)
├── precision_evaluation_results.csv  # Saved evaluation results
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/Video-Game-Content-Based-RS-main.git
   cd Video-Game-Content-Based-RS-main
   ```

2. Install dependencies:
   ```bash
   pip install pandas scikit-learn scipy
   ```

3. (Optional) Rebuild the TF-IDF index from scratch:
   ```bash
   jupyter notebook preprocessing.ipynb
   ```
   Pre-built files (`tfidf_matrix.npz`, `modified_games.csv`) are already included.

### Running the System

**Interactive CLI:**
```bash
python games_contentBased.py
```

You will see:
```
================================================================================
Game Recommendation System
================================================================================
Finding similar games based on genres, developers, and content
Total games in database: XXXX

Options:
1. Get recommendations for a specific game
2. View random game recommendations
3. Exit
```

**Run Evaluation:**
```bash
python evaluation.py
```

---

## Dataset

The dataset (`games.csv` / `modified_games.csv`) contains video game records with the following key fields:

| Column | Description |
|---|---|
| `Title` | Game name |
| `Genres` | List of genres (e.g., `['Action', 'RPG']`) |
| `Developers` | Game developer(s) |
| `Summary` | Short description of the game |

---

## Evaluation

The `evaluation.py` script measures recommendation quality using **Precision@K**:

```
Precision@K = (Relevant games in top K recommendations) / K
```

A "relevant" game is defined as one sharing at least one genre with the query game. Results are saved to `precision_evaluation_results.csv`.

| Metric | Description |
|---|---|
| Precision@5 | Relevance of top 5 recommendations |
| Precision@10 | Relevance of top 10 recommendations |

---

## Example Output

```
Selected game: The Witcher 3: Wild Hunt
Genres: ['RPG', 'Adventure']
Developer: ['CD Projekt Red']

Recommended Games:
────────────────────────────────────────────────────────
1. Cyberpunk 2077 (Similarity: 0.90)
   Genres: ['RPG', 'Action']
   Developer: ['CD Projekt Red']
   Summary: An open-world action RPG set in a dystopian...

2. Dragon Age: Inquisition (Similarity: 0.80)
   Genres: ['RPG', 'Adventure']
   Developer: ['BioWare']
   Summary: A fantasy RPG where you lead an organization...
```

---

## Contributing

Possible improvements:
- Streamlit web UI for interactive game discovery
- Incorporate user ratings for hybrid filtering
- Add release year, platform, and Metacritic score as features
- Expand dataset with more recent games via IGDB or RAWG API

---

## Author

**Muneeb Ur Rehman**
GitHub: [@muneeb1481](https://github.com/muneeb1481)
