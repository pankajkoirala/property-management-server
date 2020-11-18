const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const router = express.Router();
const {
  CreateMaintananceTicketValidator,
  MaintananceTicket,
  updateMaintananceTicketValidator,
} = require("../model/maintananceTicket");

//get all
router.get("/MaintananceTicket", (req, res) => {
  MaintananceTicket.find()
    .populate("MaintanancePropertyID")
    .populate("MaintananceCompanyId")
    .populate("managementCompanyId")

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
router.post("/MaintananceTicket", (req, res) => {
  req.body.maintananceTicket_ID = (Math.random() * 900000).toFixed(0);
  //validator of schema
  const { error } = CreateMaintananceTicketValidator(req.body);
  if (error) return res.status(401).send(error);
  let MaintananceTicketData = new MaintananceTicket(req.body);
  MaintananceTicketData.save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

//update to be left to validate

router.put("/MaintananceTicket/:id", (req, res) => {
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

//delet router
router.delete("/MaintananceTicket/:id", (req, res) => {
  MaintananceTicket.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
