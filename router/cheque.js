const express = require ("express")
const app=express()
const path = require("path");
const router = express.Router();
const {

updateChequeValidator,Cheque,createChequeValidator} = require("../model/cheque");
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
router.get("/cheque",(req,res)=>{
    Cheque.find().populate('lease_property').then((Data)=>res.json(Data)).catch((err)=>res.json(err))
})


//get by id
router.get("/cheque/:id",(req,res)=>{
    Cheque.findById({_id:req.params.id}).then((data) => res.json(data))
  .catch((err) => res.json(err));
})


//post router
router.post("/cheque", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile= req.files.map((file)=>cloudinary.uploader.upload(file.path))
  Promise.all(uploadedFile).then((result)=>{
    req.body.cheque_picture = result[0].secure_url;
    //validator of schema
    const { error } = createChequeValidator(req.body);
    if (error) return res.status(401).send(error);
    let ChequeData = new Cheque(req.body);
    ChequeData
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate

router.put("/cheque/:id",upload.any(), (req, res) => {
 
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile= req.files.map((file)=>cloudinary.uploader.upload(file.path))
  Promise.all(uploadedFile).then((result)=>{
    req.body.cheque_picture = result[0]? result[0].secure_url: req.body.cheque_picture;
 

  const { error } = updateChequeValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  Cheque.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  })
});

  
//delet router
router.delete("/cheque/:id",(req,res)=>{
    Cheque.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})

  module.exports = router;