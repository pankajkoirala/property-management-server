const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const {
  Tenant,
  createTenantValidator,
  updateTenantValidator,
} = require("../model/tanent");
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
router.get("/tenant", (req, res) => {
  Tenant.find()
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/tenant/:id", (req, res) => {
  Tenant.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//post router
router.post("/tenant", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.files_list = result.map((photo) => {
      return { fileName: photo.original_filename, file: photo.secure_url };
    });
    req.body.TenantId = (Math.random() * 900000).toFixed(0);

    //validator of schema
    const { error } = createTenantValidator(req.body);
    if (error) return res.status(401).send(error);
    let TenantData = new Tenant(req.body);
    TenantData.save()
      .then((data) => res.send(data))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.put("/tenant/:id", upload.any(), (req, res) => {
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
    const { error } = updateTenantValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    Tenant.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  });
});

//delet router
router.delete("/tenant/:id", (req, res) => {
  Tenant.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
