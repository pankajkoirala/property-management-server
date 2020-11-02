const express = require("express");
const path = require("path");
const router = express.Router();
const {
  CreateMaintananceCompanyValidator,
  MaintananceCompany,
  updateMaintananceCompanyValidator,
} = require("../model/maintanance_Company");
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
router.get("/maintananceCompany", (req, res) => {
  MaintananceCompany.find()
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/maintananceCompany/:id", (req, res) => {
  MaintananceCompany.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/maintananceCompany", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.Company_uploadPhoto = result[0].secure_url;
    req.body.Company_ID = (Math.random() * 900000).toFixed(0);

    const { error } = CreateMaintananceCompanyValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let TenantData = new MaintananceCompany(req.body);
    TenantData.save()
      .then((data) => res.json({ messege: data }))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.put("/maintananceCompany/:id",upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.Company_uploadPhoto = result[0]?result[0].secure_url:req.body.Company_uploadPhoto;

  const { error } = updateMaintananceCompanyValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  MaintananceCompany.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
  })
});

//delet router
router.delete("/maintananceCompany/:id", (req, res) => {
  MaintananceCompany.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
