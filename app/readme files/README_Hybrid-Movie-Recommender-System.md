# Hybrid Movie Recommender System

A **Streamlit web application** that recommends movies using a hybrid approach combining user-based collaborative filtering (Pearson correlation) and content-based filtering (genre cosine similarity), with movie poster display via the OMDB API.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
  - [User-Based Collaborative Filtering](#user-based-collaborative-filtering)
  - [Content-Based Filtering](#content-based-filtering)
  - [Hybrid Combination](#hybrid-combination)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [OMDB API Key Setup](#omdb-api-key-setup)
  - [Running the App](#running-the-app)
- [Dataset](#dataset)
- [Usage Guide](#usage-guide)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

Choosing what movie to watch next is easier when the system understands both **what you like** (your past ratings) and **what the movie is about** (its genre profile). This project implements a hybrid recommender that combines both perspectives.

Built with the classic **MovieLens dataset**, the system uses Pearson correlation to find users with similar taste, genre cosine similarity to find movies with overlapping content, and blends both scores to surface the best recommendations. Movie posters are fetched in real time from the OMDB API to make the experience visual and engaging.

---

## Features

- **Hybrid Recommendations** — Combines collaborative and content-based signals for better accuracy
- **Movie Poster Display** — Fetches and displays movie posters from the OMDB API
- **IMDb Links** — Each recommendation links directly to its IMDb page
- **Customizable Count** — User can choose how many recommendations to receive
- **Movie Search** — Search by title to find a movie and get recommendations
- **Clean Minimalist UI** — Streamlit-powered interface with card-style layout
- **Mean-Centered Normalization** — Handles rating bias across users for fairer similarity

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Streamlit | Web application UI |
| Pandas | Data loading and user-item matrix construction |
| NumPy | Matrix operations and similarity calculations |
| Scikit-learn | Genre cosine similarity |
| OMDB API | Movie poster and metadata retrieval |
| MovieLens Dataset | User ratings and movie metadata |

---

## How It Works

### User-Based Collaborative Filtering

1. A **user-item rating matrix** is constructed from `ratings.csv`
2. Each user's ratings are **mean-centered** to remove personal rating bias (some users rate everything high, others rate everything low)
3. **Pearson correlation** is computed between the target user and all other users to find those with the most similar taste
4. The top-N similar users' ratings are aggregated (weighted by similarity score) to predict ratings for unseen movies

### Content-Based Filtering

1. Movie genres are extracted from `movies.csv` using multi-hot encoding
2. **Cosine similarity** is computed between the genre vector of the input movie and all other movies
3. Movies with the highest genre overlap receive higher content-based scores

### Hybrid Combination

The final recommendation score for each candidate movie is a weighted combination:

```
final_score = α × collaborative_score + (1 - α) × content_score
```

This means movies that are both liked by similar users AND share genre characteristics with the input movie rank highest — combining the strengths of both approaches.

---

## Project Structure

```
Hybrid-Movie-Recommender-System-main/
│
├── recApp.py               # Main Streamlit web application
├── recommendation.py       # Core recommendation engine (hybrid logic)
├── preparation.py          # Data loading and preprocessing utilities
├── movies.csv              # Movie metadata (title, genres, IMDb URLs)
├── ratings.csv             # User-movie ratings (MovieLens format)
├── u.data                  # Raw MovieLens ratings file
├── u.item                  # Raw MovieLens movie info file
├── requirements.txt        # Python dependencies
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- An OMDB API key (free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/Hybrid-Movie-Recommender-System-main.git
   cd Hybrid-Movie-Recommender-System-main
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### OMDB API Key Setup

1. Register for a free API key at [omdbapi.com](http://www.omdbapi.com/apikey.aspx)
2. Open `recApp.py` and set your API key:
   ```python
   OMDB_API_KEY = "your_api_key_here"
   ```

### Running the App

```bash
streamlit run recApp.py
```

Visit `http://localhost:8501` in your browser.

---

## Dataset

This project uses the **MovieLens** dataset:

| File | Description |
|---|---|
| `ratings.csv` | User ratings — columns: `userId`, `movieId`, `rating`, `timestamp` |
| `movies.csv` | Movie info — columns: `movieId`, `title`, `genres`, `imdbUrl` |
| `u.data` | Raw MovieLens tab-separated ratings |
| `u.item` | Raw MovieLens pipe-separated movie metadata |

The ratings scale is 1–5. The dataset covers thousands of movies and hundreds of users, making it a standard benchmark for recommendation system research.

---

## Usage Guide

1. **Launch the app** with `streamlit run recApp.py`
2. **Search for a movie** by typing a title in the search box (e.g., "Toy Story", "The Matrix")
3. **Set the number of recommendations** using the number input (default: 10)
4. **Browse recommendations** — each card shows the movie poster, title, genres, and a link to IMDb
5. Click any **IMDb link** to read more about a recommended movie

---

## Live Demo

The app is deployed on Streamlit Community Cloud:

🔗 **[movierecsystem.streamlit.app](https://movierecsystem.streamlit.app)**

---

## Contributing

Possible improvements:
- Add a user ID input to enable personalized recommendations based on a specific user's history
- Switch to the full MovieLens 25M dataset for richer recommendations
- Implement matrix factorization (SVD) as an alternative collaborative filtering approach
- Add search autocomplete for movie titles
- Cache OMDB API responses to reduce latency

---

## Author

**Muneeb Ur Rehman**
GitHub: [@muneeb1481](https://github.com/muneeb1481)
