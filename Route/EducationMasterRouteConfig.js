var fileDao = '../Server/Dao/EmployeesDao.js';

function EmployeeRouteConfig(app) {
    this.app = app;
    this.routeTable = [];
    this.init();
}

EmployeeRouteConfig.prototype.init = function () {
    var self = this;
    this.addRoutes();
    this.processRoutes();
}

EmployeeRouteConfig.prototype.processRoutes = function () {
    var self = this;
    
    self.routeTable.forEach(function (route) {
        if (route.requestType == 'get') {
            
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'post') {         
            
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {         
            
            self.app.delete(route.requestUrl, route.callbackFunction);
        }
    });
}

EmployeeRouteConfig.prototype.addRoutes = function () {
    var self = this;
    
    //createEmployee
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/createEmployee',
        callbackFunction: function (request, response) {
            response.render('Employee/createEmployee', { title: "Create Employee" });
        }
    });

    //api/createEmployee
    self.routeTable.push({
        requestType : 'post',
        requestUrl : '/api/createEmployee',//api
        callbackFunction : function (request, response) {
            var EmployeeDao = require(fileDao);

            //console.log(request.body);

            EmployeeDao.EmployeeDao.createEmployee(request.body,
                function (status) {
                    response.json(status);
                    // console.log(status);
                });
        }
    });

    //viewEmployee
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/viewEmployee',
        callbackFunction : function (request, response) {
            response.render('Employee/viewEmployee', { title: "View Employee" });
        }
    });

    //viewEmployee By Id
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/viewEmployee/:EMP_ID',
        callbackFunction : function (request, response) {
            response.render('Employee/viewEmployeeById', { title: "View Employee" });
        }
    });

    //api/getAllEmployee
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/api/getAllEmployee',//api - fine
        callbackFunction : function (request, response) {
            var EmployeeDao = require(fileDao);

            EmployeeDao.EmployeeDao.getAllEmployee (
                function (EmployeeArr) {
                    // console.log(EmployeeArr);
                    response.json({ EmployeeArr : EmployeeArr });
                });
        }
    });

    //editEmployee
    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/editEmployee/:EMP_ID',
        callbackFunction: function (request, response) {
            response.render('Employee/editEmployee', {title: "Edit Employee"});
        }
    });

    //api/getEmployeeById
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/api/getEmployeeById/:EMP_ID',//api
        callbackFunction : function (request, response) {
            var EmployeeDao = require(fileDao);

            EmployeeDao.EmployeeDao.getEmployeeById(request.params.Employee_id,
                function (EmployeeArr) {
                    // console.log(EmployeeArr);
                    response.json({ EmployeeArr : EmployeeArr });
            });
        }
    });

    //api/updateEmployee
    self.routeTable.push({
        requestType: 'post',
        requestUrl: '/api/updateEmployee',//api
        callbackFunction: function (request, response) {

            var EmployeeDao = require(fileDao);
            EmployeeDao.EmployeeDao.updateEmployee(request.body.NAME, request.body.EMAILID, request.body.PHONENO, request.body.EMP_ID,
                function (status) {
                    // console.log(status);
                    response.json(status);
            });
        }
    });

    self.routeTable.push({
        requestType: 'delete',
        requestUrl: '/api/deleteEmployeeById/:EMP_ID',//api
        callbackFunction: function (request, response) {
            // console.log(request.params.EMP_ID);

            var EmployeeDao = require(fileDao);
            EmployeeDao.EmployeeDao.deleteEmployeeById(request.params.EMP_ID,
                function (status) {
                    // console.log(status);
                    response.json(status);
                });
        }
    });
}

module.exports = EmployeeRouteConfig;