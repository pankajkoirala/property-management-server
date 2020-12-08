const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const {
  CreateOwnerValidator,
  Owner,
  updateOwnerValidator,
} = require("../model/owner");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/middleware");
const { json } = require("body-parser");

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
router.get("/owner", (req, res) => {
  Owner.find()
    // .populate("owner_property")
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/owner/:id", (req, res) => {
  Owner.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/owner", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result.map((photo) => {
      return { fileName: photo.original_filename, file: photo.secure_url };
    });
    req.body.owner_ID = "OWNER-" + (Math.random() * 900000).toFixed(0);
    const { error } = CreateOwnerValidator(req.body);
    if (error) return res.status(401).send(error);
    let imageData = new Owner(req.body);
    imageData
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.put("/owner/:id", upload.any(), (req, res) => {
  console.log(req.body);
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
    const { error } = updateOwnerValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    Owner.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json("updated"))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/owner/:id", (req, res) => {
  Owner.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
