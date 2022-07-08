import React from 'react'
import Page from 'src/components/dashboard/main'
import Statistics from 'src/components/dashboard/pages/statistics'

export default function DashBoard() {
  return (
    <Page CurrentComponent={Statistics}/>
  )
}