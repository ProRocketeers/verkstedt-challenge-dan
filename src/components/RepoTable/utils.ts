import { RowType } from '.'

export const filterStarredRows = (rows: RowType[], starredOnly: boolean) =>
  starredOnly ? rows.filter((r) => r.starred.star) : rows
