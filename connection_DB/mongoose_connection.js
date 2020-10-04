  
const mongoose=require("mongoose")
require("dotenv/config");

//connect to database
mongoose.connect(process.env.DB_connection,{ useUnifiedTopology: true,useNewUrlParser: true},(err)=>{
  if (!err){
    console.log("connected to database");
  }else{
    console.log("error in connection");
  }
 
}) 