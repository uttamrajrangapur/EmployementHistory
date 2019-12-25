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
        this.tableName = 'employee_history';
    }

    async insertIntoEmployeeHistory(employeeId,CompanyId,status){
        let id = uuid.v4();
        let result;
        try {
            result = await db.one(`insert into ${this.tableName}(id,employee_id,company_id,status) values($1,$2,$3,$4) returning id`,[id,employeeId,CompanyId,status]);
        } catch (error) {
            throw error;
        }
        result = _.values(result);
        console.log(result);
        return result;
    }

    async getLatestStatusByEmployeeId(employeeId){
        let result = null;
        try {
            result = await db.one(`select status from  ${this.tableName} where employee_id = $1 order by created_date desc limit 1`,[employeeId]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

    async getEmploymentHistoryByEmployeeId(employeeId){
        let result = null;
        try {
            result = await db.any(`select company_id,status,created_date from  ${this.tableName} where employee_id = $1 order by created_date asc`,[employeeId]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

}

// let dataAccessHelper = new DataAccessHelper();
// dataAccessHelper.insertIntoEmployeeHistory('6add4243-c410-4d59-a69d-f205184c4739','6add4243-c410-4d59-a69d-f205184c4731','joined').then(()=>{});
// dataAccessHelper.insertIntoEmployeeHistory('6add4243-c410-4d59-a69d-f205184c4739','6add4243-c410-4d59-a69d-f205184c4731','left').then(()=>{});
// dataAccessHelper.insertIntoEmployeeHistory('6add4243-c410-4d59-a69d-f205184c4739','6add4243-c410-4d59-a69d-f205184c4732','joined').then(()=>{});
// dataAccessHelper.getLatestStatusByEmployeeId('6add4243-c410-4d59-a69d-f205184c4739').then(()=>{});
// dataAccessHelper.getEmploymentHistoryByEmployeeId('6add4243-c410-4d59-a69d-f205184c4739').then(()=>{});
module.exports = DataAccessHelper
