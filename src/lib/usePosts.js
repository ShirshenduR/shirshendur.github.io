// usePosts.js — merges localStorage posts with static/fallback posts
import { useState, useEffect } from "react"

const LS_KEY = "portfolio_posts"

function getLocalPosts() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEY) || "[]")
    } catch {
        return []
    }
}

export function savePost(post) {
    const posts = getLocalPosts()
    const idx = posts.findIndex(p => p.slug === post.slug)
    if (idx >= 0) posts[idx] = post
    else posts.unshift(post)
    localStorage.setItem(LS_KEY, JSON.stringify(posts))
}

export function deletePost(slug) {
    const posts = getLocalPosts().filter(p => p.slug !== slug)
    localStorage.setItem(LS_KEY, JSON.stringify(posts))
}

export function getLocalPost(slug) {
    return getLocalPosts().find(p => p.slug === slug) || null
}

// Hook: returns merged list (localStorage first, then static) 
export function usePosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const local = getLocalPosts()

        // Try to fetch the static index.json
        fetch("/blog/index.json")
            .then(r => r.ok ? r.json() : [])
            .then(staticPosts => {
                // Merge: local posts override static ones with the same slug
                const localSlugs = new Set(local.map(p => p.slug))
                const merged = [...local, ...staticPosts.filter(p => !localSlugs.has(p.slug))]
                setPosts(merged)
                setLoading(false)
            })
            .catch(() => {
                setPosts(local)
                setLoading(false)
            })
    }, [])

    return { posts, loading }
}
