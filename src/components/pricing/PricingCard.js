import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import "animate.css";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setPackagePayment } from "src/stores/packageSlice";
import { useRouter } from "next/router";
import { Box, CardActions, styled } from "@mui/material";
import { green } from "@mui/material/colors";
const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: green[400],
  '&:hover': {
    backgroundColor: green[600],
  },
}));
function PricingContent({ item }) {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(item);
  const handerPayment = (item) => {
    // console.log(item);
    dispatch(setPackagePayment(item));
    router.push("/payment");
  };

  return (
    <Card sx={{my: 5}}>
      <CardHeader
        title={item.name}
        titleTypographyProps={{ align: "center" }}
        action={item.name === 'Bạc' ? <StarIcon sx={{color: 'gold'}} /> : null}
        subheaderTypographyProps={{
          align: "center",
        }}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            mb: 2,
          }}
        >
          <Typography component="h2" variant="h3" color="text.primary">
            {item.price}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            VNĐ
          </Typography>
        </Box>
        <Typography variant="subtitle1" align="center">
          {item.expiresAfterNumberOfDays} Ngày
        </Typography>
      </CardContent>
      <CardActions>
        <ColorButton
          fullWidth
          variant="contained"
          onClick={() => handerPayment(item)}
        >
          Thanh toán
        </ColorButton>
      </CardActions>
    </Card>
  );
 
}

export default function Pricing({ item }) {
  return <PricingContent item={item} />;
}
