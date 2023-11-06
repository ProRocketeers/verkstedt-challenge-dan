import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { getColumns } from './columnDef'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import { StarredRepoStorageType } from '../../utils/localStorage'
import { filterStarredRows } from './utils'

export type RowType = {
  id: number
  full_name: string
  description: string
  language: string
  forks: number
  stargazers_count: number
  html_url: string
  starred: StarredRepoStorageType
}

const RepoTable = ({
  rows,
  isLoading,
  starRepo,
}: {
  rows: RowType[]
  isLoading: boolean
  starRepo: (id: number) => void
}) => {
  const [starredOnly, setStarredOnly] = useState<boolean>(false)

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{ flexDirection: 'row-reverse' }}>
        <GridToolbarQuickFilter autoFocus />
        <FormControlLabel
          control={
            <Checkbox
              checked={starredOnly}
              onChange={(e) => setStarredOnly(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Show starred only"
        />
      </GridToolbarContainer>
    )
  }

  const filteredRows = filterStarredRows(rows, starredOnly)

  return (
    <DataGrid
      sx={{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
      }}
      columns={getColumns(starRepo)}
      initialState={{
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 10,
          },
        },
        sorting: {
          sortModel: [{ field: 'stargazers_count', sort: 'desc' }],
        },
      }}
      rows={filteredRows || []}
      slots={{
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      loading={isLoading}
      disableRowSelectionOnClick
    />
  )
}

export default RepoTable
