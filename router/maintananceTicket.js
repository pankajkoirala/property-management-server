const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/middleware");

const {
  CreateMaintananceTicketValidator,
  MaintananceTicket,
  updateMaintananceTicketValidator,
} = require("../model/maintananceTicket");

//multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}`
    );
  },
});
const upload = multer({
  storage: storage,
});

//get all
router.get("/MaintananceTicket", auth, (req, res) => {
  MaintananceTicket.find()
    .populate("MaintanancePropertyID")
    .populate("MaintananceCompanyId")

    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/MaintananceTicket/:id", (req, res) => {
  MaintananceTicket.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//post router

router.post("/MaintananceTicket", auth, upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result.map((photo) => {
      return { fileName: photo.original_filename, file: photo.secure_url };
    });
    req.body.maintananceTicket_ID =
      "MAINTANANCE_TICKET-" + (Math.random() * 900000).toFixed(0);
    const { error } = CreateMaintananceTicketValidator(req.body);
    if (error) return res.status(401).send(error);
    let imageData = new MaintananceTicket(req.body);
    imageData
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.json({ messege: err }));
  });
});
//update to be left to validate
router.put("/MaintananceTicket/:id", auth, upload.any(), (req, res) => {
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result[0]
      ? result.map((photo) => {
        return { fileName: photo.original_filename, file: photo.secure_url };
      })
      : JSON.parse(req.body.files_list);
    const { error } = updateMaintananceTicketValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    MaintananceTicket.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json("updated"))
      .catch((err) => res.json(err));
  });
});



//delet router
router.delete("/MaintananceTicket/:id", (req, res) => {
  MaintananceTicket.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
