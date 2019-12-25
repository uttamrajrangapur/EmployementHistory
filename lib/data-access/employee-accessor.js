const _ = require("lodash"),
    cn = "postgres://employeeapp:employeeapp@localhost:5432/employee_database",
    uuid = require('uuid');
    

var bb = require('bluebird');
bb.config({longStackTraces: true});
const pgp = require('pg-promise')({promiseLib: bb});
db = pgp(cn);

class DataAccessHelper {
    constructor() { 
        this.db = pgp(cn);
        this.tableName = 'employees';
    }

    async insertIntoEmployees(name){
        let id = uuid.v4();
        let result;
        try {
            result = await db.one(`insert into ${this.tableName}(id,name) values($1,$2) returning id`,[id,name]);
        } catch (error) {
            throw error;
        }
        result = _.values(result);
        console.log(result);
        return result;
    }

    async getEmployeeIdByEmployeeName(name){
        let result = null;
        try {
            result = await db.one(`select id from  ${this.tableName} where name = $1`,[name]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        let employeeName = _.get(result,'id');
        console.log(employeeName);
        return employeeName;
    }

}

let dataAccessHelper = new DataAccessHelper();
dataAccessHelper.insertIntoEmployees('name4');
dataAccessHelper.getEmployeeIdByEmployeeName('name1');
module.exports = DataAccessHelper
