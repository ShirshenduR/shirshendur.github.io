import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid var(--border)",
            padding: "18px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            marginTop: "auto",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-faint)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)", display: "inline-block" }} />
                <Link to="/" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>shirshendur</Link>
                <span style={{ color: "var(--muted)" }}>@portfolio:~$</span>
                <span style={{ animation: "blink 1s step-end infinite", color: "var(--green)" }}>▋</span>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Link to="/" style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none" }}>terminal</Link>
                <Link to="/portfolio" style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none" }}>portfolio</Link>
                <Link to="/blog" style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none" }}>blog</Link>
                <span style={{ fontSize: 11, color: "var(--text-faint)" }}>© {new Date().getFullYear()}</span>
            </div>
        </footer>
    )
}
