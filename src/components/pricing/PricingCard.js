import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'animate.css';
import styles from "../../styles/Package.module.css";
import Button from '@mui/material/Button'
import { useDispatch } from "react-redux";
import {  setPackagePayment } from 'src/stores/packageSlice';
import { useRouter } from 'next/router'




function PricingContent({ item }) {
    const dispatch = useDispatch();
    const router = useRouter();


    const handerPayment = (item)  => {
        // console.log(item);
        dispatch(setPackagePayment(item));
        router.push("/payment")
    }

  
    // console.log(item)
    return (
        <Container spacing={10} alignitems="flex-end">
            <div className="animate__animated animate__fadeInUp">
                <Card className={styles["card"]} >
                    <CardHeader
                        
                        title={item.name}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{
                            align: 'center',
                        }}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[300]
                                    : theme.palette.grey[700],
                        }}
                        className={styles["card-header"]}
                    />
                    <CardContent className={styles["card-content"]}>
                        <Typography gutterBottom component="h2" alignItems={'baseline'} variant="h4" color="text.primary" sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 2,
                        }}>
                            {item.expiresAfterNumberOfDays} Ng??y
                        </Typography>
                        <br />
                        <Typography component="h4" variant="h5" alignItems={'baseline'} color="textSecondary" sx={{
                            display: 'flex',
                            justifyContent: 'center',
                           
                            mb: 2,

                        }}>
                            {item.price} VN??
                        </Typography>
                        <Button className={styles["button"]}   variant="contained" onClick={() => handerPayment(item)}>
                            Thanh to??n
                        </Button>
                    </CardContent>

                </Card>
            </div>
        </Container>

    );
}

export default function Pricing({ item }) {
    return <PricingContent item={item} />;
}