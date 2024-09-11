const User = require('./models/User.js');
const Role = require('./models/Role.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secretKey} = require('./config.js');

// function for create JWT 
const createAccessToken = (id, userRoles) => {
  const payload = {
    id,
    userRoles
  }
  return jwt.sign(payload, secretKey, {expiresIn: "12h"});
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({message: 'Error during registration', errors});
      }
      const {userName, userPassword} = req.body;
      const candidate = await User.findOne({userName});
      if(candidate) {
        return res.status(400).json({message: 'User with that user Name is exist'});
      }
      const hashPassword = bcrypt.hashSync(userPassword, 6);
      const userRole = await Role.findOne({value: 'USER'});
      const user = new User({userName, userPassword: hashPassword, userRoles: [userRole.value]});
      await user.save();
      return res.json({message: 'User successfully created'})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({message: 'Registration Error'});
    }
  }

  async login(req, res) {
    try {
      const {userName, userPassword} = req.body;
      const user = await User.findOne({userName});
      if(!user) {
        return res.status(400).json({message: `User ${userName} not found`});
      }
      const validPassword = bcrypt.compareSync(userPassword, user.userPassword);
      if(!validPassword) {
        return res.status(400).json({message: `Entered not correct password`});
      }
      //Using JWT for autorization
      const token = createAccessToken(user._id, user.userRoles);
      return res.json({token});

    } catch (error) {
      console.log(error.message);
      res.status(400).json({message: 'Login Error'});
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      return res.json(users);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({message: 'Get Users Error'});
    }
  }
};

module.exports = new authController();