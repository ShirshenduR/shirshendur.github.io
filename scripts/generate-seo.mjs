import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const SITE_URL = "https://shirshendur.github.io"
const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, "public")
const BLOG_INDEX_PATH = path.join(PUBLIC_DIR, "blog", "index.json")
const SITEMAP_PATH = path.join(PUBLIC_DIR, "sitemap.xml")
const ROBOTS_PATH = path.join(PUBLIC_DIR, "robots.txt")
const MANIFEST_PATH = path.join(PUBLIC_DIR, "site.webmanifest")

function xmlEscape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

async function loadPosts() {
  const raw = await readFile(BLOG_INDEX_PATH, "utf8")
  return JSON.parse(raw)
}

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const routes = [
    { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
    { path: "/portfolio", changefreq: "monthly", priority: "0.9", lastmod: today },
    { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: today },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: post.date || today,
    })),
  ]

  const urls = routes
    .map(
      (route) => `  <url>\n    <loc>${xmlEscape(new URL(route.path, SITE_URL).toString())}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\nHost: shirshendur.github.io\n`
}

function buildManifest() {
  return JSON.stringify(
    {
      name: "Shirshendu Ranjana Tripathi",
      short_name: "shirshendu",
      description: "Terminal-style portfolio, projects, and blog of Shirshendu Ranjana Tripathi.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#0c0c0f",
      theme_color: "#0c0c0f",
      icons: [
        {
          src: "/favicon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
      ],
    },
    null,
    2,
  ) + "\n"
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true })

  const posts = await loadPosts()

  await Promise.all([
    writeFile(SITEMAP_PATH, buildSitemap(posts), "utf8"),
    writeFile(ROBOTS_PATH, buildRobots(), "utf8"),
    writeFile(MANIFEST_PATH, buildManifest(), "utf8"),
  ])

  console.log(`Generated SEO files for ${posts.length} blog post(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})