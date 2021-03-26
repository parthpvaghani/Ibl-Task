const express = require("express");
const Topic = require("../models/topic").model;
const bcrypt = require("bcrypt");
const JWTService = require("../JWTService");
const verifyToken = require('../verifyToken')
var topicRouter = express.Router();

topicRouter.use(express.json());

topicRouter.post("/addtopic",verifyToken, function (req, res, next) {
  let body = req.body;

  let topicName = req.body.topicName;

  if (!topicName || !req.uid) {
    return res.status(400).json({ msg: "please provide required data" });
  }

  Topic.findOne({uid:req.uid,topicName:topicName},(err,topic)=>{
    if(err){
      console.log('no topic found for this user')
    }
    else if(topic){
      res.status(200).json({msg:'topic is already added'})
    }
    else {
      let newtopic = new Topic({
        uid:req.uid,
        topicName:topicName
      })
      newtopic.save(function (err, topic) {
        if (err) {
          console.log(err);
        } else {
          console.log(topic);
          return res.status(200).json(topic);
        }
      })
    }
    


  })
  
});


topicRouter.post("/fetchtopics",verifyToken, function (req, res, next) {

  
  if (!req.uid) {
    return res.status(400).json({ msg: "please provide required data" });
  }

 

  Topic.find({uid:req.uid},(err,topics)=>{
    if(err){
      console.log('no topic found for this user')
    }
    else {
      let topicsArr = []
      topics.forEach(topic=>{
        console.log(topic)
        topicsArr.push(topic.topicName)
      })
      res.status(200).send(topicsArr)
    }
    


  })
  
});


module.exports = topicRouter;
