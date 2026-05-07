import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Seo } from "../components/Seo"

const PROJECTS = [
    {
        name: "saathi",
        full: "Voice AI Care Platform",
        desc: "Won ElevenLabs Sponsor Track at MLH HackByte 4.0. Built an AI platform for proactive Hindi voice calls to elderly users using Twilio, ElevenLabs TTS, and Gemini LLM.",
        tech: ["Next.js 14", "Node.js", "MongoDB", "Twilio", "ElevenLabs", "Gemini LLM"],
        url: "https://github.com/ShirshenduR/saathi",
        badge: "HackByte 4.0 Winner",
        badgeColor: "var(--amber)",
    },
    {
        name: "TrueSignal",
        full: "Talent Verification Platform",
        desc: "Built OSINT-powered resume verification with multi-layer scoring and RAG-backed reporting. Achieved 92%+ precision on 200+ synthetic profiles.",
        tech: ["Python", "LLaMA-3", "Sentence-BERT", "RAG", "Streamlit", "REST APIs"],
        url: "https://github.com/ShirshenduR/TrueSignal",
        badge: null,
        badgeColor: null,
    },
    {
        name: "CureCode",
        full: "AI Document Intelligence System",
        desc: "Built insurance document analysis with OCR + RAG for 100+ page policy PDFs. National finalist at Hack The Future 2025 (Top 15/300+) with major manual review-time reduction.",
        tech: ["Python", "RAG", "OCR", "LLMs", "Vector Search"],
        url: "https://github.com/ShirshenduR/Hack-The-Future-CureCode",
        badge: "Hack The Future Finalist",
        badgeColor: "var(--amber)",
    },
    {
        name: "Streamify",
        full: "Full-Stack Music Streaming",
        desc: "Built a full-stack music platform with JWT auth, real-time search, responsive UI, and REST APIs integrated with external metadata/playback services.",
        tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
        url: "https://github.com/ShirshenduR/Streamify",
        badge: null,
        badgeColor: null,
    },
]

const SKILLS = [
    { cat: "Languages", items: ["C++", "Python", "Java", "JavaScript", "TypeScript"] },
    { cat: "CS Fundamentals", items: ["DSA", "OOP", "System Design", "REST APIs"] },
    { cat: "Web", items: ["React", "Next.js 14", "Node.js", "Express.js", "Django", "Flask"] },
    { cat: "Databases", items: ["MongoDB", "PostgreSQL", "SQL", "Vector DBs"] },
    { cat: "AI / ML", items: ["LLMs", "RAG", "NLP", "Computer Vision", "OCR", "Prompt Engineering"] },
    { cat: "Tools", items: ["Git", "Docker", "Figma", "Postman", "Linux", "Streamlit", "OSINT APIs"] },
]

const ACHIEVEMENTS = [
    { icon: "🏆", title: "MLH HackByte 4.0 Winner", sub: "ElevenLabs Sponsor Track (Saathi, team SillyCoders)" },
    { icon: "🥇", title: "7th Rank Nationwide", sub: "NIDAR Disaster Management Challenge — 350+ teams" },
    { icon: "🌟", title: "Top 50 Mentor", sub: "GirlScript Summer of Code, mentored 30+ contributors" },
    { icon: "⭐", title: "3★ Rating — CodeChef", sub: "Competitive programming" },
    { icon: "🛠️", title: "Incoming Co-coordinator", sub: "Aero Fabrication Club, IIITDM (100+ members)" },
    { icon: "📚", title: "CS50x — Harvard University", sub: "Introduction to Computer Science" },
    { icon: "☁️", title: "AWS Educate", sub: "Introduction to Generative AI" },
]

