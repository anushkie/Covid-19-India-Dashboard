import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy, map as _map } from "lodash";
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);

function ComparisonGraphPg1(props) {
  //console.log(props);
  const { monthlyData = [] } = props;
  console.log(monthlyData);
  const x_category = [];
  const seriesArray = [];
  const confirmArray = [];
  const deathArray = [];

  monthlyData.forEach((item) => {
    x_category.push(item.Monthly);
    confirmArray.push(item.Total_Confirmed);
    deathArray.push(item["Total _Deceased"]);
  });

  seriesArray.push({
    name: "Confirm cases",
    data: confirmArray,
  });
  seriesArray.push({
    name: "Death cases",
    data: deathArray,
  });

  console.log(seriesArray);

  const option2 = {
    chart: {
      type: "area",
    },
    title: {
      text: null,
    },
    subtitle: {
      text: "Source: Wikipedia.org",
    },
    xAxis: {
      categories: x_category,
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        text: "Billions",
      },
      labels: {
        formatter: function () {
          return this.value / 1000;
        },
      },
    },
    tooltip: {
      split: true,
      valueSuffix: " millions",
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666",
        },
      },
    },
    series: seriesArray,
  };

  const option = {
    title: {
      text: "Solar Employment Growth by Sector, 2010-2016",
    },

    subtitle: {
      text: "Source: thesolarfoundation.com",
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
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

    series: [seriesArray],

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

  const option3 = {
    chart: {
      type: "area",
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 30,
        depth: 200,
      },
    },
    title: {
      text: "Visual comparison of Mountains Panorama",
    },
    yAxis: {
      title: {
        text: "Height Above Sea Level",
        x: -40,
      },
      labels: {
        format: "{value:,.0f} MAMSL",
      },
      gridLineDashStyle: "Dash",
    },
    xAxis: [
      {
        visible: false,
      },
      {
        visible: false,
      },
      {
        visible: false,
      },
    ],
    plotOptions: {
      area: {
        depth: 100,
        marker: {
          enabled: false,
        },
        states: {
          inactive: {
            enabled: false,
          },
        },
      },
    },
    tooltip: {
      valueSuffix: " MAMSL",
    },
    series: seriesArray,
  };

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={option2} />
      </div>
    </>
  );
}
export default ComparisonGraphPg1;
