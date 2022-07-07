import React from 'react'
import Page from 'src/components/dashboard/main'
import IncomeStats from 'src/components/dashboard/pages/income-stats'

export default function IncomeDashboard() {
  return (
    <Page CurrentComponent={IncomeStats}/>
  )
}