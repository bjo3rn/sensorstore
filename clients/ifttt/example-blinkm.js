//BLINKM Example
//CHANGE ME: wait time between rule executions in ms
pollingInterval = 300;

//CHANGE ME:
//add sensors you are interested in
//available sensor ids are listed at http://husk.eecs.berkeley.edu:8080/list
//to view the format of a sensor entry, look at, for example: http://husk.eecs.berkeley.edu:8080/get?sid=sensortag_acc_51
sensors = ["imp_2362813643fc42ee_adc9"];

//CHANGE ME:
//add additional rules following the recipe below
//JSON with sensor values will be passed into the function
rules = [];
rules.push(function(values) {
    pagelog(values["imp_2362813643fc42ee_adc9"]["value"]);
    //simple rule that compares a value to a threshold
    if(values["imp_2362813643fc42ee_adc9"]["value"]>1.5) {
        $.get("https://agent.electricimp.com/yVAIjOdg9OL9",
        {rgb:"x00ff00"},
        function(data){});
        pagelog("green");
    } else {
        $.get("https://agent.electricimp.com/yVAIjOdg9OL9",
        {rgb:"xff0000"},
        function(data){});
        pagelog("red");
    }
});
