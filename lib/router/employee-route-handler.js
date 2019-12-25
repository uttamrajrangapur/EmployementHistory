const express = require('express'),
  EmployeeManager = require('../manager/employee-manager'),
  jwt = require('jsonwebtoken'),
  session = require('../middleware/session')
  router = express.Router();

let employeeManager = new EmployeeManager();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.post('/sign-up', async function (req, res) {
  try {
    let body = req.body;
    console.log(body);
    let result = await employeeManager.signUp(body);
    res.send(result);
  } catch (e) {
    res.send(e);
  }

})
// define the about route
router.post('/login', async function (req, res,next) {
  let body = req.body;
  let cookies = req.cookies;
  let result = await employeeManager.login(body);
  req.myresult = result;
  next();


}, session.createSession)

router.get('/employment-history', session.validateSession,async function (req, res) {
  try {
    let employeeId = req.jwt.employeeId;
    let result = await employeeManager.getEmploymentHistory(employeeId);
    res.send(result)
  } catch (e) {
    res.send(e);
  }

})

router.post('/employment-history', session.validateSession , async function (req, res) {
  try {
    let body = req.body;
    let employeeId = req.jwt.employeeId;
    let result = await employeeManager.insertEmploymentHistory(employeeId,body);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
})

module.exports = router