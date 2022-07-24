import Link from "next/link";
import React from "react";
import styles from "../../styles/RelatedCard.module.css";
import Typography from "@mui/material/Typography";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Box, Grid, Tooltip } from "@mui/material";
import { Stack } from "@mui/material";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

moment.locale("vi");
// const other = (
//   <div className={styles["related-card"]}>
//   <div className={styles.meta}>
//     <div
//       className={styles.photo}
//       style={{
//         backgroundImage: `url(${note.thumbnail})`,
//       }}
//     ></div>
//   </div>

//   <div className={styles.description}>
//     <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//       <Link href={note.category.id}>
//         <Typography
//           variant="h2"
//           // component="h3"
//         >
//           Thể loại | {note.category.name}
//         </Typography>
//       </Link>
//       {note.type === "Premium" ? (
//         <span
//           style={{
//             fontSize: "6px",
//             color: "#ffc107",
//             lineHeight: "1px",
//           }}
//         >
//           <WorkspacePremiumIcon
//             fontSize="medium"
//             sx={{ color: "#ffc107" }}
//           />
//         </span>
//       ) : (
//         <></>
//       )}
//     </Stack>

//     <Typography
//       variant="h3"
//       sx={{
//         fontSize: "16px",
//         fontWeight: "bold",
//       }}
//       color="initial"
//     >
//       {note.title}
//     </Typography>
//     <Stack direction="row" sx={{ mt: 1, color: "#606060" }}>
//       <Link href={`/`}>
//         <Tooltip title={`${note.author.name}`}>
//           <Typography
//             variant="a"
//             component="p"
//             sx={{ cursor: "pointer" }}
//           >
//             {note.author.name}
//           </Typography>
//         </Tooltip>
//       </Link>
//     </Stack>

//     <Stack direction="row" spacing={1} sx={{ mb: 1, color: "#606060" }}>
//       <p>{note.views} lượt xem •</p>
//       <p>{moment(note.publishDate).fromNow()}</p>
//     </Stack>

//     <Box
//       sx={{
//         backgroundColor: "#2f9f32",
//         width: "10%",
//         height: "4px",
//         borderRadius: "10px",
//         margin: "10px 0 10px 0",
//       }}
//     />
//     <div className={styles["read-more"]}>
//       <Link href={`/post/${note.id}`}>
//         <a>Đọc thêm</a>
//       </Link>
//     </div>
//   </div>
// </div>
// )
export function RelatedCards({ note }) {
  return (
    <>
      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Link href={`/post/${note.id}`}>
            <a>
              <Box sx={{ height: { xs: 250, sm: 150 } }}>
                <img
                  src={note.thumbnail}
                  width="99%"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                    border: "1px solid #E7EBF0",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </a>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Link href={`/post/${note.id}`}>
            <a>
              <Typography variant="h2" fontSize="20px">
                Thể loại | {note.category.name}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                color="initial"
              >
                {note.title}
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography
                  variant="h3"
                  sx={{
                    my: 1,
                    color: "#757575",
                    fontWeight: "300",
                    fontSize: "15px",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                  color="initial"
                >
                  {note.description}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#757575",
                  fontWeight: "200",
                  fontSize: "15px",
                }}
                color="initial"
              >
                {moment(note.lastUpdated).fromNow()}
              </Typography>
            </a>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
