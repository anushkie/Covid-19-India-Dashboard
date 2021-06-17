import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

const options = {
  series: [
    {
      name: "Profit",
      data: [100, 200, 30, 400, 50],
    },
  ],
};

function Nested() {
  return (
    <>
      <div className="row">
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </>
  );
}

export default Nested;
