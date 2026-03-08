import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { FS, FILES, HELP_TEXT, NEOFETCH, PROJECT_URLS, COMPLETIONS } from "../commands"

const WELCOME = `Last login: ${new Date().toDateString()} on ttys001

Portfolio OS v3.0 — Shirshendu Ranjana Tripathi
Type 'help' to see available commands. Try 'neofetch' or 'whoami'.
`

const PROMPT_USER = "shirshendu"
const PROMPT_HOST = "portfolio"

function formatPrompt(cwd) {
    const display = cwd === "~" ? "~" : cwd.replace("~/", "")
    return { user: PROMPT_USER, host: PROMPT_HOST, path: display }
}

function lsDir(path, blogPosts) {
    if (path === "~/blog") {
        const posts = blogPosts.map(p => p.slug + ".md")
        return posts.length === 0 ? "# No blog posts yet." : posts.join("  ")
    }
    const node = FS[path] || FS["~"]
    if (!node) return `ls: cannot access '${path}': No such file or directory`
    return node.children.join("  ")
}

function catFile(fileName, cwd, blogPosts) {
    if (fileName === "resume.pdf" || fileName === "resume") {
        return FILES["resume.pdf"]
    }
    if (FILES[fileName]) return FILES[fileName]
    const resolved = fileName.startsWith("~/") ? fileName : `${cwd}/${fileName}`.replace(/\/\//g, "/")
    const key = resolved.replace("~/", "")
    if (FILES[key]) return FILES[key]
    const slug = fileName.replace(".md", "")
    const post = blogPosts.find(p => p.slug === slug)
    if (post) return `# ${post.title}\n\n${post.body || post.excerpt || "(no content)"}`
    return `cat: ${fileName}: No such file or directory`
}

function resolvePath(target, cwd) {
    if (!target || target === "~") return "~"
    if (target === "..") {
        if (cwd === "~") return "~"
        const parts = cwd.split("/"); parts.pop()
        return parts.join("/") || "~"
    }
    if (target.startsWith("~/")) return target
    return `${cwd}/${target}`.replace(/\/\//g, "/")
}

// Context-aware tab completion
function tabComplete(input, cwd) {
    const parts = input.trimStart().split(/\s+/)
    const cmd = parts[0]
    const rest = parts.slice(1).join(" ")

    if (parts.length === 1) {
        // Complete command name
        const match = COMPLETIONS.commands.find(c => c.startsWith(cmd) && c !== cmd)
        return match || null
    }

    // Complete second arg (file/path)
    const partial = rest
    const pool = [...COMPLETIONS.files, ...COMPLETIONS.paths]
    const match = pool.find(c => c.startsWith(partial) && c !== partial)
    return match ? `${cmd} ${match}` : null
}

export function Terminal({ blogPosts = [] }) {
    const navigate = useNavigate()
    const [lines, setLines] = useState([{ type: "output", text: WELCOME }])
    const [input, setInput] = useState("")
    const [cwd, setCwd] = useState("~")
    const [hist, setHist] = useState([])
    const [histIdx, setHistIdx] = useState(-1)
    const [visible, setVisible] = useState(false)
    const inputRef = useRef(null)
    const bottomRef = useRef(null)

    useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [lines])

    const focusInput = () => inputRef.current?.focus()

    const pushLine = useCallback((entry) => {
        setLines(prev => [...prev, entry])
    }, [])

    const runCommand = useCallback((raw) => {
        const trimmed = raw.trim()
        if (!trimmed) return

        const p = formatPrompt(cwd)
        pushLine({ type: "cmd", text: trimmed, prompt: p })
        setHist(prev => [trimmed, ...prev.filter(h => h !== trimmed)])
        setHistIdx(-1)

        const [cmd, ...args] = trimmed.split(/\s+/)
        const arg = args.join(" ")

        switch (cmd.toLowerCase()) {
            case "help":
                pushLine({ type: "output", text: HELP_TEXT }); break

            case "whoami":
                pushLine({ type: "output", text: FILES["about.txt"] }); break

            case "pwd":
                pushLine({ type: "output", text: cwd }); break

            case "ls": {
                const target = arg ? resolvePath(arg.replace(/\/$/, ""), cwd) : cwd
                pushLine({ type: "output", text: lsDir(target, blogPosts), color: "var(--blue)" }); break
            }

            case "cd": {
                if (!arg || arg === "~") { setCwd("~"); pushLine({ type: "output", text: "" }); break }
                const target = resolvePath(arg.replace(/\/$/, ""), cwd)
                const exists = FS[target] || target === "~/blog"
                if (exists) { setCwd(target); pushLine({ type: "output", text: "" }) }
                else pushLine({ type: "output", text: `cd: ${arg}: No such file or directory`, color: "var(--red)" })
                break
            }

            case "cat": {
                if (!arg) { pushLine({ type: "output", text: "cat: missing operand", color: "var(--red)" }); break }
                pushLine({ type: "output", text: catFile(arg, cwd, blogPosts) }); break
            }

            case "echo":
                pushLine({ type: "output", text: arg || "", color: "var(--green)" }); break

            case "date":
                pushLine({ type: "output", text: new Date().toString() }); break

            case "clear":
                setLines([]); break

            case "history":
                pushLine({ type: "output", text: hist.map((h, i) => `${String(hist.length - i).padStart(4)}  ${h}`).join("\n") || "(no history)" }); break

            case "skills":
                pushLine({ type: "output", text: FILES["skills.txt"] }); break

            case "achievements":
                pushLine({ type: "output", text: FILES["achievements.txt"] }); break

            case "education":
                pushLine({ type: "output", text: FILES["education.txt"] }); break

            case "contact":
                pushLine({ type: "output", text: FILES["contact.txt"] }); break

            case "resume":
                pushLine({ type: "output", text: "Downloading resume…", color: "var(--green)" })
                setTimeout(() => {
                    const a = document.createElement("a")
                    a.href = "/resume.pdf"
                    a.download = "Shirshendu_Ranjana_Tripathi_Resume.pdf"
                    a.click()
                }, 300)
                break

            case "neofetch":
                pushLine({ type: "output", text: NEOFETCH, color: "var(--green)" }); break

            case "projects": {
                const projectList = Object.keys(PROJECT_URLS)
                    .map(name => `  ${name.padEnd(24)} → ${PROJECT_URLS[name]}`)
                    .join("\n")
                pushLine({ type: "output", text: `~/projects/\n\n${projectList}\n\nTIP: 'open <name>' opens the repo  |  'cat projects/<name>' shows details`, color: "var(--blue)" })
                break
            }

            case "portfolio":
                pushLine({ type: "output", text: "Opening /portfolio…", color: "var(--green)" })
                setTimeout(() => navigate("/portfolio"), 600)
                break

            case "blog":
                pushLine({ type: "output", text: "Opening ~/blog…", color: "var(--green)" })
                setTimeout(() => navigate("/blog"), 600)
                break


            case "open": {
                if (!arg) { pushLine({ type: "output", text: "open: missing argument\nUsage: open <url|project-name>", color: "var(--red)" }); break }
                // Handle `open projects/<name>` or `open <BareProjectName>`
                const projKey = arg.replace(/^projects\//, "")
                const projUrl = PROJECT_URLS[projKey]
                if (projUrl) {
                    pushLine({ type: "output", text: `Opening ${projUrl}…`, color: "var(--blue)" })
                    setTimeout(() => window.open(projUrl, "_blank"), 400)
                    break
                }
                // Generic URL
                const url = arg.startsWith("http") ? arg : `https://${arg}`
                pushLine({ type: "output", text: `Opening ${url}…`, color: "var(--blue)" })
                setTimeout(() => window.open(url, "_blank"), 400)
                break
            }

            case "sudo":
                pushLine({ type: "output", text: `[sudo] password for ${PROMPT_USER}:\nSorry, try again.\nsudo: 3 incorrect password attempts`, color: "var(--red)" })
                break

            case "you_found_it":
                pushLine({ type: "output", text: "🎉 Congratulations! Easter egg found.\n\n    'Any sufficiently advanced technology\n     is indistinguishable from magic.'\n         — Arthur C. Clarke\n\nConnect: linkedin.com/in/shirshendur | +91 89249 42797", color: "var(--amber)" })
                break

            case "uname":
                pushLine({ type: "output", text: "Portfolio OS portfolio 3.0.0 React 19 / Vite 6 — IIITDM Jabalpur ECE" }); break

            case "touch": case "vim": case "nano": case "vi":
                pushLine({ type: "output", text: "Permission denied: read-only filesystem.", color: "var(--red)" }); break

            case "grep":
                pushLine({ type: "output", text: "Pipes aren't supported yet. Try 'cat' a specific file." }); break

            case "man":
                pushLine({ type: "output", text: arg ? `No manual entry for ${arg}. Try 'help'.` : "What manual page do you want?" }); break

            case "exit": case "quit":
                pushLine({ type: "output", text: "You can't exit the internet. ¯\\_(ツ)_/¯" }); break

            case "rm":
                pushLine({ type: "output", text: "rm: permission denied: read-only filesystem.", color: "var(--red)" }); break

            case "curl": case "wget":
                pushLine({ type: "output", text: `${cmd}: Try 'contact' instead.` }); break

            case "git":
                if (args[0] === "log") pushLine({ type: "output", text: "commit a1b2c3d (HEAD -> main)\nAuthor: Shirshendu Ranjana Tripathi\nDate:   " + new Date().toDateString() + "\n\n    feat: redesign portfolio as real macOS terminal emulator\n\ncommit b2c3d4e\n\n    feat: add AI Resume Maker" })
                else if (args[0] === "status") pushLine({ type: "output", text: "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean" })
                else pushLine({ type: "output", text: "usage: git [log|status|...]\nTry: git log" })
                break

            case "":
                break

            default:
                pushLine({ type: "output", text: `zsh: command not found: ${cmd}\nType 'help' for available commands.`, color: "var(--red)" })
        }
    }, [cwd, hist, navigate, pushLine, blogPosts])

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            runCommand(input)
            setInput("")
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            const newIdx = Math.min(histIdx + 1, hist.length - 1)
            setHistIdx(newIdx)
            setInput(hist[newIdx] || "")
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            const newIdx = Math.max(histIdx - 1, -1)
            setHistIdx(newIdx)
            setInput(newIdx === -1 ? "" : hist[newIdx])
        } else if (e.key === "Tab") {
            e.preventDefault()
            const completed = tabComplete(input, cwd)
            if (completed) setInput(completed)
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault()
            setLines([])
        } else if (e.key === "c" && e.ctrlKey) {
            e.preventDefault()
            pushLine({ type: "cmd", text: input + "^C", prompt: formatPrompt(cwd) })
            setInput("")
        }
    }

    const p = formatPrompt(cwd)

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", boxSizing: "border-box", opacity: visible ? 1 : 0, transition: "opacity .4s ease" }}
            onClick={focusInput}>
            <div style={{ width: "100%", maxWidth: 900, height: "85vh", minHeight: 480, display: "flex", flexDirection: "column", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset", overflow: "hidden" }}>
                {/* Title bar */}
                <div style={{ background: "var(--bg-3)", borderBottom: "1px solid var(--border)", padding: "11px 16px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, userSelect: "none", position: "relative" }}>
                    <span className="tw-dot dot-r" />
                    <span className="tw-dot dot-y" />
                    <span className="tw-dot dot-g" />
                    <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", pointerEvents: "none" }}>
                        {p.user}@{p.host} — zsh — {cwd}
                    </span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                        <button onClick={() => navigate("/portfolio")} style={{ background: "none", border: "none", color: "var(--text-faint)", fontSize: 11, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}>portfolio ↗</button>
                        <button onClick={() => setLines([])} style={{ background: "none", border: "none", color: "var(--text-faint)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>clear</button>
                    </div>
                </div>

                {/* Output area */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.7 }}>
                    {lines.map((line, i) => {
                        if (line.type === "cmd") {
                            return (
                                <div key={i} style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 4, marginBottom: 2 }}>
                                    <span style={{ color: "var(--green)", whiteSpace: "nowrap" }}>{line.prompt.user}</span>
                                    <span style={{ color: "var(--muted)" }}>@</span>
                                    <span style={{ color: "var(--green-dim)", whiteSpace: "nowrap" }}>{line.prompt.host}</span>
                                    <span style={{ color: "var(--blue)" }}>{" "}{line.prompt.path}</span>
                                    <span style={{ color: "var(--text-dim)" }}>%</span>
                                    <span style={{ color: "var(--text)", marginLeft: 4 }}>{line.text}</span>
                                </div>
                            )
                        }
                        return (
                            <pre key={i} style={{ margin: "0 0 10px", color: line.color || "var(--text-dim)", fontFamily: "inherit", fontSize: "inherit", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.65 }}>
                                {line.text}
                            </pre>
                        )
                    })}
                    <div ref={bottomRef} />
                </div>

                {/* Input prompt line */}
                <div style={{ borderTop: "1px solid var(--border)", padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, background: "var(--bg-2)" }}>
                    <span style={{ color: "var(--green)", fontSize: 13, whiteSpace: "nowrap" }}>{p.user}</span>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>@</span>
                    <span style={{ color: "var(--green-dim)", fontSize: 13, whiteSpace: "nowrap" }}>{p.host}</span>
                    <span style={{ color: "var(--blue)", fontSize: 13, whiteSpace: "nowrap" }}>{" "}{p.path}</span>
                    <span style={{ color: "var(--text-dim)", fontSize: 13 }}>%</span>
                    <input
                        ref={inputRef}
                        autoFocus
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, caretColor: "var(--green)" }}
                        spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
                    />
                </div>
            </div>
        </div>
    )
}
