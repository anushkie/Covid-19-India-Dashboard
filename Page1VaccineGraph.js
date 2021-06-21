import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Space, Card } from "antd";
import { getVaccinated } from "../src/services/dashboard";
import * as moment from "moment";

function Page1VaccineGraph(props) {
  const [vaccineDataPg1, updateConfirmedData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await Promise.all([getVaccinated()]).then((values) => {
        console.log(values);
        updateConfirmedData(values[0].vaccineDataPg1);
      });
    })();
  }, []);
  // console.log(vaccineData);
  const seriesArray = [];
  console.log(vaccineDataPg1);
  let total_value = 0;
  vaccineDataPg1.forEach((item) => {
    const dumyArray = [];
    console.log("Original ", item["Updated On"].replace(/\//g, "-"));
    var momObj = moment(item["Updated On"], "DD/MM/YYYY").toDate();
    console.log("Converted ", momObj);
    dumyArray.push(Date.parse(momObj, "MM/DD/YYYY"));
    dumyArray.push(item["Total Individuals Vaccinated"]);
    total_value = +item["Total Individuals Vaccinated"];
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
            class="card border-warning mb-3"
            border="primary"
            style={{ width: "28rem" }}
            bgcolor="primary"
            style={{ width: 600 }}
          >
            <div class="card-header">
              <h3 class="card-title text-warning">Vaccinated: 3455666 </h3>
            </div>
            <HighchartsReact highcharts={Highcharts} options={option2} />
          </div>
        </Space>
      </div>
    </>
  );
}

export default Page1VaccineGraph;
