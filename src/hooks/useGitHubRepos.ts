import { useEffect, useState } from 'react'

export type Repo = { name: string; description: string | null; language: string | null; html_url: string; pushed_at: string; stargazers_count: number; fork: boolean }

/** Public repositories, most recently updated first. Fails quietly: the section simply hides. */
export function useGitHubRepos(user: string, limit = 6) {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=30`, { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((list: Repo[]) => setRepos(list.filter(r => !r.fork && r.name !== user).slice(0, limit)))
      .catch(() => setRepos([]))
    return () => ctrl.abort()
  }, [user, limit])
  return repos
}
