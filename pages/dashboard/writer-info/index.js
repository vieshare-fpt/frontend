
import React from 'react'
import Page from 'src/components/dashboard/main'
import Profile from 'pages/profile'

export default function WriterInfo(props) {
  return (
    <Page CurrentComponent={Profile} props={props} />
  )
}
