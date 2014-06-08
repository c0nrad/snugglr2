var baucis = require('baucis')

exports.init = function(app) {

  var User = require('../models/user')
  var UserController = baucis.rest('User')

  var Snap = require('../models/snap')
  var SnapController = baucis.rest('Snap')

  app.use('/api', baucis());
}