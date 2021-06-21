import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import IndiaMap from "./IndiaMap";
import { groupBy as _groupBy, filter as _filter } from "lodash";

//data for vaccine
import VaccineData from "./assets/cowin_vaccine_data_statewise.json";
//data for testing
import TestingData from "./assets/statewise_tested_numbers_data.json";
//data for
import stateData from "./assets/state_wise_daily.json";
import StackedData from "./assets/districts.json";

const { Option } = Select;

function getStatesData(selectedStates, type) {
  const selectedStateData = _filter(StackedData, function (td) {
    return td.State === selectedStates[0] || td.State === selectedStates[1];
  });
  return selectedStateData;
}

function getStateTestingData(selectedStates) {
  const selectedStatesData = _filter(TestingData, function (td) {
    return td.State === selectedStates[0] || td.State === selectedStates[1];
  });
  return selectedStatesData;
}

function getStateVaccinationData(selectedStates) {
  const selectedStatesData = _filter(VaccineData, function (td) {
    return td.State === selectedStates[0] || td.State === selectedStates[1];
  });
  return selectedStatesData;
}

function Page5Comparison() {
  const [type, updateType] = React.useState("Confirmed");

  const [selectedStates, updateSelectedStates] = React.useState([
    "Delhi",
    "Goa",
  ]);

  const [selectedStatesData, updateSelectedStatesData] = React.useState(
    getStatesData(selectedStates)
  );

  const [selectedStateTestingData, updateSelectedStateTestingData] =
    React.useState(getStateTestingData(selectedStates));

  const [selectedStateVaccineData, updateSelectedStateVaccineData] =
    React.useState(getStateVaccinationData(selectedStates));

  const handleChange = (value) => {
    updateSelectedStates(value);
    if (value.length > 1) {
      updateSelectedStatesData(getStatesData(value));
    }
  };

  const handleTypeChange = (value) => {
    updateType(value);
  };
  const statesSeriesArray = [];
  const x_categories = [];
  selectedStatesData.forEach((item) => {
    item.mmYYYY = moment(item["Date"], "YYYY-MM-DD").format("YYYY/MM");
    if (item.Confirmed === "") {
      item.Confirmed = 0;
    } else {
      item.Confirmed = Number(item.Confirmed);
    }

    if (item.Deceased === "") {
      item.Deceased = 0;
    } else {
      item.Deceased = Number(item.Deceased);
    }
    if (item.Recovered === "") {
      item.Recovered = 0;
    } else {
      item.Recovered = Number(item.Recovered);
    }

    if (item.Tested === "") {
      item.Tested = 0;
    } else {
      item.Tested = Number(item.Tested);
    }
  });
  if (type === "Confirmed") {
    const state_grouped_data = _groupBy(selectedStatesData, "State");

    for (var key of Object.keys(state_grouped_data)) {
      const temp = [];
      const grouped_data = _groupBy(state_grouped_data[key], "mmYYYY");
      for (var key1 of Object.keys(grouped_data)) {
        x_categories.push(key1);
        const dis_grouped_data = _groupBy(grouped_data[key1], "District");
        let sum = 0;

        for (var key2 of Object.keys(dis_grouped_data)) {
          const maximum = Math.max.apply(
            Math,
            dis_grouped_data[key2].map(function (o) {
              return o.Confirmed;
            })
          );
          sum += maximum;
        }
        temp.push(sum);
      }
      statesSeriesArray.push(temp);
    }
  } else if (type === "Recovered") {
    const state_grouped_data = _groupBy(selectedStatesData, "State");

    for (var key of Object.keys(state_grouped_data)) {
      const temp = [];
      const grouped_data = _groupBy(state_grouped_data[key], "mmYYYY");
      for (var key1 of Object.keys(grouped_data)) {
        x_categories.push(key1);
        const dis_grouped_data = _groupBy(grouped_data[key1], "District");
        let sum = 0;

        for (var key2 of Object.keys(dis_grouped_data)) {
          const maximum = Math.max.apply(
            Math,
            dis_grouped_data[key2].map(function (o) {
              return o.Recovered;
            })
          );
          sum += maximum;
        }
        temp.push(sum);
      }
      statesSeriesArray.push(temp);
    }
  } else if (type === "Deceased") {
    const state_grouped_data = _groupBy(selectedStatesData, "State");

    for (var key of Object.keys(state_grouped_data)) {
      const temp = [];
      const grouped_data = _groupBy(state_grouped_data[key], "mmYYYY");
      for (var key1 of Object.keys(grouped_data)) {
        x_categories.push(key1);
        const dis_grouped_data = _groupBy(grouped_data[key1], "District");
        let sum = 0;

        for (var key2 of Object.keys(dis_grouped_data)) {
          const maximum = Math.max.apply(
            Math,
            dis_grouped_data[key2].map(function (o) {
              return o.Deceased;
            })
          );
          sum += maximum;
        }
        temp.push(sum);
      }
      statesSeriesArray.push(temp);
    }
  } else if (type === "Testing") {
    selectedStateTestingData.forEach((item) => {
      item.mmYYYY = moment(item["Updated On"], "DD/MM/YYYY").format("YYYY/MM");
      if (item["Total Tested"] === "") {
        item.tillDateTested = 0;
      } else {
        item.tillDateTested = Number(item["Total Tested"]);
      }
    });
    const state_grouped_data = _groupBy(selectedStateTestingData, "State");
    for (var key of Object.keys(state_grouped_data)) {
      const temp = [];
      const grouped_data = _groupBy(state_grouped_data[key], "mmYYYY");
      for (var key of Object.keys(grouped_data)) {
        x_categories.push(key);
        const maximum = Math.max.apply(
          Math,
          grouped_data[key].map(function (o) {
            return o.tillDateTested;
          })
        );
        temp.push(maximum);
      }
      statesSeriesArray.push(temp);
    }
  } else if (type === "Vaccination") {
    selectedStateVaccineData.forEach((item) => {
      item.mmYYYY = moment(item["Updated On"], "DD/MM/YYYY").format("YYYY/MM");
    });
    const state_grouped_data = _groupBy(selectedStateVaccineData, "State");
    for (var key of Object.keys(state_grouped_data)) {
      const temp = [];
      const grouped_data = _groupBy(state_grouped_data[key], "mmYYYY");
      for (var key of Object.keys(grouped_data)) {
        x_categories.push(key);
        const maximum = Math.max.apply(
          Math,
          grouped_data[key].map(function (o) {
            return o["Total Doses Administered"];
          })
        );
        temp.push(maximum);
      }
      statesSeriesArray.push(temp);
    }
  }

  const option1 = {
    title: {
      text: "",
    },

    yAxis: {
      title: {
        text: "Cases",
      },
    },

    xAxis: {
      categories: x_categories,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    series: [
      {
        name: selectedStates[0],
        data: statesSeriesArray[0],
      },
      {
        name: selectedStates[1],
        data: statesSeriesArray[1],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="row">
        <div className="w-100 text-center mb-3 ">
          <Select
            className="mr-2"
            mode="multiple"
            defaultValue="Select a state"
            style={{ width: 250 }}
            value={selectedStates}
            onChange={handleChange}
          >
            <Option
              value="Andaman and Nicobar Islands"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Andaman and Nicobar Islands")
                    ? false
                    : true
                  : false
              }
            >
              {" "}
              Andaman and Nicobar Islands
            </Option>
            <Option
              value="Andhra Pradesh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Andhra Pradesh")
                    ? false
                    : true
                  : false
              }
            >
              {" "}
              Andhra Pradesh{" "}
            </Option>
            <Option
              value="Arunachal Pradesh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Arunachal Pradesh")
                    ? false
                    : true
                  : false
              }
            >
              Arunachal Pradesh
            </Option>
            <Option
              value="Assam"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Assam")
                    ? false
                    : true
                  : false
              }
            >
              Assam
            </Option>
            <Option
              value="Bihar"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Bihar")
                    ? false
                    : true
                  : false
              }
            >
              Bihar
            </Option>
            <Option
              value="Chandigarh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Chandigarh")
                    ? false
                    : true
                  : false
              }
            >
              Chandigarh
            </Option>
            <Option
              value="Chhattisgarh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Chhattisgarh")
                    ? false
                    : true
                  : false
              }
            >
              Chhattisgarh
            </Option>
            <Option
              value="Dadra n Nagar Haveli"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Dadra n Nagar Haveli")
                    ? false
                    : true
                  : false
              }
            >
              Dadra and Nagar Haveli
            </Option>
            <Option
              value="Daman and Diu"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Daman and Diu")
                    ? false
                    : true
                  : false
              }
            >
              {" "}
              Daman and Diu
            </Option>
            <Option
              value="Delhi"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Delhi")
                    ? false
                    : true
                  : false
              }
            >
              Delhi
            </Option>
            <Option
              value="Goa"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Goa")
                    ? false
                    : true
                  : false
              }
            >
              Goa
            </Option>
            <Option
              value="Gujarat"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Gujarat")
                    ? false
                    : true
                  : false
              }
            >
              Gujarat
            </Option>
            <Option
              value="Haryana"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Haryana")
                    ? false
                    : true
                  : false
              }
            >
              Haryana
            </Option>
            <Option
              value="Himachal Pradesh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Himachal Pradesh")
                    ? false
                    : true
                  : false
              }
            >
              Himachal Pradesh
            </Option>
            <Option
              value="Jammu and Kashmir"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Jammu and Kashmir")
                    ? false
                    : true
                  : false
              }
            >
              Jammu and Kashmir
            </Option>
            <Option
              value="Jharkhand"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Jharkhand")
                    ? false
                    : true
                  : false
              }
            >
              Jharkhand
            </Option>
            <Option
              value="Karnataka"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Karnataka")
                    ? false
                    : true
                  : false
              }
            >
              Karnataka
            </Option>
            <Option
              value="Kerala"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Kerala")
                    ? false
                    : true
                  : false
              }
            >
              Kerala
            </Option>
            <Option
              value="Ladakh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Ladakh")
                    ? false
                    : true
                  : false
              }
            >
              Ladakh
            </Option>
            <Option
              value="Lakshadweep"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Lakshadweep")
                    ? false
                    : true
                  : false
              }
            >
              Lakshadweep
            </Option>
            <Option
              value="Madhya Pradesh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Madhya Pradesh")
                    ? false
                    : true
                  : false
              }
            >
              Madhya Pradesh
            </Option>
            <Option
              value="Maharashtra"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Maharashtra")
                    ? false
                    : true
                  : false
              }
            >
              Maharashtra
            </Option>
            <Option
              value="Manipur"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Manipur")
                    ? false
                    : true
                  : false
              }
            >
              Manipur
            </Option>
            <Option
              value="Meghalaya"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Meghalaya")
                    ? false
                    : true
                  : false
              }
            >
              Meghalaya
            </Option>
            <Option
              value="Mizoram"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Mizoram")
                    ? false
                    : true
                  : false
              }
            >
              Mizoram
            </Option>
            <Option
              value="Nagaland"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Nagaland")
                    ? false
                    : true
                  : false
              }
            >
              Nagaland
            </Option>
            <Option
              value="Odisha"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Odisha")
                    ? false
                    : true
                  : false
              }
            >
              Odisha
            </Option>
            <Option
              value="Puducherry"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Puducherry")
                    ? false
                    : true
                  : false
              }
            >
              Puducherry
            </Option>
            <Option
              value="Punjab"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Punjab")
                    ? false
                    : true
                  : false
              }
            >
              Punjab
            </Option>
            <Option
              value="Rajasthan"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Rajasthan")
                    ? false
                    : true
                  : false
              }
            >
              Rajasthan
            </Option>
            <Option
              value="Sikkim"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Sikkim")
                    ? false
                    : true
                  : false
              }
            >
              Sikkim
            </Option>
            <Option
              value="Tamil Nadu"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Tamil Nadu")
                    ? false
                    : true
                  : false
              }
            >
              Tamil Nadu
            </Option>
            <Option
              value="Telengana"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Telengana")
                    ? false
                    : true
                  : false
              }
            >
              Telengana
            </Option>
            <Option
              value="Tripura"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Tripura")
                    ? false
                    : true
                  : false
              }
            >
              Tripura
            </Option>
            <Option
              value="Uttar Pradesh"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Uttar Pradesh")
                    ? false
                    : true
                  : false
              }
            >
              Uttar Pradesh
            </Option>
            <Option
              value="Uttarakhand"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("Uttarakhand")
                    ? false
                    : true
                  : false
              }
            >
              Uttarakhand
            </Option>
            <Option
              value="West Bengal"
              disabled={
                selectedStates.length > 1
                  ? selectedStates.includes("West Bengal")
                    ? false
                    : true
                  : false
              }
            >
              West Bengal
            </Option>
          </Select>

          <Select
            className="ml-2"
            defaultValue="Select"
            style={{ width: 150 }}
            value={type}
            onChange={handleTypeChange}
          >
            <Option value="Testing"> Testing </Option>
            <Option value="Vaccination"> Vaccination </Option>
            <Option value="Confirmed"> Confirmed Cases </Option>
            <Option value="Recovered"> Recovered Cases </Option>
            <Option value="Deceased"> Deceased Cases </Option>
          </Select>
        </div>
      </div>

      <div className="row">
        <HighchartsReact highcharts={Highcharts} options={option1} />
      </div>
    </>
  );
}
export default Page5Comparison;
