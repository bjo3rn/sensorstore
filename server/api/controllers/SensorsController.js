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
_und = require('underscore');
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
    Sensors.find().done(function(err,all){
		if (err) return next(err);
    	return res.json(_und.uniq(_und.pluck(all,'sid')));
    });
  },

  
  /** /create is more flexible, but this is to have compatibility with Edward's server 
  set: function(req,res,next) {
  	Sensors.create(req.query).done(function(err,entry){
  		// Error handling
  		if (err) {
  			console.log(err);
    		return next(err);
		// The User was created successfully!
  		}else {
    		return res.json(entry);
  		}

  	});
  },
*/


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SensorsController)
   */
  _config: {}

  
};