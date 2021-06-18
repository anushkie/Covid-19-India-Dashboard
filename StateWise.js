import React from "react";
import { Card } from "antd";
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
import DistrictData from "./assets/districts.json";
import StateData from "./assets/state_wise_daily.json";
import States from "./assets/districts.json";
import { groupBy as _groupBy } from "lodash";

const { Option } = Select;

function getConfirmedArray(grouped_data, selectedState, type) {
  const confirmArray = [];
  for (var key of Object.keys(grouped_data)) {
    if (key === selectedState && type === 1) {
      grouped_data[key].forEach((item) => {
        confirmArray.push(Number(item.Confirmed));
      });
    } else if (key === selectedState && type === 2) {
      grouped_data[key].forEach((item) => {
        confirmArray.push(Number(item.Recovered));
      });
    } else if (key === selectedState && type === 3) {
      grouped_data[key].forEach((item) => {
        confirmArray.push(Number(item.Deceased));
      });
    }
  }
  return confirmArray;
}

function StateWise(props) {
  const { StackedData = [] } = props;
  const grouped_data = _groupBy(StackedData, "State");

  // console.log(grouped_data);
  const [selectedState, updateSelectedState] = React.useState(
    "Andaman and Nicobar Islands"
  );
  const [confirmCasesArray, updateConfirmCases] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 1)
  );
  const [recoveredArray, updateRecoveredCases] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 2)
  );
  const [deathsArray, updateDeathCases] = React.useState(
    getConfirmedArray(grouped_data, selectedState, 3)
  );

  React.useEffect(() => {
    (async () => {
      // updateConfirmCases(confirm_array);
    })();
  });
  const handleChange = (value) => {
    const new_confirm_array = getConfirmedArray(grouped_data, value, 1);
    const new_recovered_array = getConfirmedArray(grouped_data, value, 2);
    const new_deaths_array = getConfirmedArray(grouped_data, value, 3);
    console.log(new_confirm_array);
    console.log(new_recovered_array);
    console.log(new_deaths_array);
    updateConfirmCases(new_confirm_array);
    updateRecoveredCases(new_recovered_array);
    updateDeathCases(new_deaths_array);
  };

  const { RangePicker } = DatePicker;
  return (
    <>
      <div className="App">
        <div className="posts"></div>
      </div>

      <div className="w-100 text-center mb-3 ">
        <div className="d-inline-flex">
          <Select
            defaultValue="Select a state"
            style={{ width: 120 }}
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

          <div className="margin-bet"></div>
          <RangePicker className="ml-5" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card border-primary mb-3">
            <div class="card-body text-primary">
              <h5 class="card-title text-primary">Confirmed Cases: 123456</h5>
            </div>
          </div>{" "}
          <ConfirmedGraph
            StateData={StateData}
            confirmArray={confirmCasesArray}
          />{" "}
          <div className="card border-success mb-3">
            <div class="card-body text-success">
              <h5 class="card-title text-success">Recovered Cases: 123456</h5>
            </div>
          </div>
          <Recovered StateData={StateData} recoveredArray={recoveredArray} />
          <div className="card border-danger mb-3">
            <div class="card-body text-danger">
              <h5 class="card-title text-danger">Deceased Cases: 123456</h5>
            </div>
          </div>
          <Deceased StateData={StateData} deathsArray={deathsArray} />{" "}
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          {" "}
          <Bar Data={Data} />
          <Donut />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <Comparison StateData={StateData} />
        </div>{" "}
        <div className="col-md-4">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one country"
            defaultValue={["china"]}
            onChange={handleChange}
            optionLabelProp="label"
          >
            <Option value="china" label="China">
              <div className="demo-option-label-item">
                <span role="img" aria-label="China">
                  🇨🇳
                </span>
                China (中国)
              </div>
            </Option>
            <Option value="usa" label="USA">
              <div className="demo-option-label-item">
                <span role="img" aria-label="USA">
                  🇺🇸
                </span>
                USA (美国)
              </div>
            </Option>
            <Option value="japan" label="Japan">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Japan">
                  🇯🇵
                </span>
                Japan (日本)
              </div>
            </Option>
            <Option value="korea" label="Korea">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Korea">
                  🇰🇷
                </span>
                Korea (韩国)
              </div>
            </Option>
          </Select>
          <RangePicker className="ml-5" />
        </div>
      </div>
    </>
  );
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default StateWise;
