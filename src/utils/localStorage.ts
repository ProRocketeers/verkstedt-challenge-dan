import { useState } from 'react'

export type StarredRepoStorageType = { repoId: number; star: boolean }

export const getStarredRepos = (): StarredRepoStorageType[] => {
  const starredRepos = JSON.parse(localStorage.getItem('starredRepos') || '[]')

  return starredRepos
}

export const saveStarredRepos = (starredRepos: StarredRepoStorageType[]) => {
  localStorage.setItem('starredRepos', JSON.stringify(starredRepos))
}

export const useLocalStorage = () => {
  const [starredRepos, setStarredRepos] = useState<StarredRepoStorageType[]>(
    getStarredRepos(),
  )

  const starRepo = (id: number) => {
    let repos: StarredRepoStorageType[] = starredRepos
    const repoExists = starredRepos.find((repo) => repo.repoId === id)

    if (repoExists) {
      repos = repos.map((repo) =>
        repo.repoId === id ? { ...repo, star: !repo.star } : repo,
      )
    } else {
      repos = [...starredRepos, { repoId: id, star: true }]
    }
    saveStarredRepos(repos)
    setStarredRepos(repos)
  }

  return { starredRepos, starRepo }
}
