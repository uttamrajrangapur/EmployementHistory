const _ = require('lodash'),
    bcrypt = require('bcryptjs'),
    EmployeeDataAccessor = require('../data-access/employee-accessor'),
    EmployeeHistoryDataAccessor = require('../data-access/employee-history-accessor'),
    CompanyDataAccessor = require('../data-access/company-data-accessor'),
    CredentialDataAccessor = require('../data-access/credentials-accessor');




class EmployeeManager {
    constructor() {
        this.employeeDataAccessor = new EmployeeDataAccessor();
        this.credentialDataAccessor = new CredentialDataAccessor();
        this.employeeHistoryDataAccessor = new EmployeeHistoryDataAccessor();
        this.companyDataAccessor = new CompanyDataAccessor();
    }

    async signUp(signUpPayload) {
        let employeeName = signUpPayload.name;
        let employeeId = await this.employeeDataAccessor.insertIntoEmployees(employeeName);
        let password = signUpPayload.password;
        let hashedPassword = bcrypt.hashSync(password, 8);
        await this.credentialDataAccessor.insertIntoCredentials(employeeId, hashedPassword);
        return { status: "Employee signUp successfully Completed" };
    }

    async login(loginPayload) {
        let employeeName = loginPayload.name;
        let password = loginPayload.password;
        let employeeId = await this.employeeDataAccessor.getEmployeeIdByEmployeeName(employeeName);
        let hashedPassword = await this.credentialDataAccessor.getHashByEmployeeId(employeeId);
        let doPasswordMatch = bcrypt.compareSync(password, hashedPassword);
        console.log(doPasswordMatch);
        if (doPasswordMatch == true) {
            return { status: "success", employeeId }
        } else {
            return { status: "failed" }
        }
    }

    async getEmploymentHistory(employeeId) {
        // console.log('employeeHistoryPayload' +employeeHistoryPayload);
        // let employeeId = employeeHistoryPayload.id;
        let employmentHistory = await this.employeeHistoryDataAccessor.getEmploymentHistoryByEmployeeId(employeeId);
        return employmentHistory;
    }

    async insertEmploymentHistory(employeeId, body) {
        let companyName = body.companyName;
        let status = body.status;
        let companyDetails = await this.companyDataAccessor.getCompanyDetailsByCompanyName(companyName);
        await this.employeeHistoryDataAccessor.insertIntoEmployeeHistory(employeeId, companyDetails.id, status);
        let currentEmployees = companyDetails.current_employees;
        let pastEmployees = companyDetails.past_employees;
        if (status == "joined") {
            currentEmployees.employee_id = _.concat(currentEmployees.employee_id, employeeId)
            _.remove(pastEmployees.employee_id, (id) => id == employeeId)
        } else if (status == 'left') {
            pastEmployees.employee_id = _.concat(pastEmployees.employee_id, employeeId)
            _.remove(currentEmployees.employee_id, (id) => id == employeeId)
        }
        await this.companyDataAccessor.updateCompany(companyDetails.id, companyDetails.name, currentEmployees, pastEmployees);
        return { status: "inserted employee record successfully" }
    }





}
module.exports = EmployeeManager;