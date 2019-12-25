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
        this.tableName = 'company';
    }

    async insertIntoCompany(name,currentEmployees = { employee_id: []},pastEmployees = { employee_id: []}){
        let id = uuid.v4();
        let result;
        try {
            result = await db.one(`insert into ${this.tableName}(id,name,current_employees,past_employees) values($1,$2,$3,$4) returning id,name,current_employees,past_employees`,[id,name,currentEmployees,pastEmployees]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

    async getCompanyIdByCompanyName(name){
        let result;
        try {
            result = await db.one(`select id from ${this.tableName} where name = $1`,[name]);
        } catch (error) {
            throw error;
        }
        result = _.values(result);
        console.log(result);
        return result;
    }

    async updateCompany(id,name,currentEmployees,pastEmployees){
        let result;
        try {
            result = await db.any(`update ${this.tableName} set name = $1, current_employees = $2, past_employees = $3  where id = $4`,[name,currentEmployees,pastEmployees,id]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

    async getCompanyDetailsByCompanyName(name){
        let result;
        try {
            result = await db.one(`select id,name,current_employees,past_employees from ${this.tableName} where name = $1`,[name]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

    async getAllCompanyNames(){
        let result = null;
        try {
            result = await db.any(`select name from  ${this.tableName} order by name asc`);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

    async getAllEmployeesByCompanyName(name){
        let result = null;
        try {
            result = await db.any(`select current_employees,past_employees from  ${this.tableName} where name = $1`,[name]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        return result;
    }

    
}

let dataAccessHelper = new DataAccessHelper();
// dataAccessHelper.insertIntoCompany('c1',{ employee_id: ['1']},{ employee_id: ['2']}).then(()=>{});
// dataAccessHelper.insertIntoCompany('c2',).then(()=>{});
// dataAccessHelper.getAllEmployeesByCompanyName('c1').then(()=>{});
// dataAccessHelper.insertIntoCompany('c3').then(()=>{});
// dataAccessHelper.getCompanyIdByCompanyName('c1').then(()=>{});
// dataAccessHelper.getAllCompanyNames().then(()=>{});
module.exports = DataAccessHelper
