import React from 'react'
import MyContents from 'src/components/dashboard/pages/my-contents'
import Page from 'src/components/dashboard/main'


const contentStatus = true;
export default function DashBoard() {
  return (
    <Page CurrentComponent={MyContents} />
  )
}