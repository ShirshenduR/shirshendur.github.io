import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { savePost, deletePost, getLocalPost } from "../lib/usePosts"

const EMPTY = { title: "", slug: "", tags: "", excerpt: "", body: "# My Blog Post\n\nWrite your content here...\n" }

// SHA-256 hash of the admin password (NOT the plaintext password).
// Change by running: node -e "const c=require('crypto');console.log(c.createHash('sha256').update('YOUR_PASSWORD').digest('hex'))"
// Current hash is for: shirshendur2028
const PASS_HASH = "4047f90ac04a0b8e1acf72edc8e1bebbfcd628ccfbc07f944b2b2a28ae593d394"

async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str))
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}

function slugify(s) {
    return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")
}

function getAll() {
    try { return JSON.parse(localStorage.getItem("portfolio_posts") || "[]") } catch { return [] }
}

// Mini code renderer for the preview
const renderCode = ({ node, inline, className, children, ...props }) => {
    const m = /language-(\w+)/.exec(className || "")
    return !inline && m ? (
        <SyntaxHighlighter style={vscDarkPlus} language={m[1]} PreTag="div"
            customStyle={{ background: "#090909", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: 12 }}
            {...props}>{String(children).replace(/\n$/, "")}</SyntaxHighlighter>
    ) : <code className={className} {...props}>{children}</code>
}

