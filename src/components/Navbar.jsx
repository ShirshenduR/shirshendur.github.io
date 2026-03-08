import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime(d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const linkStyle = (active) => ({
    display: "inline-flex", alignItems: "center",
    padding: "4px 12px", borderRadius: 4,
    fontSize: 12, letterSpacing: "0.03em",
    textDecoration: "none", cursor: "pointer",
    transition: "color .15s, background .15s",
    color: active ? "var(--green)" : "var(--text-dim)",
    background: active ? "rgba(61,255,122,0.06)" : "transparent",
  })

  const mobileLinkStyle = (active) => ({
    display: "block", padding: "13px 20px", fontSize: 14,
    textDecoration: "none", borderBottom: "1px solid var(--border)",
    color: active ? "var(--green)" : "var(--text-dim)",
    background: active ? "rgba(61,255,122,0.04)" : "transparent",
    letterSpacing: "0.03em",
  })

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 48,
        background: scrolled ? "rgba(12,12,15,0.97)" : "rgba(12,12,15,0.7)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "all .25s",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Brand */}
          <button
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: 0 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)", flexShrink: 0 }} />
            <span style={{ color: "var(--green)", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>shirshendu</span>
            <span className="nav-brand-text" style={{ color: "var(--muted)", fontSize: 12, fontFamily: "inherit" }}>@portfolio:~%</span>
          </button>

          {/* Desktop page links */}
          <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link to="/" style={linkStyle(location.pathname === "/")}>terminal</Link>
            <Link to="/portfolio" style={linkStyle(location.pathname === "/portfolio")}>portfolio</Link>
            <Link to="/blog" style={linkStyle(location.pathname === "/blog" || location.pathname.startsWith("/blog/"))}>blog</Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="hide-sm" style={{ fontSize: 11, color: "var(--text-faint)" }}>{time}</span>

            {/* Hamburger — mobile only */}
            <button
              className="show-sm"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: "none", /* overridden by .show-sm on mobile */
                background: "none", border: "1px solid var(--border)", borderRadius: 4,
                cursor: "pointer", padding: "5px 9px", color: "var(--text-dim)", fontFamily: "inherit", fontSize: 13,
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 48, left: 0, right: 0, zIndex: 999,
          background: "rgba(12,12,15,0.98)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          animation: "fadeUp .15s ease-out",
        }}>
          <Link to="/" style={mobileLinkStyle(location.pathname === "/")}>⌘ terminal</Link>
          <Link to="/portfolio" style={mobileLinkStyle(location.pathname === "/portfolio")}>◎ portfolio</Link>
          <Link to="/blog" style={mobileLinkStyle(location.pathname === "/blog" || location.pathname.startsWith("/blog/"))}>◈ blog</Link>
          <div style={{ padding: "12px 20px", fontSize: 11, color: "var(--text-faint)" }}>{time}</div>
        </div>
      )}
    </>
  )
}