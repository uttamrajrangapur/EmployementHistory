const express = require('express');

const app = express()
app.use(express.json())
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/signUp', function (req,res){
    // console.log(JSON.stringify(req, null, 2));
    // console.log(JSON.stringify(res, null, 2));
    console.log(req);
    console.log(res);
    res.send(req.body);
})
 
app.listen(3000)