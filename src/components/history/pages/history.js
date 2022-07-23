import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Table } from "../components";
import { historyApi } from "src/services";
import { useRouter } from "next/router";
import { getCookieData } from "src/services/cookies";

export default function DislayHistory() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  function handleClick(event, id) {
    event.preventDefault();
    router.push("/post/" + id);
  }
  const columns = [
    {
      field: "number",
      headerName: "No.",
      width: 88,
      sortable: false,
      valueGetter: (params) => {
        return params.api.getRowIndex(params.row.id) + 1;
      },
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      width: 300,
      type: "string",
      valueGetter: (params) => {
        return params.row.post.title;
      },
    },
    {
      field: ".post.__category__.name",
      headerName: "Thể loại",
      width: 150,
      type: "string",
      valueGetter: (params) => {
        return params.row.post.__category__.name;
      },
    },
    {
      field: "author",
      headerName: "Tác giả",
      width: 150,
      valueGetter: (params) => params.row.post.__author__.name,
    },

    {
      field: "type",
      headerName: "Loại",
      width: 100,
      valueGetter: (params) => params.row.post.type,
    },
    {
      field: "lastDateRead",
      headerName: "Lần đọc cuối cùng",
      width: 180,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: "none", borderRadius: 16, boxShadow: "none" }}
          onClick={(e) => handleClick(e, params.row.post.id)}
        >
          Xem bài viết
        </Button>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const token = getCookieData("token");
      const refreshToken = getCookieData("refreshToken");
      await historyApi.getHistory(token, refreshToken)
      .then((response) => {
        setData(response.data);
        setIsLoading(false)
      }).catch((error) => {
        setIsLoading(false)
        console.log(error);
      })
    })();
  }, []);
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        sx={{ fontSize: "45px", pt: 7, pb: 3, textAlign: "center" }}
      >
        Lịch sử
      </Typography>
      <div style={{ width: "100%" }}>
        <Table data={data} isLoading={isLoading} columns={columns} />
      </div>
    </Container>
  );
}
