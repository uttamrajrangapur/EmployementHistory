const express = require('express');
const cookieParser = require('cookie-parser')
const companiesRouteHandler = require('./lib/router/company-route-handler');
const employeeRouteHandler = require('./lib/router/employee-route-handler');

const app = express()

app.use(express.json());
app.use(cookieParser())
app.use('/company', companiesRouteHandler);
app.use('/employee', employeeRouteHandler);

app.get('/', function (req, res) {
    console.log(req.cookies) 

    let options = {
        maxAge: 1000 * 60 * 1, // would expire after 1 minutes
        httpOnly: true, // The cookie only accessible by the web server
        // signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('jwt', 'jwt1', options) // options is optional
    res.send('')
//   res.send('Hello World')
})

app.post('/signUp', function (req,res){
    // console.log(JSON.stringify(req, null, 2));
    // console.log(JSON.stringify(res, null, 2));
    console.log(req);
    console.log(res);

    res.send(req.body);
})
 
app.listen(3000)