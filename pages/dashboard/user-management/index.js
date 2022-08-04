import React from 'react'
import UserManagement from 'src/components/dashboard/pages/user-management'
import Page from 'src/components/dashboard/main'
import { adminApi } from 'src/services';
import { clearInfoSuccess } from 'src/stores/userSlice';
import { setCurrentCategory } from 'src/stores/categorySlice';
import { setTab } from 'src/stores/tabSlice';
import { removeCookieData } from 'src/services/cookies';
import { useDispatch } from 'react-redux';

export default function DashBoard(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (props.userData === null) {
      dispatch(clearInfoSuccess());
      dispatch(setCurrentCategory(null));
      dispatch(setTab("information"));
      removeCookieData("token");
      removeCookieData("refreshToken");
      window.location.replace("/login");
    }
  }, [props.userData]);
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
      userData : users.data ? users.data : users,
      token: token,
      refreshToken: refreshToken,
    },
  };
} 
