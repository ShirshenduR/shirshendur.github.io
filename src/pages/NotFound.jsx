import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export default function NotFound() {
  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div className="tw" style={{ maxWidth: 500, width: "100%" }}>
          <div className="tw-bar">
            <span className="tw-dot dot-r" /><span className="tw-dot dot-y" /><span className="tw-dot dot-g" />
            <span className="tw-title">bash — 404</span>
          </div>
          <div className="tw-body">
            <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 4 }}>
              bash: cd: <span style={{ color: "var(--red)" }}>path not found</span>: No such file or directory
            </div>
            <div style={{ fontSize: 52, fontWeight: 800, color: "var(--red)", marginBottom: 4, letterSpacing: "-0.03em", lineHeight: 1.1 }}>404</div>
            <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 28 }}>
              # The path you're looking for doesn't exist in this filesystem.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/" className="btn btn-green" style={{ fontSize: 12 }}>cd ~/home</Link>
              <Link to="/blog" className="btn btn-ghost" style={{ fontSize: 12 }}>~/blog</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}