var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  birthDate:{
    type:String,
  },
  role:{
    type: String,
    required:false,
  },
  name: {
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
