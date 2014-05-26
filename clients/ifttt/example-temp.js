//CHANGE ME: wait time between rule executions in ms
pollingInterval = 1000;

//CHANGE ME:
//add sensors you are interested in
//available sensor ids are listed at http://husk.eecs.berkeley.edu:8080/list
//to view the format of a sensor entry, look at, for example: http://husk.eecs.berkeley.edu:8080/get?sid=sensortag_acc_51
sensors = ["weather_berkeley_ca","sensortag_51_temperature"];

//CHANGE ME:
//add additional rules following the recipe below
//JSON with sensor values will be passed into the function
rules = [];
rules.push(function(values) {
    //compare temperature from weather API (outside) to sensortag temperature (inside)
    if(values["weather_berkeley_ca"]["temp"]>values["sensortag_51_temperature"]["temperature"]) {
        pagelog("It's warmer outside.");
    } else {
        pagelog("It's colder outside.");
    }
});

rules.push(function(values) {
    //compare humidity from weather API (outside) to sensortag humidity (inside)
    if(values["weather_berkeley_ca"]["humidity"]>values["sensortag_51_temperature"]["humidity"]) {
        pagelog("It's more humid outside.");
    } else {
        pagelog("It's less humid outside.");
    }
});