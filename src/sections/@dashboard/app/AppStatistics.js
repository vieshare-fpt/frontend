import PropTypes from "prop-types";
import { merge } from "lodash";
// @mui
import {
  Card,
  CardHeader,
  Box,
  FormControl,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  TextField,
} from "@mui/material";
// components
import dynamic from "next/dynamic";
import BaseOptionChart from "src/components/chart/BaseOptionChart";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
// ----------------------------------------------------------------------

AppStatistics.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppStatistics({
  title,
  subheader,
  chartLabels,
  chartData,
  onChange,
  onChangeDensity,
  valueDensity,
  value,
  roles,
  onClick,
  category,
  ...other
}) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "16%" } },

    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    // xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          let text = y;

          if (typeof y !== "undefined") {
            switch (category) {
              case "Views":
                text = `${y.toFixed(0)} lượt xem`;
                break;
              case "Incomes":
                text = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(y.toFixed(0));
                break;
              case "Posts":
                text = `${y.toFixed(0)} bài viết`;
                break;
              case "Comments":
                text = `${y.toFixed(0)} bình luận`;
                break;
              case "Packages":
                text = `${y.toFixed(0)} gói`;
                break;
              case "Follows":
                text = `${y.toFixed(0)} người`;
                break;
              default:
                text = `${y.toFixed(0)} undefined`;
                break;
            }
          }
          return text;
        },
      },
    },
  });

  const select = (
    <FormControl sx={{ p: 2, minWidth: 120 }} size="small">
      <Select
        color="success"
        sx={{
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: "red",
          },
        }}
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="Incomes">Thu nhập</MenuItem>
        <MenuItem value="Views">Lượt xem </MenuItem>
        <MenuItem value="Comments">Bình luận</MenuItem>
        <MenuItem value="Posts"> Bài viết</MenuItem>

        {roles.includes("Admin") ? (
          <MenuItem value="Packages">Số Gói Premium đã bán</MenuItem>
        ) : (
          <MenuItem value="Follows"> Theo dõi</MenuItem>
        )}
      </Select>
    </FormControl>
  );
  const groupButton = (
    <ButtonGroup
      variant="outlined"
      sx={{ py: "19px" }}
      color="success"
      aria-label="outlined button group"
      onClick={(e) => onClick(e)}
    >
      <Button value="OneDay">ngày</Button>
      <Button value="OneMonth">tháng</Button>
      <Button value="OneYear">năm</Button>
    </ButtonGroup>
  );

  return (
    <Card {...other} sx={{ borderRadius: 8, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader title={title} subheader={subheader} />
        <Box>
          <TextField
            type="number"
            label="Mật độ"
            color="success"
            InputProps={{
              inputProps: {
                min: 1,
                max: 15,
                value: valueDensity,
                onChange: (e) => onChangeDensity(e),
              },
            }}
            sx={{
              mt: "19px",
              mr: 2,
              width: "140px",
              ".MuiInputBase-input": {
                height: "5px",
              },
            }}
          />
          {groupButton}
          {select}
        </Box>
      </Box>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
