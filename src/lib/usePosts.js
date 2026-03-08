// usePosts.js — fetches static blog posts from /public/blog/index.json
import { useState, useEffect } from "react"

export function usePosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/blog/index.json")
            .then(r => r.ok ? r.json() : [])
            .then(data => { setPosts(data); setLoading(false) })
            .catch(() => { setPosts([]); setLoading(false) })
    }, [])

    return { posts, loading }
}
