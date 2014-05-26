// synthetic sensor that retrieves weather info from openweathermap API and posts it to sensorstore

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var sid = "weather_berkeley_ca";
var owmURL = "http://api.openweathermap.org/data/2.5/weather?q=Berkeley,ca&units=imperial";
var ssURL = "http://husk.eecs.berkeley.edu:8080/set?";

function postWeather() {
      console.log("retrieving weather...");
      http.get(owmURL,function(res) {
    if(res.statusCode == 200) {
      res.on('data', function (data) {
          var json = JSON.parse(data);
          
          //post it to sensor store
          var query = querystring.stringify({sid:sid, temp:json.main.temp, humidity: json.main.humidity, pressure:json.main.pressure, windspeed: json.wind.speed, windgust: json.wind.gust, description: json.weather[0].description, source:"api.openweathermap.org"});
          console.log(query);
          http.get(ssURL+query, function(res){
            if(res.statusCode == 200) {
              console.log("posted weather successfully.");
            }
            res.on('data',function(res){});
          });
      });
    }
  }).on('error', function(e) {
      console.log("Got error when retrieving weather: " + e.message);
  });
}

setInterval(postWeather,60000);