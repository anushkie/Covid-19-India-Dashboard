import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";

function Chart1(props) {
  // console.log(props);
  const { Data = [] } = props;
  const groupedData = _groupBy(Data, "State");
  const sereiesArray = [];
  //console.log(groupedData);
  for (var item in groupedData) {
    // console.log(item);
    const data = [];
    groupedData[item].forEach((i) => {
      data.push(i.Delta_Confirmed);
    });
    sereiesArray.push({
      name: item,
      data: data,
    });
  }
  const option1 = {
    chart: {
      type: "area",
    },
    title: {
      text: "Historic and Estimated Worldwide Population Growth by Region",
    },
    subtitle: {
      text: "Source: Wikipedia.org",
    },
    xAxis: {
      //categories: ["1750", "1800", "1850", "1900", "1950", "1999", "2050"],
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
    series: sereiesArray,
  };
  // console.log(sereiesArray);
  // console.log(_groupBy(Data, "State"));
  // Data.forEach(item => {
  //   const obj = {
  //     name: '',
  //     data: []
  //   }
  // })

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={option1} />
      </div>
    </>
  );
}

export default Chart1;
