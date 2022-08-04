import React, { useEffect } from "react";
import ContentEditor from "src/components/dashboard/pages/content-editor";
import Page from "src/components/dashboard/main";
import { postApi } from "src/services";
import { categoryApi } from "src/services";
import { clearInfoSuccess } from "src/stores/userSlice";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "src/stores/categorySlice";
import { setTab } from "src/stores/tabSlice";
import { removeCookieData } from "src/services/cookies";

export default function EditContent(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.initialPost === null) {
      dispatch(clearInfoSuccess());
      dispatch(setCurrentCategory(null));
      dispatch(setTab("information"));
      removeCookieData("token");
      removeCookieData("refreshToken");
      window.location.replace("/login");
    }
  }, [props.initialPost]);
  return <Page CurrentComponent={ContentEditor} props={props} />;
}

export async function getServerSideProps(context) {
  const { token, refreshToken } = context.req.cookies || {
    token: null,
    refreshToken: null,
  };
  const categories = await categoryApi.getCategory({
    per_page: 99,
    page: 1,
  });
  const postId = context.params?.id;
  if (!postId) return { notFound: true };
  const response = await postApi.getPostDetail(postId, token, refreshToken);
  console.log(response);
  return {
    props: {
      initialPost: response.data ? response.data : response,
      categories: categories.data,
    },
  };
}