export default function Portfolio() {
    return (
        <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Seo
                title="Portfolio | Shirshendu Ranjana Tripathi"
                description="Projects, technical skills, achievements, and contact details for Shirshendu Ranjana Tripathi, a full-stack developer focused on AI/ML and robotics."
                canonicalPath="/portfolio"
                keywords={["Shirshendu projects", "AI projects", "robotics projects", "full-stack portfolio"]}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ProfilePage",
                    mainEntity: {
                        "@type": "Person",
                        name: "Shirshendu Ranjana Tripathi",
                        url: "https://shirshendur.github.io/portfolio",
                        sameAs: [
                            "https://github.com/ShirshenduR",
                            "https://linkedin.com/in/shirshendur",
                        ],
                        alumniOf: "IIITDM Jabalpur",
                        knowsAbout: ["React", "Node.js", "Python", "AI", "Robotics"],
                    },
                }}
            />
            <Navbar />
            <main style={{ flex: 1 }}>

                {/* ── Hero ──────────────────────────────────── */}
                <section className="portfolio-hero" style={{ padding: "110px 24px 80px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 700, margin: "0 auto" }}>
                        {/* Avatar placeholder */}
                        <div className="portfolio-hero-avatar" style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--green-glow)", border: "2px solid rgba(61,255,122,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>S</div>
                        <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--green)", textShadow: "0 0 16px rgba(61,255,122,0.25)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                            Shirshendu Ranjana Tripathi
                        </h1>
                        <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 6 }}>
                            Full-Stack Developer · AI/ML Builder · Systems Engineer
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 28 }}>
                            B.Tech ECE @ IIITDM Jabalpur (2024–2028)
                        </p>

                        {/* Action buttons */}
                        <div className="portfolio-actions" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                            <a href="https://github.com/ShirshenduR" target="_blank" rel="noreferrer" className="btn btn-green">
                                ⌥ GitHub
                            </a>
                            <a href="https://linkedin.com/in/shirshendur" target="_blank" rel="noreferrer" className="btn btn-ghost">
                                LinkedIn
                            </a>
                            <a href="tel:+918924942797" className="btn btn-ghost">
                                📞 +91 89249 42797
                            </a>
                            <a href="/resume.pdf" download="Shirshendu_Ranjana_Tripathi_Resume.pdf" className="btn btn-ghost">
                                ↓ Resume PDF
                            </a>
                        </div>

                        <div style={{ marginTop: 24 }}>
                            <Link to="/" style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid var(--border)", padding: "5px 14px", borderRadius: 4 }}>
                                <span style={{ color: "var(--green)" }}>❯</span> prefer the terminal? try the interactive version
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── About ──────────────────────────────────── */}
                <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 780, margin: "0 auto" }}>
                        <div className="sh"><span className="sh-cmd">cat</span><span className="sh-arg">about.txt</span><span className="sh-line" /></div>
                        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.9, maxWidth: 640 }}>
                            B.Tech ECE student at <span style={{ color: "var(--text)" }}>IIITDM Jabalpur</span> building full-stack products and AI systems that solve real problems.
                            Recent work includes winning an MLH sponsor track with Saathi, building TrueSignal for talent verification, and shipping production-grade web systems.
                            Serving as <span style={{ color: "var(--green)" }}>Incoming Co-coordinator</span> of the Aero Fabrication Club at IIITDM Jabalpur.
                        </p>
                    </div>
                </section>

                {/* ── Projects ──────────────────────────────── */}
                <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 960, margin: "0 auto" }}>
                        <div className="sh"><span className="sh-cmd">ls</span><span className="sh-flag">-la</span><span className="sh-arg">~/projects/</span><span className="sh-line" /></div>
                        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                            {PROJECTS.map(p => (
                                <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="card-link">
                                    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginBottom: 2 }}>{p.name}/</div>
                                                <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{p.full}</div>
                                            </div>
                                            {p.badge && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, border: `1px solid ${p.badgeColor}30`, color: p.badgeColor, background: `${p.badgeColor}08`, whiteSpace: "nowrap", flexShrink: 0 }}>{p.badge}</span>}
                                        </div>
                                        <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                            {p.tech.map(t => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
                                        </div>
                                        <div style={{ fontSize: 11, color: "var(--blue)" }}>View on GitHub →</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Skills ──────────────────────────────────── */}
                <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 780, margin: "0 auto" }}>
                        <div className="sh"><span className="sh-cmd">cat</span><span className="sh-arg">skills.txt</span><span className="sh-line" /></div>
                        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                            {SKILLS.map(s => (
                                <div key={s.cat} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px" }}>
                                    <div style={{ fontSize: 11, color: "var(--green)", letterSpacing: "0.06em", marginBottom: 10 }}>▸ {s.cat.toUpperCase()}</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                        {s.items.map(i => <span key={i} className="tag" style={{ fontSize: 10 }}>{i}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Achievements ──────────────────────────── */}
                <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 780, margin: "0 auto" }}>
                        <div className="sh"><span className="sh-cmd">cat</span><span className="sh-arg">achievements.txt</span><span className="sh-line" /></div>
                        <div className="achievements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                            {ACHIEVEMENTS.map(a => (
                                <div key={a.title} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                                    <span style={{ fontSize: 22, lineHeight: 1 }}>{a.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{a.title}</div>
                                        <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{a.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Contact ──────────────────────────────── */}
                <section style={{ padding: "64px 24px" }}>
                    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
                        <div className="sh" style={{ justifyContent: "center" }}><span className="sh-cmd">cat</span><span className="sh-arg">contact.txt</span></div>
                        <p style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 24 }}>Open to internships, open-source collaboration, and project partnerships.</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                            <a href="https://linkedin.com/in/shirshendur" target="_blank" rel="noreferrer" className="btn btn-green">LinkedIn</a>
                            <a href="https://github.com/ShirshenduR" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
                            <a href="tel:+918924942797" className="btn btn-ghost">📞 Call / WhatsApp</a>
                            <a href="/resume.pdf" download="Shirshendu_Ranjana_Tripathi_Resume.pdf" className="btn btn-ghost">↓ Resume</a>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}
