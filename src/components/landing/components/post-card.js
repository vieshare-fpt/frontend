import Link from "next/link";
import React from "react";
import styles from "../../../styles/PostCard.module.css";
import Typography from "@mui/material/Typography";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
export function PostCards({ note }) {
  return (
    <>
      <div className={styles["blog-card"]}>
        <div className={styles.meta}>
          <div
            className={styles.photo}
            style={{
              backgroundImage: "url(/loginBackground.jpg)",
            }}
          ></div>
          <ul className={styles.details}>
            <li className={styles.author}>
              <a>{note.author.name}</a>
            </li>
            <li className={styles.date}>
              {new Intl.DateTimeFormat("en-US").format(
                new Date(`${note.publishDate}`)
              )}
            </li>
            <li className={styles.views}>{note.views} lượt xem</li>
            <li></li>
          </ul>
        </div>

        <div className={styles.description}>
          {/* <h1>Learning to Code</h1>
          <h2>Opening a door to the future</h2>
          <p>
    
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
            dolorum architecto obcaecati enim dicta praesentium, quam nobis!
            Neque ad aliquam facilis numquam. Veritatis, sit.
          </p> */}
          <Stack direction='row' spacing={1} sx={{mb:1}}>
            <Link href={note.category.id}>
              <Typography
                variant="h2"
                // component="h3"
      
              >
                Thể loại | {note.category.name}
              </Typography>
            </Link>
            {note.type === "Premium" ? (
              <span
                style={{
                  fontSize: "20px",
                  color: "#ffc107",
                  lineHeight: "1px",
                }}
              >
                <WorkspacePremiumIcon
                  fontSize="medium"
                  sx={{ color: "#ffc107" }}
                />
                Premium
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

          <Box
            sx={{
              backgroundColor: "#2f9f32",
              width: "10%",
              height: "4px",
              borderRadius: "10px",
              margin: "10px 0 10px 0",
            }}
          />
          <p>{note.description}</p>
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
