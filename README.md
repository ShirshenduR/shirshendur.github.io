# Portfolio OS — Shirshendu Ranjana Tripathi

> A fully interactive **macOS terminal emulator** portfolio built with React + Vite, deployed on GitHub Pages.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-3dff7a?style=flat-square&logo=github) ![React](https://img.shields.io/badge/React-19-58a6ff?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-6-f0b429?style=flat-square&logo=vite)

**Live →** [shirshendur.github.io](https://shirshendur.github.io)

---

## What Is This?

Instead of a typical scrollable portfolio, visitors interact with a **real terminal emulator** — type commands like `whoami`, `ls projects/`, `cat projects/CureCode`, `neofetch`, and more. There's also a traditional `/portfolio` page for people who prefer a standard UI.

## Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | List all commands |
| `whoami` | Bio & info |
| `ls projects/` | List all projects |
| `cat projects/<name>` | Read project details |
| `open <project-name>` | Open GitHub repo in new tab |
| `skills` | Tech stack |
| `achievements` | Awards & certifications |
| `neofetch` | System info card |
| `blog` | Navigate to blog |
| `portfolio` | Navigate to visual portfolio page |
| `resume` | Download resume PDF |
| `open github.com/ShirshenduR` | Open GitHub profile |
| `↑ / ↓` | Browse command history |
| `Tab` | Autocomplete commands & file paths |
| `Ctrl+L` | Clear screen |

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 6 |
| Styling | Vanilla CSS (custom properties, dark theme) |
| Routing | React Router v6 (HashRouter for GitHub Pages) |
| Blog | ReactMarkdown + react-syntax-highlighter |
| Blog Auth | SHA-256 hashed password (Web Crypto API) |
| Hosting | GitHub Pages |

## Project Structure

```
src/
├── commands.js          # Virtual filesystem + all terminal content
├── components/
│   ├── Terminal.jsx     # Core interactive terminal emulator
│   ├── Navbar.jsx       # macOS menu bar style nav
│   └── Footer.jsx       # Terminal-aesthetic footer
├── pages/
│   ├── Home.jsx         # Terminal emulator home
│   ├── Portfolio.jsx    # Traditional visual portfolio
│   ├── Blog.jsx         # Blog post listing
│   ├── BlogPost.jsx     # Individual post renderer
│   └── Admin.jsx        # Password-gated markdown blog editor
└── lib/
    └── usePosts.js      # localStorage + static blog post hook
public/
├── blog/
│   ├── index.json       # Blog post index
│   └── *.md             # Static blog posts
└── resume.pdf           # Drop your resume PDF here
```

## Blog System

- Static `.md` files in `/public/blog/` serve as permanent posts
- Both are merged by `usePosts.js` — localStorage posts appear first

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

---

Made by **Shirshendu Ranjana Tripathi** · [linkedin.com/in/shirshendur](https://linkedin.com/in/shirshendur) · [github.com/ShirshenduR](https://github.com/ShirshenduR)
