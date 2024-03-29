import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Container } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MainLayout } from "src/components/layouts";
import { RelatedCards } from "src/components/post/RelatedCard";
import { infoUserApi, postApi } from "src/services";
import { followApi } from "src/services/followApi";

export default function WriterProfile() {
  const [info, setInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const router = useRouter();
  const writerId = router.query.writerId;
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  let isCensor = false
  let isWriter = false

  if(user !== null) {
     isCensor = user.roles.includes("Censor");
     isWriter = user.roles.includes("Writer");
  }


  useEffect(() => {
    if (writerId) {
      (async () => {
        await infoUserApi
          .infoId(writerId)
          .then((response) => {
            setInfo(response);
            setIsLoadingInfo(false);
            console.log(response.isFollow);
            setIsFollow(response.isFollow);
          })
          .catch((error) => {
            console.log(error);
          });

        await postApi
          .getPosts({
            status: "Publish",
            order_by: "publishDate",
            author_id: writerId,
          })
          .then((response) => {
            setPosts(response.data);
            setIsLoadingPost(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }
  }, [isFollow, writerId]);

  const handleClick = (event) => {
    if (user === null) {
      router.push("/login");
      return;
    }
    if (isFollow) {
      (async () => {
        await followApi
          .unFollow(writerId)
          .then((response) => {
            console.log(response);
            setIsFollow(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    } else {
      (async () => {
        await followApi
          .follow({
            followerId: writerId,
          })
          .then((response) => {
            console.log(response);
            setIsFollow(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }
  };
  const Loading = ({ number }) => (
    <Box sx={{ display: "flex", justifyContent: "center", my: number }}>
      <CircularProgress color="success" />
    </Box>
  );
  return (
    <>
      <Toolbar />
      <Container maxWidth="md" sx={{ minHeight: "100vh" }}>
        <Stack direction="column" spacing={2}>
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
              <Avatar sx={{ height: 100, width: 100 }} src={info.avatar} />
            </Box>
            <Box sx={{ ml: 1 }}>
              <p style={{ margin: 0, fontSize: 20 }}>Tác giả</p>
              {isLoadingInfo ? (
                <Loading />
              ) : (
                <>
                  <Typography
                    variant="h4"
                    fontSize="40px"
                    fontWeight="bold"
                    sx={{ color: green[500], mb: 1 }}
                  >
                    {info.name}
                  </Typography>
                  {!(isCensor || isWriter) && (
                    <Chip
                      label={isFollow ? "Bỏ theo dõi" : "Theo dõi"}
                      size="medium"
                      variant="outlined"
                      onClick={handleClick}
                    />
                  )}
                </>
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="h2" fontSize="30px">
              TẤT CẢ BÀI VIẾT
            </Typography>
            <Divider />
            <Box>
              {isLoadingPost ? (
                <Loading number={40} />
              ) : (
                <>
                  {posts &&
                    posts.map((post) => {
                      return (
                        <div key={post.id}>
                          <RelatedCards note={post}></RelatedCards>
                        </div>
                      );
                    })}
                </>
              )}
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

WriterProfile.getLayout = MainLayout;
