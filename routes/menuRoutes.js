
const express=require("express");
const Router=express.Router();
const MenuItems = require('./../models/menu');




Router.post("/menu",async(req,res)=>{
    try {
      const data=req.body
      const newMenu=new MenuItems(data);
      const savedItem=await newMenu.save();
      console.log("data is saved");
      res.status(200).json(savedItem);

    } catch (error) {
      console.log(error);
      res.status(500).json({error:"internal server error"});
    }
  })
  
  Router.get("/menu",async(req,res)=>{
    try {
      const data=await MenuItems.find();
      console.log("data fatched");
      res.status(200).json(data);
    } catch (error) {
      console.log("err");
      res.status(500).json({error:"internal server error"});
    }
  })

  


  Router.get("/menu/:taste",async(req,res)=>{
    try {
      const taste=req.params.taste;
    if(taste=="sweet"||taste=="sour"||taste=="spicy"){
      const response=await MenuItems.find({taste:taste});
      console.log("response fatched");
      res.status(200).json(response);
    }else{
      res.status(404).json({error:"invalid taste type"});
      console.log("invalid taste type");
    }
    } catch (error) {
      console.log("error");
      res.status(500).json({error:"internal server error"});
    }
  })
  module.exports=Router;

