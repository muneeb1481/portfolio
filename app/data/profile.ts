// Single source of truth for the portfolio content.
// The page sections and the AI chat assistant both read from this file,
// so updating a fact here updates the site and the chatbot together.

export const profile = {
  name: "Muneeb Ur Rehman",
  firstName: "Muneeb",
  role: "AI & Machine Learning Engineer",
  location: "Karachi, Pakistan",
  availability: "Open to opportunities",
  tagline:
    "BS Artificial Intelligence graduate from FAST NUCES building voice agents, RAG pipelines and tested, secure backend APIs that solve real-world problems.",
  website: "https://muneeb-ur-rehman.dev",
  email: "muneeb.ur.rehm4n@gmail.com",
  phone: "+92-318-2635995",
  phoneHref: "tel:+923182635995",
  linkedin: "https://linkedin.com/in/muneeb-ur-rehman-461843246",
  linkedinHandle: "muneeb-ur-rehman-461843246",
  github: "https://github.com/Muneeb1481",
  githubHandle: "Muneeb1481",
};

export const highlights = [
  { label: "CGPA", value: "3.32/4.0" },
  { label: "Focus", value: "AI & ML" },
  { label: "Graduated", value: "Jun 2026" },
  { label: "Based in", value: "Karachi" },
];

export interface Skill {
  name: string;
  // File name in /public/logos (without .svg). Skills with no official logo
  // fall back to a short gold monogram.
  logo?: string;
  abbr?: string;
}

export interface SkillCategory {
  title: string;
  // "logos" renders icon tiles, "badges" renders plain text pills.
  display: "logos" | "badges";
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & LLM",
    display: "logos",
    skills: [
      { name: "LangChain", logo: "langchain" },
      { name: "LangGraph", logo: "langgraph" },
      { name: "OpenAI Embeddings", logo: "openai" },
      { name: "Groq", abbr: "groq" },
      { name: "Voice Agents (Vapi)", abbr: "VAPI" },
      { name: "LLMs", abbr: "LLM" },
      { name: "RAG", abbr: "RAG" },
      { name: "Agentic AI", abbr: "AI" },
      { name: "LoRA Fine-Tuning", abbr: "LoRA" },
      { name: "FAISS", abbr: "FAISS" },
      { name: "pgvector", abbr: "PGV" },
    ],
  },
  {
    title: "Languages",
    display: "logos",
    skills: [
      { name: "Python", logo: "python" },
      { name: "SQL", abbr: "SQL" },
      { name: "JavaScript", logo: "javascript" },
      { name: "Java", logo: "java" },
      { name: "C++", logo: "cplusplus" },
      { name: "Bash", logo: "bash" },
      { name: "HTML/CSS", logo: "html5" },
    ],
  },
  {
    title: "Web & APIs",
    display: "logos",
    skills: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "Django", logo: "django" },
      { name: "Django REST Framework", abbr: "DRF" },
      { name: "Flask", logo: "flask" },
      { name: "React", logo: "react" },
      { name: "REST API Design", abbr: "REST" },
      { name: "Streamlit", logo: "streamlit" },
    ],
  },
  {
    title: "Databases",
    display: "logos",
    skills: [
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MySQL", logo: "mysql" },
      { name: "SQLite", logo: "sqlite" },
      { name: "Oracle", logo: "oracle" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "SQLAlchemy ORM", logo: "sqlalchemy" },
      { name: "Django ORM", abbr: "ORM" },
    ],
  },
  {
    title: "Testing & Tools",
    display: "logos",
    skills: [
      { name: "Unit & Integration Testing", abbr: "TEST" },
      { name: "Git", logo: "git" },
      { name: "GitHub Actions", logo: "githubactions" },
      { name: "Docker", logo: "docker" },
      { name: "Prometheus", logo: "prometheus" },
      { name: "Grafana", logo: "grafana" },
      { name: "Linux", logo: "linux" },
    ],
  },
  {
    title: "ML Libraries",
    display: "logos",
    skills: [
      { name: "TensorFlow", logo: "tensorflow" },
      { name: "Keras", logo: "keras" },
      { name: "Scikit-Learn", logo: "scikitlearn" },
      { name: "SpaCy", logo: "spacy" },
      { name: "NLTK", abbr: "NLTK" },
    ],
  },
  {
    title: "Security",
    display: "badges",
    skills: [
      { name: "JWT" },
      { name: "bcrypt" },
      { name: "API Authentication" },
      { name: "Input Validation" },
      { name: "Role Based Access Control" },
    ],
  },
  {
    title: "Soft Skills",
    display: "badges",
    skills: [
      { name: "Fast Learner" },
      { name: "Attention to Detail" },
      { name: "Communication" },
      { name: "Leadership" },
      { name: "Time Management" },
    ],
  },
];

