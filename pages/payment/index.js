import React, { useEffect, useState } from 'react';
import { Typography, styled, Grid, Container, TextField, Card, Button, IconButton, InputLabel, Select, MenuItem, Modal } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardHeader, CardContent } from '@mui/material';
import "animate.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { walletApi } from 'src/services/walletApi';
import { bankApi } from 'src/services/bankApi';
import { setWallet } from 'src/stores/walletSlice';
import { setBanks } from 'src/stores/bankSlice'
import { Box } from '@mui/system';
import { subscriptionApi } from 'src/services/subsciptionApi';
import { useRouter } from 'next/router';
import { setUserInfoFailed, setUserInfoSuccess } from 'src/stores/userSlice';
import { infoUserApi } from 'src/services';





export default function PaymentInput() {

    const [bank, setBank] = React.useState('');
    const router = useRouter();
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    //get package
    const packagePayment = useSelector(
        (state) => state.package.payment.package
    );

    //get info user
    const userInfo = useSelector(
        (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
    );


    //data payment
    let vat = 0;
    let total = 0;
    let price = 0;
    if (packagePayment) {
        price = packagePayment.price;
        vat = parseInt(packagePayment.price) * 0.1;
        total = vat + parseInt(packagePayment.price);
    }


    if (!packagePayment) {
        router.push("/pricing");
        return
    }

    if (!userInfo) {
        router.push("/login")
        return

    }

    function getInfoUser() {
        (async () => {
          await infoUserApi
            .info()
            .then((response) => {
              dispatch(setUserInfoSuccess(response.data));
            })
            .catch(function (error) {
              dispatch(setUserInfoFailed());
            });
        })();
      }


    const dispatch = useDispatch();
    const banks = useSelector(
        (state) => state.bank.banks
    );
    const wallet = useSelector(
        (state) => state.wallet.wallet
    );

    useEffect(() => {
        if (banks.length == 0) {
            (async () => {
                console.log("check")
                await bankApi.getListBank()
                    .then((response) => {
                        // console.log("58", response)
                        dispatch(setBanks(response.data));
                    });
            })();
        }
        if (!wallet) {
            (async () => {
                await walletApi.getWallet()
                    .then((response) => {
                        // console.log("66", response)
                        dispatch(setWallet(response.data));
                    });
            })();
        }

    });

    const handleCheckOut = async () => {
        const id = await packagePayment.id;
        const balance = await wallet.balance;
        console.log("105", id, balance);
        
        await subscriptionApi.createSubsciptions(id)
            .then((response) => {
                console.log("107", response);
                getInfoUser();
                handleSuccessOpen();
            })
            .catch((error) => {
                console.log("111", error);
            })
    }

    const handleChange = (event) => {
        event.preventDefault();
        setBank(event.target.value);
    };

    // handleSuccess
    const handleSuccessOpen = () => {
        setSuccessModal(true);
    };
    const handleSucessClose = () => {
        setSuccessModal(false);
    };

    //handleError 
    const handlerErrorOpen = () => {
        setErrorModal(true);
    };
    const handleErrorClose = () => {
        setErrorModal(false);
    }

    return (
        <React.Fragment>
            <Container

                maxWidth="lg"
                component="main"
                sx={{ pb: 10 }}

            >
                <Grid
                    className="animate__animated animate__fadeInUp"
                    container spacing={6}
                    sx={{ mt: 2 }}
                    columnSpacing={{ xs: 1, sm: 10, md: 15 }}
                >
                    {/* form payment */}

                    <Grid
                        md={6} xs={12}
                        item

                    >
                        <Grid xs={12}>
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 25, margin: 5, fontWeight: 'bold' }}
                                align="center"
                                color="text.primary"
                                component="p"
                                margin-top="40px">
                                Billing detail
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mt: 5 }}

                        >

                            <Grid
                                md={6} xs={12}
                                justifyContent="space-evenly"
                                alignItems="left"

                            >
                                <TextField
                                    helperText="Please enter your first name"
                                    id="firstName"
                                    label="FirstName"
                                    required
                                    fullWidth
                                    sx={{ maxWidth: "95%" }}

                                />
                            </Grid>
                            <Grid
                                md={6} xs={12}
                                justifyContent="space-evenly"
                                alignItems="left"
                            >
                                <TextField
                                    helperText="Please enter your last name"
                                    id="lastName"
                                    label="LastName"
                                    required
                                    fullWidth
                                    sx={{ maxWidth: "100%" }}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            item xs={12}
                            sx={{ mt: 5 }}
                        >
                            <TextField
                                helperText="Please enter your address"
                                id="address"
                                label="Address(Optional)"
                                fullWidth

                            />
                        </Grid>
                        <Grid
                            item xs={12}
                            sx={{ mt: 5 }}
                        >
                            <TextField
                                helperText="Please enter your email"
                                id="email"
                                label="Email"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone number"
                                name="phone"
                                autoComplete="phone"
                                sx={{ mt: 5 }}
                                helperText="Please enter your phonenumber"
                            />
                        </Grid>

                    </Grid>
                    {/* info */}
                    <Grid item md={6}  >
                        <Grid xs={12}>
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 25, margin: 5, fontWeight: 'bold' }}
                                align="center"
                                color="text.primary"
                                component="p"
                                margin-top="40px"

                            >
                                Your order
                            </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 300 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >
                                                Details
                                            </TableCell>
                                            <TableCell >Price</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell >Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Subtotal</TableCell>
                                            <TableCell>{price} VN??</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>VAT</TableCell>
                                            <TableCell>{vat} VN??</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Total</TableCell>
                                            <TableCell >{total} VN??</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item sx={{ mt: 5 }} >
                            <Card component={Paper}  >
                                <CardHeader
                                    title="Credit card"
                                    variant="h5"
                                    sx={{ fontSize: 25, ml: 2 }}
                                    gutterbottom="true"
                                    component="div"
                                />
                                <CardContent
                                    title="Credit card"
                                    variant="h5"
                                    sx={{ fontSize: 25, ml: 2 }}
                                    guttertbottom="true"
                                    component="div"
                                >
                                    <Grid item xs={12} >
                                        <TextField
                                            required
                                            fullWidth
                                            id="card"
                                            label="Card number"
                                            name="card"
                                            helperText="Please enter your cardnumber"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        sx={{ mt: 1 }}

                                    >

                                        <Grid
                                            md={6} xs={12}
                                            justifyContent="space-evenly"
                                            alignItems="left"
                                            sx={{ mt: 1 }}
                                        >
                                            <TextField

                                                id="expiryDate"
                                                label="ExpiryDate"
                                                required
                                                fullWidth
                                                sx={{ maxWidth: "95%" }}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            md={6} xs={12}
                                            justifyContent="space-evenly"
                                            alignItems="left"
                                            sx={{ mt: 1 }}
                                        >
                                            <TextField

                                                id="cvv"
                                                label="CVV"
                                                required
                                                fullWidth
                                                sx={{ maxWidth: "100%" }}
                                                disabled
                                            />
                                        </Grid>

                                        <Box sx={{ minWidth: 150, mt: 2 }}>
                                            <InputLabel id="bankLabel">Bank</InputLabel>
                                            <Select
                                                labelId="bankLabel"
                                                id="bankLabel"
                                                label="Bank"
                                                value={bank}
                                                onChange={handleChange}
                                                fullWidth
                                                disabled

                                            >
                                                {banks.map((bank) => {
                                                    return (
                                                        <MenuItem key={bank.id} value={bank.id}>
                                                            {bank.name}
                                                        </MenuItem>

                                                    )
                                                }
                                                )}

                                            </Select>
                                        </Box>


                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card component={Paper}
                                xs={12} sx={{ mt: 5, p: 2 }}
                            >
                                <Grid
                                    xs={12}
                                    justifyContent="space-between"
                                    align="center"
                                >
                                    <Button
                                        variant="contained"
                                        sx={{ pl: 3 }}
                                        onClick={handleCheckOut}
                                    >
                                        Checkout
                                        <IconButton color="default" aria-label="add to shopping cart"  >
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </Button>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <div>
                {/* ModalProps */}
                {
                    successModal ? (
                        <div>
                            <Modal
                                hideBackdrop
                                open={open}
                                onClose={handleSucessClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                    <h2 id="child-modal-title">Thanh to??n th??nh c??ng</h2>
                                    <Typography id="child-modal-description">
                                        Ch??c m???ng b???n ???? thanh to??n th??nh c??ng g??i premium
                                        c?? th???i h???n s??? d???ng l?? {packagePayment.expiresAfterNumberOfDays}, tr??? gi?? {total} VN?? <br />
                                        (???? bao g???m VAT)
                                    </Typography>
                                    <Button onClick={() => {
                                        router.push("/")
                                    }}>Tr??? v??? trang ch???</Button>
                                </Box>
                            </Modal>
                        </div>

                    ) : null
                }
            </div>
            <div>
                {
                    errorModal ? (
                        <div>
                            <Modal
                                hideBackdrop
                                open={open}
                                onClose={handleSucessClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                    <h2 id="child-modal-title">Thanh to??n th???t b???i</h2>
                                    <Typography id="child-modal-description">
                                        Thanh to??n th???t b???i vui l??ng ki???m tra l???i s??? d?? hi???n t???i.
                                    </Typography>
                                    <Button onClick={() => {
                                        router.push("/")
                                    }}>Tr??? v??? trang ch???</Button>
                                </Box>
                            </Modal>
                        </div>

                    ) : null
                }
            </div>
        </React.Fragment>
    )

}