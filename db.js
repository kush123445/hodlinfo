//const mongoose = require('mongoose');
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/itemdata",{
  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  
  
}).then(()=>  console.log("success connection")
  
).catch((e)=>console.log(e)
    
);