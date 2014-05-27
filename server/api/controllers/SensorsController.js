/**
 * SensorsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var _und = require('underscore');
var http = require('http');
var querystring = require('querystring');

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/sensors/latest`
   */
   latest: function (req, res) {
   	var sid = req.param("sid");
   	if(sid) {
   		//return the latest single reading for a sensor
    	Sensors.find({sid: sid}).sort('createdAt DESC').limit(1).done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    } else {
    	//return the latest across all sensors
    	Sensors.find().sort('createdAt DESC').limit(1).done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    }
  },


  /**
   * Action blueprints:
   *    `/sensors/tail`
   *    ?sid=<sid>&n=<max number of entries>
   */
   tail: function (req, res) {
    var sid = req.param("sid");
    var n = parseInt(req.param("n"));
   	if(!n) {n=1};
   	
   	if(sid) {
   		
    	Sensors.find({sid: sid}).sort('createdAt DESC').limit(n).done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    } else {
    	//return the latest across all sensors
    	Sensors.find().sort('createdAt DESC').limit(n).done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    }
  },

  /**
   * Action blueprints:
   *    `/sensors/list`
   */
   list: function (req, res) {
	/*MongoDB Specific, FAST */
	Sensors.native(function(err, collection) {
	    // Execute any query that works with the mongo js driver
	    collection.distinct("sid",function(err, docs) {
	        return res.json(docs.sort());
	    });
	});
	/* Generic, but SLOW
    Sensors.find().done(function(err,all){
		if (err) return next(err);
    	return res.json(_und.uniq(_und.pluck(all,'sid')));
    });
	*/
  },

  
  //create is more flexible, but this is to have compatibility with Edward's server 
  set: function(req,res,next) {
  	Sensors.create(req.query).done(function(err,entry){
  		// Error handling
  		if (err) {
  			console.log(err);
    		return next(err);
		// The User was created successfully!
  		}else {
			//let Edward's ptango know
			Object.keys(req.query).forEach(function(key){
				
				if ((key!="sid") && (key!="createdAt") && (key!="updatedAt")){
					var idSuffix="";
					if (key=="value") {
						idSuffix="";
					} else {
						idSuffix="_"+key;
					}
					var newQuery = {'id' : req.query['sid']+idSuffix, 'value': req.query[key]};
					//
					console.log(newQuery);				
					var options = {
					  host: 'ptango.eecs.berkeley.edu',
					  port: 8077,
					  path: '/keyvalue/set?'+querystring.stringify(newQuery)
					};

					http.get(options, function(resp){
					  resp.on('data', function(chunk){
					    //do something with chunk
					  });
					}).on("error", function(e){
					  console.log("Got error when posting to ptango: " + e.message);
					});
				}
			})
			
    		return res.json(entry);
  		}

  	});
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SensorsController)
   */
  _config: {}

  
};
