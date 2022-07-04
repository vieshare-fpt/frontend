import { Avatar, ButtonGroup, Input, Modal, Stack } from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import styles from "../../../styles/Profile.module.css";
import { styled } from '@mui/material/styles';
import { profileAPI } from "src/services/profileApi";
import { infoUserApi } from "src/services";
import { useDispatch } from "react-redux";
import { getUserInfoFullFalse, getUserInfoFullSuccess } from "src/stores/userSlice";
import { toast } from "react-toastify";

export default function EditAvatar({ open, handleEditAvatar, oldAvatar }) {
    const [avatar, setAvatar] = React.useState(oldAvatar);
    const [fileInput, setFileInput] = React.useState(null);
    const dispatch = useDispatch();
    const handleClose = () => {
        handleEditAvatar(false)
    }
    const handleUpload = (event) => {
        const file = event.target.files[0];
        setFileInput(file);
        setAvatar(URL.createObjectURL(file));
    }

    const uploadImg = async () => {
        const url = await profileAPI.uploadImage(fileInput);

        if (url) {
            const update = await (await profileAPI.updateAvatar(url)).data;
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

        }

        handleClose(false)
    }
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card className={styles["modal-card-avatar"]}
                sx={{
                    padding: "0px",
                    margin: "0px"
                }}
            >


                <CardContent sx={{ width: "500px", height: "500px" }}>
                    <Avatar src={avatar} sx={{ width: "100% ", height: "100%", objectFit: "cover" }} variant="square">
                    </Avatar>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(event) => handleUpload(event)} />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>

                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={() => uploadImg()}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={() => handleClose()}>
                            Cancel
                        </Button>
                    </Stack>

                </CardActions>

            </Card>
        </Modal>
    )
}