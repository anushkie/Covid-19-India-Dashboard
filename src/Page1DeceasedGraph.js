import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Space, Card } from "antd";
import { getConfirmDeathss } from "../src/services/dashboard";

function Page1DeceasedGraph(props) {
  // console.log(props);
  const [confirmedData, updateConfirmedData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await Promise.all([getConfirmDeathss()]).then((values) => {
        updateConfirmedData(values[0].confirmedData);
      });
    })();
  }, []);
  const seriesArray = [];
  let total_value = 0;
  confirmedData.forEach((item) => {
    const dumyArray = [];
    dumyArray.push(Date.parse(item["Date"], "DD-MMM-YYYY"));
    dumyArray.push(item["Daily Deceased"]);
    total_value = +item["Daily Deceased"];
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
            [1, Highcharts.color("#FF0000").setOpacity(0).get("#FF0000")],
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
        color: "#FF0000",
      },
    ],
  };

  return (
    <>
      <div>
        <Space direction="vertical">
          <div
            className="card border-danger mb-3"
            title={`Deceased: ${total_value}`}
            style={{ width: 600 }}
          >
            <div class="card-header">
              <h3 class="card-title text-danger">Deceased Cases: 4092</h3>
            </div>
            <HighchartsReact highcharts={Highcharts} options={option2} />
          </div>
        </Space>
      </div>
    </>
  );
}
export default Page1DeceasedGraph;
