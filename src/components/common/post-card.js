import Link from "next/link";
import React from "react";
import styles from "src/styles/PostCard.module.css";
import Typography from "@mui/material/Typography";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Avatar, Box, Tooltip } from "@mui/material";
import { Stack } from "@mui/material";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

moment.locale("vi");

export function PostCards({ note }) {
  return (
    <>
      <div className={styles["blog-card"]}>
        <div className={styles.meta}>
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url(${note.thumbnail})`,
            }}
          ></div>
        </div>

        <div className={styles.description}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Typography
              variant="h2"
              // component="h3"
            >
              Thể loại | {note.category.name}
            </Typography>
            {note.type === "Premium" ? (
              <span
                style={{
                  fontSize: "6px",
                  color: "#ffc107",
                  lineHeight: "1px",
                }}
              >
                <WorkspacePremiumIcon
                  fontSize="medium"
                  sx={{ color: "#ffc107" }}
                />
              </span>
            ) : (
              <></>
            )}
          </Stack>

          <Typography
            variant="h3"
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
            color="initial"
          >
            {note.title}
          </Typography>
            <Link href={`/profile-writer/${note.author.id}`}>
              <a>
                <Box sx={{ display: "flex", my: 1}}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      mr: 1
                    }}
                  >
                    <Avatar
                      sx={{ height: 40, width: 40 }}
                      src={note.author.avatar}
                    />
                  </Box>
                  <Box sx={{ justifyContent: "center" , flexDirection: "column" , display: "flex"}}>
                    <Tooltip title={`${note.author.name}`}>
                      <Typography
                        variant="a"
                        component="p"
                        sx={{ cursor: "pointer" }}
                      >
                        {note.author.name}
                      </Typography>
                    </Tooltip>
                    <Stack direction="row" spacing={1}>
                      <p>{note.views} lượt xem •</p>
                      <p>{moment(note.publishDate).fromNow()}</p>
                    </Stack>
                  </Box>
                </Box>
              </a>
            </Link>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, color: "#606060" }}
          ></Stack>

          <Box
            sx={{
              backgroundColor: "#2f9f32",
              width: "10%",
              height: "4px",
              borderRadius: "10px",
              margin: "10px 0 10px 0",
            }}
          />
          <p style={{ height: "50px" }}>{note.description}</p>
          <div className={styles["read-more"]}>
            <Link href={`/post/${note.id}`}>
              <a>Đọc thêm</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
