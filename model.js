//const mongoose = require("mongoose");
import mongoose from "mongoose";

const additem = new mongoose.Schema({
   count:Number,
   name:{
      type:String,
      
   },
  
   last:
   {
      type:String
   },
   sell:
   {
      type:String
   },
   buy:
   {
      type:String
   },
   volume:
   {
      type:String
   },
   base_unit:
   {
      type:String
   }
   
   

})

const idata = new mongoose.model("idata",additem)

export default idata;