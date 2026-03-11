import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Seo } from "../components/Seo"

function parseFrontmatter(raw) {
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!m) return { meta: {}, body: raw }
    const meta = {}
    m[1].split("\n").forEach(line => {
        const [k, ...v] = line.split(":")
        if (!k?.trim() || !v.length) return
        const val = v.join(":").trim().replace(/^["']|["']$/g, "")
        meta[k.trim()] = val.startsWith("[") && val.endsWith("]")
            ? val.slice(1, -1).split(",").map(x => x.trim().replace(/^["']|["']$/g, ""))
            : val
    })
    return { meta, body: m[2] }
}

function getPostDescription(meta, body) {
    if (meta.description) return meta.description

    const plainText = body
        .replace(/```[\s\S]*?```/g, "")
        .replace(/[#>*_`~-]/g, "")
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim()

    return plainText.slice(0, 160)
}

export default function BlogPost() {
    const { slug } = useParams()
    const [st, setSt] = useState({ loading: true, meta: {}, body: "", error: false })

    const description = getPostDescription(st.meta, st.body)
    const postTitle = st.meta.title || slug

    useEffect(() => {
        fetch(`/blog/${slug}.md`)
            .then(r => { if (!r.ok) throw new Error(); return r.text() })
            .then(raw => {
                const { meta, body } = parseFrontmatter(raw)
                setSt({ loading: false, meta, body, error: false })
            })
            .catch(() => setSt({ loading: false, meta: {}, body: "", error: true }))
    }, [slug])

    const renderCode = ({ inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || "")
        return !inline && match ? (
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                customStyle={{ background: "#090909", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: 12, margin: "1.1em 0" }}
                {...props}
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>{children}</code>
        )
    }

    return (
        <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Seo
                title={st.loading ? "Loading Post | Shirshendu Ranjana Tripathi" : `${postTitle} | Shirshendu Ranjana Tripathi`}
                description={st.error ? "The requested blog post could not be found." : description}
                canonicalPath={st.error ? null : `/blog/${slug}`}
                noIndex={st.error}
                type="article"
                keywords={Array.isArray(st.meta.tags) ? st.meta.tags : []}
                publishedTime={st.meta.date}
                schema={st.error ? null : {
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: postTitle,
                    description,
                    datePublished: st.meta.date,
                    author: {
                        "@type": "Person",
                        name: "Shirshendu Ranjana Tripathi",
                        url: "https://shirshendur.github.io/",
                    },
                    publisher: {
                        "@type": "Person",
                        name: "Shirshendu Ranjana Tripathi",
                    },
                    url: `https://shirshendur.github.io/blog/${slug}`,
                    keywords: Array.isArray(st.meta.tags) ? st.meta.tags.join(", ") : undefined,
                }}
            />
            <Navbar />
            <main style={{ flex: 1, maxWidth: 780, margin: "0 auto", width: "100%", padding: "88px 16px 80px", boxSizing: "border-box" }}>
                {st.loading ? (
                    <p style={{ color: "var(--text-faint)", fontSize: 13 }}>
                        <span className="p-dollar">$</span> Reading {slug}.md…<span className="cursor" />
                    </p>
                ) : st.error ? (
                    <div>
                        <p style={{ color: "var(--red)", marginBottom: 12, fontSize: 13 }}>bash: {slug}.md: No such file or directory</p>
                        <Link to="/blog" className="btn btn-ghost" style={{ fontSize: 13 }}>← cd ../blog</Link>
                    </div>
                ) : (
                    <>
                        {/* Breadcrumb */}
                        <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 32 }}>
                            <Link to="/" style={{ color: "var(--text-faint)", textDecoration: "none" }}>~</Link>
                            {" / "}<Link to="/blog" style={{ color: "var(--text-faint)", textDecoration: "none" }}>blog</Link>
                            {" / "}<span style={{ color: "var(--text-dim)" }}>{slug}.md</span>
                        </div>

                        {/* Post header */}
                        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                                {Array.isArray(st.meta.tags) && st.meta.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                            <h1 style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.35, marginBottom: 12, wordBreak: "break-word" }}>
                                {st.meta.title || slug}
                            </h1>
                            <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
                                <span style={{ color: "var(--green)" }}>$</span>{" "}
                                {st.meta.date || "—"}
                                {st.meta.readTime && <span style={{ marginLeft: 16 }}>⏱ {st.meta.readTime}</span>}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="md">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: renderCode }}>
                                {st.body}
                            </ReactMarkdown>
                        </div>

                        {/* Back link */}
                        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                            <Link to="/blog" style={{ color: "var(--green)", fontSize: 13, textDecoration: "none" }}>← cd ../blog</Link>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    )
}
