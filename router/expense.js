const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const {
  CreateExpenseValidator,
  Expense,
  updateExpenseValidator,
} = require("../model/expense");
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
router.get("/expense", (req, res) => {
  Expense.find()
    .populate("Maintanance_ticketID")
    .populate("MaintanancePropertyID")
    .populate("property_ID")
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/expense/:id", (req, res) => {
  Expense.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/expense", upload.any(), (req, res) => {
  req.body.expense_list = JSON.parse(req.body.expense_list);
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.Expense_ID = "EXPENSE-" + (Math.random() * 900000).toFixed(0);
    req.body.invoicePhoto = result[0].secure_url;

    const { error } = CreateExpenseValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let TenantData = new Expense(req.body);
    TenantData.save()
      .then((data) => res.json({ messege: data }))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.put("/expense/:id", upload.any(), (req, res) => {
  req.body.expense_list = JSON.parse(req.body.expense_list);
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.invoicePhoto = result[0]
      ? result[0].secure_url
      : req.body.invoicePhoto;

    const { error } = updateExpenseValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    Expense.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json("updated"))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/expense/:id", (req, res) => {
  Expense.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
