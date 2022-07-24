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
    const [amount, setAmount] = useState(0);
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



    const balance = wallet.balance;

    const handleWithdraw = async () => {
        const updateWallet = {
            type: "WITHDRAW",
            amount: 10,
            bankId: bank
        }

        await walletApi.updateWallet(updateWallet)
        const wallet = await walletApi.getWallet();
        if (wallet.data.balance) {
            dispatch(setWallet(wallet.data.balance));
        }


        setWithdrawModal(false);



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
                            title="Tổng quan thu nhập : "
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
                            >Số dư hiện tại {balance} VNĐ</Typography>
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
                        >Rút tiền
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
                            <DialogTitle>Rút tiền</DialogTitle>
                            <DialogContent>
                                <Grid
                                    md={6} xs={12}
                                    justifyContent="space-evenly"
                                    alignItems="left"
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        id="cvv"
                                        label="Số tiền cần rút: "
                                        required
                                        fullWidth
                                        sx={{ maxWidth: "100%" }}
                                        helperText="VNĐ"
                                        value={amount}
                                        onChange={(event) => { setAmount(event.target.value) }}
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
                                <Button onClick={handleCloseWithdrawForm}>Huỷ bỏ</Button>
                                <Button onClick={handleWithdraw}>Rút tiền</Button>

                            </DialogActions>
                        </Dialog>
                    </div>
                ) : null
                }
            </div>
        </React.Fragment>

    );
}
