import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { Seo } from "src/components/common";
import FollowingPage from "src/components/landing/pages/following";
import LandingPage from "src/components/landing/pages/landing";
import { MainLayout } from "src/components/layouts";
import { categoryApi, postApi } from "src/services";
import { authorization } from "src/utils/authorization";
import Page from "../src/components/landing/main";

export default function Following(props) {
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  let page = (
    <>
      <Seo
        data={{
          title: "VieShare | Trang chủ",
          description: "Nền tảng chia sẻ kiến thức tiếng Việt",
          url: "https://vieshare-stg.vi-vu.vn/",
          thumbnail:
            "https://cdnb.artstation.com/p/assets/images/images/040/129/561/large/ric-pastor-3.jpg?1627952777",
        }}
      />
      <Page CurrentComponent={FollowingPage} prop={props} />
    </>
  );
  page = authorization.reader(user, page, router);
  return page;
}

Following.getLayout = MainLayout;

export async function getServerSideProps() {
  const categories = await categoryApi.getCategory({
    per_page: 10,
    page: 1,
  });
  return {
    props: {
      categories: categories.data,
    },
  };
}
