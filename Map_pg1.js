import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getStackData } from "../src/services/dashboard";

function Map_pg1() {
  const [StackedData, updateStackedData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await Promise.all([getStackData()]).then((values) => {
        updateStackedData(values[0]);
      });
    })();
  }, []);
  console.log(StackedData);

  const stackOptions = {
    chart: {
      type: "bar",
      height: 1700,
    },
    title: {
      text: "Active V/S Deceased",
    },
    xAxis: {
      categories: StackedData.x_categories,
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0,
      title: {
        text: null,
        gridLines: {
          display: false,
        },
      },
      color: "#000000",
    },
    tooltip: {
      formatter: function () {
        return "" + this.series.name + ": " + Math.round(Math.pow(10, this.y));
      },
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
    series: StackedData.series_array,
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
