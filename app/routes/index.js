'use strict';

var path = process.cwd();
var Users = require('../models/users');
//var UserHandler = require(path + '/app/controllers/userController.server.js');

module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        console.log("authenticated");
		if (req.isAuthenticated()) {
            console.log("authenticated");
			return next();
		} else {
            console.log("not authenticated");
			res.redirect('/login');
        }
        return next();
    }
   /*
    app.route('/')
        .get(isLoggedIn, function (req, res) {
            
            res.sendFile(path + '/public/index.html');
        });*/
       
      
    app.route('/login')
        .get(function (req, res) {
            res.sendFile(path + '/public/login.html');
        });
     
    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/login');
        });
    app.route('/react')
        .get(function (req, res) {
            res.sendFile(path + '/front/public/index.html');
        });
    app.route('/profile')
        .get(isLoggedIn, function (req, res,next) {
            //retrieve user from database equal to user logged in
            //if user is found send file else next
            console.log("get called")

            Users.findOne( { 'facebook.displayName': req.user.facebook.displayName } ).exec(function (err,result)
            { if (err) {
                throw err;
                } if (result) {console.log(`user exists as ${result.facebook.displayName}`)
                
                
                res.sendFile(path + '/public/profile.html');
                
            } 
        });
    });
//api for data
/*
app.post('/profile/edit', (req, res) => {
    var newMessage = new Message(req.body);
    newMessage.save((err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  });
        */

    //containers user object from facebook
    app.route('/api/id')
        .get( function (req, res) {
            res.json({id: 'hello im here'});
        });
    
    app.route('/auth/facebook')
        .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));
   
};