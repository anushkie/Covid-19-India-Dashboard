import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Space, Card } from "antd";
import { getRecoveredCases } from "../src/services/dashboard";

function Page1ActiveGraph(props) {
  //console.log(props);
  const [confirmedData, updateConfirmedData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await Promise.all([getRecoveredCases()]).then((values) => {
        updateConfirmedData(values[0].confirmedData);
      });
    })();
  }, []);

  const seriesArray = [];
  let total_value = 0;
  confirmedData.forEach((item) => {
    const dumyArray = [];
    dumyArray.push(Date.parse(item["Date"], "DD-MMM-YYYY"));
    dumyArray.push(item["Daily Recovered"]);
    total_value = +item["Daily Recovered"];
    seriesArray.push(dumyArray);
  });

  //console.log(total_value);
  const option2 = {
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
            [1, Highcharts.color("#00FF00").setOpacity(0).get("#00FF00")],
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
        data: seriesArray,
        color: "#00FF00",
      },
    ],
  };

  return (
    <>
      <div>
        <Space direction="vertical">
          <div
            className="card border-success mb-3
          "
            title={`Recovered: ${total_value}`}
            style={{ width: 600 }}
          >
            <div class="card-header">
              <h3 class="card-title text-success"> Recovered Cases: 378388 </h3>
            </div>
            <HighchartsReact highcharts={Highcharts} options={option2} />
          </div>
        </Space>
      </div>
    </>
  );
}
export default Page1ActiveGraph;
