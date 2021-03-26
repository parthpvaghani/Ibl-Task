const jwt = require("jsonwebtoken");
const key = require('./config').jwtSecretKey

const Users = require("./models/users").model;

module.exports = function (req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided",
    });
  }
  jwt.verify(token, key, function (err, decoded) {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token",
      });
    }
    let { userid } = decoded;
    Users.findOne({ _id:userid  })
      .then( user=> {
        //console.log('user is this ',user)
        if(user){
            req.uid = userid;
              next();
              return;
        }
        
        return res.json({
          success: false,
          message: "No Such User",
        });
      })
      .catch((err) =>{
          res.json({
            success: false,
            message: err,
          })
      }
      );
  });
};
