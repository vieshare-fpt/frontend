import { useGoogleOneTapLogin } from "@react-oauth/google";
import LandingPage from "src/components/landing/pages/landing";
import { accessApi, categoryApi, postApi } from "src/services";
import Page from "../src/components/landing/main";
import { setCookieData } from "src/services/cookies";

export default function Landing(props) {
  if (!getCookieData("token")) {
    useGoogleOneTapLogin({
      onSuccess: (response) => {
        const user = {
          credential: response.credential,
        };
        accessApi.googleUser(newUser, null);
        (async () => {
          await accessApi
            .loginByGoogle(user)
            .then(function (response) {
              setCookieData("token", response.data.token);
              setCookieData("refreshToken", response.data.refreshToken);
    
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error.response.status); // 401
            });
        })();
      },
    });
  }

  // return <Page CurrentComponent={{ props, history }} />;
  return <Page CurrentComponent={LandingPage} prop={props} />;
}


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
