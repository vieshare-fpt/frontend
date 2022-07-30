import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

export function FormLogin({ formik, onError, loading }) {
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Địa chỉ Email"
        name="email"
        autoFocus
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Mật khẩu"
        type="password"
        id="password"
        autoComplete="on"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
    
      <LoadingButton
        type="submit"
        fullWidth
        loading={loading}
        variant="contained"
      >
        Đăng nhập
      </LoadingButton>
      {onError ? (
        <p style={{ color: "red", fontSize: "13px" }}>
          {" "}
          Đăng nhập thất bại: sai tên tài khoản hoặc mật khẩu
        </p>
      ) : (
        <></>
      )}
    </Box>
  );
}
