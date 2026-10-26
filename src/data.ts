// All site content lives here. Edit this file to update the portfolio —
// no layout code needs to change.

export type Category = 'Agents' | 'RAG' | 'ML/DL' | 'Vision' | 'NLP';
export type IconName = 'graph' | 'code' | 'doc' | 'video' | 'robot' | 'plane' | 'chat' | 'shield' | 'sliders' | 'mic' | 'leaf' | 'db';

export interface Project {
  title: string;
  summary: string;
  /** Shown when the card is expanded. */
  details?: string[];
  tags: string[];
  categories: Category[];
  featured?: boolean;
  badge?: string;
  icon: IconName;
  /**
   * GitHub repo URL — paste it between the quotes. If empty, the button is hidden
   * on the live site (and shown as a dashed placeholder only while running `npm run dev`).
   */
  github?: string;
}

export const profile = {
  name: 'Alan Anto',
  role: 'AI Engineer',
  tagline:
    'I build agentic LLM systems, retrieval pipelines and computer-vision models, end to end: from data and models to the app people use.',
  location: 'Cottbus, Germany',
  email: 'alan.anto.ai.2002@gmail.com',
  github: 'https://github.com/alankudakkad17',
  linkedin: 'https://www.linkedin.com/in/alan-anto-998431214/',
  cv: 'CV.pdf',
  photo: 'profile.webp',
  photoFallback: 'profile.jpg',
  availability: 'Open to AI engineering roles and working-student positions in Germany',
};

export const about: string[] = [
  "I'm an AI engineer based in Germany, currently studying for an **MSc in Artificial Intelligence at BTU Cottbus**. Most of my recent work is in **agentic AI and retrieval**: multi-agent systems built with LangGraph and Google ADK, hybrid vector and knowledge-graph RAG, and the FastAPI and React plumbing that makes them usable.",
  'Before that I worked on **computer vision for edge devices** — fine-tuning and quantizing YOLO models to run in real time on constrained hardware. My undergraduate robotics project was published at **IEEE ICTEST 2025**.',
];

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  kind: 'work' | 'education';
  points?: string[];
  note?: string;
  tags?: string[];
}

export const timeline: TimelineItem[] = [
  {
    period: '2025 – present',
    title: 'MSc Artificial Intelligence',
    org: 'BTU Cottbus-Senftenberg, Germany',
    kind: 'education',
    note: 'Graduate studies in machine learning and AI systems.',
  },
  {
    period: 'Summer 2023',
    title: 'AI Engineering Intern',
    org: 'Indian Institute of Information Technology, Kerala',
    kind: 'work',
    points: [
      'Fine-tuned YOLOv8 in PyTorch for edge devices, reaching 30 FPS real-time inference on constrained hardware.',
      'Exported to ONNX and applied dynamic quantization to cut model size and latency with minimal accuracy loss.',
      'Built and annotated a 5,000+ image dataset; an OpenCV/PyTorch augmentation pipeline improved robustness by 15%.',
    ],
    tags: ['PyTorch', 'YOLOv8', 'ONNX', 'OpenCV'],
  },
  {
    period: '2020 – 2024',
    title: 'B.Tech (Hons.) AI & Data Science',
    org: 'APJ Abdul Kalam Technological University, India',
    kind: 'education',
    note: 'Minor in Robotics. GPA 9.1 / 10.',
  },
];

