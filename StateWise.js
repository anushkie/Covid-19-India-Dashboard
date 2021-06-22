import React from "react";
import { Divider } from "antd";
import { Select } from "antd";

import { DatePicker, Space } from "antd";
import Data from "./assets/district_wise";
import ConfirmedGraph from "./Page2confirmed";
import Recovered from "./Page2Recovered";
import Vaccinated from "./Page2Vaccinated";
import Deceased from "./Page2Deceased";
import Bar from "./Page2Bar";
import Comparison from "./Page2Comparison.js";
import Map from "./Page2Map";
import Donut from "./Page2Donut";
import * as moment from "moment";
import StateData from "./assets/state_wise_daily.json";
import States from "./assets/districts.json";
import {
  groupBy as _groupBy,
  sumBy as _sumBy,
  sum as _sum,
  sortBy as _sortBy,
} from "lodash";
import IndiaMap from "./IndiaMap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const { Option } = Select;

function getConfirmedArray(grouped_data, selectedState, type) {
  const confirmArray = [];
  const barChartArray = [];
  for (var key of Object.keys(grouped_data)) {
    if (key === selectedState) {
      const district_grouped_data = _groupBy(grouped_data[key], "District");
      for (var key1 of Object.keys(district_grouped_data)) {
        district_grouped_data[key1].confirmSum = 0;
        district_grouped_data[key1].deathSum = 0;
        district_grouped_data[key1].testSum = 0;
        district_grouped_data[key1].recoverSum = 0;
        district_grouped_data[key1].forEach((item) => {
          district_grouped_data[key1].confirmSum += Number(item.Confirmed);
          district_grouped_data[key1].deathSum += Number(item.Deceased);
          district_grouped_data[key1].recoverSum += Number(item.Recovered);
          if (item.Tested === "") {
            district_grouped_data[key1].testSum += 0;
          } else {
            district_grouped_data[key1].testSum += Number(item.Tested);
          }
        });
      }
      const confirmSorted = _sortBy(district_grouped_data, [
        function (o) {
          return o.confirmSum;
        },
      ]);
      const obj1 = {
        name: confirmSorted[0][0].District,
        confirmSum: confirmSorted[0].confirmSum || 0,
        deathSum: confirmSorted[0].deathSum || 0,
        testSum: confirmSorted[0].testSum || 0,
        recoverSum: confirmSorted[0].recoverSum || 0,
      };
      barChartArray.push(obj1);
      if (confirmSorted.length > 1) {
        const obj2 = {
          name: confirmSorted[1][0].District,
          confirmSum: confirmSorted[1].confirmSum || 0,
          deathSum: confirmSorted[1].deathSum || 0,
          testSum: confirmSorted[1].testSum || 0,
          recoverSum: confirmSorted[1].recoverSum || 0,
        };
        barChartArray.push(obj2);
      }
      if (confirmSorted.length > 2) {
        const obj3 = {
          name: confirmSorted[2][0].District,
          confirmSum: confirmSorted[2].confirmSum || 0,
          deathSum: confirmSorted[2].deathSum || 0,
          testSum: confirmSorted[2].testSum || 0,
          recoverSum: confirmSorted[2].recoverSum || 0,
        };
        barChartArray.push(obj3);
      }
    }

    if (key === selectedState && type === 1) {
      grouped_data[key].forEach((item) => {
        confirmArray.push([
          moment(item["Date"], "YYYY-MM-DD").format("DD-MM-YYYY"),
          Number(item.Confirmed),
        ]);
      });
    } else if (key === selectedState && type === 2) {
      grouped_data[key].forEach((item) => {
        confirmArray.push([
          moment(item["Date"], "YYYY-MM-DD").format("DD-MM-YYYY"),
          Number(item.Recovered),
        ]);
      });
    } else if (key === selectedState && type === 3) {
      grouped_data[key].forEach((item) => {
        confirmArray.push([
          moment(item["Date"], "YYYY-MM-DD").format("DD-MM-YYYY"),
          Number(item.Deceased),
        ]);
      });
    }
  }
  return { confirmArray, barChartArray };
}

