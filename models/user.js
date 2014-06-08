var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  phone: String,
  GPS: {
    lat: Number, 
    lng: Number
  },
  auth: {
    email: String,
  },
  profile: [String] 
})

module.exports = mongoose.model('User', UserSchema)

// var User = mongoose.model('User')
// u = new User({
//   name: "Stuart Larsen",
//   GPS: {lat: 20, lng: 20},
//   auth: {email: "sclarsen@mtu.edu"}, 
// })
// u.save()