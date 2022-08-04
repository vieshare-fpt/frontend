import LandingPage from "src/components/landing/pages/landing";
import { categoryApi, postApi } from "src/services";
import Page from "../src/components/landing/main";
import { MainLayout, ReaderLayout } from "src/components/layouts";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Seo } from "src/components/common";
import { authorization } from "src/utils/authorization";

export default function Landing(props) {
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  let page = (
    <>
      <Seo
        data={{
          title: "VieShare | Trang chủ",
          description: "VieShare vạn tuế",
          url: "https://vieshare-stg.vi-vu.vn/",
          thumbnail:
            "https://cdnb.artstation.com/p/assets/images/images/040/129/561/large/ric-pastor-3.jpg?1627952777",
        }}
      />
      <Page CurrentComponent={LandingPage} prop={props} />
    </>
  )
  page = authorization.reader(user, page,router)
  return page;
}
Landing.getLayout = MainLayout;

export async function getServerSideProps(context) {
  const { token, refreshToken } = context.req.cookies || {token: null, refreshToken: null}
  const posts = await postApi.getPosts({
    status: "Publish",
    per_page: 12,
    page: 1,
  }, token, refreshToken);

  const categories = await categoryApi.getCategory({
    per_page: 10,
    page: 1,
  });
  return {
    props: {
      posts: posts,
      categories: categories.data,
    },
  };
}
