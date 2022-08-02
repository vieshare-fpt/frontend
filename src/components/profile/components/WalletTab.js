import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "src/components/common/Loader";
import { bankApi } from "src/services/bankApi";
import { walletApi } from "src/services/walletApi";
import { setBanks } from "src/stores/bankSlice";
import { setWallet } from "src/stores/walletSlice";
import HeadersTab from "./HeaderTab";
import ItemTab from "./ItemTab";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  amount: yup.number("Chỉ nhập số")
  .min(10000, "Số tiền tối thiểu là 10,000 đồng")
  .max(500000, "Số tiền tối đa là 500,000 đồng")
  .required("Yêu cầu nhập số tiền"),
  bank: yup.string("Chỉ nhập mã"),
});
export default function WalletTab({ profile }) {
  const isWriter = profile.roles.includes("Writer");
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [depositModal, setDepositModal] = useState(false);
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet.wallet);
  const banks = useSelector((state) => state.bank.banks);
  const formik = useFormik({
    initialValues: {
      amount: 10000,
      bank: "54f87bc0-5224-47e4-8859-8e051730f95f",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        type: values.type,
        amount: parseFloat(values.amount),
        bankId: values.bank,
      };
      console.log(payload);
      switch (values.type) {
        case "WITHDRAW":
          handleWithdraw(payload);
          break;
        case "DEPOSIT":
          handleDeposit(payload);
          break;
        default:
          break;
      }
    },
  });
  useEffect(() => {
    if (banks.length == 0) {
      (async () => {
        console.log("check");
        await bankApi.getListBank().then((response) => {
          // console.log("58", response)
          dispatch(setBanks(response.data));
        });
      })();
    }
    if (!wallet) {
      (async () => {
        await walletApi
          .getWallet()
          .then((response) => {
            dispatch(setWallet(response.data));
            console.log("Response", response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      })();
    }
  }, [banks.length, dispatch, wallet]);

  if (!wallet) {
    return <Loader />;
  }
  const balance = wallet.balance;

  const handleCloseWithdrawForm = (event) => {
    setWithdrawModal(false);
  };
  const handleOpenWithdrawForm = (event) => {
    setWithdrawModal(true);
  };

  const handleCloseDepositForm = () => {
    setDepositModal(false);
  };

  const handleOpenDepositForm = () => {
    setDepositModal(true);
  };

  //withdrawAction
  const handleWithdraw = async (payload) => {
    console.log(payload);
    await walletApi
      .updateWallet(payload)
      .then(() => {
        console.log("106", payload);
        toast.success("Giao dịch thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Giao dịch thất bại vui lòng kiểm tra lại số dư", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setWithdrawModal(false);
      });

    const wallet = await walletApi.getWallet();
    dispatch(setWallet(wallet.balance));
    setWithdrawModal(false);
  };

  //depositAction
  const handleDeposit = async (payload) => {
    await walletApi
      .updateWallet(payload)
      .then(() => {
        console.log("144", payload);
        toast.success("Giao dịch thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Giao dịch thất bại", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDepositModal(false);
      });

    const wallet = await walletApi.getWallet();
    dispatch(setWallet(wallet.balance));
    setDepositModal(false);
  };

  return (
    <React.Fragment>
      <Card sx={{ width: "100%", border: 1, mt: 1, borderColor: "grey.500" }}>
        <HeadersTab title="Ví của bạn" subTitle="Chi tiết ví" />
        <List>
          <ItemTab name="Số dư khả dụng" value={balance}></ItemTab>
        </List>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleOpenWithdrawForm}
          sx={{ mx: 2 }}
        >
          Rút tiền
          <AttachMoneyOutlinedIcon />
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpenDepositForm}
          sx={{ display: isWriter && "none" }}
        >
          Nạp Tiền
          <AttachMoneyOutlinedIcon />
        </Button>
      </Box>
      <div>
        {withdrawModal ? (
          <div>
            <Dialog open={withdrawModal} onClose={handleCloseWithdrawForm}>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e.target.value);
                }}
              >
                <DialogTitle>Rút tiền</DialogTitle>

                <DialogContent>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    justifyContent="space-evenly"
                    alignItems="left"
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      id="amount"
                      name="amount"
                      label="Số tiền cần rút:"
                      required
                      fullWidth
                      sx={{ maxWidth: "100%" }}
                      // helperText="VNĐ"
                      // value={amountWithdraw}
                      // onChange={handleChangeAmountWithdraw}
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                      }
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Grid>

                  <Box sx={{ minWidth: 350, mt: 2 }}>
                    <InputLabel id="bank">Ngân hàng</InputLabel>
                    <Select
                      labelId="bankLabel"
                      id="bank"
                      name="bank"
                      label="Bank"
                      // value={bank}
                      // onChange={handleChangeBank}

                      value={formik.values.bank}
                      onChange={formik.handleChange}
                      error={formik.touched.bank && Boolean(formik.errors.bank)}
                      fullWidth
                    >
                      {banks.map((bank) => {
                        return (
                          <MenuItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button color="success" onClick={handleCloseWithdrawForm}>
                    Huỷ bỏ
                  </Button>
                  <Button
                    color="success"
                    onClick={() => formik.setFieldValue("type", "WITHDRAW")}
                    type="submit"
                  >
                    Rút tiền
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </div>
        ) : null}
      </div>
      <div>
        {depositModal ? (
          <div>
            <Dialog open={depositModal} onClose={handleCloseDepositForm}>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <DialogTitle>Nạp tiền</DialogTitle>
                <DialogContent>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    justifyContent="space-evenly"
                    alignItems="left"
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      id="amount"
                      name="amount"
                      label="Số tiền cần nạp: "
                      required
                      fullWidth
                      sx={{ maxWidth: "100%" }}
                      // helperText="VNĐ"
                      // value={amountDeposit}
                      // onChange={handleChangeAmountDeposit}
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                      }
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Grid>

                  <Box sx={{ minWidth: 350, mt: 2 }}>
                    <InputLabel id="bankLabel">Ngân hàng</InputLabel>
                    <Select
                      labelId="bankLabel"
                      id="bankLabel"
                      name="bank"
                      label="Bank"
                      // value={bank}
                      // onChange={handleChangeBank}
                      fullWidth
                      value={formik.values.bank}
                      onChange={formik.handleChange}
                      error={formik.touched.bank && Boolean(formik.errors.bank)}
                      // helperText={formik.touched.bank && formik.errors.bank}
                    >
                      {banks.map((bank) => {
                        return (
                          <MenuItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDepositForm}>Huỷ bỏ</Button>
                  <Button
                    type="submit"
                    onClick={() => formik.setFieldValue("type", "DEPOSIT")}
                  >
                    Nạp tiền
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}
