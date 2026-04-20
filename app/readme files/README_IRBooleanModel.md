# IR Boolean Model — Boolean & Proximity Search Engine

A **Streamlit-based Information Retrieval system** that implements a Boolean Retrieval Model and a Proximity Search Model from scratch. Built on top of a pre-constructed inverted index and positional index over a corpus of research abstracts.

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
  - [Boolean Query Processing](#boolean-query-processing)
  - [Proximity Query Processing](#proximity-query-processing)
- [Query Syntax Guide](#query-syntax-guide)
- [Dataset](#dataset)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

This project was developed as **Assignment 1** for CS4051 — Information Retrieval (Spring 2025) at FAST-NUCES. It demonstrates the core principles of classical information retrieval by implementing a complete Boolean and Proximity search engine without relying on any high-level IR library.

The system processes a corpus of research paper abstracts, builds both an inverted index and a positional index from scratch, and exposes a clean Streamlit UI for querying documents.

---

## Features

- **Boolean Query Search** — Supports AND, OR, NOT operators with up to 3 terms (5 words total)
- **Proximity Search** — Finds documents where two terms appear within K words of each other
- **Porter Stemming** — All query terms are stemmed before lookup for better recall
- **Input Validation** — Real-time query validation with user-friendly error messages
- **Pre-built Indexes** — Inverted index and positional index stored in `.txt` files for fast loading
- **Interactive Streamlit UI** — Separate form sections for Boolean and Proximity queries

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Streamlit | Web application UI |
| NLTK (PorterStemmer) | Query term stemming |
| Jupyter Notebook | Index construction and preprocessing |

---

## Project Structure

```
IRBooleanModel/
│
├── app.py                              # Main Streamlit application (search UI)
├── Preprocessing and index Creation.ipynb  # Notebook: tokenization, stemming, index building
├── inverted_index.txt                  # Pre-built inverted index (term → doc list)
├── positional_index.txt                # Pre-built positional index (term → {doc: [positions]})
├── Stopword-List.txt                   # Custom stopword list used during preprocessing
├── Abstracts.rar                       # Compressed corpus of research abstracts
├── Gold Query-Set Boolean Queries.txt  # Evaluation query set with expected results
├── requirements.txt                    # Python dependencies
├── CS4051- IR-A1-Spring 2025.pdf       # Assignment specification
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
   git clone https://github.com/muneeb1481/IRBooleanModel.git
   cd IRBooleanModel
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Extract the abstract corpus:
   ```bash
   # Extract Abstracts.rar into the project directory
   ```

4. (Optional) Rebuild the indexes by running the Jupyter notebook:
   ```bash
   jupyter notebook "Preprocessing and index Creation.ipynb"
   ```
   Pre-built index files are already included, so this step is only needed if you want to regenerate them.

### Running the App

```bash
streamlit run app.py
```

The app will open at `http://localhost:8501`.

---

## How It Works

### Preprocessing Pipeline

The `Preprocessing and index Creation.ipynb` notebook:
1. Reads all abstract documents from the corpus
2. Tokenizes text into individual words
3. Removes stopwords using the custom `Stopword-List.txt`
4. Applies **Porter Stemming** to normalize terms
5. Builds an **Inverted Index**: `{ stemmed_term: [doc1, doc3, doc7, ...] }`
6. Builds a **Positional Index**: `{ stemmed_term: { doc1: [pos2, pos15, ...], ... } }`
7. Saves both indexes to text files

### Boolean Query Processing

Supports queries of the form:
- `term1`
- `term1 AND term2`
- `term1 OR term2`
- `term1 NOT term2`
- `term1 AND term2 AND term3`
- `term1 OR term2 NOT term3`
- ...and all other 2-operator combinations

Set operations are used on the posting lists:
- **AND** → Intersection
- **OR** → Union
- **NOT** → Difference (from the first term's set)

### Proximity Query Processing

Takes exactly two query terms and a distance value K. Finds all documents where the two terms appear within K word positions of each other by iterating through the positional index with a two-pointer approach.

---

## Query Syntax Guide

### Boolean Queries
```
neural network
machine AND learning
deep OR neural
information NOT retrieval
image AND classification AND neural
```

**Rules:**
- Maximum 5 words (terms + operators)
- Operators: AND, OR, NOT (case-insensitive)
- Only alphabetical characters allowed in terms

### Proximity Queries
```
Query: neural network   K: 3
Query: image classification   K: 5
```

**Rules:**
- Exactly 2 terms
- K = maximum allowed word distance between the two terms

---

## Dataset

The corpus consists of research paper **abstracts** stored in the `Abstracts/` directory (compressed as `Abstracts.rar`). The `Gold Query-Set Boolean Queries.txt` file contains a set of benchmark queries with expected relevant document IDs for evaluation.

---

## Contributing

Contributions are welcome! Possible improvements include:
- Support for nested Boolean queries with parentheses
- Phrase search support
- Relevance ranking on Boolean results
- Larger or different document corpora

---

## Author

**Muneeb Ur Rehman**  
GitHub: [@muneeb1481](https://github.com/muneeb1481)
