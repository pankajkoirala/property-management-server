const express = require("express");
const app = express();
const router = express.Router();
//bcrypt change passwort to sign
const bcrypt = require("bcrypt");
//token 
const jwt = require("jsonwebtoken")

const {
  UpdateSignupValidator,
  createSignupValidator,
  signup,
} = require("../model/login");
const { Router } = require("express");

// get all
router.get("/signup", (req, res) => {
  signup
    .find()
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/signup/:id", (req, res) => {
  signup
    .findById({ _id: req.params.id })
    .select("email password")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//post router
router.post("/signup", (req, res) => {
  //validate schema
  const { error } = createSignupValidator(req.body);
  if (error) return res.status(401).send(error);
  //finding email exist or not
  signup.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({ message: "mail already exist" });
    } else {
      //password bcryptted
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          req.body.password = hash;
          let signupinfo = new signup(req.body);
          signupinfo
            .save()
            .then((data) => res.send(" account created"))
            .catch((err) => res.json({ messege: err }));
        }
      });
    }
  });
});
router.post("/login", (req, res, next) => {
  signup.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "username and password doesn't match" })
    }
    //password matching with code
    bcrypt.compare(req.body.password, user.password, (err, resp) => {
      if (err) {
        return res.status(401).json({ message: "username and password doesn't match" })
      }
      if (resp) {
        const token = jwt.sign({
          email: user.email,
          userId: user._id
        }, process.env.jwt_key,
          // {
          //   expiresIn:"5h"
          // },
        )
        return res.status(200).json({ message: "auth successful", token: token })
      }
      return res.status(401).json({ message: "username and password doesn't match" })
    })
  }).catch((err) => res.json({ message: err }))

});

//delet router
router.delete("/signup/:id", (req, res) => {
  signup
    .remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;