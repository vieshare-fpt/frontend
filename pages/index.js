import { useGoogleOneTapLogin } from "@react-oauth/google";
import LandingPage from "src/components/landing/pages/landing";
import { MainLayout } from "src/components/layouts";
import { getCookieData } from "src/services/cookies";
import { categoryApi, postApi } from "src/services";
import Page from "../src/components/landing/main";

export default function Landing(props) {
  if (!getCookieData("token")) {
    useGoogleOneTapLogin({
      onSuccess: (response) => {
        const newUser = {
          credential: response.credential,
        };
        accessAPI.googleUser(newUser, null);
      },
    });
  }

  // return <Page CurrentComponent={{ props, history }} />;
  return <Page CurrentComponent={LandingPage} props={props} />;
}

// Landing.getLayout = MainLayout;

export async function getStaticProps() {
  const suggestPosts = await postApi.getPostsSuggestLimit({
    per_page: 3,
    page: 1,
  });
  const trendingPosts = await postApi.getPostsTrendingLimit({
    order_by: "views",
    sort: "DESC",
    per_page: 3,
    page: 1,
  });
  const categories = await categoryApi.getCategory({
    per_page: 10,
    page:1
  })
  return {
    props: {
      suggestPosts: suggestPosts.data,
      trendingPosts: trendingPosts.data,
      categories: categories.data
    },
  };
}
