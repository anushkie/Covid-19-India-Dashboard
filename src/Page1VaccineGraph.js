import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Space, Card } from "antd";
import { getVaccinated } from "../src/services/dashboard";

function Page1VaccineGraph(props) {
  // console.log(props);
  const [confirmedData, updateConfirmedData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await Promise.all([getVaccinated()]).then((values) => {
        updateConfirmedData(values[0].confirmedData);
      });
    })();
  }, []);
  // console.log(vaccineData);
  const seriesArray = [];
  let total_value = 0;
  confirmedData.forEach((item) => {
    const dumyArray = [];
    dumyArray.push(Date.parse(item["Date"], "DD-MMM-YYYY"));
    dumyArray.push(item["Total Covaxin Administered"]);
    total_value = +item["Total Covaxin Administered"];
    seriesArray.push(dumyArray);
  });
  console.log(seriesArray);

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
        data: seriesArray,
      },
    ],
  };

  return (
    <>
      <div>
        <Space direction="vertical">
          <div
            class="card border-warning mb-3"
            border="primary"
            style={{ width: "28rem" }}
            bgcolor="primary"
            style={{ width: 600 }}
          >
            <div class="card-header">
              <h5 class="card-title text-warning">Vaccinated: 123456 </h5>
            </div>
            <HighchartsReact highcharts={Highcharts} options={option2} />
          </div>
        </Space>
      </div>
    </>
  );
}

export default Page1VaccineGraph;
