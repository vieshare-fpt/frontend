import React, { useEffect, useState } from "react";
import { Table } from "../components";
import { Container } from "@mui/material";
import { getCookieData } from "src/services/cookies";
import { useRouter } from "next/router";
const columns = [
  { field: "id", headerName: "User ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "E-mail", width: 200 },
];
const userTableStyles = {
  height: "650px",
};
export default function DislayHistory() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch(() => onError());
  }, []);

  if (!getCookieData("token")) {
    return (<></>)
  } else
    return (
      <Container>
        <Table
          rows={users}
          columns={columns}
          loading={!users.length}
          sx={userTableStyles}
        />
      </Container>
    );
}
