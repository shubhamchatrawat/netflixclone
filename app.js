const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req , res){
console.log(req.body.cityName);
   const query = req.body.cityName;
    const apikey = "76ffe81000b72ee8c66b23ddcb83bda0";
    const units = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apikey+ "&units=" + units;

   https.get(url , function(response){
 console.log(response.statusCode);
  response.on("data", function(data){
  const weatherData = JSON.parse(data)
  const temp = weatherData.main.temp
  const weatherDescription = weatherData.weather[0].description
  const icon = weatherData.weather[0].icon
  const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  console.log(weatherDescription);
  res.write("<p> weatherDescription: " +  weatherDescription + "<p>")
    res.write("<h1> temp in " +query + " is " +  temp + " degree celsious</h1>")
    res.write("<img src=" + imgURL + ">")
  res.send();
  })
  })

})

//https://api.openweathermap.org/data/2.5/weather?q=london&appid=76ffe81000b72ee8c66b23ddcb83bda0&units=metric


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
