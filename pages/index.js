import { useGoogleOneTapLogin } from "@react-oauth/google";
import LandingPage from "src/components/landing/pages/landing";
import { getCookieData } from "src/services/cookies";
import { accessApi, infoUserApi, categoryApi, postApi } from "src/services";
import Page from "../src/components/landing/main";
import { setCookieData } from "src/services/cookies";
import { ReaderLayout } from "src/components/layouts";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";

export default function Landing(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );

  function getInfoUser(token, refreshToken) {
    (async () => {
      await infoUserApi
        .info(token, refreshToken)
        .then((response) => {
          dispatch(setUserInfoSuccess(response.data));
          router.push("/");
        })
        .catch(function (error) {
          dispatch(setUserInfoFailed());
        });
    })();
  }
  if (!getCookieData("token")) {
    useGoogleOneTapLogin({
      onSuccess: (response) => {
        const user = {
          credential: response.credential,
        };
        (async () => {
          await accessApi
            .loginByGoogle(user)
            .then(function (response) {
              const token = response.data.token;
              const refreshToken = response.data.refreshToken;
              setCookieData("token", token);
              setCookieData("refreshToken", refreshToken);
              getInfoUser(token, refreshToken);
            })
            .catch(function (error) {
              console.log(error.response.status); // 401
            });
        })();
      },
    });
  }
  if (user !== null) {
    if (user.roles.includes("Admin") || user.roles.includes("Writer")) {
      router.push("/dashboard");
      return null;
    } else if (response.data.roles.includes("Censor")) {
      router.push("/censor");
      return null;
    } else {
      return <Page CurrentComponent={LandingPage} prop={props} />;
    }
  }
  return <Page CurrentComponent={LandingPage} prop={props} />;
}
Landing.getLayout = ReaderLayout;

export async function getServerSideProps() {
  const posts = await postApi.getPosts({
    status: "Publish",
    per_page: 12,
    page: 1,
  });
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
