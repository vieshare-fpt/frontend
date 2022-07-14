import LandingPage from "src/components/landing/pages/landing";
import { categoryApi, postApi } from "src/services";
import Page from "../src/components/landing/main";
import { ReaderLayout } from "src/components/layouts";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";


export default function Landing(props) {
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  if (user !== null) {
    if (user.roles.includes("Admin") || user.roles.includes("Writer")) {
      router.push("/dashboard");
      return null;
    } else if (user.roles.includes("Censor")) {
      router.push("/censor");
      return null;
    } else {
      return <Page CurrentComponent={LandingPage} prop={props} />;
    }
  }
  // return <Page CurrentComponent={{ props, history }} />;
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
