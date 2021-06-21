import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import IndiaMap from "./IndiaMap";
import { groupBy as _groupBy, filter as _filter } from "lodash";
import { Card, Col, Row, Tabs } from "antd";
import * as moment from "moment";
//file for data manipulation
import testing_data from "./assets/statewise_tested_numbers_data.json";
import Page5 from "./Page5Comparison";

const { Option } = Select;
const { TabPane } = Tabs;

function getStateTestingData(selectedState) {
  const selectedStateData = _filter(testing_data, function (td) {
    return td.State === selectedState;
  });
  return selectedStateData;
}

function Vaccine() {
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
  let positveCases = 0;
  let negativeCases = 0;
  let unconfirmedCases = 0;
  selectedStateData.forEach((item) => {
    item.mmYYYY = moment(item["Updated On"], "DD/MM/YYYY").format("YYYY/MM");
    if (item.Positive === "") {
      positveCases += 0;
    } else {
      positveCases += Number(item.Positive);
    }

    if (item.Negative === "") {
      negativeCases += 0;
    } else {
      negativeCases += Number(item.Negative);
    }
    if (item.Unconfirmed === "") {
      unconfirmedCases += 0;
    } else {
      unconfirmedCases += Number(item.Unconfirmed);
    }
    if (item["Total Tested"] === "") {
      item.tillDateTested = 0;
    } else {
      item.tillDateTested = Number(item["Total Tested"]);
    }
  });
  const grouped_data = _groupBy(selectedStateData, "mmYYYY");
  const x_categories = [];
  const seriesData = [];
  for (var key of Object.keys(grouped_data)) {
    x_categories.push(key);
    const maximum = Math.max.apply(
      Math,
      grouped_data[key].map(function (o) {
        return o.tillDateTested;
      })
    );
    seriesData.push(maximum);
  }
  const option = {
    chart: {
      type: "area",
    },
    title: {
      text: "Historic and Estimated Worldwide Population Growth by Region",
    },
    subtitle: {
      text: "Source: Wikipedia.org",
    },
    xAxis: {
      categories: x_categories,
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        text: "Billions",
      },
      labels: {
        formatter: function () {
          return this.value / 1000;
        },
      },
    },
    tooltip: {
      split: true,
      valueSuffix: " millions",
    },
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
        name: "Test Numbers",
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
          ["Positive", positveCases],
          ["Negative", negativeCases],
          ["Unconfirmed", unconfirmedCases],
        ],
      },
    ],
  };

  const option3 = {
    chart: {
      type: "area",
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 30,
        depth: 200,
      },
    },
    title: {
      text: "Visual comparison of Mountains Panorama",
    },
    yAxis: {
      title: {
        text: "Height Above Sea Level",
        x: -40,
      },
      labels: {
        format: "{value:,.0f} MAMSL",
      },
      gridLineDashStyle: "Dash",
    },
    xAxis: [
      {
        visible: false,
      },
      {
        visible: false,
      },
      {
        visible: false,
      },
    ],
    plotOptions: {
      area: {
        depth: 100,
        marker: {
          enabled: false,
        },
        states: {
          inactive: {
            enabled: false,
          },
        },
      },
    },
    tooltip: {
      valueSuffix: " MAMSL",
    },
    series: [
      {
        name: "Tatra Mountains visible from Rusinowa polana",
        lineColor: "rgb(180,90,50)",
        color: "rgb(200,110,50)",
        fillColor: "rgb(200,110,50)",
        data: [
          ["Murań", 1890],
          ["Nowy Wierch", 2009],
          ["Hawrań", 2152],
          ["Płaczliwa Skała", 2142],
          ["Szalony Wierch", 2061],
          ["Karczmarski Wierch", 1438],
          ["Jagnięcy Szczyt", 2230],
          ["Czerwona Turnia", 2284],
          ["Kołowy Szczyt", 2418],
          ["Czarny Szczyt", 2429],
          ["Baranie Rogi", 2526],
          ["Śnieżny Szczyt", 2465],
          ["Lodowy Szczyt", 2627],
          ["Lodowa Kopa", 2602],
          ["Szeroka Jaworzyńska", 2210],
          ["Horwacki Wierch", 1902],
          ["Spismichałowa Czuba", 2012],
          ["Zielona Czuba", 2130],
          ["Wielicki Szczyt", 2318],
          ["Gerlach", 2655],
          ["Batyżowiecki Szczyt", 2448],
          ["Kaczy Szczyt", 2395],
          ["Zmarzły Szczyt", 2390],
          ["Kończysta", 2538],
          ["Młynarz", 2170],
          ["Ganek", 2462],
          ["Wysoka", 2547],
          ["Ciężki Szczyt", 2520],
          ["Rysy", 2503],
          ["Żabi Mnich", 2146],
          ["Żabi Koń", 2291],
          ["Żabia Turnia Mięguszowiecka", 2335],
          ["Wołowa Turnia", 2373],
        ],
      },
      {
        xAxis: 1,
        lineColor: "rgb(120,160,180)",
        color: "rgb(140,180,200)",
        fillColor: "rgb(140,180,200)",
        name: "Dachstein panorama seen from Krippenstein",
        data: [
          ["Kufstein", 2049],
          ["Hohe Wildstelle", 2746],
          ["Kleiner Miesberg", 2173],
          ["Großer Miesberg", 2202],
          ["Hochstein", 2543],
          ["Lackner Miesberg", 2232],
          ["Wasenspitze", 2257],
          ["Sinabell", 2349],
          ["Feister Scharte", 2198],
          ["Eselstein", 2556],
          ["Landfriedstein", 2536],
          ["Scheichenspitz", 2667],
          ["Schmiedstock", 2634],
          ["Gamsfeldspitze", 2611],
          ["Edelgriess", 2305],
          ["Koppenkarstein", 2863],
          ["Niederer Gjaidstein", 2483],
          ["Hoher Gjaidstein", 2794],
          ["Hoher Dachstein", 2995],
          ["Niederer Dachstein", 2934],
          ["Hohes Kreuz", 2837],
          ["Hoher Ochsenkogel", 2513],
        ],
      },
      {
        xAxis: 2,
        lineColor: "rgb(200, 190, 140)",
        color: "rgb(200, 190, 140)",
        fillColor: "rgb(230, 220, 180)",
        name: "Panorama from Col Des Mines",
        data: [
          ["Combin de la Tsessette", 4141],
          ["Grand Combin de Grafeneire", 4314],
          ["Combin de Corbassière", 3716],
          ["Petit Combin", 3672],
          ["Pointe de Boveire", 3212],
          ["Grand Aget", 3133],
          ["Mont Rogneux", 3084],
          ["Dents du Grand Lé", 2884],
          ["Monts Telliers", 2951],
          ["Grand Golliat", 3238],
          ["Mont Grande Rochère", 3326],
          ["Mont de la Fouly", 2871],
          ["Tête de la Payanne", 2452],
          ["Pointe Allobrogia", 3172],
          ["Six Blanc", 2334],
          ["Mont Dolent", 3820],
          ["Aiguille de Triolet", 3870],
          ["Le Tour Noir", 3836],
          ["Aiguille de l'A Neuve", 3753],
          ["Aiguille d'Argentière", 3900],
          ["Aiguille du Chardonnet", 3824],
          ["Aiguille du Tour", 3540],
          ["Aiguille du Pissoir", 3440],
          ["Le Catogne", 2598],
          ["Pointe de Prosom", 2762],
          ["Pointe Ronde", 2700],
          ["Mont Buet", 3096],
          ["Le Cheval Blanc", 2831],
          ["Pointe de la Finive", 2838],
          ["Pic de Tenneverge", 2985],
          ["Pointe d'Aboillon", 2819],
          ["Tour Sallière", 3220],
          ["Le Dôme", 3138],
          ["Haute Cime", 3257],
          ["Pierre Avoi", 2473],
          ["Cime de l'Est", 3178],
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
        mapData: IndiaMap,
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
                <center> Maharashtra</center>
              </h4>
            </div>
            <h5 class="card-title text-success">
              <center>262228293</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-primary mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-primary">
                <center>Uttar Pradesh</center>
              </h4>
            </div>
            <h5 class="card-title text-primary">
              <center>23412988</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-danger mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-danger">
                <center> Gujarat</center>
              </h4>
            </div>
            <h5 class="card-title text-danger">
              <center>20567167</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-warning mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-warning">
                <center> Rajasthan</center>
              </h4>
            </div>
            <h5 class="card-title text-warning">
              <center>19888081</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-dark mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-dark">
                <center> West Bengal</center>
              </h4>
            </div>
            <h5 class="card-title text-dark">
              <center>17854448</center>
            </h5>
          </div>
        </Col>
        <Col span={4}>
          <div className="card border-info mb-3" bordered={true}>
            <div class="card-header">
              <h4 class="card-title text-info">
                <center> Karnataka</center>
              </h4>
            </div>
            <h5 class="card-title text-info">
              <center>17243110</center>
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

              {/* <div className="margin-bet"></div>
              <RangePicker className="ml-5" /> */}
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
    </>
  );
}
export default Vaccine;
