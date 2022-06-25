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
import { getUserInfoFullFalse, getUserInfoFullSuccess } from 'src/stores/userSlice';
import { toast } from 'react-toastify';

export default function InfomationTab({ profile }) {

    const [name, setName] = React.useState(profile?.name);
    const [gender, setGender] = React.useState(profile?.gender);
    const [phoneNumber, setPhoneNumber] = React.useState(profile?.phone);
    const [datePickerValue, setDatePickerValue] = React.useState(profile?.dateOfBirth);
    console.log('date : ', datePickerValue)
    const genderList = [
        {
            value: 'male',
            label: 'male',
        },
        {
            value: 'female',
            label: 'female',
        },
        {
            value: 'other',
            label: 'other',
        }
    ];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCanel = () => {
        handleClose();

    }
    const dispatch = useDispatch();
    const handleSave = async () => {

        const newInfo =
        {
            "name": name,
            "dob": datePickerValue,
            "gender": gender,
            "phone": phoneNumber
        }

        const update = await (await profileAPI.updateUserInfo(newInfo)).data;
        if (update)
            await infoUserApi
                .info()
                .then((response) => {
                    dispatch(getUserInfoFullSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(getUserInfoFullFalse());
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


    return (
        <>
            <Card sx={{ width: '100%', border: 1, mt: 1, borderColor: 'grey.500' }}>
                <HeadersTab
                    image={<InfoIcon sx={{ fontSize: '48px' }}></InfoIcon>}
                    title='Your information'
                    subTitle='Info about you'
                />

                <List sx={{ width: '100%' }}>
                    <ItemTab icon={<WcIcon />} name="Gender" value={profile?.gender} divider={true}></ItemTab>
                    <ItemTab icon={<LocalPhoneIcon />} name="Phone number" value={profile?.phone} divider={true}></ItemTab>
                    <ItemTab icon={<CelebrationIcon />} name="Date of birth" value={profile?.dateOfBirth} divider={true}></ItemTab>
                    <ItemTab icon={<BookmarksIcon />} name="Package" value={profile?.isPremium ? "Premium" : "Free"}></ItemTab>
                </List>
                <CardActions sx={{ borderTop: 1, borderColor: 'grey.500', justifyContent: "flex-end" }}  >
                    <Button onClick={handleOpen} size="small" color="primary" >
                        Edit
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
                    <CardContent className={styles["modal-card-content"]}>
                        <TextField
                            required
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <TextField
                            required
                            select
                            label="Gender"
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                        >
                            {genderList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            label="Phone number"
                            variant="outlined"
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DatePicker
                                required
                                disableFuture
                                label="Responsive"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={datePickerValue}
                                onChange={(newValue) => {
                                    setDatePickerValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </LocalizationProvider>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" onClick={() => handleCanel()}>Cancel</Button>
                        <Button size="small" onClick={() => handleSave()}>Save</Button>
                    </CardActions>
                </Card>
            </Modal>

        </>
    );
}
