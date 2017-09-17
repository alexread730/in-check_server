const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkTokenSetUser(req, res, next) {
  const tokenHeader = req.get("Authorization");
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next();
      } else {
        req.user = decoded;
        console.log("req.user: ", req.user);
        next();
      }
    });
  } else {
    next();
  }
}

function allowAccess(req, res, next){
  if(req.user.id == req.params.id){
    next();
  }else{
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

module.exports = {
  allowAccess,
  checkTokenSetUser
}
