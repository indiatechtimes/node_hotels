const express = require('express');
const app = express();
const db=require("./db");


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');




const bodyParser=require("body-parser");
const Person = require('./models/person');
const MenuItems = require('./models/menu');
app.use(bodyParser.json());// and data will saved in the req.body

//WE ARE REQUIRING THE .ENV FILE
require("dotenv").config();

const port=process.env.PORT;



app.listen(port,()=>{console.log("server is listining on port "+port)});



// PASSPORT LOCAL STRATEGY
passport.use(new LocalStrategy(async(USERNAME,PASSWORD,done)=>{
  // authentication logic

  try {
    console.log("Recevied credentials:",USERNAME,PASSWORD);
    const user=await Person.findOne({username:USERNAME});
    if(!user){
      return done(null,false,{massage:"incorrect Username."});
    }
    const isPasswordMatch=user.password==PASSWORD? true:false;
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:"incorrect password."});
    }
  } catch (error) {
    return done(error);
  }
}));
app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate("local",{session:false})



app.get('/', function (req, res) {
    res.send('Welcom to our Hotel');
  });


// Import the person router file 
const personRouter=require("./routes/personRoutes");
app.use("/",localAuthMiddleware,personRouter);


// Import the menuRouter file
const menuRouter=require("./routes/menuRoutes");

app.use("/",localAuthMiddleware,menuRouter);
  

  

  