export const projects: Project[] = [
  {
    title: 'Agentic Code Editor',
    summary:
      "Agentic Code-Mate is a chat-based AI coding assistant where users describe what they want in plain English and a team of 7 specialist agents — Planner, Code Generation, Code Edit, Debugger, Test Writer, Reviewer, and Documentation — handle the work automatically, orchestrated by Google ADK running LLaMA 3.3 70B on Groq's free tier, with responses streamed in real-time over WebSockets to a React + TypeScript frontend that renders syntax-highlighted, copyable code blocks, all containerized with Docker Compose for one-command deployment at zero infrastructure cost.",
    tags: ['Google ADK', 'FastAPI', 'Groq API', 'LiteLLM', 'React', 'Python', 'Git', 'Docker'],
    categories: ['Agents'],
    featured: true,
    icon: 'code',
    github: '',
  },
  {
    title: 'Automotive Graph RAG System',
    summary:
      'Hybrid Graph-RAG pipeline fusing a Neo4j knowledge graph (10 node types, 13 relationships covering BMW 7 Series vehicles, engines, recalls and diagnostic codes) with a ChromaDB vector store, improving retrieval accuracy 40% over flat RAG. An 8-node LangGraph agent with query expansion, dual-layer routing and cross-encoder reranking filters 30 candidates to the top 5, cutting irrelevant context 70% — running fully local on Ollama Llama 3 and Neo4j Community for zero cloud cost.',
    tags: ['Neo4j', 'LangGraph', 'ChromaDB', 'FastAPI', 'Gradio', 'Docker', 'Git', 'Ollama'],
    categories: ['RAG', 'Agents'],
    featured: true,
    icon: 'graph',
    github: '',
  },
  {
    title: 'DocChat – Multi-Agent RAG System',
    summary:
      'Multi-agent RAG with a LangGraph self-correction loop that auto-retries on verified response failures, lifting answer accuracy 30%. A hybrid retriever fusing BM25 lexical search with ChromaDB dense embeddings cut retrieval-failure rates 40%, shipped as a Dockerized Gradio web app with IBM WatsonX integration for scalable, verified document intelligence.',
    tags: ['LangGraph', 'WatsonX', 'ChromaDB', 'BM25', 'Gradio', 'Docker'],
    categories: ['RAG', 'Agents'],
    featured: true,
    icon: 'doc',
    github: '',
  },
  {
    title: 'Autonomous Multi-Agent Travel System',
    summary:
      'Hierarchical BeeAI travel planner with specialized expert agents and handoff protocols achieving 100% automated itinerary synthesis. An async FastAPI backend streams real-time agent trajectories and tool events over SSE to a React UI, cutting perceived latency 65%, while BeeAI RequirementAgents enforce conditional tool logic and maintain state across complex handoffs.',
    tags: ['BeeAI', 'Custom Tools', 'Git', 'FastAPI', 'React', 'Async'],
    categories: ['Agents'],
    featured: true,
    icon: 'plane',
    github: '',
  },
  {
    title: 'Cognitio – Multi-Modal Lecture Intelligence Engine',
    summary:
      'End-to-end lecture intelligence pipeline pairing OpenCV frame extraction and PySceneDetect scene boundaries with Groq Llama 4 Scout vision captioning, plus Whisper word-level transcription aligned to each scene — cutting note-taking time 90% on hour-long lectures. A context-grounded chatbot answers strictly from the generated summary and cites exact timestamps to prevent off-topic hallucination, with three input modes (upload, YouTube, audio) and four export formats (PDF, Markdown, JSON, SRT).',
    tags: ['Groq', 'Llama', 'Whisper', 'OpenCV', 'Git', 'Streamlit', 'FastAPI', 'ReportLab'],
    categories: ['Vision', 'NLP'],
    featured: true,
    icon: 'video',
    github: '',
  },
  {
    title: 'Post-Training & Quantization-Aware Model Optimization',
    summary:
      'Applied dynamic INT8 quantization to the BLIP Visual Question Answering model, reducing model size by 65.4% and inference time by 16% with the same answer as the FP32 model. Compared dynamic, static (calibration-based) and Quantization-Aware Training (QAT) for FP32 to INT8 conversion of a CIFAR-10 CNN, benchmarking model size and inference latency. Built a QAT pipeline with Conv-BN-ReLU fusion and fake-quantization fine-tuning, reaching a 4× smaller model with 2.3× faster inference at 84.7% accuracy (FP32: 88.2%).',
    tags: ['Python', 'PyTorch', 'CNN', 'BLIP', 'INT8', 'PTQ', 'QAT'],
    categories: ['ML/DL', 'Vision'],
    icon: 'sliders',
    github: '',
  },
  {
    title: 'Neural Network Pruning for Model Compression',
    summary:
      'Implemented unstructured L1 pruning (30% of conv weights), structured L2-norm pruning (50% of output neurons) and global pruning in PyTorch, verifying sparsity through weight masks. Applied 50% global pruning to a pre-trained ResNet18 (11.2M parameters), excluding the classifier head, and fine-tuned it with pruning masks on a fruit and vegetable disease dataset. Benchmarked pruned vs. unpruned models on accuracy, precision, recall and F1-score, and found that unstructured sparsity leaves the saved model size unchanged because the weights are stored in dense format.',
    tags: ['Python', 'PyTorch', 'ResNet18', 'Sparsity', 'Transfer Learning'],
    categories: ['ML/DL', 'Vision'],
    icon: 'graph',
    github: '',
  },
  {
    title: 'Transformer-Based Neural Machine Translation',
    summary:
      'Built an encoder-decoder Transformer (12M parameters) in PyTorch for English to German neural machine translation, trained on 135K sentence pairs with a 15K-pair validation split. Implemented padding masks to ignore padded tokens and causal (look-ahead) masks to block future tokens, and wired encoder-decoder cross-attention so the decoder attends to the source sentence during autoregressive generation. Developed the data pipeline with text normalization, tokenization and vocabularies of 7.7K English and 12K German tokens, and trained with teacher forcing and Adam, reducing validation loss from 1.58 to 1.31 in two epochs.',
    tags: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Seq2Seq'],
    categories: ['ML/DL', 'NLP'],
    icon: 'chat',
    github: '',
  },
  {
    title: 'AI NutriCoach (NourishBot)',
    summary:
      'Multi-agent nutrition assistant (CrewAI) that detects ingredients, generates recipes and analyzes nutrients using Llama 3 Vision and WatsonX Granite. Dual workflows handle recipe generation and meal nutrient analysis with dietary filters, calorie goals and macro/micro estimation, with Pydantic-structured outputs surfaced through a Gradio interface.',
    tags: ['CrewAI', 'Llama 3 Vision', 'WatsonX Granite', 'Pydantic', 'Gradio'],
    categories: ['Agents', 'Vision'],
    featured: true,
    icon: 'leaf',
    github: '',
  },
  {
    title: 'RAG-Based LinkedIn Icebreaker Tool',
    summary:
      'RAG-powered profile analysis tool that generates personalized conversation starters from LinkedIn data using LlamaIndex, with IBM WatsonX Granite for generation and Slate embeddings for semantic vector search. An end-to-end pipeline pulls live profiles via the ProxyCurl API, builds vector stores, and serves profile-specific insights through a Gradio UI.',
    tags: ['LlamaIndex', 'WatsonX Granite', 'Slate Embeddings', 'ProxyCurl', 'FastAPI'],
    categories: ['RAG'],
    featured: true,
    icon: 'chat',
    github: '',
  },
  {
    title: 'Meeting Intelligence Tool',
    summary:
      'Automated meeting intelligence system combining Whisper STT with WatsonX summarization to cut post-meeting documentation time 90%. An NLP pipeline with audio preprocessing, speaker diarization and LLM-based context extraction produces structured summaries, decisions and action items — reviewable and exportable from an interactive dashboard.',
    tags: ['Whisper', 'WatsonX', 'Speaker Diarization', 'NLP Pipeline', 'Gradio'],
    categories: ['NLP'],
    featured: true,
    icon: 'mic',
    github: '',
  },
  {
    title: 'YouTube Video Summarizer & Q&A',
    summary:
      'End-to-end video summarization and Q&A system that extracts and preprocesses transcripts and generates high-quality summaries with WatsonX Llama 3. A semantic RAG pipeline using chunking, Slate embeddings and FAISS indexing delivers accurate, context-aware answers, unified with summarization in a single Gradio interface.',
    tags: ['WatsonX Llama 3', 'Slate Embeddings', 'FAISS', 'LangChain', 'Streamlit'],
    categories: ['RAG', 'NLP'],
    featured: true,
    icon: 'video',
    github: '',
  },
  {
    title: 'SQL & LLM Agent System',
    summary:
      'AI-powered SQL agent that converts natural-language questions into executable MySQL queries using LangChain and Granite-3-2-8B. Configured both deterministic and creative LLM workflows so a single agent architecture handles structured data queries and general Q&A across structured and unstructured sources.',
    tags: ['WatsonX Granite', 'LangChain', 'MySQL', 'NL-SQL Agents'],
    categories: ['Agents'],
    featured: true,
    icon: 'db',
    github: '',
  },
  {
    title: 'QLoRA-Based Conversational LLM Fine-Tuning',
    summary:
      'QLoRA supervised fine-tuning pipeline for Mistral-7B enabling efficient conversational tuning for YouTube comment response automation, with a 95% gain in response accuracy via LoRA adapter fusion and 4-bit quantization. Built end-to-end with Transformers, PEFT, Datasets, bitsandbytes and the Trainer API on a custom comment dataset.',
    tags: ['Mistral-7B', 'Hugging Face', 'PEFT', 'bitsandbytes', 'Tokenizers'],
    categories: ['ML/DL'],
    featured: true,
    icon: 'sliders',
    github: '',
  },
  {
    title: 'Semantic SQL Injection Detection',
    summary:
      'Semantic intrusion-detection system using BERT for real-time identification and classification of SQL injection attacks at over 95% accuracy. Integrated into a web interface with automated email alerts to speed administrator response, deployed end-to-end with Python, TensorFlow, SQL and SMTP.',
    tags: ['BERT', 'TensorFlow', 'Python', 'SQL', 'SMTP'],
    categories: ['ML/DL', 'NLP'],
    featured: true,
    icon: 'shield',
    github: '',
  },
  {
    title: 'Autonomous Robot — Supermarket Restocking',
    summary:
      'Autonomous wheeled robot for real-time product detection and restocking in supermarkets with fully automated workflows. Integrated YOLOv8 for live object detection (90% accuracy) and used OpenCV, Raspberry Pi and line-following algorithms for robust navigation and control — the work led to an IEEE publication.',
    tags: ['YOLOv8', 'OpenCV', 'Raspberry Pi', 'Python'],
    categories: ['Vision'],
    featured: true,
    badge: 'IEEE ICTEST 2025',
    icon: 'robot',
    github: '',
  },
  {
    title: 'Aircraft Damage Classification & Captioning',
    summary:
      'Automated aircraft damage assessment with deep learning for rapid classification and maintenance-report captioning. Combines a VGG16 classifier with a Transformer-based BLIP captioning model at 92% accuracy, implemented end-to-end with Python, TensorFlow, Hugging Face and NumPy.',
    tags: ['VGG16', 'BLIP', 'TensorFlow', 'Hugging Face', 'NumPy'],
    categories: ['Vision'],
    featured: true,
    icon: 'plane',
    github: '',
  },
];

