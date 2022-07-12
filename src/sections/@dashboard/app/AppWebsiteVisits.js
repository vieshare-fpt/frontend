import PropTypes from "prop-types";
import { merge } from "lodash";
// @mui
import {
  Card,
  CardHeader,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// components
import dynamic from "next/dynamic";
import BaseOptionChart from "src/components/chart/BaseOptionChart";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  onChange,
  value,
  ...other
}) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  const select = (
    <FormControl sx={{ p: 2, minWidth: 120 }} size="small">
      <Select
        color="success"
        sx={{ borderRadius: 8, '&.Mui-selected': {
          backgroundColor: 'red'
        }}}
     
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="Income">Thu nhập</MenuItem>
        <MenuItem value={20}>Lượt xem của toàn bộ bài viết</MenuItem>
        <MenuItem value={10}>Số lượng người dùng</MenuItem>
        <MenuItem value={10}>Số lượng tác giả</MenuItem>
        <MenuItem value={30}>Số lượng người đã mua gói premium</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <Card {...other} sx={{ borderRadius: 8, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader title={title} subheader={subheader} />
        {select}
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
