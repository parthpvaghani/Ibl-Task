var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  
  email: {
    type: String,
    required: true
  },
  role:{
    type: String,
    required:false,
  },
  fullName: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },

}, {
  timestamps: true
})

var User = mongoose.model('users', userSchema)

module.exports = {
  model: User
};
