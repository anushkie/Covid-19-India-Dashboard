import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";

function Map_pg1(props) {
  const { StackedData = [] } = props;
  const grouped_data = _groupBy(StackedData, "State");
  const x_categories = [];
  const deaths_array = [];
  const confirm_array = [];
  const series_array = [];
  for (var key of Object.keys(grouped_data)) {
    x_categories.push(key);
    let state_confirm = 0;
    let state_deaths = 0;
    grouped_data[key].forEach((item) => {
      state_confirm = +item.Confirmed;
      state_deaths = +item.Deceased;
    });
    confirm_array.push(Math.log10(state_confirm));
    deaths_array.push(Math.log10(state_deaths));
  }
  series_array.push({
    name: "Active",
    data: confirm_array,
  });
  series_array.push({
    name: "Deaths",
    data: deaths_array,
  });

  const stackOptions = {
    chart: {
      type: "bar",
      height: 1700,
    },
    title: {
      text: "Active V/S Deceased",
    },
    xAxis: {
      categories: x_categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
        gridLines: {
          display: false,
        },
      },
      color: "#000000",
    },
    legend: {
      reversed: false,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        // color: "#FF0000",
      },
    },
    series: series_array,
  };
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={stackOptions} />
      </div>
    </>
  );
}
export default Map_pg1;
