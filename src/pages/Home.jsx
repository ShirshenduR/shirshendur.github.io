import { Seo } from "../components/Seo"
import { usePosts } from "../lib/usePosts"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import Hero3D from "../components/Hero3D"

export default function Home() {
  const { posts } = usePosts()
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Seo
        title="Shirshendu Ranjana Tripathi | Portfolio"
        description="Shirshendu's portfolio: projects, blog, and resume."
        canonicalPath="/"
      />
      <Navbar />
      <main style={{ flex: 1, padding: "110px 20px 64px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <Hero3D label={"S"} />
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--green)", marginBottom: 8 }}>Shirshendu Ranjana Tripathi</h1>
          <p style={{ color: "var(--text-dim)", marginBottom: 20 }}>Full-Stack Developer · AI/ML · Robotics</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 30 }}>
            <a href="/portfolio" className="btn btn-green">View Portfolio</a>
            <a href="/blog" className="btn btn-ghost">Read Blog</a>
            <a href="/resume.pdf" download="Shirshendu_Ranjana_Tripathi_Resume.pdf" className="btn btn-ghost">Download Resume</a>
          </div>

          <div style={{ textAlign: "left", marginTop: 12 }}>
            <h2 style={{ fontSize: 18, color: "var(--text)", marginBottom: 8 }}>Latest posts</h2>
            <div style={{ display: "grid", gap: 8 }}>
              {posts.slice(0, 3).map(p => (
                <a key={p.slug} href={`/blog/${p.slug}`} className="card-link">
                  <div className="card" style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{p.excerpt}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Read →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}