var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  GPS: {
    lat: {default: 20, type: Number}, 
    lng: {defualt: 21, type: Number}
  },
  profile: [String],
  blocks: [{type: Schema.Types.ObjectId, ref: "Users"}],

  gender: {type: String, enum: ["male", "female"], default: "female"},
  interested: {type: String, enum: ["male", "female"], default: "male"}
})

module.exports = mongoose.model('User', UserSchema)

// var User = mongoose.model('User')
// u = new User({
//   name: "Stuart Larsen",
//   GPS: {lat: 20, lng: 20},
//   auth: {email: "sclarsen@mtu.edu"}, 
// })
// u.save()