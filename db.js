// this is the file in which  we connect express and database.......................


const mongoose=require("mongoose");
require("dotenv").config();

// define the mongoDB connection URL


//Local connection
//const mongoURL="mongodb://localhost:27017/hotels" // replace hotels as your name of database

//Remote connection
const mongoURL="mongodb+srv://Bucket_of_code:mohammad_s_d_khan7@cluster0.pamrc.mongodb.net/"

// set up mongoDB connection 

mongoose.connect(mongoURL,{
    
});

// what till here connection is done 
// the answer is NO

// we just create or connect a default connection Object.

// now 

//Get the default connection
// mongoose maintain the default connection object representing the mongoDB connection

const db=mongoose.connection;

// use use db to make the brigh (connection ) between mongoDB and Node.js


// define the listener for database connection
db.on("connected",()=>{
    console.log("connected to mongoDB server");
});

db.on("error",()=>{
    console.log("mongoDB connection error");
});

db.on("disconnected",()=>{
    console.log("disconnected to mongoDB server");
});

// now export the database connection 
module.exports=db;

