const jwt = require('jsonwebtoken');
const {secretKey} = require('../config.js')

module.exports = function(roles) {
  return function (req, res, next) {
    if(req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      if (!token) {
        return res.status(403).json({message: "User is unauthorized", error}); 
      }
      const {userRoles} = jwt.verify(token, secretKey);
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded);
      let hasRole = false;
      userRoles.forEach(role => {
        if(roles.includes(role)) {
          console.log(role);
          hasRole = true;
        }
      });
      if(!hasRole) {
        return res.status(403).json({message: "You have no access", error});
      }
      next();
    } catch (error) {
      return res.status(403).json({message: `User is unauthorized: ${error}`});
    }
  }
}