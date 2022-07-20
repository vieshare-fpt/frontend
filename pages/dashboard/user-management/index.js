import React from 'react'
import UserManagement from 'src/components/dashboard/pages/user-management'
import Page from 'src/components/dashboard/main'

export default function DashBoard() {
  return <Page CurrentComponent={UserManagement}/>;
}