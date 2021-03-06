import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { MainLayout, ReaderLayout } from "src/components/layouts";
import { postApi, commentApi } from "src/services";
import {
  FormControl,
  TextField,
  Container,
  CssBaseline,
  Button,
  Typography,
  Toolbar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
  styled,
  IconButton,
  Fab,
} from "@mui/material";
import { Grid, Box, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import { RelatedCards } from "src/components/post/RelatedCard";
import { CommentCard } from "src/components/post/CommentCard";
import { useSelector } from "react-redux";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CloseIcon from "@mui/icons-material/Close";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { green } from "@mui/material/colors";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CommentIcon from "@mui/icons-material/Comment";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Logo from "src/components/common/components/logo";
moment.locale("vi");

const MuiDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

function PostDetailPage(props) {
  const { premiumLimit, unknownError, post, related, avgRating, comments } =
    props;
  const router = useRouter();
  const postId = router.query.postId;
  const [content, setContent] = useState(null);
  const [commentsData, setCommentsData] = useState(comments);
  const [openComment, setOpenComment] = useState(false);
  const [showFAB, setShowFAB] = useState("none");
  const [scrollTop, setScrollTop] = useState("none");
  const [rateValue, setRateValue] = useState(
    parseFloat(avgRating ? avgRating.averageVote : 0.0)
  );
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );

  // useEffect(() => {
  //   if (user !== null) {
  //     (async () => {
  //       await postApi
  //         .getPostDetail(postId)
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })();
  //   }
  // }, [postId, user]);

  useEffect(() => {
    const myScrollFunc = function () {
      if (router.asPath.includes("/post/")) {
        const height = document.querySelector("#content")?.offsetHeight;
        const y = window.scrollY;
        if (y >= 200) {
          setScrollTop("block");
        } else {
          setScrollTop("none");
        }
        if (y >= 500 && y <= height + 230) {
          setShowFAB("block");
        } else {
          setShowFAB("none");
        }
      }
    };
    window.addEventListener("scroll", myScrollFunc);
  }, [router.asPath]);
  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>??ang t???i...</div>
    );
  }

  if (premiumLimit) {
    return (
      <Container maxWidth="sm" sx={{ paddingTop: 15, paddingBottom: 5 }}>
        <Typography>
          Oops! ????y l?? n???i dung gi???i h???n ch??? d??nh cho ng?????i d??ng Premium!
        </Typography>
        <Typography>
          Mua g??i Premium <Link href="/pricing">t???i ????y</Link>
        </Typography>
      </Container>
    );
  }

  if (unknownError) {
    return (
      <Container maxWidth="sm" sx={{ paddingTop: 15, paddingBottom: 5 }}>
        <Typography>
          Kh??ng th??? t???i b??i vi???t n??y, ch??ng t??i ??ang t??m hi???u l?? do...
        </Typography>
        <Typography>
          Tr??? v??? trang ch??? <Link href="/">t???i ????y</Link>
        </Typography>
      </Container>
    );
  }

  if (!post) return;
  // const avgRate = parseFloat(avgRating.averageVote);

  // console.log('related : ', related)
  //Censor function
  function CensorHandleDelete() {
    if (user?.roles == "Censor") {
      return (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, left: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key="Delete"
            icon={<DeleteIcon sx={{ color: "red" }} />}
            tooltipTitle="X??a b??i vi???t n??y"
            onClick={() => {
              const postId = post.data.id;
              if (
                confirm(
                  "B??i vi???t: " +
                    post.data.title +
                    "\n" +
                    "B???n c?? ch???c ch???n mu???n x??a b??i vi???t n??y kh??ng?"
                )
              ) {
                (async () => {
                  await postApi.removePost(postId);
                })();
                setTimeout(() => {
                  location.href = `/`;
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
  function handleOpenComment(event) {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenComment(!openComment);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <React.Fragment>
      <Toolbar />
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: 5, sm: 50, md: 100, lg: 300, xl: 500 },
          display: showFAB,
          ".MuiFab-root:hover": {
            background: green[200],
          },
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenComment}
          sx={{
            background: green[100],
            ":hover": { background: green[500] },
            boxShadow: "none",
          }}
        >
          <CommentIcon />
        </Fab>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: { xs: 5, sm: 50, md: 100 },
          display: scrollTop,
          ".MuiFab-root:hover": {
            background: green[200],
          },
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          onClick={scrollToTop}
          sx={{
            background: green[100],
            boxShadow: "none",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* Censor handle delete post */}
        <Grid item xs={12} sm={12} md={2} key={1}>
          <CensorHandleDelete />
        </Grid>
        <Grid item xs={12} sm={12} md={8} key={2}>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography variant="h4" fontSize="small" sx={{ color: "#757575" }}>
              C???p nh???t: {moment(post.data.publishDate).fromNow()}
            </Typography>
            <Typography
              variant="h4"
              fontSize="18px"
              fontWeight="bold"
              sx={{
                color: green[500],
                textTransform: "uppercase",
                mb: 2,
                mt: 3,
              }}
            >
              {post.data.category.name}
            </Typography>
            <h1 style={{ margin: 0 }}>{post.data.title}</h1>

            <h4>{post.data.description}</h4>
            <Box
              sx={{
                fontSize: "small",
                color: "#757575",
                display: "flex",
                my: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Link href={`/profile-writer/${post.data.author.id}`}>
                  <a>
                    <Avatar src={post.data.author.avatar}></Avatar>
                  </a>
                </Link>
              </Box>
              <Box sx={{ ml: 1 }}>
                <p style={{ margin: 0 }}>T??c gi???</p>
                <Typography
                  variant="h4"
                  fontSize="14px"
                  fontWeight="bold"
                  sx={{ color: green[500] }}
                >
                  {post.data.author.name}
                </Typography>
              </Box>
              <Box display={{ flexGrow: 1 }} />

              <p>????nh gi??:</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  color: "gray",
                }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={rateValue}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </Box>
              <p
                onClick={handleOpenComment}
                style={{ cursor: "pointer", marginLeft: 10 }}
              >
                B??nh lu???n
              </p>
            </Box>
          </Container>
          <Container
            maxWidth="lg"
            sx={{ justifyContent: "center", height: { xs: 360, sm: 540 } }}
          >
            <img
              src={post.data.thumbnail}
              width="100%"
              height="100%"
              style={{
                // borderRadius: "10px",
                imageRendering: "pixelated",
                backgroundColor: "rgba(0,0,0,0.5)",
                border: "1px solid #E7EBF0",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Container>

          {/* Post detail contents */}
          <Container
            maxWidth="sm"
            id="content"
            sx={{
              textAlign: "justify",
              textAlignLast: "left",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
          </Container>
          <Container maxWidth="lg">
            <Grid
              container
              sx={{
                backgroundColor: " rgb(247,245,242)",
                borderRadius: "10px",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pt: 4,
                }}
              >
                <img src="/phone.png" width={300} height="100%" />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: 4,
                  my: 5,
                }}
              >
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Logo size="50px" />
                  <Typography fontSize={20}>
                    N???n t???ng chia s??? ki???n th???c d??nh cho ng?????i Vi???t
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="md">
            <Box sx={{ mb: 20 }}>
              <Grid item xs={2} sm={3}>
                <Typography variant="h3" sx={{ my: 4 }}>
                  B??i vi???t li??n quan
                </Typography>
              </Grid>
              {related.length ? (
                related.map((element) => {
                  return (
                    <Box key={element.id}>
                      <RelatedCards note={element}></RelatedCards>
                    </Box>
                  );
                })
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    mb: 30,
                    mt: 10,
                  }}
                >
                  <SentimentVeryDissatisfiedIcon
                    sx={{ height: 200, width: 200, color: green[300] }}
                  />
                  <Typography variant="h5" sx={{ color: "#757575" }}>
                    Kh??ng t??m th???y, vui l??ng quay l???i sau!{" "}
                  </Typography>
                </Box>
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>

      <MuiDrawer
        anchor="right"
        open={openComment}
        onClose={handleOpenComment}
        disableScrollLock={true}
        sx={{ ".MuiPaper-root": { width: { xs: "100%", sm: "500px" } } }}
      >
        <Box sx={{ display: "flex", justifyContent: "right", mx: 1 }}>
          <IconButton onClick={handleOpenComment}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            mx: 1,
          }}
        >
          <Box>
            <h3 style={{ margin: 0 }}>????nh gi?? b??i vi???t</h3>
            <hr />
            <Box
              sx={{
                display: "flex",
                marginBottom: 1,
              }}
            >
              <Rating
                name="rating-controlled"
                value={rateValue}
                disabled={!user}
                onChange={(_event, newValue) => {
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

          <h3 style={{ margin: 0 }}>B??nh lu???n</h3>
          <hr />
          <Box sx={{ display: "flex" }}>
            <Avatar alt={user?.name} src={user?.avatar} />
            <FormControl
              sx={{
                marginLeft: 1,
                // marginRight: 2,
                width: "100%",
                textAlign: "center",
              }}
            >
              <TextField
                style={{ backgroundColor: "white" }}
                id="commentContents"
                disabled={!user}
                // variant="filled"
                defaultValue=""
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                multiline
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!user}
                  sx={{ marginTop: 1 }}
                  onClick={async () => {
                    if (!user) {
                      alert("????ng nh???p tr?????c khi b??nh lu???n");
                    } else if (content == "" || content == null) {
                      console.log("No comments content");
                    } else {
                      console.log(content);
                      try {
                        await commentApi.postComments({
                          postId,
                          content,
                        });
                        await commentApi
                          .getComments(postId, {
                            order_by: "publishDate",
                            sort: "DESC",
                          })
                          .then((response) => {
                            setCommentsData(response.data);
                          });
                        setContent(null);
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }}
                >
                  G???i
                </Button>
              </div>
            </FormControl>
          </Box>
          <hr />
          <Box>
            {commentsData?.length ? (
              commentsData.map((element) => {
                return (
                  <CommentCard key={element.id} data={element}></CommentCard>
                );
              })
            ) : (
              <>
                <Typography>
                  Ch??a c?? b??nh lu???n, h??y l?? ng?????i ?????u ti??n!
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </MuiDrawer>
    </React.Fragment>
  );
}

export default PostDetailPage;
PostDetailPage.getLayout = MainLayout;

export async function getServerSideProps(context) {
  const postId = context.params?.postId;
  const {token, refreshToken} = context.req?.cookies
  if (!postId) return { notFound: true };
  try {
    const response = await postApi.getPostDetail(postId, token, refreshToken);
    const postRelated = await postApi.getPostsRelated(postId, {
      page: 1,
      per_page: 5,
    });
    const avgRating = await postApi.getAvgRating(postId);
    const comments = await commentApi.getComments(postId, {
      order_by: "publishDate",
      sort: "DESC",
    });
    return {
      props: {
        post: response,
        related: postRelated.data,
        avgRating: avgRating,
        comments: comments.data,
      },
    };

  } catch (error) {
    if (error.response.data.statusCode === "USER_NOT_PREMIUM") {
      return {
        props: {
          premiumLimit: true,
        },
      };
    }
    return {
      props: {
        unknownError: true,
      },
    };
  }
}
