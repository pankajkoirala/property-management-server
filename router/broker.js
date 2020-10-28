const express = require("express");
const path = require("path");
const router = express.Router();
const {
Broker,createBrokerValidator,updateBrokerValidator} = require("../model/broker");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/middleware");

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
router.get("/broker", (req, res) => {
    Broker.find()
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/broker/:id", (req, res) => {
    Broker.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/broker", upload.any(), (req, res) => {
  
  
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
  cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.broker_photo = result[0].secure_url;
    req.body.brokerId = (Math.random() * 900000).toFixed(0);
   
    
    const { error } = createBrokerValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let TenantData = new Broker(req.body);
    TenantData.save()
      .then((data) => res.json({ messege: data }))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.patch("/broker/:id", (req, res) => {
  const { error } = updateBrokerValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  Broker.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
});

//delet router
router.delete("/broker/:id", (req, res) => {
    Broker.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;