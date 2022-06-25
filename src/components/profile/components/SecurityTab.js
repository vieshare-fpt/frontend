import * as React from 'react';
import { Button, CardActions, CardContent, List, Modal, TextFieldPropsColorOverrides } from '@mui/material';
import styles from "../../../styles/Profile.module.css";
import Card from '@mui/material/Card';
import PasswordIcon from '@mui/icons-material/Password';
import SecurityIcon from '@mui/icons-material/Security';
import ItemTab from './ItemTab';
import HeadersTab from './HeaderTab';
import { profileAPI } from 'src/services/profileApi';
import { toast } from 'react-toastify';

export default function SecurityTab() {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [touched, setTouched] = React.useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    })
    const [errors, setErrors] = React.useState({
        oldPassword: ' ',
        newPassword: ' ',
        confirmNewPassword: ' ',
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCanel = () => {
        handleClose();
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTouched({
            oldPassword: false,
            newPassword: false,
            confirmNewPassword: false
        })
    }
    const updatePasswordSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const updatePassworFailed = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const handleSave = async () => {
        const newPasswordRequest = {
            currentPassword: oldPassword,
            newPassword: newPassword,
        }
        profileAPI.updatePassword(newPasswordRequest)
            .then(res => {
                console.log(res)
                updatePasswordSuccess(res.message)
            })
            .catch(err => {
                updatePassworFailed(err.response.data.data?.toString() || err.response.data.message)
            })



        handleCanel();
    }
    const validate = () => {

        if (touched.oldPassword && !oldPassword.trim()) {
            errors.oldPassword = 'Please fill out thif field';
        } else {
            errors.oldPassword = ' '
        }

        if (touched.newPassword && !newPassword.trim()) {

            errors.newPassword = 'Please fill out thif field';

        } else {
            errors.newPassword = ' ';
        }

        if (touched.confirmNewPassword && !confirmNewPassword.trim()) {

            errors.confirmNewPassword = 'Please fill out thif field';

        } else if (touched.confirmNewPassword && confirmNewPassword !== newPassword) {
            errors.confirmNewPassword = 'Confirmation new password does not match';
        } else {
            errors.confirmNewPassword = ' ';
        }


    }

    validate();
    return (
        <>
            <Card sx={{ maxWidth: '100%', border: 1, mt: 1, borderColor: 'grey.500' }}>
                <HeadersTab
                    image={<SecurityIcon
                        sx={{ fontSize: '48px' }}></SecurityIcon>}
                    title='Security'
                    subTitle='security'
                />

                <List sx={{ width: '100%' }}>
                    <ItemTab icon={<PasswordIcon />} name='Password' value='*****'></ItemTab>

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
                            label="Old password"
                            variant="outlined"
                            type="password"
                            value={oldPassword}
                            onChange={(event) => setOldPassword(event.target.value)}
                            onBlur={() => setTouched({ ...touched, oldPassword: true })}
                            helperText={errors.oldPassword}
                            error={!!errors.oldPassword.trim()}
                        />
                        <TextField
                            required
                            label="New password"
                            variant="outlined"
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            onBlur={() => setTouched({ ...touched, newPassword: true })}
                            helperText={errors.newPassword}
                            error={!!errors.newPassword.trim()}
                        />
                        <TextField
                            required
                            label="Confirm new password"
                            variant="outlined"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(event) => setConfirmNewPassword(event.target.value)}
                            onBlur={() => setTouched({ ...touched, confirmNewPassword: true })}
                            helperText={errors.confirmNewPassword}
                            error={!!errors.confirmNewPassword.trim()}

                        />
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