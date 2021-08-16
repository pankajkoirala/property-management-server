const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const {
  FMC, createFMCValidator, updateFMCValidator
} = require("../model/FMC");
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
router.get("/fmc", auth, (req, res) => {
  FMC.find()
    .populate("property")
    .populate("management_Companies")
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/fmc/:id", (req, res) => {
  FMC.findById({ _id: req.params.id }).populate("property")
    .populate("management_Companies")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/fmc", auth, upload.any(), (req, res) => {

  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    console.log("🚀 ~ file: FMC.js ~ line 45 ~ Promise.all ~ result", result)
    if (req.files.length) {
      req.body.file1 = result[0].secure_url;
      req.body.file2 = result[1].secure_url;
    }

    const { error } = createFMCValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let FMCData = new FMC(req.body);
    FMCData.save()
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  });
});

//update to be left to validate
router.put("/fmc/:id", auth, upload.any(), (req, res) => {

  const { error } = updateFMCValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    if (req.files.length) {
      req.body.file1 = result[0]
        ? result[0].secure_url
        : req.body.file1;
      req.body.file2 = result[1]
        ? result[0].secure_url
        : req.body.file2;
    }


    mongoose.set("useFindAndModify", false);

    FMC.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json("updated"))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/fmc/:id", async (req, res) => {
  FMC.remove({ _id: req.params.id })
    .then(async (data) => {
      res.json("data deleted")
    })
    .catch((err) => res.json(err));
});


module.exports = router;
