import { AxiosResponse } from 'axios'
import { RowType } from '../components/RepoTable'
import { StarredRepoStorageType } from './localStorage'

export const getRowsWithStars = (
  starredRepos: StarredRepoStorageType[],
  repos?: AxiosResponse,
) =>
  repos?.data.items.map((repo: RowType) => ({
    ...repo,
    starred: {
      repoId: repo.id,
      star: starredRepos.find((sr) => sr.repoId === repo.id)?.star || false,
    },
  }))
