import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";

function Page2Bar(props, selectedState) {
  const { barData = [] } = props;
  const categories = [];
  const confirm = [];
  const deaths = [];
  const recover = [];
  const tests = [];
  barData.forEach((element) => {
    categories.push(element.name);
    confirm.push(Math.log10(element.confirmSum));
    deaths.push(Math.log10(element.deathSum));
    recover.push(Math.log10(element.recoverSum));
    tests.push(Math.log10(element.testSum));
  });
  const option1 = {
    chart: {
      type: "column",
    },
    title: {
      text: "Top 3 Districts",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0,
    },
    tooltip: {
      formatter: function () {
        return "" + this.series.name + ": " + Math.round(Math.pow(10, this.y));
      },
    },
    series: [
      {
        name: "Confirmed",
        data: confirm,
      },
      {
        name: "Deaths",
        data: deaths,
      },
      {
        name: "Recovered",
        data: recover,
      },
      {
        name: "Tested",
        data: tests,
      },
    ],
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option1} />;
    </>
  );
}
export default Page2Bar;
