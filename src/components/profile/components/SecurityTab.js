import * as React from 'react';
import { Button, CardActions, CardContent, List, Modal, TextField } from '@mui/material';
import styles from "../../../styles/Profile.module.css";
import Card from '@mui/material/Card';
import PasswordIcon from '@mui/icons-material/Password';
import SecurityIcon from '@mui/icons-material/Security';
import ItemTab from './ItemTab';
import HeadersTab from './HeaderTab';
import { profileAPI } from 'src/services/profileApi';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';


export default function SecurityTab({ profile, yup }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancel = () => {
        handleClose();
    }

     const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    initialErrors: {
      oldPassword: " ",
      newPassword: " ",
      confirmNewPassword: " ",
    },
    touched: {
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    },
    validationSchema: yup,
  });
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

        if (!profile.isDefaultPassword && formik.errors.oldPassword || formik.errors.newPassword || formik.errors.confirmNewPassword) {
            return
        }
        const newPasswordRequest = !profile.isDefaultPassword ?
            {
                currentPassword: formik.values.oldPassword,
                newPassword: formik.values.newPassword,
            } :
            {
                newPassword: formik.values.newPassword,
            };

        profileAPI.updatePassword(newPasswordRequest)
            .then(res => {
                console.log(res)
                updatePasswordSuccess(res.message)
            })
            .catch(err => {
                updatePassworFailed(err.response.data.data?.toString() || err.response.data.message)
            })

        formik.values = formik.initialValues

        handleCancel();
    }


    return (
        <>
            <Card sx={{ maxWidth: '100%', border: 1, mt: 1, borderColor: 'grey.500' }}>
                <HeadersTab
                    image={<SecurityIcon
                        sx={{ fontSize: '48px' }}></SecurityIcon>}
                    title='Bảo mật'
                    subTitle='bảo mật'
                />

                <List sx={{ width: '100%' }}>
                    <ItemTab icon={<PasswordIcon />} name='Mật khẩu' value='*****'></ItemTab>

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
                            {!profile.isDefaultPassword ?
                                <TextField
                                    required
                                    label="Mật khẩu"
                                    variant="outlined"
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={formik.values.oldPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                    helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                                />
                                : <></>
                            }

                            <TextField
                                required
                                label="Mật khẩu mới"
                                variant="outlined"
                                id="newPassword"
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                            />
                            <TextField
                                required
                                label="Xác nhận mật khẩu mới"
                                variant="outlined"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={formik.values.confirmNewPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}

                            />
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