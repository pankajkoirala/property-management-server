const express = require ("express")
const path = require("path");
const router = express.Router();
const {
    Lease,createLeaseValidator,updateLeaseValidator
} = require("../model/lease");
const multer = require("multer"); 
const cloudinary = require("cloudinary").v2;
const auth=require("../middleware/middleware");
const {leasedata}= require("../assets/sampledataLease")


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
})

//get all
router.get("/lease",(req,res)=>{

    Lease.find().then((Data)=>res.json(Data)).catch((err)=>res.json(err))
})

//get by id
router.get("/lease/:id",(req,res)=>{
    Lease.findById({_id:req.params.id}).then((data) => res.json(data))
  .catch((err) => res.json(err));
})


//post router
router.post("/lease", upload.any(), (req, res) => {
  const { error } = createLeaseValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  console.log(req.body);
    return res.send("ok")
  
  // if (!req.files) return res.status(401).send(new Error("photo not found"));
  // let uploadedFile= req.files.map((file)=>cloudinary.uploader.upload(file.path))
  // Promise.all(uploadedFile).then((result)=>{
  //   req.body.photo = result[0].secure_url;
  //   // req.body.tenant_GovId = result[1].secure_url;
  //   req.body.LeaseId=(Math.random() * 900000).toFixed(0)
  //   console.log(req.body)
  //   //validator of schema
  //   const { error } = createLeaseValidator(req.body);
  //   if (error) return res.status(401).send(error.details[0].message);
  //   let TenantData = new Lease(req.body);
  //   TenantData
  //     .save()
  //     .then((data) => res.send("data send successfully"))
  //     .catch((err) => res.json({ messege: err }));
  //   })
});

//update to be left to validate
router.patch("/lease/:id", (req, res) => {

  const { error } = updateLeaseValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  Property.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
});

  
//delet router
router.delete("/lease/:id",(req,res)=>{
    Lease.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})

  module.exports = router;