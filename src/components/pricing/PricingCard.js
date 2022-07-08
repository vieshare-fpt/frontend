import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'animate.css';
import styles from "../../styles/Package.module.css";
import Button from '@mui/material/Button'



function PricingContent({ item }) {
    console.log(item)
    return (
        <Container spacing={10} alignItems="flex-end">
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
                        classname={styles["card-header"]}
                    />
                    <CardContent className={styles["card-content"]}>
                        <Typography gutterBottom component="h2" variant="h4" color="text.primary" sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                        }}>
                            {item.expiresAfterNumberOfDays} Ngày
                        </Typography>
                        <Typography component="h4" variant="h5" color="textSecondary" sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,

                        }}>
                            <br />
                            {item.price} VNĐ
                        </Typography>
                        <Button className={styles["button"]}>
                            Thanh toán
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