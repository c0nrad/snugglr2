var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SnapSchema = new Schema({
  dateSent: {type: Date, default: Date.now},
  path: String,
  to: {type: Schema.Types.ObjectId, ref: 'User'},
  from: {type: Schema.Types.ObjectId, ref: 'User'},
  seen: {type: Boolean, default: false}, 
  gender: {type: String, enum: ["male", "female"]}
})

module.exports = mongoose.model('Snap', SnapSchema)

// var Snap = mongoose.model('Snap')
// s = new Snap({
//   from: "538fe7cf5c5de2e128edcdf8", 
//   to: "538fe7ca7d6ab4d428788349", 
//   path: "http://localhost:3000/uploads/cookie.jpg"
// })
// s.save()