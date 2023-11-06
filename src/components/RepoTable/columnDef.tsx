import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridColDef } from '@mui/x-data-grid'
import {
  faArrowUpRightFromSquare,
  faStar as faStarSolid,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

export const getColumns = (starRepo: (id: number) => void): GridColDef[] => {
  return [
    {
      field: 'full_name',
      headerName: 'Repo',
      width: 250,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
      disableColumnMenu: true,
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: 'forks',
      headerName: 'Forks',
      type: 'number',
      disableColumnMenu: true,
    },
    {
      field: 'stargazers_count',
      headerName: 'Starred',
      type: 'number',
      disableColumnMenu: true,
    },
    {
      field: 'html_url',
      headerName: 'Link',
      type: 'number',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <a href={params.value} target="_blank">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      ),
    },
    {
      field: 'starred',
      headerName: 'Star',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          onClick={() => starRepo(params.value.repoId)}
          icon={params.value.star ? faStarSolid : faStarRegular}
        />
      ),
      getApplyQuickFilterFn: (value: string) => {
        return (params) => {
          if (!value.includes('starred:')) {
            return false
          }
          const stringBoolean = value.split('starred:')[1]
          return stringBoolean.toLowerCase() === params.value.star.toString()
        }
      },
    },
  ]
}
