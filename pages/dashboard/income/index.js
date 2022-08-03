import React from 'react'
import Page from 'src/components/dashboard/main'
import IncomeStats from 'src/components/dashboard/pages/income-stats'

export default function IncomeDashboard(props) {
  return (
    <Page CurrentComponent={IncomeStats}/>
  )
}
