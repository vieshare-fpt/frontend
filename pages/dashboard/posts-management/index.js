import React, { useEffect } from 'react'
import PostManagement from 'src/components/dashboard/pages/posts-management'
import Page from 'src/components/dashboard/main'
import { postApi } from 'src/services'
import { clearInfoSuccess } from 'src/stores/userSlice'
import { useDispatch } from 'react-redux'
import { setCurrentCategory } from 'src/stores/categorySlice'
import { setTab } from 'src/stores/tabSlice'
import { removeCookieData } from 'src/services/cookies'

export default function DashBoard(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (props.post === null) {
      dispatch(clearInfoSuccess());
      dispatch(setCurrentCategory(null));
      dispatch(setTab("information"));
      removeCookieData("token");
      removeCookieData("refreshToken");
      window.location.replace("/login");
    }
  }, [dispatch, props.post]);
  if(props.post === null) {
    return null
  }
  return <Page CurrentComponent={PostManagement} 
               props={props}
  />;
}

export async function getServerSideProps(context) {
  const { token, refreshToken } = context.req.cookies || {token: null, refreshToken: null}
  const posts = await postApi.getPosts(null, token, refreshToken);
  return {
    props: {
      title: 'Quản lý bài viết',
      post: posts ? posts.data : posts ,
      postStatus: "Publish",
    },
  };
} 
