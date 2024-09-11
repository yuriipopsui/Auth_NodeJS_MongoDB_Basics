const jwt = require('jsonwebtoken');
const {secretKey} = require('../config.js');

module.exports = function (req, res, next) {
  if(req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(403).json({message: "User is unauthorized"}, error);
    }
    //
    const decodedData = jwt.verify(token, secretKey);
    req.user = decodedData;
    //next() function for run next middleware in chain
    next();
  } catch (error) {
    return res.status(403).json({message: "User is unauthorized", error});
  }
}