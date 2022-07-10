import { useRouter } from "next/router";
import React, { useState } from "react";
import { ReaderLayout } from "src/components/layouts";
import { postApi, commentApi } from "src/services";
import { FormControl, TextField, Container, CssBaseline, Button} from "@mui/material";
import { Grid, Box, Avatar } from "@mui/material";
import Rating from '@mui/material/Rating';
import { RelatedCards } from "src/components/post/RelatedCard";
import { CommentCard } from "src/components/post/CommentCard";
import { useSelector } from "react-redux";
import { dateFormat } from 'src/utils/FormatDateHelper';



function PostDetailPage(props) {
  const [content, setContent] = useState();
  const [value, setValue] = React.useState(0);
  // const [avgRating, setAvgRating] = React.useState();
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  
  const router = useRouter();
  const { post, related, commentData, avgRating } = props;
  
  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Đang tải...</div>
    );
  }
  if (!post) return null;

  if (post.statusCode === "USER_NOT_PREMIUM") {
    return <div style={{ marginTop: '100px' }}>card</div>;
  }
  // console.log('related : ', related)

  //Voting function

  async function postRatingApi(id, rating) {
    await postApi.postRatingScore({
      postId: id,
      point: rating,
    });
  }

  const PostRate = () => {
    // if(post.data.postType == 'Premium') {
      
      return (
        <Box>
          <h3 style={{margin: 0,}}>Đánh giá bài viết</h3 >
            <hr/>
            <Box 
            sx={{
              display: 'flex', 
              marginBottom: 1,
            }}
            >
              <Rating
                name = "simple-controlled"
                value = {value}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setValue(newValue);
                  const id = post.data.id;
                  postRatingApi(id, newValue);
                  // console.log(value);s
                }}
              />
              <div style={{marginLeft: 10}}>{value} sao</div>
            </Box>
        </Box>
      );
    // }
  };
  const AverageRating = () => {
    // if(post.data.postType == 'Premium'){
      const value = parseInt(avgRating.averageVote);
      // console.log(avgRating);
      return (
        
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, fontSize:'small', color: 'gray'}}>
             Đánh giá: 
            <Rating 
              name="half-rating-read" 
              defaultValue={value} 
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
        sx={{ paddingTop: 15, paddingBottom: 5}}
      >
        {/* Author Information */}
        <Grid item xs={12} sm={12} md={2} key={1} >
          
        </Grid>

        {/* Post detail contents */}
        <Grid item xs={12} sm={12} md={8} key={2}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ paddingLeft: 2,marginBottom: 10, textAlign: 'justify', textAlignLast: 'left' }}>
            <h1 style={{margin: 0}}>{post.data.title}</h1>
            <AverageRating/>
            <div style={{ fontSize:'small', color: 'gray'}}>Tác giả: {post.data.author.name} <br/> Cập nhật lúc: {dateFormat(post.data.publishDate)}</div>
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
            <PostRate/>
            <h3 style={{margin: 0,}}>Bình luận</h3 >
            <hr/>
            <Box sx={{ display: 'flex' }}>
              
              <Avatar alt={user?.name} src={user?.avatar}/>
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
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  multiline
                />
                <div style={{display: 'flex', justifyContent: 'flex-end',}}>
                <Button 
                    variant="contained"
                    color="success"
                    sx={{marginTop: 1,}}
                    onClick={async () => {
                      if(content != "" || content != null){
                        if(!user){
                          alert("Đăng nhập trước khi bình luận");
                        }
                        else{
                          const postId = post.data.id;
                          try{
                            await commentApi.postComments({
                              postId,
                              content,
                            })
                            window.location.reload();
                          }
                          catch(err){
                              console.log(err);
                          }
                        }
                      }
                                              
                    }}
                >Gửi</Button>
              </div>
              </FormControl>
            </Box>
            
            <hr/>
            <Box>
              {commentData.length ?
                commentData.map((element) => {
                  return (
                    <CommentCard key={element.id} data={element}></CommentCard>
                  )
                })
                : <></>
              }
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={2} key={3} sx={{padding:'0px'}}>
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
  const postId = context.params?.postId
  if (!postId) return { notFound: true };
  const response = await postApi.getPostDetail(postId);
  const postRelated = await postApi.getPostsRelated(postId, { page: 1, per_page: 5 });
  const comments = await commentApi.getComments(postId, {order_by: "publishDate", sort: "DESC"});
  const rating = await postApi.getAvgRating(postId);
  return {
    props: {
      post: response,
      related: postRelated.data,
      commentData: comments.data,
      avgRating: rating,
    },
  };
}
