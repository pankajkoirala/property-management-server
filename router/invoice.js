const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const {
  Invoice,
  createInvoiceValidator,
  updateInvoiceValidator,
} = require("../model/invoice");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/middleware");
const { leasedata } = require("../assets/sampledataLease");

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
router.get("/invoice", auth, (req, res) => {
  Invoice.find()
    .populate("property")
    .populate("tenants")
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/invoice/:id", (req, res) => {
  Invoice.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/invoice", upload.any(), auth, (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));


  const { error } = createInvoiceValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  let InvoiceData = new Invoice(req.body);
  InvoiceData.save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

//update to be left to validate
router.put("/invoice/:id", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.invoicePhoto = result[0]
      ? result[0].secure_url
      : req.body.invoicePhoto;

    const { error } = updateInvoiceValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    Invoice.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json("updated"))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/invoice/:id", (req, res) => {
  Invoice.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
