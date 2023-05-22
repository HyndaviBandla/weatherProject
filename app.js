const express = require("express");
const https = require("https");
const bodyParse = require("body-parser");
const { dirname } = require("path");
const bodyParser = require("body-parser");
// here no need to install https in terminal as by dfault it comes with node
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const place = req.body.cityName;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    place +
    "&appid=797d3b8eb34d9bcacb53c43e6ad3c881&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      //getting hold of the data from the response and then parse the json data that we get back in to an actual js object
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].id;
      const weatherDescryption = weatherData.weather[0].description;
      const imgURL =
        "https://api.openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<p>the weather condition in " +
          place +
          " is" +
          weatherDescryption +
          "</p>"
      );

      res.write(
        "<h1>The temperature in " +
          place +
          " is" +
          temp +
          "degrees celcius</h1>"
      );
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("server is running on port 3000");
});
