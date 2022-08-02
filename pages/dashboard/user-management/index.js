import React from 'react'
import UserManagement from 'src/components/dashboard/pages/user-management'
import Page from 'src/components/dashboard/main'
import { adminApi } from 'src/services';

export default function DashBoard(props) {
  return <Page CurrentComponent={UserManagement} 
               props={props}
  />;
}

export async function getServerSideProps(context) {
  const { token, refreshToken } = context.req?.cookies;
  const users = await adminApi.getUsers(token, refreshToken);
  return {
    props: {
      title: 'Quản lý người dùng',
      userData : users.data,
      token: token,
      refreshToken: refreshToken,
    },
  };
} 
