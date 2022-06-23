import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainLayout } from "src/components/layouts";
import { getCookieData } from "src/services/cookies";
import { accessAPI, historyApi } from "src/services/index.js";
import {postApi} from "src/services/index.js";
import Page from "../src/components/landing/main";

const LandingPage = (props) => {
  const [history, setHistory] = useState([]);

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

  useEffect(() => {
    const token = getCookieData("token");
    let err = null;
    (async () => {
      const response = await historyApi
        .getHistory(token)
        .catch(function (error) {
          console.log(error.response.status); // 401
          if (error.response.status == 401) {
            err = error.response.data;
          }
        });
        if(!err){
          setHistory(response.data);
        }
    })();
  }, []);

  return <Page CurrentComponent={{ props, history }} />;
};

LandingPage.getLayout = MainLayout;

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
  return {
    props: {
      suggestPosts: suggestPosts.data,
      trendingPosts: trendingPosts.data,
    },
  };
}

export default LandingPage;