export const education = {
  university: "FAST National University (NUCES)",
  degree: "Bachelor of Science — Artificial Intelligence",
  location: "Karachi, Pakistan",
  gpa: "3.32/4.0",
  period: "Aug 2022 — Jun 2026",
  honor: "Dean's List — 8th Semester (3.71 SGPA) and 2nd Semester (3.51 SGPA)",
  courses: [
    "Operating Systems",
    "Data Structures",
    "Analysis of Algorithms",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Recommendation Systems",
    "Networking",
    "Databases",
    "Natural Language Processing",
    "Computer Vision",
  ],
};

export const certifications = [
  { title: "Cloud Computing Fundamentals", provider: "IBM" },
  {
    title: "Master in Data Science, Data Analytics & Data Analysis",
    provider: "Udemy",
  },
];

export const activities = [
  {
    title: "Microsoft Learn Student Ambassadors (MLSA)",
    detail: "Member, FAST Karachi Chapter — Assisted with event management",
  },
];

export const experiences = [
  {
    title: "Teaching Assistant",
    company: "FAST NUCES",
    type: "Karachi, Pakistan",
    period: "Jan 2025 — Dec 2025",
    points: [
      {
        title: "Courses",
        desc: "Programming Fundamentals, Computer Organization and Assembly Language, Artificial Intelligence.",
      },
      {
        title: "Code Review and Debugging",
        desc: "Reviewed and graded student code for these courses and gave feedback on bugs, logic errors, and code quality.",
      },
      {
        title: "Project Evaluations",
        desc: "Evaluated programming, systems-level, and AI projects and gave written feedback on correctness and code structure.",
      },
    ],
  },
  {
    title: "Agentic AI Intern",
    company: "Wellness Innovations",
    type: "Remote",
    period: "May 2025 — Jun 2025",
    points: [
      {
        title: "Automated Database Agent",
        desc: "Built an LLM-powered agent that answers plain English questions by querying the company database.",
      },
      {
        title: "Reflection Agent",
        desc: "Implemented a reflection agent with LangGraph that reviews and corrects its own output before it responds.",
      },
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  language: string;
  topics: string[];
  // Projects without a public repository have no link.
  url?: string;
  featured?: boolean;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    name: "Detail Ops — Voice AI Booking Agent",
    description:
      "Production appointment booking system for a car detailing business, built on a FastAPI backend and PostgreSQL. A phone-based AI agent answers customer questions from uploaded documents through a RAG engine and books, reschedules or cancels appointments, with an admin dashboard for the knowledge base and calendar.",
    language: "Python",
    topics: ["Voice AI", "RAG", "FastAPI", "PostgreSQL", "SQLAlchemy", "pgvector", "Vapi", "React"],
    url: "https://github.com/Muneeb1481/Voice-AI-Agent-Detailing-Booking-RAG",
    featured: true,
    highlights: [
      "JWT authentication, bcrypt password hashing and signed webhook requests",
      "Booking validation, per-market data isolation and SQLAlchemy ORM to block SQL injection",
      "Answers only from retrieved context and refuses to guess on pricing",
      "27 unit tests cover the booking logic",
    ],
  },
  {
    name: "Voice AI Patient Registration System",
    description:
      "REST API and web dashboard that registers new patients over a phone call. The voice agent collects details through natural conversation, validates every field and stores the records in a database.",
    language: "Python",
    topics: ["Voice AI", "FastAPI", "SQLite", "Pydantic", "GitHub Actions", "Vapi", "Groq"],
    url: "https://github.com/Muneeb1481/Voice-AI-Agent-Patient-Registration-System",
    featured: true,
    highlights: [
      "Phone agent and public API share one validation layer and one repository module, so moving to PostgreSQL changes a single file",
      "Detects returning callers by phone number and offers updates",
      "16 integration tests cover the API, webhook and booking flow",
    ],
  },
  {
    name: "Fuel Route Optimizer",
    description:
      "Django REST API that returns a US driving route with the cheapest fuel stops along the way for a 500-mile-range vehicle, shown on an interactive Leaflet map.",
    language: "Python",
    topics: ["Django REST Framework", "SQLite", "Leaflet.js", "OSRM", "GraphHopper", "Geospatial"],
    url: "https://github.com/Muneeb1481/fuel-route-optimizer",
    featured: true,
    highlights: [
      "7,500+ fuel stations loaded and queried with bounding box and Haversine filters",
      "Only 3 external API calls per request, and cached geocoding skips repeat lookups",
      "25 unit and integration tests",
    ],
  },
  {
    name: "Semantic Automated Program Repair (FYP)",
    description:
      "Final year project supervised by Dr. Muhammad Rafi. Fine-tuned CodeLLaMA 7B with PEFT LoRA to find and repair software bugs, trained on a bug-fix dataset I built for it.",
    language: "Python",
    topics: ["CodeLLaMA", "LoRA", "PEFT", "Fine-Tuning", "Python"],
    url: "https://github.com/Muneeb1481/APR-DATASET-Creation",
    featured: true,
    highlights: [
      "Fine-tuned CodeLLaMA 7B with PEFT LoRA",
      "Built the bug-fix dataset by mining GitHub repositories for buggy/fixed Python code pairs",
      "Inference pipeline validates input to stop malicious code from executing",
    ],
  },
  {
    name: "DevOps Monitoring Dashboard",
    description:
      "Flask, Prometheus and Grafana dashboard that tracks application health and CI/CD metrics in real time. Includes rate limiting, API key authentication and automated tests that run through GitHub Actions.",
    language: "Python",
    topics: ["Flask", "Prometheus", "Grafana", "GitHub Actions"],
    url: "https://github.com/Muneeb1481/devops-dashboard-main",
  },
  {
    name: "Gym Management System",
    description:
      "Django web application for memberships, admissions and fee collection, with full CRUD, payment tracking, role based access control and a dashboard of weekly, monthly and yearly sales.",
    language: "Python",
    topics: ["Django", "SQLite", "Tailwind CSS", "JavaScript"],
  },
  {
    name: "Resume–Job Matching AI",
    description:
      "Full-stack Flask app that uses LLMs to semantically match resumes to job descriptions. Produces a detailed compatibility report with skill gap analysis, match score, and structured JSON output. Deployed on Vercel.",
    language: "Python",
    topics: ["LLM", "Flask", "NLP"],
    url: "https://github.com/Muneeb1481/Resume-Job-Matching-AI-Powered-LLMs--master",
  },
  {
    name: "Chat with Your Document",
    description:
      "Fully local RAG chatbot powered by LLaMA 2 + LangChain. Upload any PDF and have a natural language conversation with it — no API keys, no cloud. Uses FAISS vector store and HuggingFace embeddings for semantic retrieval.",
    language: "Python",
    topics: ["RAG", "LLaMA 2", "LangChain"],
    url: "https://github.com/Muneeb1481/Chat-with-your-document-LLAMA2-LangChain-master",
  },
  {
    name: "Hybrid Movie Recommender",
    description:
      "Streamlit app combining user-based collaborative filtering (Pearson correlation) and content-based filtering (genre cosine similarity). Fetches live movie posters via OMDB API. Deployed on Streamlit Community Cloud.",
    language: "Python",
    topics: ["Recommender System", "Streamlit", "ML"],
    url: "https://github.com/Muneeb1481/Hybrid-Movie-Recommender-System-main",
  },
  {
    name: "Django E-commerce Platform",
    description:
      "Full-stack laptop marketplace built with Django featuring AI-powered product recommendations, smart search, cart management, order tracking, and a complete admin panel for inventory control.",
    language: "Python",
    topics: ["Django", "E-commerce", "AI"],
    url: "https://github.com/Muneeb1481/Django--Laptop-Selling-Ecommerce-Platform---AI-Integrate--master",
  },
  {
    name: "HEC Transcript Generator",
    description:
      "Streamlit app that validates student transcripts against HEC Pakistan CS degree requirements. Auto-categorizes courses, calculates CGPA, checks 7 credit categories, and generates a downloadable PDF transcript.",
    language: "Python",
    topics: ["Streamlit", "PDF", "Education"],
    url: "https://github.com/Muneeb1481/HEC-Degree-Requirements-and-Transcript-Generator",
  },
  {
    name: "IR Boolean Search Engine",
    description:
      "Streamlit IR system implementing Boolean Retrieval and Proximity Search from scratch over a research abstract corpus. Supports AND/OR/NOT operators, Porter stemming, and pre-built inverted + positional indexes.",
    language: "Python",
    topics: ["IR", "Boolean Model", "NLP"],
    url: "https://github.com/Muneeb1481/IRBooleanModel",
  },
  {
    name: "VSM Search Engine",
    description:
      "Vector Space Model IR system with TF-IDF weighting and cosine similarity for ranked document retrieval. Built from scratch over research abstracts with a pre-built NumPy matrix index and Streamlit UI.",
    language: "Python",
    topics: ["TF-IDF", "Cosine Similarity", "IR"],
    url: "https://github.com/Muneeb1481/VSM",
  },
  {
    name: "Video Game Recommender",
    description:
      "Content-based filtering system for video games using genre overlap, developer matching, and TF-IDF text similarity on game summaries. Features tiered scoring, fuzzy title search, and Precision@K evaluation.",
    language: "Python",
    topics: ["Content-Based", "TF-IDF", "Recommender"],
    url: "https://github.com/Muneeb1481/Video-Game-Content-Based-RS-main",
  },
];
