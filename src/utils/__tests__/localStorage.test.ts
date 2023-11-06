import { expect, it, describe, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  getStarredRepos,
  saveStarredRepos,
  useLocalStorage,
} from '../localStorage'

const data = [{ repoId: 123, star: true }]
const dataNoStar = [{ repoId: 123, star: false }]

describe('localStorage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  describe('saveStarredRepos', () => {
    it('should save starred repos to localStorage', () => {
      saveStarredRepos(data)

      expect(
        JSON.parse(localStorage.getItem('starredRepos') || '[]'),
      ).toStrictEqual(data)
    })
  })

  describe('getStarredRepos', () => {
    it('should return starred repos fron localStorage', () => {
      localStorage.setItem('starredRepos', JSON.stringify(data))

      expect(getStarredRepos()).toStrictEqual(data)
    })
    it('should return empty array when no repos in localStorage', () => {
      expect(getStarredRepos()).toStrictEqual([])
    })
  })

  describe('useLocalStorage', () => {
    it('should return starred repos', () => {
      localStorage.setItem('starredRepos', JSON.stringify(data))
      const { result } = renderHook(() => useLocalStorage())

      expect(result.current.starredRepos).toStrictEqual(data)
    })

    it('should star a repo when no repos starred', () => {
      const { result, rerender } = renderHook(() => useLocalStorage())

      expect(result.current.starredRepos).toStrictEqual([])

      result.current.starRepo(123)
      rerender()

      expect(result.current.starredRepos).toStrictEqual(data)
    })

    it('should un-star a starred repo', () => {
      localStorage.setItem('starredRepos', JSON.stringify(data))
      const { result, rerender } = renderHook(() => useLocalStorage())

      expect(result.current.starredRepos).toStrictEqual(data)

      result.current.starRepo(123)
      rerender()

      expect(result.current.starredRepos).toStrictEqual(dataNoStar)
    })

    it('should save starred repos to localStorage after changes', () => {
      const { result, rerender } = renderHook(() => useLocalStorage())

      expect(result.current.starredRepos).toStrictEqual([])

      result.current.starRepo(123)
      rerender()

      expect(result.current.starredRepos).toStrictEqual(data)

      expect(localStorage.getItem('starredRepos')).toStrictEqual(
        JSON.stringify(data),
      )
    })
  })
})
