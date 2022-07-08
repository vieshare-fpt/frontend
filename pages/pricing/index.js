import React, { useEffect } from 'react';
import { packageApi } from 'src/services/packageApi';
import { Typography, styled, Grid } from '@mui/material';
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { getPackages } from 'src/stores/packageSlice';
import PricingCard from "src/components/pricing/PricingCard";
import Loader from 'src/components/common/Loader';
import styles from "../../src/styles/Package.module.css";


const MyContainer = styled('div')({

})

export default function Packages() {
    // const routes = useRouter()
    // console.log(routes.query);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const dispatch = useDispatch();
    const packages = useSelector(
        (state) => state.package.packages.data
    );

    useEffect(() => {
        if (!packages)
            (async () => {
                await packageApi.getPackages({
                    order_by: 'price',
                    sort: 'ASC',
                    per_page: 9,
                    page: 1
                }).then((response) => {
                    console.log('response: ', response.data);
                    dispatch(getPackages(response.data));
                });
            })();
    });
  

    if (!packages) {
        return <Loader />
    }

    return (
        <>
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{
                    pt: 4,
                    pb: 6,
                }}
                 
            >
                <Typography component="h1" variant="h2" align="center" gutterBottom>
                    Mua Premium, xem không giới hạn
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ fontSize: 20 }}
                    align="center"
                    color="text.secondary"
                    component="p"
                    margin-top="40px"
                >
                    Bạn có thể mua gói Premium để có thể truy cập không giới hạn tới các
                    nội dung trả phí. Hãy chọn phương thức thanh toán phù hợp với bạn để
                    có trải nghiệm tốt nhất nhé!
                </Typography>
                <Grid
                    container
                    align="center"
                    direction="row-reverse"
                    justifyContent="space-between"
                    className={styles["grid-row"]}
                >
                    {packages.map((item) => {
                        return (
                         
                            <Grid item xs={12} sm={12} md={3} key={item.id} >
                                <PricingCard item={item} />
                            </Grid>
                        )
                    }
                    )}
                </Grid> 
            </Container>

        </>
    )
}