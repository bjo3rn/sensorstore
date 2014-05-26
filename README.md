# sensorstore

A REST-based server for storing timestamped sensor data from multiple wireless nodes. Built for the Swarm Lab May 2014 prototyping activity. Also contains some sample applications for accessing the server and working with the data

* /server - the server, written in node.js / sails.js with a mongodb batabase backend
* /clients - some client applications:
  * /sensorvis - a timeseries visulalization of a given sensor, build in d3.js
  * /ifttt - a rule-based system that reads sensor data and takes actions based on the latest readings


## REST API

### /help
A page showing all available API commands

### /set

/set?sid=s&param1=value1&param2=value2... - save a new sensor entry for sensor id s with param1=value2, param2=value2 etc.

Entries will be automatically timestamped. Responses return a JSON object corresponding to the inserted entry.

Example Request:

	http://husk.eecs.berkeley.edu:8080/set?sid=accelerometer1&x=123.4&y=45.3&z=34.2

Example Response:

	{
	  "sid": "accelerometer1",
	  "x": "123.4",
	  "y": "45.3",
	  "z": "34.2",
	  "createdAt": "2014-05-23T09:22:42.679Z",
	  "updatedAt": "2014-05-23T09:22:42.679Z",
	  "id": 849
	}

### /get

/get?sid=s&n=n - retrieve entries from the store, most recent first.
If sid is provided, retrieves entires for that sensor id. If n is provided, retrieves n entries, in descending timestamp order (most recent first). If n is omitted, n=1 is assumed and only the one entry is returned.

#### Example Requests:

	http://husk.eecs.berkeley.edu:8080/get - returned the latest single reading in the database (could be any sensor)
	http://husk.eecs.berkeley.edu:8080/get?sid=temp1 - returns the latest single reading for the sensor "temp1"
	http://husk.eecs.berkeley.edu:8080/get?sid=temp1&n=3 - returns the latest 3 readings for the sensor "temp1" (output shown below)
	http://husk.eecs.berkeley.edu:8080/get?n=10 - returns the latest 10 readings submitted by any sensors

#### Example Output:

	[
	  {
	    "sid": "temp1",
	    "value": "0.287017",
	    "createdAt": "2014-05-23T09:20:14.532Z",
	    "updatedAt": "2014-05-23T09:20:14.532Z",
	    "id": 701
	  },
	  {
	    "sid": "temp1",
	    "value": "0.278277",
	    "createdAt": "2014-05-23T09:20:13.529Z",
	    "updatedAt": "2014-05-23T09:20:13.529Z",
	    "id": 700
	  },
	  {
	    "sid": "temp1",
	    "value": "0.283031",
	    "createdAt": "2014-05-23T09:20:12.525Z",
	    "updatedAt": "2014-05-23T09:20:12.525Z",
	    "id": 699
	  }
	]

### /list

Returns a list of all unique sensor ids (sid) in the store as a JSON array.

#### Example Response

	[
	  "temp1",
	  "accelerometer1"
	]
