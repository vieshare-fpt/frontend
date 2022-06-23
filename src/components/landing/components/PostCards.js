import Link from "next/link";
import React from "react";
import styles from "../../../styles/PostCard.module.css";
import Typography from "@mui/material/Typography";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
export default function PostCards({ note }) {
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
          </ul>
        </div>

        <div className={styles.description}>
          <Link href={note.category.id}>
            <Typography
              variant="h4"
              component="a"
              sx={{ cursor: "pointer" }}
              color="initial"
            >
              {note.category.name}
              {note.type === "Premium" ? (
                <span
                  style={{
                    fontSize: "12px",
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
            </Typography>
          </Link>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <div className={styles["read-more"]}>
            <Link href={`/post/${note.id}`}>
              <a>Read More</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
