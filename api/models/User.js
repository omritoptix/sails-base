/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt'),
    uuid = require('node-uuid');

module.exports = {

  attributes: {

    firstName: {
      type: 'string',
      maxLength: 30
    },

    lastName: {
      type: 'string',
      maxLength: 30
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      defaultsTo: function() {return uuid.v4().substring(0,30);}
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  protectedAttributes: function () {
    return [ "isActive", "username"];
  },

  beforeCreate: function(user, cb) {
    // Encrypt password
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  },

  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }

}


