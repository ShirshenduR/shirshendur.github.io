export default function Hero3D({ label = "S" }) {
  return (
    <div className="hero-3d">
      <div className="cube-wrap" aria-hidden>
        <div className="cube-face cube-face--front">{label}</div>
        <div className="cube-face cube-face--back">{label}</div>
        <div className="cube-face cube-face--right">{label}</div>
        <div className="cube-face cube-face--left">{label}</div>
        <div className="cube-face cube-face--top">{label}</div>
        <div className="cube-face cube-face--bottom">{label}</div>
      </div>
    </div>
  )
}