export default function Admin() {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem("adm") === "1")
    const [pass, setPass] = useState("")
    const [passErr, setPassErr] = useState(false)
    const [checking, setChecking] = useState(false)

    const [form, setForm] = useState(EMPTY)
    const [tab, setTab] = useState("write")   // "write" | "preview"
    const [saved, setSaved] = useState(false)
    const [editSlug, setEdit] = useState(null)
    const [posts, setPosts] = useState(getAll())
    const [confirm, setConfirm] = useState(null)
    const [panel, setPanel] = useState("editor")  // "editor" | "posts"

    const refresh = () => setPosts(getAll())

    const set = k => e => {
        const val = e.target.value
        setForm(f => {
            const next = { ...f, [k]: val }
            if (k === "title" && !editSlug) next.slug = slugify(val)
            return next
        })
        setSaved(false)
    }

    const handleSave = () => {
        if (!form.title.trim() || !form.slug.trim() || !form.body.trim()) return
        const post = {
            slug: form.slug.trim(),
            title: form.title.trim(),
            date: new Date().toISOString().split("T")[0],
            tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
            excerpt: form.excerpt.trim() || form.body.replace(/[#*`\n]/g, " ").slice(0, 140).trim() + "…",
            body: form.body,
            local: true,
        }
        savePost(post)
        refresh()
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const handleEdit = (slug) => {
        const p = getAll().find(x => x.slug === slug)
        if (!p) return
        setForm({ title: p.title, slug: p.slug, tags: (p.tags || []).join(", "), excerpt: p.excerpt || "", body: p.body || "" })
        setEdit(slug)
        setPanel("editor")
        setSaved(false)
    }

    const handleDelete = (slug) => {
        deletePost(slug)
        refresh()
        if (editSlug === slug) { setForm(EMPTY); setEdit(null) }
        setConfirm(null)
    }

    const handleNew = () => {
        setForm(EMPTY)
        setEdit(null)
        setSaved(false)
        setPanel("editor")
    }

    if (!authed) return (
        <div className="page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <div className="tw" style={{ width: "100%", maxWidth: 420 }}>
                    <div className="tw-bar">
                        <span className="tw-dot dot-r" /><span className="tw-dot dot-y" /><span className="tw-dot dot-g" />
                        <span className="tw-title">sudo admin</span>
                    </div>
                    <div className="tw-body">
                        <p style={{ color: "var(--amber)", fontSize: 13, marginBottom: 20 }}>
                            [sudo] password for admin:
                        </p>
                        <form onSubmit={async e => {
                            e.preventDefault()
                            setChecking(true)
                            const h = await sha256(pass)
                            setChecking(false)
                            if (h === PASS_HASH) {
                                sessionStorage.setItem("adm", "1")
                                setAuthed(true)
                            } else {
                                setPassErr(true)
                                setTimeout(() => setPassErr(false), 1500)
                            }
                        }}>
                            <div className="f-group">
                                <input
                                    className="f-input"
                                    type="password"
                                    autoFocus
                                    placeholder="••••••••"
                                    value={pass}
                                    onChange={e => setPass(e.target.value)}
                                    style={{ borderColor: passErr ? "var(--red)" : undefined }}
                                />
                                {passErr && <span style={{ fontSize: 11, color: "var(--red)" }}>Authentication failure. Try again.</span>}
                            </div>
                            <button type="submit" className="btn btn-green" disabled={checking}>
                                {checking ? "Verifying…" : "Authenticate"}
                            </button>
                        </form>
                        <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 16 }}>
                            # Password-protected. Contact owner for access.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={{ flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "96px 20px 60px" }}>

                {/* Admin header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                    <div>
                        <div className="prompt" style={{ fontSize: 12, marginBottom: 6, color: "var(--text-faint)" }}>
                            <span className="p-user">admin</span><span className="p-at">@</span><span className="p-host">portfolio</span><span className="p-dollar">:~/blog$</span>
                            <span style={{ marginLeft: 6, color: "var(--text-dim)" }}>nano new_post.md</span>
                        </div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--green)" }}>_admin / blog editor</h1>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {/* Panel switcher */}
                        {["editor", "posts"].map(p => (
                            <button key={p} onClick={() => setPanel(p)} style={{
                                padding: "5px 14px", borderRadius: 4, fontFamily: "inherit", fontSize: 12, cursor: "pointer",
                                background: panel === p ? "rgba(61,255,122,0.08)" : "transparent",
                                border: `1px solid ${panel === p ? "rgba(61,255,122,0.3)" : "var(--border)"}`,
                                color: panel === p ? "var(--green)" : "var(--text-dim)",
                            }}>
                                {p === "editor" ? "✏ editor" : `📄 posts (${posts.length})`}
                            </button>
                        ))}
                        <button onClick={handleNew} className="btn btn-ghost" style={{ fontSize: 12 }}>+ new</button>
                        <button onClick={() => { sessionStorage.removeItem("adm"); window.location.reload() }} className="btn btn-danger" style={{ fontSize: 12 }}>logout</button>
                    </div>
                </div>

                {/* ── EDITOR PANEL ── */}
                {panel === "editor" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minHeight: 600 }}>

                        {/* Left: form + editor */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            <div className="tw" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                <div className="tw-bar">
                                    <span className="tw-dot dot-r" /><span className="tw-dot dot-y" /><span className="tw-dot dot-g" />
                                    <span className="tw-title">{form.slug || "new_post"}.md</span>
                                    {saved && <span style={{ fontSize: 11, color: "var(--green)", marginLeft: "auto" }}>✓ saved</span>}
                                </div>
                                <div className="tw-body" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, padding: 16 }}>
                                    {/* Meta fields */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                                        <div className="f-group" style={{ marginBottom: 0 }}>
                                            <label className="f-label">title</label>
                                            <input className="f-input" placeholder="Post title" value={form.title} onChange={set("title")} />
                                        </div>
                                        <div className="f-group" style={{ marginBottom: 0 }}>
                                            <label className="f-label">slug</label>
                                            <input className="f-input" placeholder="my-post-slug" value={form.slug} onChange={set("slug")} />
                                        </div>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                                        <div className="f-group" style={{ marginBottom: 0 }}>
                                            <label className="f-label">tags (comma separated)</label>
                                            <input className="f-input" placeholder="React, CSS, Design" value={form.tags} onChange={set("tags")} />
                                        </div>
                                        <div className="f-group" style={{ marginBottom: 0 }}>
                                            <label className="f-label">excerpt (optional)</label>
                                            <input className="f-input" placeholder="Short summary…" value={form.excerpt} onChange={set("excerpt")} />
                                        </div>
                                    </div>

                                    {/* Markdown editor */}
                                    <label className="f-label" style={{ marginBottom: 6 }}>markdown body</label>
                                    <textarea
                                        className="f-textarea"
                                        style={{ flex: 1, minHeight: 380, fontSize: 13, lineHeight: 1.7, resize: "vertical" }}
                                        value={form.body}
                                        onChange={set("body")}
                                        spellCheck={false}
                                        placeholder="# Title&#10;&#10;Write your markdown here..."
                                    />

                                    {/* Save button */}
                                    <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                                        <button onClick={handleSave} className="btn btn-green">
                                            <span style={{ color: "var(--text-faint)" }}>[enter]</span> {editSlug ? "update_post" : "publish_post"}
                                        </button>
                                        {form.slug && (
                                            <Link to={`/blog/${form.slug}`} target="_blank" className="btn btn-ghost" style={{ fontSize: 12 }}>preview live ↗</Link>
                                        )}
                                        {saved && <span style={{ fontSize: 12, color: "var(--green)" }}>✓ Saved to browser!</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: live preview */}
                        <div className="tw" style={{ display: "flex", flexDirection: "column" }}>
                            <div className="tw-bar">
                                <span className="tw-dot dot-r" /><span className="tw-dot dot-y" /><span className="tw-dot dot-g" />
                                <span className="tw-title">live preview</span>
                                <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                                    {["write", "preview"].map(t => (
                                        <button key={t} onClick={() => setTab(t)} style={{
                                            padding: "2px 10px", border: `1px solid ${tab === t ? "rgba(61,255,122,0.3)" : "var(--border)"}`,
                                            borderRadius: 3, background: tab === t ? "rgba(61,255,122,0.06)" : "transparent",
                                            color: tab === t ? "var(--green)" : "var(--text-faint)", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                                        }}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="tw-body" style={{ flex: 1, overflowY: "auto", maxHeight: 620 }}>
                                {/* Post meta preview */}
                                {form.title && (
                                    <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                                            {form.tags.split(",").filter(Boolean).map(t => (
                                                <span key={t} className="tag" style={{ fontSize: 10 }}>{t.trim()}</span>
                                            ))}
                                        </div>
                                        <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: 8 }}>{form.title}</h1>
                                        <p style={{ fontSize: 11, color: "var(--text-faint)" }}>
                                            <span style={{ color: "var(--green)" }}>$</span> {new Date().toISOString().split("T")[0]}
                                        </p>
                                    </div>
                                )}
                                <div className="md" style={{ fontSize: 13 }}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: renderCode }}>
                                        {form.body}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* ── POSTS PANEL ── */}
                {panel === "posts" && (
                    <div className="tw">
                        <div className="tw-bar">
                            <span className="tw-dot dot-r" /><span className="tw-dot dot-y" /><span className="tw-dot dot-g" />
                            <span className="tw-title">portfolio_posts @ localStorage</span>
                        </div>
                        <div className="tw-body">
                            {posts.length === 0 ? (
                                <p style={{ color: "var(--text-faint)", fontSize: 13 }}>
                                    No local posts yet.{" "}
                                    <button onClick={() => setPanel("editor")} style={{ background: "none", border: "none", color: "var(--green)", cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Write one →</button>
                                </p>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {posts.map(p => (
                                        <div key={p.slug} style={{ background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                                                <div style={{ fontSize: 11, color: "var(--text-faint)", display: "flex", gap: 10, flexWrap: "wrap" }}>
                                                    <span>slug: <span style={{ color: "var(--blue)" }}>{p.slug}</span></span>
                                                    <span>date: {p.date}</span>
                                                    {p.tags?.length > 0 && <span>tags: {p.tags.join(", ")}</span>}
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                                <button onClick={() => handleEdit(p.slug)} className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 12px" }}>edit</button>
                                                <Link to={`/blog/${p.slug}`} target="_blank" className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 12px", textDecoration: "none" }}>view</Link>
                                                {confirm === p.slug ? (
                                                    <>
                                                        <button onClick={() => handleDelete(p.slug)} className="btn btn-danger" style={{ fontSize: 11, padding: "4px 12px" }}>confirm delete</button>
                                                        <button onClick={() => setConfirm(null)} className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 12px" }}>cancel</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => setConfirm(p.slug)} className="btn btn-danger" style={{ fontSize: 11, padding: "4px 12px" }}>delete</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Hint */}
                <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 20, lineHeight: 1.7 }}>
                    💡 Posts are saved in your browser's <code style={{ color: "var(--amber)", fontSize: 11 }}>localStorage</code>.
                    They appear in <Link to="/blog" style={{ color: "var(--blue)" }}>~/blog</Link> immediately.
                    Posts persist in this browser only — for permanent posts, put the <code style={{ color: "var(--amber)", fontSize: 11 }}>.md</code> file in <code style={{ color: "var(--amber)", fontSize: 11 }}>/public/blog/</code>.
                </p>
            </main>
            <Footer />
        </div>
    )
}
