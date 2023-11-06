import { describe, expect, it } from 'vitest'
import { getRowsWithStars } from '../rows'
import { AxiosResponse } from 'axios'
import { rowsTestData, rowsWithNoStars, rowsWithStars } from './rows.testData'

describe('getRowsWithStars', () => {
  const testData = rowsTestData as unknown as AxiosResponse
  it('should put no stars when no stars data passed', () => {
    const rows = getRowsWithStars([], testData)
    expect(rows).toStrictEqual(rowsWithNoStars)
  })

  it('should put stars when data passed', () => {
    const rows = getRowsWithStars([{ repoId: 78954825, star: true }], testData)
    expect(rows).toStrictEqual(rowsWithStars)
  })

  it('should put no stars when a non-existent repo is starred ', () => {
    const rows = getRowsWithStars(
      [{ repoId: 78954825123, star: true }],
      testData,
    )
    expect(rows).toStrictEqual(rowsWithNoStars)
  })
})
