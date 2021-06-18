import "./App.css";
import React from "react";
import Nested from "./Nested";
import Chart1 from "./Chart1";
import Chart2 from "./chart2";
import Map from "./Map_pg1";
import ChartTest from "./Page1ConfirmedGraph";
import Card2 from "./Page1ActiveGraph";
import Card4 from "./Page1DeceasedGraph";
import Card3 from "./Page1VaccineGraph.js";
import Compare from "./ComparisonGraphPg1";
import Line from "./line";
import Data from "./assets/district_wise.json";
import confirmedData from "./assets/case_time_series.json";
import vaccineData from "./assets/cowin_vaccine_data_statewise.json";
import { Tabs } from "antd";
import { DatePicker, Space } from "antd";
import StateWise from "./StateWise";
import { Card } from "antd";
import monthlyData from "./assets/monthly data.json";
import Page3 from "./Page3TV";
import VaccineDataState from "./assets/cowin_vaccine_data_districtwise.json";
import StackedData from "./assets/districts.json";
import Bubble from "./BubbleChart";
import Page3TV from "./Page3TV";
import Vaccine from "./Vaccine";

function App() {
  //console.log(Data);
  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Cummulative" key="1">
          {/* <div className="w-100 text-center mb-3">
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </div> */}
          <div className="row">
            <div className="col-md-4 col-border">
              {" "}
              <Map StackedData={StackedData} />{" "}
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <ChartTest confirmedData={confirmedData} />
                </div>
                <div className="col-md-6">
                  <Card2 confirmedData={confirmedData} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Card3 vaccineData={vaccineData} />
                </div>
                <div className="col-md-6">
                  <Card4 confirmedData={confirmedData} />
                </div>
              </div>

              <div className="col-md-12">
                {" "}
                <Compare monthlyData={monthlyData} />{" "}
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="State" key="2">
          <StateWise StackedData={StackedData} />
        </TabPane>
        <TabPane tab="Testing" key="3">
          <Page3TV />
        </TabPane>
        <TabPane tab="Vaccination" key="4">
          <Vaccine />
        </TabPane>
      </Tabs>
    </>
  );
}

function callback(key) {
  console.log(key);
}

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default App;
