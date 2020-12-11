const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
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
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

//get all
router.get("/MaintananceTicket", (req, res) => {
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
router.post("/MaintananceTicket", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.Maintanance_Ticket_picture = result[0].secure_url;

    req.body.maintananceTicket_ID =
      "MAINTANANCE_TICKET-" + (Math.random() * 900000).toFixed(0);

    //validator of schema
    const { error } = CreateMaintananceTicketValidator(req.body);
    if (error) return res.status(401).send(error);
    let MaintananceTicketData = new MaintananceTicket(req.body);
    MaintananceTicketData.save()
      .then((data) => res.send(data))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate

////////////////////////////

router.put("/MaintananceTicket/:id", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.Maintanance_Ticket_picture = result[0]
      ? result[0].secure_url
      : req.body.Maintanance_Ticket_picture;

    const { error } = updateMaintananceTicketValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    MaintananceTicket.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json(data))
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
