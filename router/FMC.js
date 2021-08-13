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

// //multer config
// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}`);
//   },
// });
// const upload = multer({
//   storage: storage,
// });

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
router.post("/fmc", auth, (req, res) => {
  console.log(req.body);
  const { error } = createFMCValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  let FMCData = new FMC(req.body);
  FMCData.save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

//update to be left to validate
router.put("/fmc/:id", auth, (req, res) => {

  const { error } = updateFMCValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  mongoose.set("useFindAndModify", false);

  FMC.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
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
