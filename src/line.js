import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const option2 = {
  title: {
    text: null,
  },

  subtitle: {
    text: null,
  },

  yAxis: {
    title: {
      text: null,
    },
    labels: {
      enabled: false,
    },
    gridLineColor: "transparent",
  },

  xAxis: {
    visible: false,
    lineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent",
    minorTickLength: 0,
    tickLength: 0,
    labels: {
      enabled: false,
    },
    accessibility: {
      rangeDescription: "Range: 2010 to 2017",
    },
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },

  series: [
    {
      //name: "Installation",
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
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

function line() {
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={option2} />
      </div>
    </>
  );
}
export default line;
