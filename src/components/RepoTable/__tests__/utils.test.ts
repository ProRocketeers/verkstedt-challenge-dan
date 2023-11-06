import { describe, it, expect } from 'vitest'
import { RowType } from '..'
import { filterStarredRows } from '../utils'

const starredRow: RowType = {
  id: 2,
  full_name: 'name',
  description: 'desc',
  language: 'lang',
  forks: 12,
  stargazers_count: 33,
  html_url: 'url',
  starred: {
    repoId: 2,
    star: true,
  },
}
const data: RowType[] = [
  {
    id: 1,
    full_name: 'name',
    description: 'desc',
    language: 'lang',
    forks: 12,
    stargazers_count: 33,
    html_url: 'url',
    starred: {
      repoId: 1,
      star: false,
    },
  },
  { ...starredRow },
]

describe('filterStarredRows', () => {
  it('should return all rows when condition false', () => {
    const filteredRows = filterStarredRows(data, false)
    expect(filteredRows).toStrictEqual(data)
  })

  it('should return only starred rows when condition true', () => {
    const filteredRows = filterStarredRows(data, true)
    expect(filteredRows).toStrictEqual([starredRow])
  })
})
