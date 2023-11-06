import useGetRepos from './api/getRepos'
import { useLocalStorage } from './utils/localStorage'
import RepoTable from './components/RepoTable'
import { ErrorModal } from './components/ErrorModal'
import { getRowsWithStars } from './utils/rows'

const App = () => {
  const { data: repos, isLoading, error } = useGetRepos()
  const { starredRepos, starRepo } = useLocalStorage()

  console.log('JSON.stringify(repos) :>> ', JSON.stringify(repos))

  const rows = getRowsWithStars(starredRepos, repos)

  return (
    <>
      <RepoTable rows={rows} isLoading={isLoading} starRepo={starRepo} />
      <ErrorModal error={error} />
    </>
  )
}

export default App
