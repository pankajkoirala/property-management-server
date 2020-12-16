const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const router = express.Router();
const auth = require("../middleware/middleware");

const {
  ChequeInfo,
  CreateChequeInfoValidator,
} = require("../model/chequeUpdateInfo");

//get all
router.get("/chequeInfo", auth, (req, res) => {
  ChequeInfo.find()
    .populate("lease_property")
    .populate("property_id")

    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//post router
router.post("/chequeInfo", auth, (req, res) => {
  //validator of schema
  const { error } = CreateChequeInfoValidator(req.body);
  if (error) return res.status(401).send(error);
  let ChequeInfoData = new ChequeInfo(req.body);
  ChequeInfoData.save()
    .then((data) => res.send(data))
    .catch((err) => res.json({ messege: err }));
});

//delet router
router.delete("/chequeInfo/:id", (req, res) => {
  ChequeInfo.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
