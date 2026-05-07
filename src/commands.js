// commands.js — Real portfolio content for Shirshendu Ranjana Tripathi

export const FS = {
  "~": {
    type: "dir",
    children: ["about.txt", "skills.txt", "contact.txt", "education.txt", "achievements.txt", "resume.pdf", "projects/", "blog/", ".secret"],
  },
  "~/projects": {
    type: "dir",
    children: ["saathi/", "TrueSignal/", "CureCode/", "Streamify/"],
  },
  "~/blog": { type: "dir", children: [] }, // populated dynamically
}

// GitHub URLs for each project (used by `open projects/<name>`)
export const PROJECT_URLS = {
  "saathi": "https://github.com/ShirshenduR/saathi",
  "TrueSignal": "https://github.com/ShirshenduR/TrueSignal",
  "CureCode": "https://github.com/ShirshenduR/Hack-The-Future-CureCode",
  "Streamify": "https://github.com/ShirshenduR/Streamify",
}

// All tab-completable tokens at every context
export const COMPLETIONS = {
  commands: [
    "help", "whoami", "ls", "cd", "cat", "echo", "date", "clear", "history",
    "skills", "achievements", "education", "contact", "portfolio", "projects",
    "neofetch", "blog", "open", "sudo", "git", "uname", "man",
    "exit", "pwd", "touch", "vim", "nano", "grep", "curl", "wget", "resume",
  ],
  paths: Object.keys(FS).map(k => k.replace("~/", "")),
  files: [
    "about.txt", "skills.txt", "contact.txt", "education.txt",
    "achievements.txt", "resume.pdf", ".secret",
    "projects/saathi", "projects/TrueSignal",
    "projects/CureCode", "projects/Streamify",
    // bare project names for `open <name>` completion
    "saathi", "TrueSignal", "CureCode", "Streamify",
  ],
}

export const FILES = {
  "about.txt": `
NAME         Shirshendu Ranjana Tripathi
ROLE         Full-Stack Developer · AI/ML Builder · Systems Engineer
INSTITUTE    IIITDM Jabalpur — B.Tech ECE (2024–2028)
PHONE        +91 89249 42797
GITHUB       github.com/ShirshenduR
LINKEDIN     linkedin.com/in/shirshendur

BIO
  B.Tech ECE student at IIITDM Jabalpur building full-stack products,
  LLM workflows, and production-ready AI systems. I enjoy solving
  real-world problems by combining software engineering, data pipelines,
  and practical deployment.

CURRENTLY
  → Incoming Co-coordinator — Aero Fabrication Club (100+ members)
  → Building AI products: Saathi, TrueSignal, and CureCode
  → Shipping full-stack systems with measurable impact
  → Contributing to open source (50+ repositories on GitHub)

TIP: run 'open github.com/ShirshenduR' to visit GitHub profile
`.trim(),

  "education.txt": `
INSTITUTION   Indian Institute of Information Technology Design and
              Manufacturing (IIITDM), Jabalpur
DEGREE        B.Tech in Electronics and Communication Engineering
LOCATION      Jabalpur, India
YEAR          2024 – 2028

INSTITUTION   Metropolitan School, Gorakhpur, Uttar Pradesh
BOARD         ICSE (X) — ISC (XII)

RELEVANT COURSEWORK
  Data Structures · Signal Processing · Analog Electronics
  Digital Electronics · Computer Networks
`.trim(),

  "skills.txt": `
PROGRAMMING LANGUAGES
  C++  Python  Java  JavaScript  TypeScript

CS FUNDAMENTALS
  Data Structures & Algorithms  Object Oriented Programming
  System Design  REST APIs

WEB DEVELOPMENT
  React  Next.js  Node.js  Express.js  Django  Flask  RESTful APIs

DATABASES
  MongoDB  PostgreSQL  SQL  Vector Databases

AI / ML
  LLMs  Retrieval Augmented Generation (RAG)  NLP
  Computer Vision  OCR Pipelines  Prompt Engineering

TOOLS
  Git  GitHub  Docker  Figma  VS Code  Postman
  Linux  Streamlit  OSINT APIs
`.trim(),

  "contact.txt": `
NAME      Shirshendu Ranjana Tripathi
PHONE     +91 89249 42797
LINKEDIN  linkedin.com/in/shirshendur
GITHUB    github.com/ShirshenduR

Open to: Internships · Open Source Collaboration · Project Partnerships

QUICK LINKS
  open linkedin.com/in/shirshendur    → LinkedIn profile
  open github.com/ShirshenduR        → GitHub profile
  resume                              → Download resume PDF
`.trim(),

  "achievements.txt": `
HACKATHONS & COMPETITIONS
  🏆  MLH HackByte 4.0 — ElevenLabs Sponsor Track Winner (2026)
      Built Saathi with team SillyCoders in under 36 hours.

  🥇  NIDAR Disaster Management Challenge — 7th Nationwide (2026)
      Ranked among 350+ teams across India.

  🎖️  Hack The Future 2025 — National Finalist
      IIT Gandhinagar (Top 15 out of 300+ teams)

OPEN SOURCE
  🌟  Top 50 Mentor — GirlScript Summer of Code (2025)
      Mentored 30+ contributors in a 3-month program.
  🔗  50+ public repositories on GitHub

LEADERSHIP
  🛠️  Incoming Co-coordinator — Aero Fabrication Club, IIITDM
      100+ member student club.

COMPETITIVE PROGRAMMING
  ★   3-Star Rating — CodeChef

CERTIFICATIONS
  ✓  CS50x — Introduction to Computer Science, Harvard University
  ✓  AWS Educate — Introduction to Generative AI
  ✓  Postman API Fundamentals Student Expert
`.trim(),

  "resume.pdf": `
Run 'resume' to download the PDF resume.
Or visit the /portfolio page and click the Download Resume button.
`.trim(),

  ".secret": `
Nice catch. Nothing here... or is there?
Try: echo "you_found_it"
`.trim(),

  // ── Projects ──────────────────────────────────────────────────────────────

  "projects/saathi": `
NAME    Saathi — Voice AI Care Platform
YEAR    2026
REPO    github.com/ShirshenduR/saathi

DESCRIPTION
  AI platform that places proactive Hindi voice calls to elderly users
  using Twilio, ElevenLabs TTS, and Gemini LLM, with no smartphone
  required for the user.

HIGHLIGHTS
  • Won ElevenLabs Sponsor Track at MLH HackByte 4.0 (400+ participants)
  • Shipped family dashboard with mood tracking and safety risk flags
  • Reduced caregiver response time by around 60%

TECH
  Next.js 14 · Node.js · MongoDB · ElevenLabs TTS · Twilio · Gemini LLM

→ Run: open github.com/ShirshenduR/saathi
`.trim(),

  "projects/TrueSignal": `
NAME    TrueSignal — Talent Verification Platform
YEAR    2026
REPO    github.com/ShirshenduR/TrueSignal

DESCRIPTION
  Verifies resume claims against live GitHub, LeetCode, and Codeforces
  data via OSINT APIs and generates transparent audit reports.

HIGHLIGHTS
  • Reduced credential-fraud screening time by around 80%
  • Multi-layer scoring: Sentence-BERT, entropy, and Jaccard metrics
  • Achieved 92%+ precision over 200+ synthetic candidate profiles

TECH
  Python · Groq LLaMA-3 · Sentence-BERT · RAG · Streamlit · REST APIs

→ Run: open github.com/ShirshenduR/TrueSignal
`.trim(),

  "projects/CureCode": `
NAME    CureCode — AI Document Intelligence System
EVENT   IIT Gandhinagar Hack the Future (Finalist)
REPO    github.com/ShirshenduR/Hack-The-Future-CureCode

DESCRIPTION
  Built an AI system that analyzes policy and medical documents using
  OCR pipelines and structured data extraction. Implemented Retrieval
  Augmented Generation (RAG) for semantic document querying and insights.

HIGHLIGHTS
  • Top 15 of 300+ teams at Hack The Future 2025
  • Cut manual policy review time by an estimated 75%

TECH
  Python · OCR · RAG · LLMs · Vector Search

→ Run: open github.com/ShirshenduR/Hack-The-Future-CureCode
`.trim(),

  "projects/Streamify": `
NAME    Streamify — Full-Stack Music Streaming Platform
YEAR    2024
REPO    github.com/ShirshenduR/Streamify

DESCRIPTION
  Responsive music streaming web application with user authentication,
  dynamic UI, backend REST APIs, and integration with external music APIs
  for search and streaming.

HIGHLIGHTS
  • JWT auth, real-time search, and fully responsive interface
  • Sustained 500+ concurrent sessions with sub-200ms API response time

TECH
  React · Node.js · Express.js · MongoDB · REST APIs · Authentication

→ Run: open github.com/ShirshenduR/Streamify
`.trim(),
}

