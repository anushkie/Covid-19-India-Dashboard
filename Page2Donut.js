import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";

function Page2Donut() {
  const option = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "Statewise distribution",
    },
    subtitle: {
      text: "Total Cases",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    series: [
      {
        name: "Confirmed Cases",
        data: [
          ["Andaman & Nicobar Islands", 6853],
          ["Andhra Pradesh ", 1593821],
          ["Arunachal Pradesh", 25573],
          ["Assam", 375404],
          ["Bihar", 692420],
          ["Chandigarh", 58734],
          ["Chhattisgarh", 953162],
          ["Daman & Diu", 9902],
          ["Delhi", 1418418],
          ["Goa", 147861],
          ["Gujarat", 791657],
          ["Haryana", 741785],
          ["Himachal Pradesh", 180983],
          ["Jammu & Kashmir", 272858],
          ["Jharkhand", 331811],
          ["Karnataka", 2450215],
          ["Kerela", 2365788],
          ["Madhya Pradesh", 767274],
          ["Maharashtra", 5602019],
          ["Manipur", 44627],
          ["Mizoram", 10332],
          ["Nagaland", 20596],
          ["Odisha", 703441],
          ["Punjab", 543475],
          ["Rajasthan", 920456],
          ["Sikkim", 13289],
          ["Tamil Nadu", 1877221],
          ["Uttar Pradesh", 1673785],
          ["West Bengal", 1284973],
          ["Uttarakhand", 315510],
          ["Telangana", 556320],
          ["Tripura", 46522],
        ],
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option} />;
    </>
  );
}
export default Page2Donut;
