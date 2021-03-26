const express = require("express");
const nodemailer = require('nodemailer');
var mailRouter = express.Router();

mailRouter.use(express.json());

mailRouter.post("/sendregsuccessmail", function (req, res, next) {

  let body = req.body;

  let email = req.body.email;

  if (!email) {
    return res.status(400).json({ msg: "email is not given" });
  }



    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uniqueposts1232@gmail.com',
        pass: 'P@rth1919'
    }
    });

    const mailOptions = {
    from: 'uniqueposts1232@gmail.com',
    to: `${email}`,
    subject: 'Welcome To Unique Posts',
    text: 'Hope you are doing well :) i welcome yours to our platform where we put our unique story everyday which touches millions of people :) Thanks for connecting !'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(info.response)
    }
});

  
});


module.exports = mailRouter;
