import { useEffect } from "react"

const SITE_URL = "https://shirshendur.github.io"
const DEFAULT_TITLE = "Shirshendu Ranjana Tripathi | Full-Stack Developer"
const DEFAULT_DESCRIPTION = "Terminal-style portfolio, projects, and blog of Shirshendu Ranjana Tripathi, a full-stack developer focused on AI/ML, robotics, and web engineering."
const DEFAULT_IMAGE = `${SITE_URL}/social-card.svg`

function upsertMeta(attribute, key, content) {
  const selector = `meta[${attribute}='${key}']`
  let meta = document.head.querySelector(selector)

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute(attribute, key)
    document.head.appendChild(meta)
  }

  meta.setAttribute("content", content)
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel='${rel}']`)

  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", rel)
    document.head.appendChild(link)
  }

  link.setAttribute("href", href)
}

function removeNode(selector) {
  const node = document.head.querySelector(selector)

  if (node) {
    node.remove()
  }
}

function getAbsoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString()
}

export function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = "/",
  noIndex = false,
  type = "website",
  keywords = [],
  publishedTime,
  schema,
}) {
  useEffect(() => {
    const robots = noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    const canonicalUrl = canonicalPath === null ? null : getAbsoluteUrl(canonicalPath)
    const normalizedKeywords = Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : keywords

    document.title = title

    upsertMeta("name", "description", description)
    upsertMeta("name", "robots", robots)
    upsertMeta("name", "author", "Shirshendu Ranjana Tripathi")
    upsertMeta("name", "theme-color", "#0c0c0f")
    upsertMeta("property", "og:site_name", "Shirshendu Ranjana Tripathi")
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:type", type)
    upsertMeta("property", "og:image", DEFAULT_IMAGE)
    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", DEFAULT_IMAGE)

    if (normalizedKeywords) {
      upsertMeta("name", "keywords", normalizedKeywords)
    } else {
      removeNode("meta[name='keywords']")
    }

    if (publishedTime) {
      upsertMeta("property", "article:published_time", publishedTime)
    } else {
      removeNode("meta[property='article:published_time']")
    }

    if (canonicalUrl) {
      upsertLink("canonical", canonicalUrl)
      upsertMeta("property", "og:url", canonicalUrl)
    } else {
      removeNode("link[rel='canonical']")
      removeNode("meta[property='og:url']")
    }

    const scriptId = "seo-json-ld"
    const existingScript = document.getElementById(scriptId)

    if (schema) {
      const script = existingScript || document.createElement("script")
      script.id = scriptId
      script.type = "application/ld+json"
      script.textContent = JSON.stringify(schema)

      if (!existingScript) {
        document.head.appendChild(script)
      }
    } else if (existingScript) {
      existingScript.remove()
    }
  }, [canonicalPath, description, keywords, noIndex, publishedTime, schema, title, type])

  return null
}