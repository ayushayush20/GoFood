require('dotenv').config();
const express = require('express')
const path = require("path");
//const cors = require('cors')

//used for serving the build of react as static files 
const buildPath = path.join(__dirname, "../build"); 

//const punycode = require('punycode');
const app = express()
const port = 5000;
const mongoDB = require('./db')
mongoDB();

//app.use(cors())

app.use(express.static(buildPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

app.use((req, res, next)=>{
  //res.setHeader("Access-Control-Allow-Origin","http://13.232.106.215");
  res.setHeader("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

/*
app.get('/', (req, res) => {
  res.send('Hello Wod!')
})*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})