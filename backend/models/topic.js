var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var topicSchema = new Schema({
  
  uid: {
    type: String,
    required: true
  },
  topicName : { 
    type : String ,
    "default" :true }
}, {
  timestamps: true
})

var Topic = mongoose.model('topics', topicSchema)

module.exports = {
  model: Topic
};
