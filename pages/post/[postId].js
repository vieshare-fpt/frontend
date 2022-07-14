import { useRouter } from "next/router";
import Link from 'next/link'
import React, { useState } from "react";
import { ReaderLayout } from "src/components/layouts";
import { postApi, commentApi } from "src/services";
import { FormControl, TextField, Container, CssBaseline, Button, Typography } from "@mui/material";
import { Grid, Box, Avatar } from "@mui/material";
import Rating from '@mui/material/Rating';
import { RelatedCards } from "src/components/post/RelatedCard";
import { CommentCard } from "src/components/post/CommentCard";
import { useSelector } from "react-redux";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Moment from "moment";
import { render } from "@testing-library/react";
import { useEffect } from "react";

function PostDetailPage(props) {
  const [content, setContent] = useState(null);
  const [rateValue, setRateValue] = React.useState(0);
  const [comments, setComments] = useState();
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  const router = useRouter();

  const postId = router.query.postId;
  // console.log(postId);
  useEffect(() => {
    (async () => {
      await postApi
        .getPostDetail(postId)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
    getAllComments(postId);
  }),[postId];

  const { premiumLimit, unknownError, post, related, avgRating } = props;
  if (premiumLimit) {
    return <Container maxWidth="sm"
      sx={{ paddingTop: 15, paddingBottom: 5 }}
    >
      <Typography>Oops! Đây là nội dung giới hạn chỉ dành cho người dùng Premium!</Typography>
      <Typography>Mua gói Premium <Link href="/pricing">tại đây</Link></Typography>
    </Container>
  }

  if (unknownError) {
    return <Container maxWidth="sm" sx={{ paddingTop: 15, paddingBottom: 5 }}>
      <Typography>Không thể tải bài viết này, chúng tôi đang tìm hiểu lý do...</Typography>
      <Typography>Trở về trang chủ <Link href="/">tại đây</Link></Typography>
    </Container>
  }

  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Đang tải...</div>
    );
  }
  if (!post) return null;

  // console.log('related : ', related)

  async function getAllComments(postId) {
    await commentApi.getComments(postId, {order_by: "publishDate", sort: "DESC"})
    .then((response) => {
      setComments(response.data);
    });
  }

  //Censor function
  function CensorHandleDelete() {
    if (user?.roles == "Censor") {
      return (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, left: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key="Delete"
            icon={<DeleteIcon sx={{ color: 'red' }} />}
            tooltipTitle="Xóa bài viết này"
            onClick={() => {
              const postId = post.data.id;
              if (confirm("Bài viết: " + post.data.title + "\n" + "Bạn có chắc chắn muốn xóa bài viết này không?")) {
                (async () => {
                  await postApi.removePost(postId);
                })();
                setTimeout(() => {
                  location.href = (`/`);
                }, 500);
              }
            }}
          />
        </SpeedDial>
      );
    }
  }

  //Voting function
  async function postRatingApi(id, rating) {
    await postApi.postRatingScore({
      postId: id,
      point: rating,
    });
  }

  
  async function getRateScoreApi(id) {
    if(user){
      await postApi.getRating(id).then((response) => {
        // console.log(response);
        setRateValue(response.point);
      })
    }
  }

  const PostRate = () => {
    // if(post.data.postType == 'Premium') {

    return (
      <Box>
        <h3 style={{ margin: 0, }}>Đánh giá bài viết</h3 >
        <hr />
        <Box
          sx={{
            display: 'flex',
            marginBottom: 1,
          }}
        >
          <Rating
            name="simple-controlled"
            value={rateValue}
            onChange={(event, newValue) => {
              console.log(newValue);
              if (newValue != null) {
                setRateValue(newValue);
                const id = post.data.id;
                postRatingApi(id, newValue);
              }

            }}
          />
          <div style={{ marginLeft: 10 }}>{rateValue} sao</div>
        </Box>
      </Box>
    );
    // }
  };

  const AverageRating = () => {
    // if(post.data.postType == 'Premium'){

      const postId = post.data.id;
      getRateScoreApi(postId);
      const avgRate = parseFloat(avgRating.averageVote);

      return (
        
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, fontSize:'small', color: 'gray'}}>
             Đánh giá: 
            <Rating 
              name="half-rating-read" 
              defaultValue={avgRate} 
              precision={0.5} readOnly
              size="small" />
          </div>
        
      );
    // }
  }
  return (
    <React.Fragment>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: 15, paddingBottom: 5 }}
      >
        {/* Censor handle delete post */}
        <Grid item xs={12} sm={12} md={2} key={1} >
          <CensorHandleDelete />
        </Grid>

        {/* Post detail contents */}
        <Grid item xs={12} sm={12} md={8} key={2}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ paddingLeft: 2, marginBottom: 10, textAlign: 'justify', textAlignLast: 'left' }}>
            <h1 style={{ margin: 0 }}>{post.data.title}</h1>
            <div style={{ fontSize: 'small', color: 'gray' }}>Tác giả: {post.data.author.name} <br /> Cập nhật lúc: {Moment(post.data.publishDate).format('DD/MM/YYYY - h:mm a')}</div>
            <AverageRating />
            <h4>{post.data.description}</h4>
            <div dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
          </Container>

          {/* Comments */}
          <Grid item
            sx={{
              backgroundColor: '#e4e4e4',
              margin: 'auto',
              padding: 2,
              borderRadius: 2,
            }} xs={12} sm={12} md={12} key={4}
          >
            <PostRate />
            <h3 style={{ margin: 0, }}>Bình luận</h3 >
            <hr />
            <Box sx={{ display: 'flex' }}>

              <Avatar alt={user?.name} src={user?.avatar} />
              <FormControl
                sx={{
                  marginLeft: 1,
                  // marginRight: 2, 
                  width: "100%",
                  textAlign: "center"
                }}
              >
                <TextField
                  style={{ backgroundColor: 'white' }}
                  id="commentContents"
                  // variant="filled" 
                  defaultValue = ""
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  multiline
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginTop: 1, }}
                    onClick={async () => {
                      if(!user){
                        alert("Đăng nhập trước khi bình luận");
                      }
                      else if(content == "" || content == null){
                        console.log("No comments content"); 
                      }
                      else{
                        console.log(content);
                        try{
                          await commentApi.postComments({
                            postId,
                            content,
                          })
                          getAllComments(postId);
                          setContent(null);
                        }
                        catch(err){
                            console.log(err);
                        }
                      }
                    }}
                  >Gửi</Button>
                </div>
              </FormControl>
            </Box>

            <hr />
            <Box>
              {comments?.length ?
                comments.map((element) => {
                  return (
                    <CommentCard key={element.id} data={element}></CommentCard>
                  )
                })
                : <></>
              }
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={2} key={3} sx={{padding:1.5}}>
          <h3>Bài viết liên quan</h3>
          {related.length ?
            related.map((element) => {
              return (
                <RelatedCards key={element.id} note={element}>
                </RelatedCards>
              )
            })
            : <></>
          }
        </Grid>
      </Grid>

      {/* <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 15, paddingBottom: 5, textAlign: 'justify', textAlignLast: 'left' }}>
        <h2>{post.data.title}</h2>
        <h4>{post.data.description}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
      </Container> */}
    </React.Fragment>
  )
}

export default PostDetailPage;
PostDetailPage.getLayout = ReaderLayout;

export async function getServerSideProps(context) {
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };
  try {
    const response = await postApi.getPostDetail(postId);

    const postRelated = await postApi.getPostsRelated(postId, { page: 1, per_page: 5 });
    const avgRating = await postApi.getAvgRating(postId);
    return {
      props: {
        post: response,
        related: postRelated.data,
        avgRating: avgRating,
      },
    };
  } catch (error) {
    if (error.response.data.statusCode === 'USER_NOT_PREMIUM') {
      return {
        props: {
          premiumLimit: true
        },
      }
    };
    return {
      props: {
        unknownError: true
      },
    };
  }
}
