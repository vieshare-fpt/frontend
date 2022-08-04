import React, { useEffect } from 'react'
import MyContents from 'src/components/dashboard/pages/my-contents'
import Page from 'src/components/dashboard/main'
import { postApi  } from 'src/services'
import { useDispatch } from 'react-redux';
import { clearInfoSuccess } from 'src/stores/userSlice';
import { setCurrentCategory } from 'src/stores/categorySlice';
import { setTab } from 'src/stores/tabSlice';
import { removeCookieData } from 'src/services/cookies';

export default function DraftContents(props) {
  const dispatch = useDispatch();

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
  
  return <Page CurrentComponent={MyContents} 
    props={props}
  />;

}

export async function getServerSideProps(context) {
  const { token, refreshToken } = context.req.cookies || {token: null, refreshToken: null}
  const posts = await postApi.getPosts(null, token, refreshToken);
  return {
    props: {
      title: "Bản nháp",
      type: 1,
      post: posts ? posts.data : posts,
      postStatus: ["Draft"],
    },
  };
} 
