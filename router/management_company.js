const express = require("express");
const path = require("path");
const router = express.Router();
const {
CreateManagementCompanyValidator,ManagementCompany,updateManagementCompanyValidator
} = require("../model/management_company");
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
router.get("/managementCompany", (req, res) => {
    ManagementCompany.find()
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/managementCompany/:id", (req, res) => {
    ManagementCompany.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//post router
router.post("/managementCompany", upload.any(), (req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.managementCompany_photo = result[0].secure_url;
    req.body.managementCompany_companyID = (Math.random() * 900000).toFixed(0);

    const { error } = CreateManagementCompanyValidator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let TenantData = new ManagementCompany(req.body);
    TenantData.save()
      .then((data) => res.json({ messege: data }))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.put("/managementCompany/:id", upload.any(),(req, res) => {
  if (!req.files) return res.status(401).send(new Error("photo not found"));
  let uploadedFile = req.files.map((file) =>
    cloudinary.uploader.upload(file.path)
  );
  Promise.all(uploadedFile).then((result) => {
    req.body.managementCompany_photo = result[0]?result[0].secure_url:req.body.managementCompany_photo;
  const { error } = updateManagementCompanyValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  ManagementCompany.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
  })
});

//delet router
router.delete("/managementCompany/:id", (req, res) => {
    ManagementCompany.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
