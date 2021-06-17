import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";

function Page2Recovered(props) {
  const { StateData = [] } = props;
  const timeSeriesArray = [];
  const option = {
    title: {
      text: null,
    },

    // xAxis: {
    //   tickInterval: 1,
    //   type: "logarithmic",
    //   accessibility: {
    //     rangeDescription: "Range: 1 to 10",
    //   },
    // },

    // yAxis: {
    //   type: "logarithmic",
    //   minorTickInterval: 0.1,
    //   accessibility: {
    //     rangeDescription: "Range: 0.1 to 1000",
    //   },
    // },

    // tooltip: {
    //   headerFormat: "<b>{series.name}</b><br />",
    //   pointFormat: "x = {point.x}, y = {point.y}",
    // },

    series: [
      {
        data: props.recoveredArray,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option} />;
    </>
  );
}
export default Page2Recovered;
