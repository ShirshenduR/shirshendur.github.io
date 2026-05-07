import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("site-theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    } catch (e) {
      return "dark"
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") root.setAttribute("data-theme", "light")
    else root.removeAttribute("data-theme")
    try { localStorage.setItem("site-theme", theme) } catch (e) {}
  }, [theme])

  return (
    <button
      onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      style={{
        background: "none", border: "1px solid var(--border)", padding: "6px 10px", borderRadius: 6, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
}
