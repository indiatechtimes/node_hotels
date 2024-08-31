const express = require('express');
const app = express();
const db=require("./db");


const bodyParser=require("body-parser");
const Person = require('./models/person');
const MenuItems = require('./models/menu');
app.use(bodyParser.json());// and data will saved in the req.body

//WE ARE REQUIRING THE .ENV FILE
require("dotenv").config();

const port=process.env.PORT;



app.listen(port,()=>{console.log("server is listining on port "+port)});

app.get('/', function (req, res) {
    res.send('Welcom to our Hotel');
  });


// Import the person router file 
const personRouter=require("./routes/personRoutes");
app.use("/",personRouter);


// Import the menuRouter file
const menuRouter=require("./routes/menuRoutes");
app.use("/",menuRouter);
  

  

  