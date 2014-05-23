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
    	Sensors.find({sid: sid}).limit(1).sort('createdAt DESC').done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    } else {
    	//return the latest across all sensors
    	Sensors.find().limit(1).sort('createdAt DESC').done(function(err, reading) {
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
   	if(!n) {n=10};
   	
   	if(sid) {
   		
    	Sensors.find({sid: sid}).limit(n).sort('createdAt DESC').done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    } else {
    	//return the latest across all sensors
    	Sensors.find().limit(n).sort('createdAt DESC').done(function(err, reading) {
    		if(reading === undefined) return res.notFound();
    		if (err) return next(err);
    		return res.json(reading);
    	});
    }
  },

  /**
   * Action blueprints:
   *    `/sensors/tail`
   */
   keys: function (req, res) {
    Sensors.find().done(function(err,all){
		if (err) return next(err);
    	return res.json(_und.uniq(_und.pluck(all,'sid')));
    });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SensorsController)
   */
  _config: {}

  
};
