const express = require("express");
const Users = require("../models/users").model;
const bcrypt = require("bcrypt");
const JWTService = require("../JWTService");
const verifyToken = require('../verifyToken')
var userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", function (req, res, next) {
  let body = req.body;

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  if (!email || !password || !name) {
    return res.status(400).json({ msg: "please provide required data" });
  }

  Users.findOne(
    {
      email: email,
    },
    function (err, user) {
      if (err) {
        return res.status(400).json({ msg: "user not found" });
      } else if (!user) {
        let hashedPwd;

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (hash) {
              let newuser = new Users({
                email: body.email,
                fullName: body.name,
                passwordHash: hash,
              });
              newuser.save(function (err, user) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(user);
                  return res.status(200).json(user);
                }
              });
            }
          });
        });
      }else{
        return res.status(400).json({msg:'user already exist'});
      }
    }
  );
});

userRouter.post("/authenticate", function (req, res, next) {
  // let body = req.body;

  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ msg: "please provide required data" });
  }

  Users.findOne(
    {
      email: email,
    },
    function (err, user) {
      if (err) {
        return res.status(400).json({ msg: "user not found" });
      } else if (!user) {
        return res.status(400).json({ msg: "user not exist" });
      } else {
        bcrypt.compare(password, user.passwordHash, function (
          errBcrypt,
          resBcrypt
        ) {
          if (!resBcrypt) {
            return res
              .status(401)
              .json({ msg: "Authentication failed. Wrong password." });
          }

          return res.status(200).json({
            token: JWTService.generateToken(email, user.id),
          });
        });
      }
    }
  );
});

userRouter.post('/validateuser',verifyToken,(req,res)=>{
  res.status(200).json({authStatus:'authorized'})
})

module.exports = userRouter;
