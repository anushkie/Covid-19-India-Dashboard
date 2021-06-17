// import confirmedData from "./assets/case_time_series.json";

const express = require("express");
const confirmedData = require("./assets/case_time_series.json");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,token,authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  // eslint-disable-next-line
  if ("OPTIONS" === req.method) {
    res.status(204).end();
  } else {
    next();
  }
});

app.get("/confirm-cases", function (req, res) {
  res.json({ confirmedData });
});

app.get("/confirm-deaths", function (req, res) {
  res.json({ confirmedData });
});

app.get("/confirm-recovered", function (req, res) {
  res.json({ confirmedData });
});

app.get("/confirm-vaccinated", function (req, res) {
  res.json({ confirmedData });
});

app.listen(5500, function () {
  console.log("server started  on port 3000....");
});
