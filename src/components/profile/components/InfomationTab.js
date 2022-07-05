import * as React from 'react';
import { Button, CardActions, CardContent, List, Modal, TextField, MenuItem } from '@mui/material';
import WcIcon from '@mui/icons-material/Wc';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Card from '@mui/material/Card';
import InfoIcon from '@mui/icons-material/Info';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import styles from "../../../styles/Profile.module.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ItemTab from './ItemTab';
import HeadersTab from './HeaderTab';
import { profileAPI } from 'src/services/profileApi';
import { infoUserApi } from 'src/services';
import { useDispatch } from 'react-redux';
import { setUserInfoFailed, setUserInfoSuccess } from 'src/stores/userSlice';
import { toast } from 'react-toastify';

export default function InfomationTab({ formik, profile }) {

    const genderList = [
        {
            value: 'male',
            label: 'Nam',
        },
        {
            value: 'female',
            label: 'Nữ',
        },
        {
            value: 'other',
            label: 'Khác',
        }
    ];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancel = () => {
        handleClose();
    }
    const dispatch = useDispatch();
    const handleSave = async () => {
        if (formik.errors.gender ||
            formik.errors.phone ||
            formik.errors.name ||
            formik.errors.dob
        ) {
            return
        }
        const newInfo =
        {
            "name": formik.values.name,
            "dob": formik.values.dob?.toISOString()?.split('T')[0],
            "gender": formik.values.gender,
            "phone": formik.values.phone
        }
        const update = await (await profileAPI.updateUserInfo(newInfo)).data;
        if (update)
            await infoUserApi
                .info()
                .then((response) => {
                    dispatch(setUserInfoSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(setUserInfoFailed());
                });

        toast.success("Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        handleClose();

    }
    const displayProfile = {
        gender: (genderList.filter(item => item.value === profile?.gender))[0]?.label,
        phone: profile?.phone,
        dateOfBirth: profile?.dateOfBirth,
        type: profile?.isPremium ? "Trả phí" : "Miễn phí"
    }
    return (
        <>
            <Card sx={{ width: '100%', border: 1, mt: 1, borderColor: 'grey.500' }}>
                <HeadersTab
                    image={<InfoIcon sx={{ fontSize: '48px' }}></InfoIcon>}
                    title='Thông tin của bạn'
                    subTitle='Chi tiết thông tin'
                />

                <List sx={{ width: '100%' }}>
                    <ItemTab icon={<WcIcon />} name="Giới tính" value={displayProfile.gender} divider={true}></ItemTab>
                    <ItemTab icon={<LocalPhoneIcon />} name="Số điện thoại" value={displayProfile.phone} divider={true}></ItemTab>
                    <ItemTab icon={<CelebrationIcon />} name="Ngày sinh" value={displayProfile.dateOfBirth} divider={true}></ItemTab>
                    <ItemTab icon={<BookmarksIcon />} name="Gói" value={displayProfile.type}></ItemTab>
                </List>
                <CardActions sx={{ borderTop: 1, borderColor: 'grey.500', justifyContent: "flex-end" }}  >
                    <Button onClick={handleOpen} size="small" color="primary" >
                        Chỉnh sửa
                    </Button>
                </CardActions>
            </Card >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card className={styles["modal-card"]}>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <CardContent className={styles["modal-card-content"]}>
                            <TextField
                                required
                                label="Họ và tên"
                                variant="outlined"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />

                            <TextField
                                required
                                select
                                label="Giới tính"
                                variant="outlined"
                                id="gender"
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                            >
                                {genderList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                label="Số điện thoại"
                                variant="outlined"
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                                <DatePicker
                                    required
                                    disableFuture
                                    label="Ngày sinh"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    renderInput={(params) => <TextField {...params} />}
                                    id="dob"
                                    name="dob"
                                    value={formik.values.dob}
                                    onChange={(val) => {

                                        formik.setFieldValue('dob', val);
                                    }}
                                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                                    helperText={formik.touched.dob && formik.errors.dob}

                                />

                            </LocalizationProvider>
                        </CardContent>

                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button size="small" onClick={() => handleCancel()}>Hủy</Button>
                            <Button size="small" type="submit" onClick={handleSave}>Lưu</Button>
                        </CardActions>

                    </form>
                </Card>
            </Modal>

        </>
    );
}
