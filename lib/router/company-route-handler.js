const express = require('express')
const router = express.Router()
const CompanyManager = require('../manager/company-manager');
let companyManager = new CompanyManager();


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', async function (req, res) {
  let companiesList = await companyManager.getAllCompanies();
  res.send(companiesList)
})

router.post('/create',async function(req, res){
  let companyName = req.body.name;
  let companyDetails = await companyManager.createCompany(companyName);
  res.send(companyDetails);
})

router.get('/:companyName/employees/',async function(req,res){
  let companyName = req.params.companyName;
  let companyEmployees = await companyManager.getEmployeesByCompanyName(companyName);
  res.send(companyEmployees);
})
// define the about route

module.exports = router