import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Page3TreeMap() {
  // const { VaccineData = [] } = props;
  const option3 = {
    colorAxis: {
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[0],
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: [
          {
            name: "A",
            value: 6,
            colorValue: 1,
          },
          {
            name: "B",
            value: 6,
            colorValue: 2,
          },
          {
            name: "C",
            value: 4,
            colorValue: 3,
          },
          {
            name: "D",
            value: 3,
            colorValue: 4,
          },
          {
            name: "E",
            value: 2,
            colorValue: 5,
          },
          {
            name: "F",
            value: 2,
            colorValue: 6,
          },
          {
            name: "G",
            value: 1,
            colorValue: 7,
          },
        ],
      },
    ],
    title: {
      text: "Highcharts Treemap",
    },
  };

  //   console.log(option3);s

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={option3} />
      </div>
    </>
  );
}
export default Page3TreeMap;
