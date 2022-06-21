import {
  Card,
  CardActions,
  CardContent,
  Link,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";
import { styled, Grid } from "@mui/material";
import styleds from "styled-components";
import { style } from "@mui/system";

const MyText = styled("p")({
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const MyTextTitle = styled("h2")({
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  margin: "0 0",
});



export default function PostCards({ note }) {
  return (
    <Card
      elevation={1}
      sx={{
        cursor: "pointer",
        borderRadius: "16px",
        height: 220,
        transition: "0.2s linear" /* vendorless fallback */,
        backgroundImage: "url(/loginBackground.jpg)",
        ":hover": {
          transform: "scale(1.10)",
          boxShadow: 20,
        },
      }}
    >
      
        <Grid container spacing={0} sx={{ padding: 2 }}>
          <Grid container>
            <Grid item xs={10}>
              <img
                src={
                  note.type === "Premium" ? "/premiumPost.svg" : "/freePost.svg"
                }
              />
            </Grid>
            <Grid item xs={2}>
              <Typography>
                {note.authorName ? note.authorName : "undefined"}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <MyTextTitle>{note.title}</MyTextTitle>
          </Grid>
          <Grid item xs={12}>
            <MyText>{note.description}</MyText>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <br />
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={5} >
              <Typography sx = {{fontWeight: "bold" }}>
                {note.publishDate
                  ? "Publish date: " +
                    new Intl.DateTimeFormat("en-US").format(
                      new Date(note.lastUpdated)
                    )
                  : "unknown"}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx = {{fontWeight: "bold" }}>
                {!note.lastUpdated.empty
                  ? "Last update: " +
                    new Intl.DateTimeFormat("en-US").format(
                      new Date(note.lastUpdated)
                    )
                  : "unknown"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                align="left"
                sx={{ lineHeight: "1.4", paddingLeft: "0px", fontWeight: "bold" }}
              >
                {note.views + " lượt xem"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
    </Card>
  );
}
