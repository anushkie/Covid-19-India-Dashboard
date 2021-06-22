import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy, filter as _filter } from "lodash";
import { Card, Col, Row, Tabs } from "antd";
import { Select } from "antd";
import { DatePicker, Space } from "antd";
import addTreemapModule from "highcharts/modules/treemap";
import highcharts3d from "highcharts/highcharts-3d";
import * as moment from "moment";
import Map from "./IndiaMap";
//data for graphs
import vaccine_data from "./assets/cowin_vaccine_data_statewise.json";
const { TabPane } = Tabs;
require("highcharts/modules/map")(Highcharts);

highcharts3d(Highcharts);
addTreemapModule(Highcharts);

const { Option } = Select;

function getStateTestingData(selectedState) {
  const selectedStateData = _filter(vaccine_data, function (td) {
    return td.State === selectedState;
  });
  return selectedStateData;
}

function getDateTestingData(state, lowerLimit, upperLimit) {
  const selectedStateData = _filter(vaccine_data, function (td) {
    return (
      td.State === state &&
      moment(td["Updated On"], "DD/MM/YYYY") >= lowerLimit &&
      moment(td["Updated On"], "DD/MM/YYYY") <= upperLimit
    );
  });
  return selectedStateData;
}

function Page3TV() {
  const { RangePicker } = DatePicker;

  const [selectedState, updateSelectedState] = React.useState(
    "Andaman and Nicobar Islands"
  );

  const [selectedStateData, updateSelectedStateData] = React.useState(
    getStateTestingData(selectedState)
  );
  const handleChange = (value) => {
    updateSelectedState(value);
    updateSelectedStateData(getStateTestingData(value));
  };
  const handleDateChange = (value) => {
    if (value == null) {
      return;
    }
    updateSelectedStateData(
      getDateTestingData(selectedState, value[0], value[1])
    );
  };

  selectedStateData.forEach((item) => {
    item.mmYYYY = moment(item["Updated On"], "DD/MM/YYYY").format("DD/MM/YYYY");
  });

  const first_doses = Math.max.apply(
    Math,
    selectedStateData.map(function (o) {
      return o["First Dose Administered"];
    })
  );

  const second_doses = Math.max.apply(
    Math,
    selectedStateData.map(function (o) {
      return o["Second Dose Administered"];
    })
  );

  const grouped_data = _groupBy(selectedStateData, "mmYYYY");

  const x_categories = [];
  const seriesData = [];
  for (var key of Object.keys(grouped_data)) {
    x_categories.push(key);
    const maximum = Math.max.apply(
      Math,
      grouped_data[key].map(function (o) {
        return o["Total Doses Administered"];
      })
    );
    seriesData.push(maximum);
  }
  const option = {
    chart: {
      type: "area",
    },
    title: {
      text: "Vaccinationd",
    },
    xAxis: {
      categories: x_categories,
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
    },
    yAxis: {
      // title: {
      //   text: "Billions",
      // },
      // labels: {
      //   formatter: function () {
      //     return this.value / 1000;
      //   },
      // },
    },
    // tooltip: {
    //   split: true,
    //   valueSuffix: " millions",
    // },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666",
        },
      },
    },
    series: [
      {
        name: "Vaccination Numbers",
        data: seriesData,
      },
    ],
  };

  const option2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: `Result`,
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    // tooltip: {
    //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    // },
    // accessibility: {
    //   point: {
    //     valueSuffix: "%",
    //   },
    // },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        innerSize: "50%",
        data: [
          ["First Dose", first_doses],
          ["Second Dose", second_doses],
        ],
      },
    ],
  };

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
        mapData: Map,
        name: "Asia",
        data: data,
      },
    ],
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={4}>
          <div className="card border-success mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-success">
                <center>Uttar Pradesh</center>
              </h4>
            </div>
            <h5 class="card-title text-success">
              <center>53608270</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-primary mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-primary">
                <center>Maharashtra</center>
              </h4>
            </div>
            <h5 class="card-title text-primary">
              <center>38215492</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-danger mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-danger">
                <center> Karnataka</center>
              </h4>
            </div>
            <h5 class="card-title text-danger">
              <center>31791001</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-warning mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-warning">
                <center> Bihar</center>
              </h4>
            </div>
            <h5 class="card-title text-warning">
              <center>31429145</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-dark mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-dark">
                <center> Tamil Nadu</center>
              </h4>
            </div>
            <h5 class="card-title text-dark">
              <center>30138294</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-info mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-info">
                <center> Gujarat</center>
              </h4>
            </div>
            <h5 class="card-title text-info">
              <center>22794305</center>
            </h5>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="State" key="2">
          <div className="w-100">
            <HighchartsReact
              options={mapOptions}
              constructorType={"mapChart"}
              highcharts={Highcharts}
            />
          </div>
        </TabPane>
        <TabPane tab="Testing" key="3">
          <div className="w-100 text-center mb-3 ">
            <div className="d-inline-flex">
              <Select
                defaultValue="Select a state"
                style={{ width: 240 }}
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
                <Option value="Dadra n Nagar Haveli">
                  Dadra and Nagar Haveli
                </Option>
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
              <RangePicker className="ml-5" onChange={handleDateChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <HighchartsReact highcharts={Highcharts} options={option} />
            </div>
            <div className="col-md-6">
              <HighchartsReact highcharts={Highcharts} options={option2} />
            </div>
          </div>
        </TabPane>
      </Tabs>

      {/* <div className="row">
        <HighchartsReact highcharts={Highcharts} options={option3} />
      </div>
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
      <RangePicker className="ml-5" /> */}
    </>
  );
}

export default Page3TV;
