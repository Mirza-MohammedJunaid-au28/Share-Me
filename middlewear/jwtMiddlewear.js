const jwt = require('jsonwebtoken');
require("dotenv").config();

function isAuth(req,res,next){
    
    /* console.log("1 Auth => ",req.headers.authorization);
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null; */
    console.log("Req : ",req);
    console.log('Cookies: ', req.cookie);
    /* const token = req.cookieJWTtoken */
    const token = req.cookie['JWTtoken']
    console.log(token);

    if(!token){
        return res.status(401).redirect("/")
    }
    console.log("2 token => ",token);
    console.log("3 Key => ",process.env.JWTKEY)
    jwt.verify(token,process.env.JWTKEY,(err,decoded) => {
        if(err){
            console.log(err);
            return res.status(401).redirect("/")
        }
        console.log("Decoded => ",decoded);
      req.email = decoded.email;
      console.log("4 Decoded Mail =>",req.email);
      req.name = decoded.name; 
      console.log("5 Decoded Name =>",req.name);
      next();
    })
}

module.exports = { isAuth }