import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, CardHeader, Container, Grid, IconButton, Tooltip } from '@mui/material';
import InfomationTab from 'src/components/profile/components/InfomationTab';
import SecurityTab from 'src/components/profile/components/SecurityTab';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { infoUserApi } from "src/services/infoUserApi";
import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import {
    ENTER_YOUR_NAME, NAME_REQUIRED, ENTER_PHONENUMBER, MIN_LENGHT_PHONENUMBER,
    PHONENUMBER_REQUIRED, ENTER_YOUR_EMAIL_VALIDATION, ENTER_VALID_EMAIL, EMAIL_REQUIRED,
    ENTER_PASSWORD_VALIDATION, MIN_PASSWORD, PASSWORD_REQUIRED, MIN_UPPERCASE, MIN_NUMBERS,
    MIN_SYMBOLS, PASSWORD_CONFIRM_FAILED, ENTER_NEW_PASSWORD_VALIDATION, NEW_PASSWORD_REQUIRED, CONFIRM_NEW_PASSWORD_VALIDATION
} from 'src/locales/errors'
import Loader from "src/components/common/Loader";
import EditAvatar from "src/components/profile/components/EditAvatar";
import { ReaderLayout } from "src/components/layouts";


YupPassword(yup)

const infomationValidationSchema = yup.object({
    name: yup
        .string(ENTER_YOUR_NAME)
        .required(NAME_REQUIRED),
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
        .oneOf([yup.ref('newPassword'), null], PASSWORD_CONFIRM_FAILED),

});


export default function Profile() {
    const [value, setValue] = React.useState('infomation');
    const [openEditAvatar, setOpenEditAvatar] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpenEditAvatar = () => {
        setOpenEditAvatar(true);
    }
    const dispatch = useDispatch();
    const checkUser = useSelector(
        (state) => state.user
    );
    const user = useSelector(
        (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
    );
        
    useEffect(() => {
        if (!user)
            (async () => {
                await infoUserApi
                    .info()
                    .then((response) => {
                        dispatch(setUserInfoSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(setUserInfoFailed());
                    });
            })();
    });

    const formikInfomation = useFormik({
        enableReinitialize: true,
        initialErrors: {
            name: ' ',
            gender: ' ',
            phone: ' ',
            email: ' ',
            dob: ' ',
        },
        initialValues: {
            name: user?.name,
            gender: user?.gender,
            phone: user?.phone,
            email: user?.email,
            dob: new Date(user?.dateOfBirth),
        },
        touched: {
            name: false,
            gender: false,
            phone: false,
            email: false,
            dob: false,
        },
        validationSchema: infomationValidationSchema,

    });
    const formikSecurity = useFormik({
        enableReinitialize: true,
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        initialErrors: {
            oldPassword: ' ',
            newPassword: ' ',
            confirmNewPassword: ' ',
        },
        touched: {
            oldPassword: false,
            newPassword: false,
            confirmNewPassword: false,
        },
        validationSchema: securityValidationSchema,

    });

    if (!user) {
        return <Loader />
    }

    return (
        <>
            <ToastContainer />
            <Container sx={{ mt: 6 }}>
                <CardHeader
                    avatar={
                        <>
                            <Tooltip title="Nhấp 2 lần để chỉnh sửa ảnh đại diện">
                                <Avatar onDoubleClick={handleOpenEditAvatar} aria-label="recipe" sx={{ width: 100, height: 100, cursor: "pointer" }} src={user?.avatar}>

                                </Avatar>
                            </Tooltip>
                        </>
                    }
                    title={user?.name}
                    titleTypographyProps={{ variant: 'h4' }}
                    subheader={user?.email}
                    subheaderTypographyProps={{ variant: 'body1' }}
                />

                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Thông tin" value="infomation" />
                                <Tab label="Bảo mật" value="security" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ p: 0 }} value="infomation">
                            <InfomationTab formik={formikInfomation} profile={user} />
                        </TabPanel>
                        <TabPanel sx={{ p: 0 }} value="security">
                            <SecurityTab formik={formikSecurity} profile={user} />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
            <EditAvatar open={openEditAvatar} oldAvatar={user?.avatar} handleEditAvatar={(value) => { setOpenEditAvatar(value) }} />
        </>
    );
}
Profile.getLayout= ReaderLayout;
