import { useGoogleOneTapLogin } from "@react-oauth/google";
import LandingPage from "src/components/landing/pages/landing";
import { getCookieData } from "src/services/cookies";
import { accessApi, categoryApi, postApi } from "src/services";
import Page from "../src/components/landing/main";
import { setCookieData } from "src/services/cookies";
import { ReaderLayout } from "src/components/layouts";

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
Landing.getLayout= ReaderLayout

export async function getStaticProps() {

  const posts = await postApi.getPosts({
    per_page: 12,
    page: 1,
  });

  const categories = await categoryApi.getCategory({
    per_page: 10,
    page:1
  })
  return {
    props: {
      posts: posts,
      categories: categories.data
    },
  };
}
