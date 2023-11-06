import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import useGetRepos from '../getRepos'
import { rowsTestData } from '../../utils/__tests__/rows.testData'

describe('useGetRepos', () => {
  it('should fetch data', async () => {
    const { result } = renderHook(() => useGetRepos())

    await vi.waitFor(() => {
      expect(result.current.data?.data).toStrictEqual(rowsTestData.data)
    })
  })

  it('should set isLoading to true while loading', async () => {
    const { result } = renderHook(() => useGetRepos())

    expect(result.current.isLoading).toBeTruthy()
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBeFalsy()
    })
  })

  it('should set isLoading to true while loading', async () => {
    const { result } = renderHook(() => useGetRepos())

    expect(result.current.isLoading).toBeTruthy()
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBeFalsy()
    })
  })
})
