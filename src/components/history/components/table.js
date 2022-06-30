import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'

export function Table(props) {
    const {rows, columns, loading, sx} = props
    const [pageSize, setPageSize] = useState(2);

  return (
    <DataGrid 
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            checkboxSelection
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[2, 5, 10]}
        />
  )
}
