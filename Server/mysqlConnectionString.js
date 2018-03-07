var mysqlConnectionString = {
	connection :{
		dev : {
			host: '166.62.27.56',
			user: 'SantoshKumar',
			password : 'santosh120',
			database: 'EducationMaster'
		},

		qa: {
			host: '166.62.27.56',
			user: 'SantoshKumar',
			password : 'santosh120',
			database: 'EducationMaster'
		},

		prod: {
			host: '166.62.27.56',
			user: 'solutionorbit',
			password : 'SolutonOrbit',
			database: 'EducationMaster'
		}
	}
};

module.exports.mysqlConnectionString = mysqlConnectionString;