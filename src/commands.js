// commands.js — Real portfolio content for Shirshendu Ranjana Tripathi

export const FS = {
  "~": {
    type: "dir",
    children: ["about.txt", "skills.txt", "contact.txt", "education.txt", "achievements.txt", "resume.pdf", "projects/", "blog/", ".secret"],
  },
  "~/projects": {
    type: "dir",
    children: ["CureCode/", "AI-Resume-Maker/", "Human-Following-Bot/", "Streamify/"],
  },
  "~/blog": { type: "dir", children: [] }, // populated dynamically
}

// GitHub URLs for each project (used by `open projects/<name>`)
export const PROJECT_URLS = {
  "CureCode": "https://github.com/ShirshenduR/Hack-The-Future-CureCode",
  "AI-Resume-Maker": "https://github.com/ShirshenduR/AI-RESUME-MAKER",
  "Human-Following-Bot": "https://github.com/ShirshenduR/Human-Following-Bot",
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
    "projects/CureCode", "projects/AI-Resume-Maker",
    "projects/Human-Following-Bot", "projects/Streamify",
    // bare project names for `open <name>` completion
    "CureCode", "AI-Resume-Maker", "Human-Following-Bot", "Streamify",
  ],
}

export const FILES = {
  "about.txt": `
NAME         Shirshendu Ranjana Tripathi
ROLE         Full-Stack Developer · AI/ML Enthusiast · Robotics Builder
INSTITUTE    IIITDM Jabalpur — B.Tech ECE (2024–2028)
PHONE        +91 89249 42797
GITHUB       github.com/ShirshenduR
LINKEDIN     linkedin.com/in/shirshendur

BIO
  I'm a first-year B.Tech ECE student at IIITDM Jabalpur who loves
  building things — from full-stack web apps and AI pipelines to
  autonomous robots. I've competed nationally, mentored in open source,
  and ship projects across the entire stack.

CURRENTLY
  → B.Tech ECE @ IIITDM Jabalpur (Batch of 2028)
  → Upcoming Coordinator — Aero Fabrication Club, IIITDM Jabalpur
  → Building AI-powered tools and robotics systems
  → Contributing to open source (50+ repositories on GitHub)

TIP: run 'open github.com/ShirshenduR' to visit GitHub profile
`.trim(),

  "education.txt": `
INSTITUTION   Indian Institute of Information Technology Design and
              Manufacturing (IIITDM), Jabalpur
DEGREE        B.Tech in Electronics and Communication Engineering
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

COMPUTER SCIENCE
  Data Structures & Algorithms
  Object Oriented Programming

WEB DEVELOPMENT
  React  Next.js  Node.js  Express.js  Django  Flask

DATABASES
  MongoDB  PostgreSQL  SQL

AI / ML
  Computer Vision  MobileNet  OCR Pipelines
  Retrieval Augmented Generation (RAG)

EMBEDDED & ROBOTICS
  ESP8266  ESP32  ROS2  Robotics  IoT

TOOLS
  Git  GitHub  Docker  Figma  VS Code  Postman
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
COMPETITIONS
  🥇  7th Rank Nationwide
      NIDAR Disaster Management Challenge
      Among 350+ teams across India
      → Trained a human detection model using a custom dataset
        for disaster surveillance and rescue systems.

  🏆  Hack The Future 2025 — Finalist
      IIT Gandhinagar national-level hackathon

OPEN SOURCE
  🌟  Top 50 Mentor — GirlScript Summer of Code
  🔗  50+ repositories on GitHub

COMPETITIVE PROGRAMMING
  ★   3 Rating — CodeChef

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

  "projects/CureCode": `
NAME    CureCode — AI Document Intelligence System
EVENT   IIT Gandhinagar Hack the Future (Finalist)
REPO    github.com/ShirshenduR/Hack-The-Future-CureCode

DESCRIPTION
  Built an AI system that analyzes policy and medical documents using
  OCR pipelines and structured data extraction. Implemented Retrieval
  Augmented Generation (RAG) for semantic document querying and insights.

TECH
  Python · OCR Pipelines · RAG · LLM APIs · Document Intelligence

→ Run: open github.com/ShirshenduR/Hack-The-Future-CureCode
`.trim(),

  "projects/AI-Resume-Maker": `
NAME    AI Resume Maker — ATS Resume Generator
REPO    github.com/ShirshenduR/AI-RESUME-MAKER

DESCRIPTION
  Full-stack AI platform that generates ATS-optimized resumes from
  plain project descriptions. Includes authentication, template rendering,
  and an automated resume generation pipeline.

TECH
  Full-Stack · AI / LLM APIs · Authentication · Template Engine

→ Run: open github.com/ShirshenduR/AI-RESUME-MAKER
`.trim(),

  "projects/Human-Following-Bot": `
NAME    Human Following Robot
REPO    github.com/ShirshenduR/Human-Following-Bot

DESCRIPTION
  Autonomous robot capable of detecting and following a human target in
  real time. Uses MobileNet human detection (Caffe) for vision inference
  integrated with ESP8266-based embedded robotic control.

TECH
  Python · MobileNet · Caffe · ESP8266 · Computer Vision · Robotics

→ Run: open github.com/ShirshenduR/Human-Following-Bot
`.trim(),

  "projects/Streamify": `
NAME    Streamify — Full-Stack Music Streaming Platform
REPO    github.com/ShirshenduR/Streamify

DESCRIPTION
  Responsive music streaming web application with user authentication,
  dynamic UI, backend REST APIs, and integration with external music APIs
  for search and streaming.

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
      ████████████████████         Uptime:   1y (Batch of 2028)
       ██████████████████          College:  IIITDM Jabalpur
         ██████████████            Branch:   ECE · Aero Fab Club
                                   Repos:    50+ on GitHub
                                   Rating:   3★ CodeChef
                                   Rank:     7th Nationwide (NIDAR)
                                   Colors:  ██ ██ ██ ██ ██ ██
`.trim()
