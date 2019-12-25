const _ = require('lodash');
const CompanyDataAccessor = require('../data-access/company-data-accessor');
const EmployeeDataAccessor = require('../data-access/employee-accessor');


class CompanyManager { 
    constructor(){
        this.companyDataAccessor = new CompanyDataAccessor();
        this.employeeDataAccessor = new EmployeeDataAccessor();
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
        let companyDetails = await this.companyDataAccessor.getAllEmployeesByCompanyName(companyName);
        let currentEmployees = await this.employeeDataAccessor.getEmployeeNameByEmployeeIds(companyDetails.current_employees.employee_id);
        let pastEmployees = await this.employeeDataAccessor.getEmployeeNameByEmployeeIds(companyDetails.past_employees.employee_id);
        if(_.isEmpty(companyDetails))
            return "No Employee working currently"
        return { currentEmployees, pastEmployees};
        // return { error: "method not implemented"}
    }
}
module.exports = CompanyManager;