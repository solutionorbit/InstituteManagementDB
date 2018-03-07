var express = require('express');  
var bodyparser = require('body-parser');  
  
// creating server instance  
var app = express();  
  
// for posting nested object if we have set extended true  
app.use(bodyparser.urlencoded({ extended : true}));  
  
// parsing JSON  
app.use(bodyparser.json());  

var employeeRoute = require('./Route/EducationMasterRouteConfig.js');
//set application route with server instance  
new employeeRoute(app);  
  
// listening application on port 3000  
var server = app.listen(3000, function(){  
    console.log('Server Listening on port ' + server.address().port);  
}); 