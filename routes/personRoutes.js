const express=require("express");
const Router=express.Router();
const Person = require('./../models/person');
// post route and add a person
Router.post("/person",async(req,res)=>{
    /*const data=req.body;// assuming the request body contain the person data

    // create the new person document using mongoose model
    //const newPerson=new person();

    newPerson.name=data.name;
    newPerson.age=data.age;
    newPerson.mobile=data.mobile;
    newPerson.
    // this is complex method
    // so 

    const newPerson=new Person(data);
    // save the new peson to database
    newPerson.save((error,savedPerson)=>{
      if(error){
        console.log("error saving person",error);
        res.status(500).json({error:"internal server error"})
      }else{
        console.log("data saved succesfully");
        res.status(200).json(savedPerson);
      }
    })*/
   try {
    const data= req.body // assuming the request body contain the person data

    // create a new person document using the mongoose model
    const newPerson= new Person(data);

    //save the new person to the database 
    const savedPerson=await newPerson.save();
    console.log("data saved");
    res.status(200).json(savedPerson);
   } catch (err) {
    console.log(err);
    res.status(500).json({error:"internal server error"});
    
   }


  })


  // now if we want to get all the data of person 
  // so we have to create the method   OK;
  // now 
  // GET method to get the data of person

  Router.get("/person",async(req,res)=>{
    try {
      const data=await Person.find();
      console.log("data fatched");
      res.status(200).json(data);

    } catch (err) {
      console.log("err");
      res.status(500).json({error:"internal server error"});
      
    }
  })


  Router.get("/person/:workType",async(req,res)=>{
    try {
      const workType=req.params.workType;
      if(workType=="chef" || workType=="manager" || workType=="waiter"){
        const response=await Person.find({work:workType});
        console.log("response fatched");
        res.status(200).json(response);
      }else{
        res.status(404).json({error:"invalid work type"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"internal server error"});
    }
  })


  // UPDATE PERSON DATA

  Router.put("/person/:id",async(req,res)=>{
    try {
      const personId=req.params.id;
      const updatedPersonData=req.body;
      const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:"Person not found"});
    }

    console.log("Data updated");
    res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"internal server error"});
    }
  })

  // DELETE PERSON DATA

  Router.delete("/person/:id",async(req,res)=>{
    try {
      const personId=req.params.id;
      const response=await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:"person not found"});

    }

    console.log("data deleted");
    res.status(200).json({massage:"person deleted succesfully"});
    } catch (error) {
      console.log(error);
      res.status(200).json({error:"internal server error"});
    }
  })


  module.exports=Router;