function StateWise(props) {
  const { StackedData = [] } = props;
  const grouped_data = _groupBy(StackedData, "State");

  // console.log(grouped_data);
  const [selectedState, updateSelectedState] = React.useState("Punjab");
  const [confirmCasesArray, updateConfirmCases] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 1).confirmArray
  );
  const [recoveredArray, updateRecoveredCases] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 2).confirmArray
  );
  const [deathsArray, updateDeathCases] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 3).confirmArray
  );
  const [barData, updateBarData] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 1).barChartArray
  );
  React.useEffect(() => {
    (async () => {
      // updateConfirmCases(confirm_array);
    })();
  });

  const handleChange = (value) => {
    updateSelectedState(value);
    const new_confirm_array = getConfirmedArray(grouped_data, value, 1);
    const new_recovered_array = getConfirmedArray(grouped_data, value, 2);
    const new_deaths_array = getConfirmedArray(grouped_data, value, 3);
    updateBarData(new_confirm_array.barChartArray);
    updateConfirmCases(new_confirm_array.confirmArray);
    updateRecoveredCases(new_recovered_array.confirmArray);
    updateDeathCases(new_deaths_array.confirmArray);
  };

  const { RangePicker } = DatePicker;

  var data = [
    ["in-5390", 0],
    ["in-py", 1],
    ["in-ld", 2],
    ["in-an", 3],
    ["in-wb", 4],
    ["in-or", 5],
    ["in-br", 6],
    ["in-sk", 7],
    ["in-ct", 8],
    ["in-tn", 9],
    ["in-mp", 10],
    ["in-2984", 11],
    ["in-ga", 12],
    ["in-nl", 13],
    ["in-mn", 14],
    ["in-ar", 15],
    ["in-mz", 16],
    ["in-tr", 17],
    ["in-3464", 18],
    ["in-dl", 19],
    ["in-hr", 20],
    ["in-ch", 21],
    ["in-hp", 22],
    ["in-jk", 23],
    ["in-kl", 24],
    ["in-ka", 25],
    ["in-dn", 26],
    ["in-mh", 27],
    ["in-as", 28],
    ["in-ap", 29],
    ["in-ml", 30],
    ["in-pb", 31],
    ["in-rj", 32],
    ["in-up", 33],
    ["in-ut", 34],
    ["in-jh", 35],
  ];

  const mapOptions = {
    title: {
      text: "",
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.4, "#ffff00"],
        [0.65, "#bfff00"],
        [1, "	#40ff00"],
      ],
    },

    series: [
      {
        mapData: IndiaMap,
        name: "Asia",
        data: data,
      },
    ],
  };

  return (
    <>
      <div className="App">
        <div className="posts"></div>
      </div>

      <div className="w-100 text-center mb-3 ">
        <div className="d-inline-flex">
          <Select
            defaultValue="Select a state"
            style={{ width: 250 }}
            onChange={handleChange}
            value={selectedState}
          >
            <Option value="Andaman and Nicobar Islands">
              {" "}
              Andaman and Nicobar Islands
            </Option>
            <Option value="Andhra Pradesh"> Andhra Pradesh </Option>
            <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
            <Option value="Assam">Assam</Option>
            <Option value="Bihar">Bihar</Option>
            <Option value="Chandigarh">Chandigarh</Option>
            <Option value="Chhattisgarh">Chhattisgarh</Option>
            <Option value="Dadra n Nagar Haveli">Dadra and Nagar Haveli</Option>
            <Option value="Daman and Diu"> Daman and Diu</Option>
            <Option value="Delhi">Delhi</Option>
            <Option value="Goa">Goa</Option>
            <Option value="Gujarat">Gujarat</Option>
            <Option value="Haryana">Haryana</Option>
            <Option value="Himachal Pradesh">Himachal Pradesh</Option>
            <Option value="Jammu and Kashmir">Jammu and Kashmir</Option>
            <Option value="Jharkhand">Jharkhand</Option>
            <Option value="Karnataka">Karnataka</Option>
            <Option value="Kerala">Kerala</Option>
            <Option value="Ladakh">Ladakh</Option>
            <Option value="Lakshadweep">Lakshadweep</Option>
            <Option value="Madhya Pradesh">Madhya Pradesh</Option>
            <Option value="Maharashtra">Maharashtra</Option>
            <Option value="Manipur">Manipur</Option>
            <Option value="Meghalaya">Meghalaya</Option>
            <Option value="Mizoram">Mizoram</Option>
            <Option value="Nagaland">Nagaland</Option>
            <Option value="Odisha">Odisha</Option>
            <Option value="Puducherry">Puducherry</Option>
            <Option value="Punjab">Punjab</Option>
            <Option value="Rajasthan">Rajasthan</Option>
            <Option value="Sikkim">Sikkim</Option>
            <Option value="Tamil Nadu">Tamil Nadu</Option>
            <Option value="Telengana">Telengana</Option>
            <Option value="Tripura">Tripura</Option>
            <Option value="Uttar Pradesh">Uttar Pradesh</Option>
            <Option value="Uttarakhand">Uttarakhand</Option>
            <Option value="West Bengal">West Bengal</Option>
          </Select>

          {/* <div className="margin-bet"></div>
          <RangePicker className="ml-5" /> */}
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="row w-100">
            <div className="col-md-12">
              {" "}
              <Bar Data={Data} barData={barData} />
            </div>
            <div className="col-md-4">
              <div className="card border-primary mb-3">
                <div class="card-body text-primary">
                  <h5 class="card-title text-primary">
                    <small>
                      Confirmed Cases:{" "}
                      {confirmCasesArray.reduce(
                        (accum, item) => accum + item[1],
                        0
                      )}
                    </small>
                  </h5>
                </div>
              </div>{" "}
              <ConfirmedGraph
                StateData={StateData}
                confirmArray={confirmCasesArray}
              />{" "}
            </div>
            <div className="col-md-4">
              <div className="card border-success mb-3">
                <div class="card-body text-success">
                  <h5 class="card-title text-success">
                    <small>
                      Recovered Cases:{" "}
                      {recoveredArray.reduce(
                        (accum, item) => accum + item[1],
                        0
                      )}
                    </small>
                  </h5>
                </div>
              </div>
              <Recovered
                StateData={StateData}
                recoveredArray={recoveredArray}
              />
            </div>
            <div className="col-md-4">
              <div className="card border-danger mb-3">
                <div class="card-body text-danger">
                  <h5 class="card-title text-danger">
                    <small>
                      Deceased Cases:{" "}
                      {deathsArray.reduce((accum, item) => accum + item[1], 0)}
                    </small>
                  </h5>
                </div>
              </div>
              <Deceased StateData={StateData} deathsArray={deathsArray} />{" "}
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{ borderLeft: "1px solid" }}>
          {" "}
          <HighchartsReact
            options={mapOptions}
            constructorType={"mapChart"}
            highcharts={Highcharts}
          />{" "}
          <Donut />
        </div>
      </div>
    </>
  );
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default StateWise;
