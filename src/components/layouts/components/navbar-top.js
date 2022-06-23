// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "../../../styles/NavBarTop.module.css";
import Link from "next/link";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { UserPopup } from "./UserPopup";
import { Box } from "@mui/system";

const MyTextField = styled(TextField)({
  ["& fieldset"]: {
    borderRadius: 0,
  },
  "@media(minWidth: 1260px)": {},
});
const style = {
  ":hover": {
    color: "green",
  },
  cursor: "pointer",
  marginLeft:"20px"
};
export function NavScrollExample({ profile, logout }) {
  let popup = <></>;
  let display = "block";
  if (profile) {
    popup = (
      <UserPopup
        type={profile.isPremium}
        fullname={profile.name}
        avatar={profile.avatar}
        email={profile.email}
        logout={logout}
      />
    );
    console.log(profile.isPremium);
    if (profile.isPremium) {
      display = "none";
    }
  }

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="pt-0">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Brand style={{ marginTop: "8px" }}>
          <Link href="/">
            <a>
              <Image
                src="/VieShare.png"
                alt="vieShare"
                height="20px"
                width="100px"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Box className={styles.popupMobile}>{popup}</Box>

        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex me-auto">
            <MyTextField
              id="searchContent"
              size="small"
              label="Tìm kiếm"
              sx={{
                width: { lg: "50ch", md: "none", xs: "100%" },
                marginTop: {
                  xs: "8px",
                },
                backgroundColor: "",
                borderRadius: "0px",
              }}
              // value={searchValue}
              color="success"
              // onInput={(e) => setSearchValue(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              sx={{
                marginTop: {
                  xs: "8px",
                },

                borderRadius: "0px",
                boxShadow: "none",
                ":hover": { backgroundColor: "#5ad67d" },
              }}
            >
              <SearchIcon />
            </Button>
          </Form>
          <Nav
            className="  "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Box sx={{ display: `${display}`, marginTop: "3px" }}>
              <Link href="/pricing">
                <Typography component="a" sx={style}>
                  Mua premium
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: `${display}`, marginTop: "3px" }}>
              <Link href="#">
                <Typography component="a" sx={style}>
                  Trở thành tác giả
                </Typography>
              </Link>
            </Box>
          </Nav>
          <Nav>
            {!profile ? (
              <>
                <Box sx={{ marginTop: "3px" }}>
                  <Link href="/login">
                      <Typography component="a" sx={style}>
                        Đăng nhập
                      </Typography>
                  </Link>
                </Box>

                <Box sx={{ marginTop: "3px" }}>
                  <Link href="/signup">
                    <Typography component="a" sx={style}>
                      Đăng kí
                    </Typography>
                  </Link>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Box sx={{  marginRight: "5px" }} className={styles.popup}>
        {popup}
      </Box>
    </Navbar>
  );
}


style