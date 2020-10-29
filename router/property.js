const express = require ("express")
const app=express()
const path = require("path");
const router = express.Router();
const {
 Property,createPropertyValidator,updatePropertyValidator
} = require("../model/property");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const auth=require("../middleware/middleware")



//multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

//get all
router.get("/property",(req,res)=>{
  Property.find().then((Data)=>res.json(Data)).catch((err)=>res.json(err))
})


//get by id
router.get("/property/:id",(req,res)=>{
  Property.findById({_id:req.params.id}).then((data) => res.json(data))
  .catch((err) => res.json(err));
})


//post router
router.post("/property", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile= req.files.map((file)=>cloudinary.uploader.upload(file.path))
  Promise.all(uploadedFile).then((result)=>{
    req.body.Title_Deed_Photo = result[0].secure_url;
    req.body.photo = result[1].secure_url;
    req.body.referenceNO=(Math.random() * 900000).toFixed(0)
    //validator of schema
    const { error } = createPropertyValidator(req.body);
    if (error) return res.status(401).send(error);
    let propertyData = new Property(req.body);
    propertyData
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate

router.put("/property/:id",upload.any(), (req, res) => {
 
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile= req.files.map((file)=>cloudinary.uploader.upload(file.path))
  Promise.all(uploadedFile).then((result)=>{
    req.body.Title_Deed_Photo = result[0]?result[0].secure_url:req.body.Title_Deed_Photo;
    req.body.photo =result[0]?result[1].secure_url:req.body.photo;

  const { error } = updatePropertyValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  Property.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  })
});

  
//delet router
router.delete("/property/:id",(req,res)=>{
  Property.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})

  module.exports = router;