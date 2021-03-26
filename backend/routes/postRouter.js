const express = require("express");
const Post = require("../models/post").model;
const bcrypt = require("bcrypt");
const JWTService = require("../JWTService");
const verifyToken = require('../verifyToken')
var postRouter = express.Router();

postRouter.use(express.json());

postRouter.post("/addpost",verifyToken, function (req, res, next) {
  

  let title = req.body.title;
  let message = req.body.message;
  let topic = req.body.topic

  if (!title || !req.uid || !message || !topic) {
    return res.status(400).json({ msg: "please provide required data" });
  }

  

  let newpost = new Post({
    uid:req.uid,
    title:title,
    message:message,
    topicName:topic
  })

  newpost.save(function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
      return res.status(200).json(post);
    }
  })
 
    

  
});

postRouter.post("/fetchposts",verifyToken, function (req, res, next) {

  
  if (!req.uid) {
    return res.status(400).json({ msg: "please provide required data" });
  }

 

  Post.find({uid:req.uid},(err,posts)=>{
    if(err){
      console.log('no post found for this user')
    }
    else {
      let postsArr = []
      posts.forEach(post=>{
        console.log(post)
        postsArr.push(post)
      })
      res.status(200).send(postsArr)
    }
    


  })
  
});

module.exports = postRouter;
