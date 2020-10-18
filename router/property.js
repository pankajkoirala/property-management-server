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
router.post("/property", upload.single("photo"),async (req, res) => {
  console.log(req.body);
  console.log(req.file);
 
  if (!req.file) return res.status(401).send(new Error("photo not found"));
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    req.body.photo = result.secure_url;
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

router.put("/property/:id", (req, res) => {
  const { error } = updatePropertyValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  Property.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
});

  
//delet router
router.delete("/property/:id",(req,res)=>{
  Property.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})

  module.exports = router;