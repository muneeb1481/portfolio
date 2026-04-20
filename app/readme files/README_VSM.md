# VSM — Vector Space Model Search Engine

A **Streamlit-based Information Retrieval system** that implements the Vector Space Model (VSM) for ranked document retrieval using TF-IDF weighting and cosine similarity. Built from scratch over a corpus of research abstracts as a follow-up to the Boolean IR model.

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
  - [Preprocessing Pipeline](#preprocessing-pipeline)
  - [TF-IDF Vectorization](#tf-idf-vectorization)
  - [Cosine Similarity Ranking](#cosine-similarity-ranking)
- [Model Details](#model-details)
- [Dataset](#dataset)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

This project was developed as **Assignment 2** for CS4051 — Information Retrieval (Spring 2025) at FAST-NUCES. It extends classical IR by moving beyond binary Boolean retrieval to **ranked retrieval** — documents are returned in order of relevance rather than as an unordered matching set.

The Vector Space Model represents both documents and queries as TF-IDF weighted vectors in a high-dimensional term space. Relevance is measured by the cosine of the angle between a query vector and each document vector.

---

## Features

- **Ranked Retrieval** — Documents returned ordered by cosine similarity score (most relevant first)
- **TF-IDF Weighting** — Term Frequency–Inverse Document Frequency vectorization for all documents
- **Cosine Similarity** — Relevance scoring between query and document vectors
- **Porter Stemming** — Query terms are normalized before lookup
- **Pre-built Vector Index** — TF-IDF matrix stored as a `.npy` file for instant loading
- **Interactive Streamlit UI** — Clean search interface with ranked result display
- **Gold Query Evaluation** — Benchmark query set included for model evaluation

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Streamlit | Web application UI |
| NumPy | TF-IDF matrix storage and cosine similarity computation |
| NLTK (PorterStemmer) | Query and document term stemming |
| Jupyter Notebook | Preprocessing and vector index construction |

---

## Project Structure

```
VSM/
│
├── app.py                              # Main Streamlit application (search UI)
├── Preprocessing and index Creation.ipynb  # Notebook: TF-IDF construction and indexing
├── inverted_index.txt                  # Inverted index (term → doc list)
├── vector_space_index.npy              # Pre-built TF-IDF document-term matrix
├── term_index_map.txt                  # Mapping of terms to their vector index positions
├── Stopword-List.txt                   # Custom stopword list
├── Abstracts/                          # Document corpus (research paper abstracts)
├── Abstracts.rar                       # Compressed corpus
├── Gold Query-VSM.txt                  # Evaluation query set with expected rankings
├── requirements.txt                    # Python dependencies
├── CS4051- IR-A2-Spring 2025.pdf       # Assignment specification
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/VSM.git
   cd VSM
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Extract the abstract corpus (if not already extracted):
   ```bash
   # Extract Abstracts.rar into the project root
   ```

4. (Optional) Rebuild the vector index from scratch:
   ```bash
   jupyter notebook "Preprocessing and index Creation.ipynb"
   ```
   Pre-built index files (`vector_space_index.npy`, `term_index_map.txt`, `inverted_index.txt`) are included so this step is only needed if you change the corpus.

### Running the App

```bash
streamlit run app.py
```

The app will open at `http://localhost:8501`.

---

## How It Works

### Preprocessing Pipeline

The Jupyter notebook:
1. Reads all abstract documents from the corpus
2. Tokenizes and lowercases all text
3. Removes stopwords using the custom `Stopword-List.txt`
4. Applies **Porter Stemming** to normalize terms
5. Builds a vocabulary of all unique stemmed terms
6. Assigns each term a unique index position (saved in `term_index_map.txt`)

### TF-IDF Vectorization

For each document:
- **TF (Term Frequency)** = number of times a term appears in the document
- **IDF (Inverse Document Frequency)** = log(N / df), where N = total documents and df = documents containing the term
- **TF-IDF weight** = TF × IDF

The full TF-IDF matrix (documents × terms) is saved as `vector_space_index.npy`.

For a query, the same TF-IDF weighting is applied to produce a query vector.

### Cosine Similarity Ranking

```
similarity(query, doc) = (query · doc) / (||query|| × ||doc||)
```

Documents are ranked in descending order of cosine similarity. Only documents with a non-zero similarity score are returned.

---

## Model Details

| Parameter | Value |
|---|---|
| Weighting Scheme | TF-IDF |
| Similarity Metric | Cosine Similarity |
| Stemming | Porter Stemmer |
| Stopword Removal | Custom list |
| Index Storage | NumPy `.npy` matrix |

---

## Dataset

The corpus consists of research paper **abstracts** stored in the `Abstracts/` directory. The `Gold Query-VSM.txt` file contains benchmark queries with expected relevant document rankings for evaluation of retrieval effectiveness.

---

## Contributing

Possible extensions:
- BM25 ranking model comparison
- Precision@K and MAP evaluation metrics
- Query expansion using pseudo-relevance feedback
- Support for full paper text rather than abstracts only

---

## Author

**Muneeb Ur Rehman**  
GitHub: [@muneeb1481](https://github.com/muneeb1481)
