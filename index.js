const express = require('express');
const {mongoose} = require ('./db/mongoose');  
const authRouter = require('./profile/profileRouter');

const app = express();
app.use(express.json());
app.set('port', (process.env.PORT || 5000));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader("Access-Control-Allow-Headers",
     "Access-Control-Allow-Headers, Content-Type");
    next();
});

app.use('/api/v1/scrape', authRouter);  

app.listen(app.get('port'),function(){
    console.log(`Scrape server is running. Listening on ${app.get('port')}`);
});
