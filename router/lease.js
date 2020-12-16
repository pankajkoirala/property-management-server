const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const {
  Lease,
  createLeaseValidator,
  updateLeaseValidator,
} = require("../model/lease");
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
router.get("/lease", auth, (req, res) => {
  Lease.find()
    .populate("property")
    .populate("tenants")
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/lease/:id", (req, res) => {
  Lease.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/lease", auth, upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result.map((photo) => {
      return { fileName: photo.original_filename, file: photo.secure_url };
    });
    req.body.LeaseId = "LEASE-" + (Math.random() * 900000).toFixed(0);

    const { error } = createLeaseValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let LeaseData = new Lease(req.body);
    LeaseData.save()
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  });
});

//update to be left to validate
router.put("/lease/:id", auth, upload.any(), (req, res) => {
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
    const { error } = updateLeaseValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    mongoose.set("useFindAndModify", false);

    Lease.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json("updated"))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/lease/:id", (req, res) => {
  Lease.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
