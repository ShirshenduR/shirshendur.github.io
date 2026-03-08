import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Portfolio from "./pages/Portfolio"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
