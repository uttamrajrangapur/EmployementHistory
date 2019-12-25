const _ = require('lodash');
const CompanyDataAccessor = require('../data-access/company-data-accessor');


class CompanyManager { 
    constructor(){
        this.companyDataAccessor = new CompanyDataAccessor();
    }

    async getAllCompanies(){
        let companiesList = await this.companyDataAccessor.getAllCompanyNames();
        companiesList = _.map(companiesList,'name');
        return companiesList;
    }

    async createCompany(name){
        let companyDetails = await this.companyDataAccessor.insertIntoCompany(name);
        return companyDetails;
    }

    async getEmployeesByCompanyName(companyName){
        return { error: "method not implemented"}
    }
}
module.exports = CompanyManager;