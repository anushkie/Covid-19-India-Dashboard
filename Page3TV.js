import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBy as _groupBy } from "lodash";
import { Card, Col, Row } from "antd";
import { Select } from "antd";
import { DatePicker, Space } from "antd";
import addTreemapModule from "highcharts/modules/treemap";
import highcharts3d from "highcharts/highcharts-3d";
import Map from "./IndiaMap";

require("highcharts/modules/map")(Highcharts);

highcharts3d(Highcharts);
addTreemapModule(Highcharts);

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function Page3TV() {
  const { RangePicker } = DatePicker;

  const option = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Historic World Population by Region",
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1800",
        data: [107, 31, 635, 203, 2],
      },
      {
        name: "Year 1900",
        data: [133, 156, 947, 408, 6],
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 727, 31],
      },
      {
        name: "Year 2016",
        data: [1216, 1001, 4436, 738, 40],
      },
    ],
  };

  const option2 = {
    series: [
      {
        type: "treemap",
        allowDrillToNode: true,
        layoutAlgorithm: "squarified",
        data: [
          { id: 1, name: "foo", value: Math.random() * 3 },
          { id: 2, name: "child of foo", value: Math.random() * 3, parent: 1 },
          {
            id: 3,
            name: "another child of foo",
            value: Math.random() * 3,
            parent: 1,
          },
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

      <div className="row">
        <div className="col-md-6">
          <HighchartsReact
            options={mapOptions}
            constructorType={"mapChart"}
            highcharts={Highcharts}
          />
        </div>
        <div className="col-md-6">
          <HighchartsReact highcharts={Highcharts} options={option} />
          <HighchartsReact highcharts={Highcharts} options={option2} />
        </div>
      </div>
      <div className="row">
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
      <RangePicker className="ml-5" />
    </>
  );
}

export default Page3TV;
