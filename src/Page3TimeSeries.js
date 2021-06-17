import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Space, Card } from "antd";

function Page3TimeSeries(props) {
  // console.log(props);

  const { TestingData = [] } = props;
  const timeSeriesArray = [];
  let total_value = 0;
  // TestingData.forEach((item) => {
  // const dumyArray = [];
  // dumyArray.push(Date.parse(item["Date"], "DD-MMM-YYYY"));
  // dumyArray.push(item["Daily Confirmed"]);
  // total_value = +item["Daily Confirmed"];
  // timeSeriesArray.push(dumyArray);
  // });

  const option3 = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "Cases:",
        data: timeSeriesArray,
      },
    ],
  };

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={option3} />
      </div>
    </>
  );
}
export default Page3TimeSeries;
