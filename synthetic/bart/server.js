// synthetic sensor that retrieves weather info from Bart's real time API and posts it to sensorstore

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var sid = "bart_berkeley_departures";
var bartURL = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=DBRK&key=MW9S-E7SL-26DU-VV8V";
var ssURL = "http://husk.eecs.berkeley.edu:8080/set?";
var parseString = require('xml2js').parseString;
function postBartData() {
      console.log("retrieving BART data...");
      http.get(bartURL,function(response) {
      var completeResponse = '';
      response.on('data', function (chunk) {
            completeResponse += chunk;
        });
      response.on('end', function() {
            
            parseString(completeResponse, function(err,result) {
              //var etd = result.root.station[0].etd[0];
              var assocArray = {sid:sid, source:"api.bart.gov"};
              //this can be "leaving!"
              assocArray[result.root.station[0].etd[0].estimate[0].direction] = result.root.station[0].etd[0].estimate[0].minutes;              
              assocArray[result.root.station[0].etd[1].estimate[0].direction] = result.root.station[0].etd[1].estimate[0].minutes;  
              
              
              var query = querystring.stringify(assocArray);
              //console.dir(result.root.station[0].etd[0].estimate[0].minutes);
              console.log(query);
              //post it to sensor store
              
            http.get(ssURL+query, function(res){
            if(res.statusCode == 200) {
              console.log("posted bart times successfully.");
            }
            res.on('data',function(res){});
          });

            });
      });
    });
         
          
      
}
postBartData();
setInterval(postBartData,60000);