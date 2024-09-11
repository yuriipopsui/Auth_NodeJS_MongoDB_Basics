const {Schema, model} = require('mongoose');

const User = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userRoles: [{
    type: String,
    ref: 'Role'
  }]
});

module.exports = model('User', User);