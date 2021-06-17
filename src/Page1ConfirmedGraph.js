import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Space, Card } from "antd";
import { getConfirmCases } from "../src/services/dashboard";

function Page1ConfirmedGraph(props) {
  // console.log(props);
  const [confirmedData, updateConfirmedData] = React.useState([]);
  //const { confirmedData = [] } = props;
  React.useEffect(() => {
    (async () => {
      await Promise.all([getConfirmCases()]).then((values) => {
        updateConfirmedData(values[0].confirmedData);
      });
    })();
  }, []);
  const timeSeriesArray = [];
  let total_value = 0;

  confirmedData.forEach((item) => {
    const dumyArray = [];
    dumyArray.push(Date.parse(item["Date"], "DD-MMM-YYYY"));
    dumyArray.push(item["Daily Confirmed"]);
    total_value = +item["Daily Confirmed"];
    timeSeriesArray.push(dumyArray);
  });

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
        <Space direction="vertical">
          <div
            className="card border-info mb-3 "
            border="primary"
            style={{ width: "28rem" }}
            bgcolor="primary"
            title={`Confirmed: ${total_value}`}
            style={{ width: 600 }}
          >
            {" "}
            <div class="card-header">
              <h3 class="card-title text-info">Confirmed Cases: 281683</h3>
            </div>
            <HighchartsReact highcharts={Highcharts} options={option3} />
          </div>
        </Space>
      </div>
    </>
  );
}
export default Page1ConfirmedGraph;
