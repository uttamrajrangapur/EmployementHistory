const express = require('express');
const cookieParser = require('cookie-parser')
const companiesRouteHandler = require('./lib/router/company-route-handler');
const employeeRouteHandler = require('./lib/router/employee-route-handler');
const path = require('path');
const hbs = require('hbs');
const staticDirPath = path.join(__dirname, './lib/front-end');

const viewsPath = path.join(__dirname, './lib/templates/views')
const partialsPath = path.join(__dirname, './lib/templates/partials')

// Setup handlebars engine and views location


const app = express()

app.use(express.static(staticDirPath))
app.use(express.json());
app.use(cookieParser());

app.use('/company', companiesRouteHandler);
app.use('/employee', employeeRouteHandler);
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Employment History Tracking App',
        name: "uttamraj"
    })
})

app.get('/employee/sign-up-page', (req, res) => {
    res.render('signup', {
        title: 'Employment History Tracking App',
        name: "uttamraj"
    })
})

// app.get('/', function (req, res) {
//     console.log(req.cookies) 

//     let options = {
//         maxAge: 1000 * 60 * 1, // would expire after 1 minutes
//         httpOnly: true, // The cookie only accessible by the web server
//         // signed: true // Indicates if the cookie should be signed
//     }

//     // Set cookie
//     res.cookie('jwt', 'jwt1', options) // options is optional
//     res.send('')
// //   res.send('Hello World')
// })

app.post('/signUp', function (req,res){
    // console.log(JSON.stringify(req, null, 2));
    // console.log(JSON.stringify(res, null, 2));
    console.log(req);
    console.log(res);

    res.send(req.body);
})



app.get('/company-page',function (req,res){
    res.render('company',{
        title: "sign up page",
        name: "uttam"
    })
})

app.get('/company-employees-page',function (req,res){
    res.render('company-employees',{
        title: "sign up page",
        name: "uttam"
    })
})

app.get('/employee/login-page',function (req,res){
    res.render('login',{
        title: "login Page",
        name: "uttam"
    })

})

app.get('/employee/add-employment-history-page',function(req,res){
    res.render('employment-history',{
        title: "Employment History Page",
        name: "uttam"
    })
})

app.get('/employee/get-employment-history-page',function(req,res){
    res.render('get-employment-history',{
        title: "Employment History Page",
        name: "uttam"
    })
})

 
app.listen(3000)