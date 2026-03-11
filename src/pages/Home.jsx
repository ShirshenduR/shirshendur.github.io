import { Terminal } from "../components/Terminal"
import { Seo } from "../components/Seo"
import { usePosts } from "../lib/usePosts"

export default function Home() {
  const { posts } = usePosts()

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Seo
        title="Shirshendu Ranjana Tripathi | Terminal Portfolio"
        description="Explore Shirshendu Ranjana Tripathi's terminal-style portfolio featuring full-stack, AI/ML, robotics projects, and a technical blog."
        canonicalPath="/"
        keywords={[
          "Shirshendu Ranjana Tripathi",
          "Shirshendu portfolio",
          "full-stack developer portfolio",
          "AI ML developer",
          "robotics portfolio",
        ]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Shirshendu Ranjana Tripathi",
            url: "https://shirshendur.github.io/",
            description: "Terminal-style portfolio and blog of Shirshendu Ranjana Tripathi.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Shirshendu Ranjana Tripathi",
            url: "https://shirshendur.github.io/",
            sameAs: [
              "https://github.com/ShirshenduR",
              "https://linkedin.com/in/shirshendur",
            ],
            jobTitle: "Full-Stack Developer",
            alumniOf: "IIITDM Jabalpur",
            knowsAbout: ["React", "Python", "AI", "Machine Learning", "Robotics"],
          },
        ]}
      />
      <Terminal blogPosts={posts} />
    </div>
  )
}