export const HELP_TEXT = `
Available commands:

  ABOUT
    whoami              Personal bio & info
    cat about.txt       Detailed about file
    cat education.txt   Education history
    cat skills.txt      Full skill breakdown
    cat contact.txt     Contact details
    cat achievements.txt  Awards & certifications
    resume              Download resume PDF

  NAVIGATION
    ls [path]           List directory contents
    cd <path>           Change directory  (e.g. cd projects/)
    pwd                 Print working directory
    cat <file>          Read file         (e.g. cat projects/Streamify)

  PROJECTS
    ls projects/                   List all projects
    cat projects/<name>            Read project details
    open saathi                    Open Saathi repository
    open github.com/ShirshenduR   Open GitHub profile

  PAGES
    portfolio           Open visual portfolio page
    blog                Open blog page

  SYSTEM
    skills              Quick skills overview
    achievements        Achievements & certifications
    education           Education history
    neofetch            System info card
    history             Command history
    clear               Clear terminal
    date                Current date & time
    echo <text>         Print text
    open <url>          Open a URL in new tab

  TIPS
    ↑ / ↓   Browse command history
    Tab     Autocomplete commands AND file paths
    Ctrl+L  Clear screen
`.trim()

export const NEOFETCH = `
         ██████████████            Shirshendu Ranjana Tripathi
       ██████████████████          ──────────────────────────────
      ████████████████████         OS:       Portfolio OS v3.0
     ██████████████████████        Host:     shirshendur.github.io
     ██████████████████████        Kernel:   React 19 / Vite 6
     ██████████████████████        Shell:    zsh (custom emulator)
      ████████████████████         Uptime:   2y (Batch of 2028)
       ██████████████████          College:  IIITDM Jabalpur, Jabalpur
         ██████████████            Branch:   ECE · Aero Fab Club (Incoming Co-coordinator)
                                   Repos:    50+ on GitHub
                                   Rating:   3-Star CodeChef
                                   Rank:     7th Nationwide (NIDAR 2026)
                                   Colors:  ██ ██ ██ ██ ██ ██
`.trim()
