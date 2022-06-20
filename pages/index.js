import { MainLayout } from 'src/components/layouts';
import postApi from 'src/services/postsApi';
import Page from '../src/components/landing/main'

const LandingPage = (props) => {
  return (
    <Page CurrentComponent={props} />

  )
}

LandingPage.getLayout = MainLayout

export async function getStaticProps() {
  const suggestPosts = await postApi.getPostsSuggestLimit({
    per_page: 3,
    page: 1
  });
  const trendingPosts = await postApi.getPostsTrendingLimit({
    order_by: 'views',
    sort: 'DESC',
    per_page: 3,
    page: 1
  });
  return {
    props: {
      suggestPosts: suggestPosts.data,
      trendingPosts: trendingPosts.data
    }
  }
}

export default LandingPage