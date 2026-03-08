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
            <main className="wrap pt-nav" style={{ paddingBottom: 80, flex: 1 }}>
                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                    <div className="prompt" style={{ fontSize: 12, marginBottom: 10, color: "var(--text-faint)" }}>
                        <span className="p-user">shirshendur</span><span className="p-at">@</span><span className="p-host">portfolio</span><span className="p-dollar">:~$</span>
                        <span style={{ marginLeft: 6, color: "var(--text-dim)" }}>ls -la ./blog/</span>
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--green)", textShadow: "0 0 10px rgba(61,255,122,0.2)", marginBottom: 6 }}>
                        _blog
                    </h1>
                    <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
                        # {posts.length} posts · thoughts, notes & deep dives
                    </p>
                </div>

                {/* Tag filter */}
                {allTags.length > 1 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 32 }}>
                        {allTags.map(t => (
                            <button key={t} onClick={() => setFilter(t)} style={{
                                padding: "3px 12px", borderRadius: 3, fontFamily: "inherit", fontSize: 11,
                                background: filter === t ? "rgba(61,255,122,0.08)" : "transparent",
                                border: `1px solid ${filter === t ? "rgba(61,255,122,0.3)" : "var(--border)"}`,
                                color: filter === t ? "var(--green)" : "var(--text-faint)",
                                cursor: "pointer", transition: "all .15s",
                            }}>
                                {t}
                            </button>
                        ))}
                    </div>
                )}

                {/* Post list */}
                {loading ? (
                    <div style={{ color: "var(--text-faint)", fontSize: 13 }}>
                        <span className="p-dollar">$</span> Loading…<span className="cursor" />
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
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{post.date}</span>
                                        {(post.tags || []).map(t => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
                                    </div>
                                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8, lineHeight: 1.4 }}>
                                        <span style={{ color: "var(--text-faint)", marginRight: 6 }}>{'>'}</span>{post.title}
                                    </h2>
                                    <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 10 }}>{post.excerpt}</p>
                                    <span style={{ fontSize: 12, color: "var(--green)" }}>cat {post.slug}.md →</span>
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
