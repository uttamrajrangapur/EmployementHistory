const _ = require('lodash');
const jwt = require('jsonwebtoken');

validateSession = function (req, res, next) {
    try{
        let cookies = req.cookies;
        let token = _.get(cookies, 'jwt');
        const decoded = jwt.verify(token, 'secretToBePassedFromEnvVariable');
        req.jwt = decoded;
        console.log(decoded);
        next();
    }catch(err){
        res.send('session expired.Please login again');
    }    
}

createSession = function (req, res, next) {
    let cookies = req.cookies;
    let result = req.myresult;
    try {
        if (result.status == "success") {
            let options = {
                maxAge: 1000 * 60 * 10, // would expire after 1 minutes
                httpOnly: true, // The cookie only accessible by the web server
                // signed: true // Indicates if the cookie should be signed
            }
            const token = jwt.sign({ employeeId: result.employeeId }, 'secretToBePassedFromEnvVariable', { expiresIn: 60 * 10 });
            // Set cookie
            res.cookie('jwt', token, options) // options is optional
        }
        res.send(result);
    } catch (e) {
        res.send("login failed");
    }
}


module.exports = {
    validateSession,
    createSession
};