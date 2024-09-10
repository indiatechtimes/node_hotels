
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Person = require('./models/person');
const express = require('express');
const app = express();



// PASSPORT LOCAL STRATEGY
passport.use(new LocalStrategy(async(USERNAME,PASSWORD,done)=>{
    // authentication logic
  
    try {    
      console.log("Recevied credentials:",USERNAME,PASSWORD);
      const user=await Person.findOne({username:USERNAME});
      if(!user){
        return done(null,false,{massage:"incorrect Username."});
      }
      const isPasswordMatch=user.comparePassword(PASSWORD);
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
  
  const localAuthMiddleware=passport.authenticate("local",{session:false});

  module.exports=passport;