---
title: "How I Built My Terminal-Style Portfolio"
date: "2026-03-08"
tags: ["React", "Portfolio", "Web Dev"]
readTime: "6 min read"
---

# How I Built My Terminal-Style Portfolio

I wanted a portfolio that didn't look like every other Bootstrap card grid out there.
The idea was simple: what if visitors could **explore** my portfolio the way I explore my own
filesystem — by typing commands into a terminal?

## The Concept

Instead of scrolling through sections, you open the site and see a macOS-style terminal window.
You type `help`, get a list of commands. Then you type `whoami`, `ls projects/`, `cat projects/CureCode`,
and the site responds with real content about me and my work.

It felt more honest. It felt more *me*.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + Vite 6 | Fast HMR, modern tooling |
| Styling | Vanilla CSS (custom properties) | Full control, no Tailwind overhead |
| Routing | React Router v6 (HashRouter) | Works on GitHub Pages without config |
| Blog | ReactMarkdown + react-syntax-highlighter | Markdown posts with code highlighting |
| Hosting | GitHub Pages | Free, zero infra |

## The Terminal Emulator

The core is a React component `Terminal.jsx` that simulates a real shell:

```jsx
const runCommand = (raw) => {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  switch (cmd) {
    case "whoami":  return pushLine({ text: FILES["about.txt"] })
    case "ls":      return pushLine({ text: lsDir(resolvePath(args[0], cwd)) })
    case "cat":     return pushLine({ text: catFile(args[0], cwd) })
    // ... and 20+ more
  }
}
```

The virtual filesystem is defined in `commands.js` — a flat object of paths
and file contents. `ls` reads directory children, `cat` reads file strings,
`cd` updates state. It's all in-browser, no server needed.

## The Blog System

Blog posts are stored in two ways:

1. **Static `.md` files** in `/public/blog/` for permanent posts
2. **localStorage** via the Admin panel for posts I write on the fly

The `usePosts.js` hook merges both sources, with localStorage posts
taking priority over static ones when slugs conflict.

## The Admin Panel

The `/admin` route is a password-gated markdown editor with a **live split preview**.
Left side: form fields (title, slug, tags, excerpt) + a full markdown textarea.
Right side: real-time ReactMarkdown render.

Clicking "publish" saves the post to `localStorage` and it immediately
appears on the `/blog` page. No build step, no redeploy.

## Deployment

```bash
# Build and push to gh-pages branch automatically
npm run deploy
```

That's it. The `gh-pages` package handles everything.

## What I'd Do Differently

- Add **tab completion for filenames** (currently only command names complete)
- Persist terminal history across sessions with `localStorage`
- Add a `man <cmd>` that actually renders per-command documentation
- Maybe a dark/green phosphor theme toggle for nostalgia

---

If you're reading this, you probably already explored the terminal. Try `neofetch`.
Then try `cat .secret`. 😄
