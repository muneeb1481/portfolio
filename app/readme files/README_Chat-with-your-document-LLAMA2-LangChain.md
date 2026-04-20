# Chat with Your Document — LLaMA 2 + LangChain

A **fully local Retrieval-Augmented Generation (RAG) chatbot** that lets you upload any PDF document and have a natural language conversation with it — powered by LLaMA 2 and LangChain, with no internet connection or external API keys required after setup.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Model Download](#model-download)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [How It Works](#how-it-works)
- [Configuration](#configuration)
- [Use Cases](#use-cases)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

Traditional document search requires exact keyword matches. This project goes further — you can ask questions in plain English and get direct, context-aware answers extracted from your uploaded document.

Unlike cloud-based solutions, **everything runs locally on your machine**. Your documents never leave your computer, making this ideal for sensitive or confidential documents such as legal contracts, medical reports, research papers, or internal company documents.

The project implements a complete RAG pipeline using open-source tools: LLaMA 2 as the local language model, HuggingFace embeddings for semantic understanding, FAISS for fast vector similarity search, and LangChain to orchestrate the pipeline.

---

## Features

- **Fully Local & Private** — No API keys, no cloud, no data sent externally
- **PDF Ingestion** — Upload any PDF and it will be processed automatically
- **Semantic Search** — Questions are matched to relevant document chunks using vector similarity, not keyword matching
- **Conversational Memory** — The chatbot maintains context across multiple turns in the same session
- **LLaMA 2 Powered** — Uses the LLaMA 2 7B model (quantized GGML format) for text generation
- **FAISS Vector Store** — Fast and efficient in-memory semantic retrieval
- **Streamlit UI** — Clean, simple chat interface for interacting with your document

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| LangChain | RAG pipeline orchestration |
| LLaMA 2 (7B GGML) | Local large language model for answer generation |
| HuggingFace Embeddings | Semantic text embeddings (`sentence-transformers`) |
| FAISS | Vector store for fast similarity search |
| PyPDF2 / PDFMiner | PDF text extraction |
| Streamlit | Web application UI |
| CTransformers | Running quantized GGML models locally |

---

## Architecture

```
User Question
     │
     ▼
┌─────────────────────┐
│   Streamlit UI      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     ┌──────────────────────────┐
│  Question Embedding │────▶│  FAISS Vector Store      │
│  (HuggingFace)      │     │  (Document Chunks + Embs)│
└─────────────────────┘     └────────────┬─────────────┘
                                          │ Top-K Relevant Chunks
                                          ▼
                            ┌─────────────────────────┐
                            │  LLaMA 2 (Local LLM)    │
                            │  Prompt = Context+Query  │
                            └────────────┬────────────┘
                                          │
                                          ▼
                                    Final Answer
```

**Document Ingestion (one-time per document):**
```
PDF Upload → Text Extraction → Text Chunking → Embedding → FAISS Index
```

---

## Project Structure

```
Chat-with-your-document-LLAMA2-LangChain-master/
│
├── app.py              # Main Streamlit application (RAG pipeline + UI)
├── requirements.txt    # Python dependencies
├── .gitignore
├── .gitattributes
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- At least **8 GB RAM** (16 GB recommended)
- At least **5 GB free disk space** for the LLaMA 2 model

### Model Download

Download the quantized LLaMA 2 model (GGML format):

1. Go to [HuggingFace — TheBloke/Llama-2-7B-Chat-GGML](https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML)
2. Download `llama-2-7b-chat.ggmlv3.q4_0.bin` (approx. 3.8 GB)
3. Place the `.bin` file in the project root directory

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/Chat-with-your-document-LLAMA2-LangChain-master.git
   cd Chat-with-your-document-LLAMA2-LangChain-master
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the App

```bash
streamlit run app.py
```

The app will open at `http://localhost:8501`.

1. Upload a PDF document using the sidebar
2. Wait for it to be processed (chunked and embedded)
3. Type your question in the chat box and press Enter
4. The chatbot will retrieve relevant sections and generate an answer

---

## How It Works

1. **PDF Upload** — The PDF is uploaded and text is extracted page by page
2. **Chunking** — Text is split into overlapping chunks (e.g., 500 tokens with 50-token overlap) to preserve context at boundaries
3. **Embedding** — Each chunk is converted to a dense vector using a HuggingFace sentence-transformer model
4. **FAISS Index** — All chunk vectors are stored in a FAISS index for fast nearest-neighbour search
5. **Query Processing** — When a user asks a question, it is also embedded and the top-K most similar chunks are retrieved
6. **Answer Generation** — The retrieved chunks are passed to LLaMA 2 as context along with the user's question. LLaMA 2 generates a grounded answer based only on the provided context
7. **Conversational Memory** — LangChain's `ConversationalRetrievalChain` maintains chat history for follow-up questions

---

## Configuration

You can adjust the following parameters in `app.py`:

```python
# Chunk size for text splitting
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# Number of relevant chunks to retrieve
K_RETRIEVAL = 4

# Model path
MODEL_PATH = "llama-2-7b-chat.ggmlv3.q4_0.bin"

# Model configuration
MAX_NEW_TOKENS = 512
TEMPERATURE = 0.1
```

---

## Use Cases

- Asking questions about long PDF research papers
- Summarizing sections of legal contracts
- Querying technical documentation or manuals
- Extracting key information from medical or financial reports
- Students studying from PDF textbooks

---

## Limitations

- Performance depends on available RAM and CPU speed (no GPU required but speeds up inference)
- LLaMA 2 7B may hallucinate on questions outside the document's content
- Very large PDFs may take longer to process and embed
- Model answers are limited to the context of the uploaded document

---

## Contributing

Contributions are welcome! Ideas for improvement:
- Support for multiple documents simultaneously
- GPU acceleration via CUDA
- Chat history export
- Support for DOCX, TXT, and web page URLs
- Swap in newer models (Mistral, LLaMA 3, Gemma)

---

## Author

**Muneeb Ur Rehman**  
GitHub: [@muneeb1481](https://github.com/muneeb1481)
