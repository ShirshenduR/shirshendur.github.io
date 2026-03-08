import { Terminal } from "../components/Terminal"
import { usePosts } from "../lib/usePosts"

export default function Home() {
  const { posts } = usePosts()

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Terminal blogPosts={posts} />
    </div>
  )
}