import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { usePosts } from "../lib/usePosts"

export default function Blog() {
    const { posts, loading } = usePosts()
    const [filter, setFilter] = useState("all")

    const allTags = ["all", ...new Set(posts.flatMap(p => p.tags || []))]
    const shown = filter === "all" ? posts : posts.filter(p => p.tags?.includes(filter))

    return (
        <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1, maxWidth: 780, margin: "0 auto", width: "100%", padding: "88px 16px 64px", boxSizing: "border-box" }}>

                {/* Header */}
                <div style={{ marginBottom: 36 }}>
                    {/* Terminal-style prompt — wraps gracefully on mobile */}
                    <div style={{ fontSize: 11, marginBottom: 10, color: "var(--text-faint)", display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                        <span style={{ color: "var(--green)" }}>shirshendu</span>
                        <span style={{ color: "var(--muted)" }}>@</span>
                        <span style={{ color: "var(--green-dim)" }}>portfolio</span>
                        <span style={{ color: "var(--text-dim)" }}>:~$</span>
                        <span style={{ color: "var(--text-dim)", marginLeft: 4 }}>ls -la ./blog/</span>
                    </div>
                    <h1 className="blog-title" style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: "var(--green)", textShadow: "0 0 10px rgba(61,255,122,0.2)", marginBottom: 6 }}>
                        _blog
                    </h1>
                    <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
                        # {posts.length} post{posts.length !== 1 ? "s" : ""} · thoughts, notes &amp; deep dives
                    </p>
                </div>

                {/* Tag filter — scrollable on mobile */}
                {allTags.length > 1 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
                        {allTags.map(t => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                style={{
                                    flexShrink: 0,
                                    padding: "5px 14px",
                                    borderRadius: 3,
                                    fontFamily: "inherit",
                                    fontSize: 11,
                                    minHeight: 32,           /* comfortable tap target */
                                    background: filter === t ? "rgba(61,255,122,0.08)" : "transparent",
                                    border: `1px solid ${filter === t ? "rgba(61,255,122,0.3)" : "var(--border)"}`,
                                    color: filter === t ? "var(--green)" : "var(--text-faint)",
                                    cursor: "pointer",
                                    transition: "all .15s",
                                    WebkitTapHighlightColor: "transparent",
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                )}

                {/* Post list */}
                {loading ? (
                    <div style={{ color: "var(--text-faint)", fontSize: 13 }}>
                        <span style={{ color: "var(--green)" }}>$</span> Loading…<span className="cursor" />
                    </div>
                ) : shown.length === 0 ? (
                    <div style={{ color: "var(--text-faint)", fontSize: 13 }}>
                        <span style={{ color: "var(--amber)" }}>!</span> No posts found.
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {shown.map((post, i) => (
                            <Link key={post.slug} to={`/blog/${post.slug}`} className="card-link">
                                <div className="card" style={{ animation: `fadeUp .4s ease-out ${i * 0.07}s both` }}>

                                    {/* Date + tags row */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: 11, color: "var(--text-faint)", whiteSpace: "nowrap" }}>{post.date}</span>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                            {(post.tags || []).map(t => (
                                                <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title — scales with screen */}
                                    <h2 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 600, color: "var(--text)", marginBottom: 8, lineHeight: 1.45, wordBreak: "break-word" }}>
                                        <span style={{ color: "var(--text-faint)", marginRight: 6 }}>{'>'}</span>
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 10, wordBreak: "break-word" }}>
                                        {post.excerpt}
                                    </p>

                                    {/* Read link */}
                                    <span style={{ fontSize: 12, color: "var(--green)" }}>
                                        cat {post.slug}.md →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}
