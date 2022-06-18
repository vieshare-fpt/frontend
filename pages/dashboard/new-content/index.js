import React from 'react'
import ContentEditor from 'src/components/dashboard/pages/content-editor'
import Page from 'src/components/dashboard/main'

export default function DashBoard() {
  return (
    <Page CurrentComponent={ContentEditor} />
  )
}
