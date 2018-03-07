/* SQL Queries */
var connectionProvider = require('../mysqlConnectionStringProvider.js');//path

var table_name = 'Employee';

var EmployeeDao = {

	createEmployee: function (Employee, OnSuccessfulCallback) {//
		var insertStatement = "INSERT INTO " + table_name + " SET ?";

		var EmployeeArr = {
			//ColumnName: Employee...
			EMP_ID: Employee.EMP_ID,
			NAME: Employee.NAME,
			EMAILID: Employee.EMAILID,
			PHONENO: Employee.PHONENO
		};

		console.log(EmployeeArr);

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();//from mysqlConnectionStringProvider.js

		if (connection) {
			connection.query(insertStatement, EmployeeArr, function (err, result) {
				if (err) { }

				OnSuccessfulCallback({status: 'successful'});
			
				// console.log(result)
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	getAllEmployee: function (callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM " + table_name + " ORDER BY EMP_ID DESC";

		if (connection) {
			connection.query(queryStatement, function (err, rows, fields) {
				if (err) { throw err; }

				// console.log(rows);

				callback(rows);
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	}
	,

	getEmployeeById : function (EMP_ID, callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM " + table_name + " WHERE EMP_ID = ?";

		if(connection) {
			connection.query(queryStatement, [EMP_ID], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);//working

				callback(rows);
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	updateEmployee: function(EMP_ID, NAME, EMAILID, PHONENO, callback) {
		//works fine here
		if(NAME == undefined) NAME = 'Santosh';//just debugging

		// console.log('Updated: '+NAME + hosting);

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "UPDATE " + table_name + " SET NAME = ? , EMAILID = ?, PHONENO = ? WHERE EMP_ID = ?";

		if(connection) {
			connection.query(queryStatement, [NAME, EMAILID, PHONENO, EMP_ID], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);

				if (rows) {
					callback({ status: 'successful' })
				}
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}

	},

	deleteEmployeeById: function(EMP_ID, callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "DELETE FROM " + table_name + " WHERE EMP_ID = ?";

		if(connection) {
			connection.query(queryStatement, [EMP_ID], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);

				if (rows) {
					callback({ status: 'successful' })
				}
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	}
};

module.exports.EmployeeDao = EmployeeDao;