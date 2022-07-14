import { Box, Container, Grid, Toolbar } from "@mui/material";
import AppWidgetSummary from "src/sections/@dashboard/app/AppWidgetSummary";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect } from "react";
import { chartApi } from "src/services";
import { useState } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import AppStatistics from "src/sections/@dashboard/app/AppStatistics";
import AppTotalUser from "src/sections/@dashboard/app/AppTotalUser";
import {
  formatDate,
  formatOneDay,
  formatOneMonth,
  formatOneYear,
} from "src/utils/formatDateHelper";
export default function Statistic(props) {
  const { roles } = props;
  const [totalData, setTotalData] = useState(null);
  const [categoryOfChart, setCategoryOfChart] = useState("Views");
  const [timeFrame, setTimeFrame] = useState("OneDay");
  const [dateFrom, setDateFrom] = useState(formatOneDay(new Date(), 7));
  const [dateTo, setDateTo] = useState(formatDate(new Date()));
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [density, setDensity] = useState(10);
  console.log(dateFrom);
  console.log(chartData);

  console.log(roles);
  let statistic = <></>;
  useEffect(() => {
    if (roles.includes("Admin")) {
      (async () => {
        await chartApi
          .getTotal()
          .then((response) => {
            console.log(response.data);
            setTotalData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }
  }, [roles]);

  useEffect(() => {
    (async () => {
      await chartApi
        .getData({
          from: dateFrom,
          to: dateTo,
          chart_name: categoryOfChart,
          time_frame: timeFrame,
        })
        .then((response) => {
          console.log(response);
          setLabels(response.labels);
          const datas = response.data;
          datas.forEach((data) => {
            if (data.name === "total") {
              data.name = "Tổng";
              data.type = "area";
              data.fill = "gradient";
            } else {
              data.name =
                data.name.charAt(0).toUpperCase() + data.name.slice(1);
              data.type = "column";
              data.fill = "solid";
            }
          });
          setChartData(datas);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [density, categoryOfChart, dateFrom, dateTo, timeFrame]);

  const handleChangeCategoryOfChart = (event) => {
    console.log(event.target.value);
    setCategoryOfChart(event.target.value);
  };
  const handleChangeDensity = (event) => {
    const value = event.target.value;
    const limit = 15;
    if (value > limit) {
      setDensity(limit);
    } else if (value < 1) {
      setDensity(1);
    } else {
      setDensity(value);
    }
  };
  const handleTimeFrame = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    switch (e.target.value) {
      case "OneDay":
        setDateFrom(formatOneDay(new Date(), density));
        setDateTo(formatDate(new Date()));
        break;
      case "OneMonth":
        setDateFrom(formatOneMonth(new Date(), density));
        setDateTo(formatDate(new Date()));
        break;
      case "OneYear":
        setDateFrom(formatOneYear(new Date(), density));
        setDateTo(formatDate(new Date()));
        break;
      default:
        break;
    }
    setTimeFrame(e.target.value);
  };

  const admin = (
    <>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <AppWidgetSummary
              title="Thu nhập"
              color="warning"
              icon={<PaidIcon />}
              sx={{ backgroundColor: "rgb(255, 247, 205);" }}
              total={new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalData?.incomes)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số lượt xem"
              icon={<VisibilityIcon />}
              sx={{ backgroundColor: "rgb(208, 242, 255)" }}
              total={totalData?.views?.total}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số bình luận"
              icon={<CommentIcon />}
              sx={{ backgroundColor: "rgb(208, 242, 255)" }}
              color="info"
              total={totalData?.comments?.total}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              icon={<ArticleIcon />}
              sx={{ backgroundColor: "rgb(208, 242, 255)" }}
              color="info"
              title="Tổng số bài viết"
              total={totalData?.posts?.total}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              icon={<PeopleIcon />}
              sx={{ backgroundColor: "rgb(208, 242, 255)" }}
              color="info"
              title="Tổng số lượng người dùng"
              total={totalData?.users?.total}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppTotalUser
              title="Lượt xem"
              chartData={[
                {
                  label: "Người dùng Free",
                  value: totalData ? totalData.views?.free : 0,
                },
                {
                  label: "Người dùng Premium",
                  value: totalData ? totalData.views?.premium : 0,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppTotalUser
              title="Bình luận"
              chartData={[
                {
                  label: "Người dùng Free",
                  value: totalData ? totalData.comments.free : 0,
                },
                {
                  label: "Người dùng Premium",
                  value: totalData ? totalData.comments.premium : 0,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppTotalUser
              title="Bài viết"
              chartData={[
                {
                  label: "Bài viết Free",
                  value: totalData ? totalData.posts.free : 0,
                },
                {
                  label: "Bài viết premium",
                  value: totalData ? totalData.posts.premium : 0,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppTotalUser
              title="Người dùng"
              chartData={[
                {
                  label: "Người dùng Free",
                  value: totalData ? totalData.users.userFree : 0,
                },
                {
                  label: "Người dùng Premium",
                  value: totalData ? totalData.users.userPremium : 0,
                },
                {
                  label: "Người sáng tạo",
                  value: totalData ? totalData.users.writer : 0,
                },
                {
                  label: "Quản trị viên",
                  value: totalData ? totalData.users.admin : 0,
                },
                {
                  label: "Giám sát viên",
                  value: totalData ? totalData.users.sensor : 0,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppStatistics
              title="Thống kê"
              // subheader="(+43%) than last year"
              onChange={handleChangeCategoryOfChart}
              onChangeDensity={handleChangeDensity}
              onClick={handleTimeFrame}
              valueDensity={density}
              value={categoryOfChart}
              roles={roles}
              chartLabels={labels}
              chartData={chartData}
              category={categoryOfChart}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
  const writer = (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={12}>
          <AppStatistics
            title="Thống kê"
            // subheader="(+43%) than last year"
            onChange={handleChangeCategoryOfChart}
            onChangeDensity={handleChangeDensity}
            onClick={handleTimeFrame}
            roles={roles}
            valueDensity={density}
            value={categoryOfChart}
            chartLabels={labels}
            chartData={chartData}
            category={categoryOfChart}
          />
        </Grid>
      </Grid>
    </Container>
  );

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
