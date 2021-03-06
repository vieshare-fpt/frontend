import * as React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { walletApi } from 'src/services/walletApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setWallet } from 'src/stores/walletSlice';
import Loader from 'src/components/common/Loader';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { useState } from 'react';
import { setBanks } from 'src/stores/bankSlice';
import { bankApi } from 'src/services/bankApi';


export default function IncomeStats(props) {
    const [bank, setBank] = React.useState('');
    const [withdrawModal, setWithdrawModal] = useState(false);
    const dispatch = useDispatch();
    const wallet = useSelector(
        (state) => state.wallet.wallet
    );
    const banks = useSelector(
        (state) => state.bank.banks
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
            (
                async () => {
                    await walletApi.getWallet()
                        .then(response => {
                            dispatch(setWallet(response.data));
                            console.log("Response", response);
                        }).catch(error => {
                            console.log("error", error);
                        });
                }
            )();
        }
    });

    if (!wallet) {
        return <Loader />
    }


    console.log("wallet", wallet);

    const balance = wallet.balance;

    const handleWithdraw = async () => {
        const type = "DEPOSIT";
        setWithdrawModal(true);

    };

    const handleChangeBank = (event) => {
        event.preventDefault();
        setBank(event.target.value);
    };

    const handleCloseWithdrawForm = (event) => {
        setWithdrawModal(false);

    }
    const handleOpenWithdrawForm = (event) => {
        setWithdrawModal(true);

    }

    return (

        <React.Fragment>
            <Box
                component="main"
                sx={{ flexGrow: 10, pl: 1, pr: 1, pb: 1, width: { sm: `100%` } }}
                boxShadow
            >
                <Grid
                    md={6} xs={12}
                    item
                    spacing={6}
                    justifyContent="space-evenly"
                >
                    <Card component={Paper}>
                        <CardHeader
                            title="T???ng quan thu nh???p : "
                            variant="h5"
                            sx={{ fontSize: 25, ml: 2 }}
                            gutterbottom="true"
                            component="h1">
                        </CardHeader>
                        <CardContent
                            guttertbottom="true"
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 20 }}
                                align="center"
                                color="text.secondary"
                                component="p"
                            >S??? d?? hi???n t???i {balance} VN??</Typography>
                        </CardContent>

                    </Card>
                    <Grid
                        item
                        md={6}
                        xs={12}
                        spacing={6}
                        justifyContent="space-between"
                        align="center"
                        margin={2}
                    >
                        <Button
                            variant="contained"
                            sx={{ pl: 3 }}
                            onClick={handleOpenWithdrawForm}
                        >R??t ti???n
                            <IconButton color="default">
                                <AttachMoneyOutlinedIcon />
                            </IconButton>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <div>
                {withdrawModal ? (
                    <div>
                        <Dialog open={open} onClose={handleCloseWithdrawForm}>
                            <DialogTitle>R??t ti???n</DialogTitle>
                            <DialogContent>
                                <Grid
                                    md={6} xs={12}
                                    justifyContent="space-evenly"
                                    alignItems="left"
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        id="cvv"
                                        label="S??? ti???n c???n r??t: "
                                        required
                                        fullWidth
                                        sx={{ maxWidth: "100%" }}
                                        helperText="VN??"
                                    />
                                </Grid>

                                <Box sx={{ minWidth: 350, mt: 2 }}>
                                    <InputLabel id="bankLabel">Bank</InputLabel>
                                    <Select
                                        labelId="bankLabel"
                                        id="bankLabel"
                                        label="Bank"
                                        value={bank}
                                        onChange={handleChangeBank}
                                        fullWidth


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

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseWithdrawForm}>Hu??? b???</Button>
                                <Button onClick={handleCloseWithdrawForm}>R??t ti???n</Button>

                            </DialogActions>
                        </Dialog>
                    </div>
                ) : null
                }
            </div>
        </React.Fragment>

    );
}
