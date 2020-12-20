const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const router = express.Router();
const {
  Property,
  createPropertyValidator,
  updatePropertyValidator,
} = require("../model/property");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/middleware");

//multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}`);
  },
});
const upload = multer({
  storage: storage,
});

//get all
router.get("/property", auth, (req, res) => {
  Property.find()
    .populate("developerCompany")
    .populate("managementCompany")
    .populate("Property_ownerName")
    // .populate({
    //   path: "Property_ownerName",
    //   model: "Owner",
    // })
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/property/:id", auth, (req, res) => {
  Property.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//post router
router.post("/property", auth, upload.any(), (req, res) => {
  req.body.facilities = JSON.parse(req.body.facilities);
  req.body.Property_ownerName = JSON.parse(req.body.Property_ownerName);

  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result.map((photo) => {
      return { fileName: photo.original_filename, file: photo.secure_url };
    });
    req.body.referenceNO = "PROPERTY-" + (Math.random() * 900000).toFixed(0);
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

router.put("/property/:id", auth, upload.any(), (req, res) => {
  req.body.Property_ownerName = JSON.parse(req.body.Property_ownerName);
  req.body.facilities = JSON.parse(req.body.facilities);
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result[0]
      ? result.map((photo) => {
          return { fileName: photo.original_filename, file: photo.secure_url };
        })
      : JSON.parse(req.body.files_list);

    const { error } = updatePropertyValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    Property.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/property/:id", (req, res) => {
  Property.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
