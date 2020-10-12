const express = require ("express")
const app=express()
const path = require("path");
const router = express.Router();
const {
 Tenant,createTenantValidator,updateTenantValidator
} = require("../model/tanent");
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
})

//get all
router.get("/tenant",(req,res)=>{
  Tenant.find().then((Data)=>res.json(Data)).catch((err)=>res.json(err))
})


//get by id
router.get("/tenant/:id",(req,res)=>{
  Tenant.findById({_id:req.params.id}).then((data) => res.json(data))
  .catch((err) => res.json(err));
})


//post router
router.post("/tenant", upload.any(), (req, res) => {
  console.log(req.files);

  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile= req.files.map((file)=>cloudinary.uploader.upload(file.path))
  Promise.all(uploadedFile).then((result)=>{
    req.body.tenant_photo = result[0].secure_url;
    req.body.tenant_GovId = result[1].secure_url;
    console.log(req.body);

  //validator of schema
    const { error } = createTenantValidator(req.body);
    if (error) return res.status(401).send(error);
    let TenantData = new Tenant(req.body);
    TenantData
      .save()
      .then((data) => res.send("data send successfully"))
      .catch((err) => res.json({ messege: err }));
    })
});

//update to be left to validate
router.patch("/tenant/:id", (req, res) => {
  console.log(req.body);
  const { error } = updateTenantValidator(req.body);
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
router.delete("/tenant/:id",(req,res)=>{
  Tenant.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})

  module.exports = router;