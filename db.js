// this is the file in which  we connect express and database.......................


const mongoose=require("mongoose");

// define the mongoDB connection URL
require("dotenv").config();

//Local connection
const local_db_url=process.env.LOCAL_DB_URL;
const mongoURL=local_db_url // replace hotels as your name of database

//Remote connection
//const remote_db_url=process.env.REMOTE_DB_URL;
//const mongoURL=remote_db_url

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

