const express= require("express")
const app=express()
const connection=require("./connection_DB/mongoose_connection")
const bodyParser = require("body-parser") 
const cors = require("cors")
const path = require("path");
const cloudinary=require("cloudinary").v2
require("dotenv").config

//aarko body parser haleko
app.use(bodyParser.urlencoded({extended:true}))

//middleware for body parser
app.use(bodyParser.json())



//middleware for cors
app.use(cors())

//cloudinary config
cloudinary.config({
  cloud_name:"pankajkoirala",
  api_key:891382289963618,
  api_secret:"3pKrB-1JvjrDFNKUNpMURXUtVJ0"
})



// //signup
const SignupRouter=require("./router/login")
app.use("/api",SignupRouter)

// router order
const propertyRouter=require("./router/property")
app.use("/api",propertyRouter)

// routes
app.get("/",(req,res)=>{
    res.send("we are on home");
  }) 


  // how to we start lession to the port
app.listen(8000,()=>{
    console.log(`server running at 8000`);
  });

