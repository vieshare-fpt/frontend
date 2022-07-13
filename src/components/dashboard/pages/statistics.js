import { Box, Container, Grid, Toolbar } from "@mui/material";
import AppWidgetSummary from "src/sections/@dashboard/app/AppWidgetSummary";
import AppWebsiteVisits from "src/sections/@dashboard/app/AppWebsiteVisits";
import AppCurrentVisits from "src/sections/@dashboard/app/AppCurrentVisits";
import { useEffect } from "react";
import { chartApi } from "src/services";
import { useState } from "react";

export default function Statistic(props) {
  const { roles } = props;
  const [totalData, setTotalData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categoryOfChart, setCategoryOfChart] = useState("Income");
  console.log(roles);
  let statistic = <></>;

  useEffect(() => {
    (async () => {
      await chartApi
        .getTotal()
        .then((response) => {
          console.log(response);
          // setTotalData(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const handleChange = (event) => {
    setCategoryOfChart(event.target.value);
  };

  const admin = (
    <>
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="View"
              sx={{ backgroundColor: "rgb(208, 242, 255)" }}
              total={714000}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Comment"
              sx={{ backgroundColor: "rgb(208, 242, 255)" }}
              color="info"
              total={714000}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Bài viết" total={714000} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Thu nhập"
              color="warning"
              sx={{ backgroundColor: "rgb(255, 247, 205);" }}
              total={714000}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Người dùng" total={714000} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              onChange={handleChange}
              value={categoryOfChart}
              chartLabels={[
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
              ]}
              chartData={[
                {
                  name: "Team A",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Team B",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Team C",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Số lượng người dùng hiện tại"
              chartData={[
                { label: "America", value: 4344 },
                { label: "Asia", value: 5435 },
                { label: "Europe", value: 1443 },
                { label: "Africa", value: 4443 },
              ]}
              chartColors={
                [
                  // theme.palette.primary.main,
                  // theme.palette.chart.blue[0],
                  // theme.palette.chart.violet[0],
                  // theme.palette.chart.yellow[0],
                ]
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
  const writer = <>writer</>;

  if (roles.includes("Admin")) {
    statistic = admin;
  } else {
    statistic = writer;
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, pl: 1, pr: 1, pb: 1, width: { sm: `100%` } }}
    >
      {statistic}
    </Box>
  );
}
