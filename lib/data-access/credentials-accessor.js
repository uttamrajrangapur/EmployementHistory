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
        this.tableName = 'credentials';
    }

    async insertIntoCredentials(employeeId,hashedPassword){
        let id = uuid.v4();
        let result;
        try {
            result = await db.one(`insert into ${this.tableName}(id,employee_id,hashed_password) values($1,$2,$3) returning id`,[id,employeeId,hashedPassword]);
        } catch (error) {
            throw error;
        }
        result = _.values(result);
        return result;
    }

    async getHashByEmployeeId(employeeId){
        let result = null;
        try {
            result = await db.one(`select hashed_password from  ${this.tableName} where employee_id = $1`,[employeeId]);
        } catch (error) {
            throw error;
        }
        console.log(result);
        let hash = _.get(result,'hashed_password');
        return hash;
    }

}

let dataAccessHelper = new DataAccessHelper();
// dataAccessHelper.insertIntoCredentials(uuid.v4(),'hash');
// dataAccessHelper.getHashByEmployeeId('59cf86dc-17d5-4308-8d6e-5ded14fb778e');
module.exports = DataAccessHelper
