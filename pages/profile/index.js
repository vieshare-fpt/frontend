import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, CardHeader, Container, Grid } from '@mui/material';
import InfomationTab from 'src/components/profile/components/InfomationTab';
import SecurityTab from 'src/components/profile/components/SecurityTab';
import { useDispatch, useSelector } from "react-redux";
import { infoUserApi } from "src/services/infoUserApi";
import { getUserInfoFullFalse, getUserInfoFullSuccess} from "src/stores/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { ToastContainer } from "react-toastify";





export default function Profile() {
    const [value, setValue] = React.useState('infomation');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const user = useSelector(
        (state) => state.user.currentUserInfoFull.userInfo
    );

    useEffect(() => {


        (async () => {

            await infoUserApi
                .info()
                .then((response) => {
                    dispatch(getUserInfoFullSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(getUserInfoFullFalse());
                });
        })();
    }, []);




    if (!user) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <ReactLoading type="bubbles" color="#000" />
                </Grid>

            </Grid>)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
            <Container sx={{ mt: 12 }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" sx={{ width: 64, height: 64 }} src={user?.avatar}>

                        </Avatar>
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
                                <Tab label="Infomation" value="infomation" />
                                <Tab label="Security" value="security" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ p: 0 }} value="infomation"><InfomationTab profile={user} /></TabPanel>
                        <TabPanel sx={{ p: 0 }} value="security"><SecurityTab profile={user} /></TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </>
    );
}
