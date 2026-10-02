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
    "BS Artificial Intelligence student at FAST NUCES building voice agents, RAG pipelines and agentic AI systems that solve real-world problems.",
  email: "muneeb.ur.rehm4n@gmail.com",
  phone: "+92-318-2635995",
  phoneHref: "tel:+923182635995",
  linkedin: "https://linkedin.com/in/muneeb-ur-rehman-461843246",
  linkedinHandle: "muneeb-ur-rehman-461843246",
  github: "https://github.com/Muneeb1481",
  githubHandle: "Muneeb1481",
};

export const highlights = [
  { label: "CGPA", value: "3.26/4.0" },
  { label: "Focus", value: "AI & ML" },
  { label: "Year", value: "Senior" },
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
      { name: "RAG", abbr: "RAG" },
      { name: "Agentic AI", abbr: "AI" },
      { name: "Vector Search", abbr: "VEC" },
    ],
  },
  {
    title: "Languages",
    display: "logos",
    skills: [
      { name: "Python", logo: "python" },
      { name: "C++", logo: "cplusplus" },
      { name: "Java", logo: "java" },
      { name: "Bash", logo: "bash" },
      { name: "HTML/CSS", logo: "html5" },
      { name: "SQL", abbr: "SQL" },
    ],
  },
  {
    title: "Frameworks",
    display: "logos",
    skills: [
      { name: "TensorFlow", logo: "tensorflow" },
      { name: "Keras", logo: "keras" },
      { name: "Scikit-Learn", logo: "scikitlearn" },
      { name: "SpaCy", logo: "spacy" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "Django", logo: "django" },
      { name: "Flask", logo: "flask" },
      { name: "Streamlit", logo: "streamlit" },
      { name: "NLTK", abbr: "NLTK" },
    ],
  },
  {
    title: "Tools",
    display: "logos",
    skills: [
      { name: "Git", logo: "git" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MySQL", logo: "mysql" },
      { name: "SQLite", logo: "sqlite" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "Oracle", logo: "oracle" },
      { name: "Prometheus", logo: "prometheus" },
      { name: "Grafana", logo: "grafana" },
      { name: "FAISS", abbr: "FAISS" },
      { name: "pgvector", abbr: "PGV" },
    ],
  },
  {
    title: "Platforms",
    display: "logos",
    skills: [
      { name: "Linux", logo: "linux" },
      { name: "Windows", logo: "windows" },
      { name: "Docker", logo: "docker" },
      { name: "GitHub Actions", logo: "githubactions" },
      { name: "Web", abbr: "WEB" },
    ],
  },
  {
    title: "Soft Skills",
    display: "badges",
    skills: [
      { name: "Leadership" },
      { name: "Event Management" },
      { name: "Technical Writing" },
      { name: "Time Management" },
    ],
  },
];

export const education = {
  university: "FAST National University (NUCES)",
  degree: "Bachelor of Science — Artificial Intelligence",
  location: "Karachi, Pakistan",
  gpa: "3.26/4.0",
  period: "Aug 2022 — Aug 2026",
  honor: "Dean's List — 3.51 SGPA (2nd Semester)",
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
    detail: "FAST Karachi Chapter — Event management and community involvement",
  },
];

export const experiences = [
  {
    title: "Agentic AI Intern",
    company: "Wellness Innovations",
    type: "Remote",
    period: "May 2025 — June 2025",
    points: [
      {
        title: "Automated Database Agent",
        desc: "Developed a fully automated database agent powered by large language models (LLMs) for seamless data interaction.",
      },
      {
        title: "Reflection Agent with LangGraph",
        desc: "Implemented a reflection agent using LangGraph's agentic workflow to enhance adaptability and self-improvement in AI systems.",
      },
    ],
  },
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
        title: "Student Assessments",
        desc: "Reviewed and graded student assessments, ensuring fairness and academic standards across courses.",
      },
      {
        title: "Project Evaluations",
        desc: "Evaluated programming, systems-level, and AI projects, providing constructive feedback to strengthen problem-solving and technical understanding.",
      },
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  language: string;
  topics: string[];
  url: string;
  featured?: boolean;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    name: "Detail Ops — Voice AI Booking Agent",
    description:
      "Phone-based AI agent for a car detailing business. It answers customer questions from uploaded documents through a RAG engine and books, reschedules or cancels appointments, with an admin dashboard for the knowledge base and calendar.",
    language: "Python",
    topics: ["Voice AI", "RAG", "FastAPI", "pgvector", "Vapi", "React"],
    url: "https://github.com/Muneeb1481/Voice-AI-Agent-Detailing-Booking-RAG",
    featured: true,
    highlights: [
      "Answers only from retrieved context and refuses to guess on pricing",
      "One shared booking path for voice calls and the dashboard",
      "27 tests across auth, chunking, booking and RAG",
    ],
  },
  {
    name: "Voice AI Patient Registration Agent",
    description:
      "Phone-callable voice agent that registers new patients through natural conversation, validates every field, stores records in a database and exposes them over a REST API with a live dashboard.",
    language: "Python",
    topics: ["Voice AI", "Vapi", "Groq", "FastAPI", "SQLite"],
    url: "https://github.com/Muneeb1481/Voice-AI-Agent-Patient-Registration-System",
    featured: true,
    highlights: [
      "Detects returning callers by phone number and offers updates",
      "Appointment scheduling with call transcripts linked to each patient",
      "16 integration tests covering the API, webhook, booking and dashboard",
    ],
  },
  {
    name: "Fuel Route Optimizer",
    description:
      "Django REST API that plans driving routes across the USA and picks the cheapest fuel stops along the way for a 500-mile-range vehicle, shown on an interactive Leaflet map.",
    language: "Python",
    topics: ["Django REST", "OSRM", "GraphHopper", "Leaflet", "Geospatial"],
    url: "https://github.com/Muneeb1481/fuel-route-optimizer",
    featured: true,
    highlights: [
      "7,500+ fuel stations geocoded offline",
      "Only 3 external API calls per request",
      "25 unit and integration tests",
    ],
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
    name: "DevOps Monitoring Dashboard",
    description:
      "Production-grade observability stack with Flask, Prometheus, Grafana, and Pushgateway. Collects 30+ real-time metrics every 5 seconds across 4 professional dashboards covering CI/CD, app health, and system performance.",
    language: "Python",
    topics: ["DevOps", "Prometheus", "Grafana"],
    url: "https://github.com/Muneeb1481/devops-dashboard-main",
  },
  {
    name: "APR Dataset Builder",
    description:
      "Automated pipeline that mines GitHub repositories to build structured datasets of buggy/fixed Python code pairs for training Automated Program Repair models. Resumable, incremental, and RepairLLaMA-compatible.",
    language: "Python",
    topics: ["GitHub API", "Data Pipeline", "APR"],
    url: "https://github.com/Muneeb1481/APR-DATASET-Creation",
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
