import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfomationTab from "src/components/profile/components/InfomationTab";
import SecurityTab from "src/components/profile/components/SecurityTab";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { infoUserApi } from "src/services/infoUserApi";
import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import {
  ENTER_YOUR_NAME,
  NAME_REQUIRED,
  ENTER_PHONENUMBER,
  MIN_LENGHT_PHONENUMBER,
  PHONENUMBER_REQUIRED,
  ENTER_YOUR_EMAIL_VALIDATION,
  ENTER_VALID_EMAIL,
  EMAIL_REQUIRED,
  ENTER_PASSWORD_VALIDATION,
  MIN_PASSWORD,
  PASSWORD_REQUIRED,
  MIN_UPPERCASE,
  MIN_NUMBERS,
  MIN_SYMBOLS,
  PASSWORD_CONFIRM_FAILED,
  ENTER_NEW_PASSWORD_VALIDATION,
  NEW_PASSWORD_REQUIRED,
  CONFIRM_NEW_PASSWORD_VALIDATION,
} from "src/locales/errors";
import Loader from "src/components/common/Loader";
import EditAvatar from "src/components/profile/components/EditAvatar";
import { ReaderLayout } from "src/components/layouts";
import WalletTab from "src/components/profile/components/WalletTab";
import HistoryTransactionTab from "src/components/profile/components/HistoryTransactionTab";
import { useRouter } from "next/router";
import { setTab } from "src/stores/tabSlice";
import Loading from "react-loading";

YupPassword(yup);

const infomationValidationSchema = yup.object({
  name: yup.string(ENTER_YOUR_NAME).required(NAME_REQUIRED),
  phone: yup
    .string(ENTER_PHONENUMBER)
    .min(10, MIN_LENGHT_PHONENUMBER)
    .required(PHONENUMBER_REQUIRED),
  email: yup
    .string(ENTER_YOUR_EMAIL_VALIDATION)
    .email(ENTER_VALID_EMAIL)
    .required(EMAIL_REQUIRED),
});
const securityValidationSchema = yup.object({
  oldPassword: yup
    .string(ENTER_PASSWORD_VALIDATION)
    .minUppercase(1, MIN_UPPERCASE)
    .minNumbers(1, MIN_NUMBERS)
    .min(7, MIN_PASSWORD)
    .required(PASSWORD_REQUIRED),
  newPassword: yup
    .string(ENTER_NEW_PASSWORD_VALIDATION)
    .minSymbols(1, MIN_SYMBOLS)
    .minUppercase(1, MIN_UPPERCASE)
    .minNumbers(1, MIN_NUMBERS)
    .min(7, MIN_PASSWORD)
    .required(NEW_PASSWORD_REQUIRED),
  confirmNewPassword: yup
    .string(CONFIRM_NEW_PASSWORD_VALIDATION)
    .oneOf([yup.ref("newPassword"), null], PASSWORD_CONFIRM_FAILED),
});

const subPage = ["history", "information", "security", "wallet"];
export default function Profile() {
  const value = useSelector(state => state.tab.data.value)
  const checkUser = useSelector((state) => state.user);
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  const dispatch = useDispatch();
  const [openEditAvatar, setOpenEditAvatar] = React.useState(false);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    dispatch(setTab(newValue))
  };
  const handleOpenEditAvatar = () => {
    setOpenEditAvatar(true);
  };

  const isAccess = user?.roles.includes("Admin") || user?.roles.includes("Censor")
  const styleAccess = {
    display: isAccess ? "none" : "flex"
  }
 
  if (!user) {
    return <Loader />
  }

  return (
    <>
      <Container sx={{ mt: 6 }}>
        <CardHeader
          avatar={
            <>
              <Tooltip title="Nhấp 2 lần để chỉnh sửa ảnh đại diện">
                <Avatar
                  onDoubleClick={handleOpenEditAvatar}
                  aria-label="recipe"
                  sx={{ width: 100, height: 100, cursor: "pointer" }}
                  src={user?.avatar}
                ></Avatar>
              </Tooltip>
            </>
          }
          title={user?.name}
          titleTypographyProps={{ variant: "h4" }}
          subheader={user?.email}
          subheaderTypographyProps={{ variant: "body1" }}
        />

        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                color="success"
                aria-label="lab API tabs example"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "green",
                  },
                }}
              >
                <Tab label="Thông tin" value="information" />
                <Tab label="Bảo mật" value="security" />
                
                <Tab sx={styleAccess} label="Ví tiền" value="wallet" />
                <Tab sx={styleAccess} label="Lịch sử giao dịch" value="history" />
              </TabList>
            </Box>
            <TabPanel color="success" sx={{ p: 0 }} value="information">
              <InfomationTab yup={infomationValidationSchema}profile={user} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="security">
              <SecurityTab yup={securityValidationSchema} profile={user} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="wallet">
              <WalletTab profile={user} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="history">
              <HistoryTransactionTab profile={user} />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <EditAvatar
        open={openEditAvatar}
        oldAvatar={user?.avatar}
        handleEditAvatar={(value) => {
          setOpenEditAvatar(value);
        }}
      />
    </>
  );
}
Profile.getLayout = ReaderLayout;
