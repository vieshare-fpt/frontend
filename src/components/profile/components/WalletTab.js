import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputLabel, List, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/common/Loader';
import { bankApi } from 'src/services/bankApi';
import { walletApi } from 'src/services/walletApi';
import { setBanks } from 'src/stores/bankSlice';
import { setWallet } from 'src/stores/walletSlice';
import HeadersTab from './HeaderTab';
import ItemTab from './ItemTab';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { toast } from 'react-toastify';






export default function WalletTab({ profile }) {

    const [bank, setBank] = React.useState('');
    const [withdrawModal, setWithdrawModal] = useState(false);
    const [depositModal, setDepositModal] = useState(false);
    const [amountWithdraw, setAmountWithdraw] = React.useState(0);
    const [amountDeposit, setAmountDeposit] = React.useState(0);
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
    },[banks.length, dispatch, wallet])

    if (!wallet) {
        return <Loader />
    }
    const balance = wallet.balance;

    const handleCloseWithdrawForm = (event) => {
        setWithdrawModal(false);
    }
    const handleOpenWithdrawForm = (event) => {
        setWithdrawModal(true);
    }


    const handleCloseDepositForm = () => {
        setDepositModal(false);
    }

    const handleOpenDepositForm = () => {
        setDepositModal(true);
    }

    const handleChangeBank = (event) => {
        event.preventDefault();
        setBank(event.target.value);
    };

    const handleChangeAmountDeposit = (event) => {
        event.preventDefault();
        setAmountDeposit(event.target.value);
    }

    const handleChangeAmountWithdraw = (event) => {
        event.preventDefault();
        setAmountWithdraw(event.target.value);
    }


    //withdrawAction
    const handleWithdraw = async () => {
        const updateWallet = {
            type: "WITHDRAW",
            amount: parseFloat(amountWithdraw),
            bankId: bank
        }
        await walletApi.updateWallet(updateWallet).then(() => {
            console.log("106", updateWallet);
            toast.success("Giao dịch thành công", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
            .catch(() => {
                toast.error("Giao dịch thất bại vui lòng kiểm tra lại số dư", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setWithdrawModal(false);
            })


        const wallet = await walletApi.getWallet();
        dispatch(setWallet(wallet.balance));
        setWithdrawModal(false);
    };

    //depositAction
    const handleDeposit = async () => {
        const updateWallet = {
            type: "DEPOSIT",
            amount: parseFloat(amountDeposit),
            bankId: bank
        }
        await walletApi.updateWallet(updateWallet).then(() => {
            console.log("144", updateWallet);
            toast.success("Giao dịch thành công", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(() => {
            toast.error("Giao dịch thất bại", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setDepositModal(false);
        })

        const wallet = await walletApi.getWallet();
        dispatch(setWallet(wallet.balance));
        setDepositModal(false);


    };


    return (
        <React.Fragment>
            <Card sx={{ width: '100%', border: 1, mt: 1, borderColor: 'grey.500' }}>
                <HeadersTab

                    title='Ví của bạn'
                    subTitle='Chi tiết ví'
                />
                <List>
                    <ItemTab name="Số dư khả dụng" value={balance}></ItemTab>
                </List>
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
                    color="success"
                    variant="contained"
                    sx={{mx: 2}}
                    onClick={handleOpenWithdrawForm}
                >Rút tiền
                    <IconButton color="default">
                        <AttachMoneyOutlinedIcon />
                    </IconButton>
                </Button>
                <Button
                    variant="contained"
                    sx={{ pl: 3 }}
                    color="success"
                    onClick={handleOpenDepositForm}
                >Nạp Tiền
                    <IconButton color="default">
                        <AttachMoneyOutlinedIcon />
                    </IconButton>
                </Button>
            </Grid>
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
                                        id="amount"
                                        label="Số tiền cần rút: "
                                        required
                                        fullWidth
                                        sx={{ maxWidth: "100%" }}
                                        helperText="VNĐ"
                                        value={amountWithdraw}
                                        onChange={handleChangeAmountWithdraw}
                                    />
                                </Grid>

                                <Box sx={{ minWidth: 350, mt: 2 }}>
                                    <InputLabel id="bankLabel">Ngân hàng</InputLabel>
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
                                                <MenuItem key={bank.id} value={bank.id} onChange={handleChangeBank}>
                                                    {bank.name}
                                                </MenuItem>

                                            )
                                        }
                                        )}

                                    </Select>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <Button color="success" onClick={handleCloseWithdrawForm}>Huỷ bỏ</Button>
                                <Button color="success" onClick={handleWithdraw}>Rút tiền</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ) : null
                }

            </div>
            <div>
                {depositModal ? (
                    <div>
                        <Dialog open={open} onClose={handleCloseDepositForm}>
                            <DialogTitle>Nạp tiền</DialogTitle>
                            <DialogContent>
                                <Grid
                                    md={6} xs={12}
                                    justifyContent="space-evenly"
                                    alignItems="left"
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        id="amount"
                                        label="Số tiền cần nạp: "
                                        required
                                        fullWidth
                                        sx={{ maxWidth: "100%" }}
                                        helperText="VNĐ"
                                        value={amountDeposit}
                                        onChange={handleChangeAmountDeposit}
                                    />
                                </Grid>

                                <Box sx={{ minWidth: 350, mt: 2 }}>
                                    <InputLabel id="bankLabel">Ngân hàng</InputLabel>
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
                                                <MenuItem key={bank.id} value={bank.id} onChange={handleChangeBank}>
                                                    {bank.name}
                                                </MenuItem>

                                            )
                                        }
                                        )}

                                    </Select>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDepositForm}>Huỷ bỏ</Button>
                                <Button onClick={handleDeposit}>Nạp tiền</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ) : null
                }

            </div>
        </React.Fragment>
    )
}