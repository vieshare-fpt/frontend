import React, { useEffect } from "react";
import { packageApi } from "src/services/packageApi";
import { Typography, styled, Grid, Toolbar, Box } from "@mui/material";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { setPackages } from "src/stores/packageSlice";
import PricingCard from "src/components/pricing/PricingCard";
import Loader from "src/components/common/Loader";
import { MainLayout } from "src/components/layouts";
import Lottie from "react-lottie";
import styles from "src/styles/Package.module.css";
import * as animationData from "lottie/background.json";
const defaultAnimationOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  
  },
};

export default function Packages() {
  // const routes = useRouter()
  // console.log(routes.query);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch(); //setter redux
  const packages = useSelector(
    //getter redux
    (state) => state.package.packages.data
  );
  useEffect(() => {
    if (!packages)
      (async () => {
        await packageApi
          .getPackages({
            order_by: "price",
            sort: "ASC",
            per_page: 9,
            page: 1,
          })
          .then((response) => {
            // console.log('response: ', response.data);
            dispatch(setPackages(response.data));
          });
      })();
  });

  if (!packages) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ minHeight: "100vh", position: "relative" }}>
        <Lottie
          style={{
            position: "absolute",
            bottom: "0",
            zIndex: -2021,
            width: "100%",
          }}
          options={{
            ...defaultAnimationOptions,
            ...{ animationData: animationData },
          }}
          isClickToPauseDisabled={true}
        />

        <Toolbar />
        <Container
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
        </Container>
        <Container
          maxWidth="md"
          className="animate__animated animate__fadeInUp"
        >
          <Grid container spacing={10}>
            {packages.map((item) => (
              <Grid item xs={12} sm={12} md={4} key={item.id}>
                <PricingCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
Packages.getLayout = MainLayout;
