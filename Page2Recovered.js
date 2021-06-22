import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";

function Page2Recovered(props) {
  const { StateData = [] } = props;
  const timeSeriesArray = [];
  var data = _groupBy(props.recoveredArray, function (n) {
    return n[0];
  });

  var seriesData = [];

  var dateList = [];

  for (let date in data) {
    let value = data[date];
    var sum = 0;

    value.forEach((a) => {
      sum += a[1];
    });

    dateList.push(date);
    seriesData.push(sum);
  }

  const option1 = {
    title: {
      text: "",
    },

    yAxis: {
      title: {
        text: "Cases",
      },
    },

    xAxis: {
      categories: dateList,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    series: [
      {
        name: "Recovered",
        data: seriesData,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option1} />;
    </>
  );
}
export default Page2Recovered;
