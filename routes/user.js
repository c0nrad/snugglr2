
/*
 * GET users listing.
 */

var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var secrets = require('../secrets')
var mongoose = require("mongoose")
var User = require("../models/user")

function init(app) {
  
  // var UserRoutes = require('./routes/user')
  // UserRoutes.init(app)
  app.get("/me", function(req, res) {
    if (req.session.me != undefined) {
      console.log("ALREADY LOGGED ON", req.session.me)
      User.findById(req.session.me, function(err, user) { 
        res.send(user)
      })
    } else {
      u = new User({
      })
      u.save(function(err, user) {
        req.session.me = user._id
        res.send(user)
      })
    }


  })

  app.get('/auth/google', passport.authenticate("google"));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('http://' + secrets.hostname + ':' + secrets.port);
  });

  app.post('/auth/google/return', passport.authenticate('google'), function(req, res) {
    res.send(req.user);
  });

  passport.serializeUser(function(user, done) {
    console.log("serializeUser", user)

    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser", id)
    User.findById(id,done);
  });

  passport.use(new GooglePlusStrategy({
    clientId: secrets.GOOGLE_PLUS_CLIENT_ID,
    clientSecret: secrets.GOOGLE_PLUS_CLIENT_SECRET
  }, function(token, profile, done) {
   // console.log(token, profile)
      User.findOne({ "auth.email": profile.email}, function(err, user) {
        if(user) {
          user.lastLogin = new Date()
          return user.save(done)
        } else {
          var user = new User({
            "auth.email": profile.email,
            name: profile.displayName,
            firstLogin: new Date()
          });
          user.save(function(err, newUser) {
            if (err) throw err;
            console.log(newUser)
            done(null, newUser);
          });

        }
      });
    }
  ));
}

exports.init = init