export interface Publication {
  title: string;
  venue: string;
  venueShort: string;
  date: string;
  /** Links — paste URLs between the quotes; empty ones are hidden on the live site. */
  paper?: string;
  doi?: string;
}

export const publications: Publication[] = [
  {
    title: 'Autonomous Wheeled Robot for Intelligent Supermarket Restocking',
    venue: 'IEEE 2nd International Conference on Trends in Engineering Systems & Technologies (ICTEST)',
    venueShort: 'IEEE ICTEST',
    date: 'Jun 2025',
    paper: '',
    doi: '',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'SQL', 'C++', 'TypeScript (React)'] },
  { group: 'GenAI Tools and Frameworks', items: ['LLMs', 'Transformers', 'Hugging Face', 'RAG', 'QLoRA', 'Prompt Engineering'] },
  { group: 'Agentic AI Frameworks', items: ['LangChain', 'LangGraph', 'BeeAI', 'CrewAI', 'LlamaIndex', 'Google ADK'] },
  { group: 'Machine Learning & Deep Learning', items: ['PyTorch', 'TensorFlow', 'Keras', 'ONNX', 'OpenCV', 'Scikit-learn'] },
  { group: 'Web Development Stack', items: ['React', 'FastAPI', 'WebSockets', 'Flask'] },
  { group: 'Cloud & Tools', items: ['AWS', 'Azure', 'Docker', 'Gradio', 'Git', 'IBM WatsonX'] },
  { group: 'Databases', items: ['MySQL', 'ChromaDB', 'FAISS', 'Neo4j', 'PostgreSQL'] },
  { group: 'Soft Skills', items: ['Leadership', 'MS Office', 'Documentation', 'Time Management'] },
];

export const certifications: { name: string; issuer: string; year: string }[] = [
  { name: 'PyTorch Professional Certificate', issuer: 'DeepLearning.AI', year: '2026' },
  { name: 'RAG and Agentic AI Professional Certificate', issuer: 'IBM', year: '2025' },
  { name: 'Generative AI for Developers', issuer: 'AWS', year: '2025' },
  { name: 'Docker Foundations Professional Certificate', issuer: 'Docker', year: '2025' },
  { name: 'Azure AI Essentials', issuer: 'Microsoft', year: '2025' },
  { name: 'AI Engineering Professional Certificate', issuer: 'IBM', year: '2025' },
  { name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI', year: '2023' },
];
