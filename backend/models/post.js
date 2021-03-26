var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var postSchema = new Schema({
  
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  topicName:{
      type:String,
      required:true
  },
}, {
  timestamps: true
})

var Post = mongoose.model('posts', postSchema)

module.exports = {
  model: Post
};
