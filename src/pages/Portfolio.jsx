import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

const PROJECTS = [
    {
        name: "CureCode",
        full: "AI Document Intelligence System",
        desc: "Built AI system to analyze policy documents using OCR pipelines and structured data extraction. Implemented RAG for semantic document querying.",
        tech: ["Python", "RAG", "OCR", "LLM APIs"],
        url: "https://github.com/ShirshenduR/Hack-The-Future-CureCode",
        badge: "Hack The Future Finalist",
        badgeColor: "var(--amber)",
    },
    {
        name: "AI Resume Maker",
        full: "ATS Resume Generator",
        desc: "Full-stack AI platform that generates ATS-optimized resumes from project descriptions. Implemented auth, template rendering, and automated pipeline.",
        tech: ["React", "Node.js", "AI APIs", "Auth"],
        url: "https://github.com/ShirshenduR/AI-RESUME-MAKER",
        badge: null,
        badgeColor: null,
    },
    {
        name: "Human Following Robot",
        full: "Autonomous Vision Robot",
        desc: "Built autonomous robot using MobileNet human detection model (Caffe). Integrated real-time vision inference with ESP8266 embedded robotic control.",
        tech: ["Python", "MobileNet", "ESP8266", "ROS2"],
        url: "https://github.com/ShirshenduR/Human-Following-Bot",
        badge: "7th Rank — NIDAR",
        badgeColor: "#3dff7a",
    },
    {
        name: "Streamify",
        full: "Full-Stack Music Streaming",
        desc: "Responsive music streaming web app with authentication, dynamic UI, backend APIs, and external music API integration for search and streaming.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        url: "https://github.com/ShirshenduR/Streamify",
        badge: null,
        badgeColor: null,
    },
]

const SKILLS = [
    { cat: "Languages", items: ["C++", "Python", "Java", "JavaScript", "TypeScript"] },
    { cat: "Web", items: ["React", "Next.js", "Node.js", "Express.js", "Django", "Flask"] },
    { cat: "Databases", items: ["MongoDB", "PostgreSQL", "SQL"] },
    { cat: "AI / ML", items: ["Computer Vision", "MobileNet", "OCR", "RAG"] },
    { cat: "Embedded", items: ["ESP8266", "ESP32", "ROS2", "IoT"] },
    { cat: "Tools", items: ["Git", "Docker", "Figma", "Postman", "VS Code"] },
]

const ACHIEVEMENTS = [
    { icon: "🥇", title: "7th Rank Nationwide", sub: "NIDAR Disaster Management Challenge — 350+ teams" },
    { icon: "🏆", title: "Hack The Future 2025 Finalist", sub: "IIT Gandhinagar national hackathon" },
    { icon: "🌟", title: "Top 50 Mentor", sub: "GirlScript Summer of Code" },
    { icon: "⭐", title: "3★ Rating — CodeChef", sub: "Competitive programming" },
    { icon: "📚", title: "CS50x — Harvard University", sub: "Introduction to Computer Science" },
    { icon: "☁️", title: "AWS Educate", sub: "Introduction to Generative AI" },
]

export default function Portfolio() {
    return (
        <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>

                {/* ── Hero ──────────────────────────────────── */}
                <section style={{ padding: "110px 24px 80px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 700, margin: "0 auto" }}>
                        {/* Avatar placeholder */}
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--green-glow)", border: "2px solid rgba(61,255,122,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>S</div>
                        <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--green)", textShadow: "0 0 16px rgba(61,255,122,0.25)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                            Shirshendu Ranjana Tripathi
                        </h1>
                        <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 6 }}>
                            Full-Stack Developer · AI/ML Enthusiast · Robotics Builder
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 28 }}>
                            B.Tech ECE @ IIITDM Jabalpur (2024–2028)
                        </p>

                        {/* Action buttons */}
                        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
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
                            I'm a first-year B.Tech ECE student at <span style={{ color: "var(--text)" }}>IIITDM Jabalpur</span> who loves building things — from full-stack web apps and AI pipelines to autonomous robots.
                            I've competed nationally (7th rank in NIDAR), mentored in open source (GirlScript), and consistently ship projects across the entire stack.
                            Currently serving as <span style={{ color: "var(--green)" }}>Upcoming Coordinator</span> of the Aero Fabrication Club at IIITDM Jabalpur.
                        </p>
                    </div>
                </section>

                {/* ── Projects ──────────────────────────────── */}
                <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ maxWidth: 960, margin: "0 auto" }}>
                        <div className="sh"><span className="sh-cmd">ls</span><span className="sh-flag">-la</span><span className="sh-arg">~/projects/</span><span className="sh-line" /></div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
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
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
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
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
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
