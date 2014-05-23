# sensorstore
### a Sails application

## REST API
/sensors/list - lists all sid keys
/sensors/create?sid=x&param1=y&param2=z... - create a new sensor reading entry for sensor with sid=x and the given parameters
/sensors/latest?sid=x return the latest reading for sensor with sid x
/sensors/tail?sid=x&n=y return the y latest readings for sensor with sid x [n defaults to 10]
/sensors show all readings

/help - shows a help file

Alias:
/get -> latest
/set -> create