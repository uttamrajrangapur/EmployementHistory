const initOptions = {
    // initialization options;
},
    _ = require("lodash"),
    cn = "postgres://employeeapp:employeeapp@localhost:5432/employee_database",
    

var bb = require('bluebird');
bb.config({longStackTraces: true});
const pgp = require('pg-promise')({promiseLib: bb});
db = pgp(cn);

class DataAccessHelper {
    constructor() { 
        this.db = pgp(cn);
    }

}

module.exports = DataAccessHelper
