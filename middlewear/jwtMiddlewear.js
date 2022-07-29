const jwt = require('jsonwebtoken');
require("dotenv").config();

function isAuth(req,res,next){

    const token = req.cookies.JWTtoken

    if(!token){
        return res.status(401).redirect("/")
    }

    jwt.verify(token,process.env.JWTKEY,(err,decoded) => {
        if(err){
            console.log(err);
            return res.status(401).redirect("/")
        }
        
      req.email = decoded.email;
      req.name = decoded.name; 
      next();
    })
}

module.exports = { isAuth }