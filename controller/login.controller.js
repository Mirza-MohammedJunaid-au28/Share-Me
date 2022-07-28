const connection = require("../db/db");

const jwt = require('jsonwebtoken')

function renderLogin(req,res){
    res.render('login');
}

function login(req,res){
    const data = req.body;
    const param = [data.email]
    connection.query('select * from users where email = ?',param,(error,result) => {
        
        if(error){
            return res.status(500).send(error)
        }

        if(result.length < 1){
            return res.status(404).send({
                msg : "User Not Found" ,
                error : true
            })
        }
        
        if(result[0].email == data.email && result[0].password == data.password){
            
            const payload = {
                "name" : result[0].name,
                "email" : result[0].email,
                "login" : true
            }

            const token = jwt.sign(payload,process.env.JWTKEY,{expiresIn : '30d'})

            res.cookie("JWTtoken",token,{
                expires : new Date(Date.now() + 60 * 60 * 24 * 30)
            });

            return res.status(200).redirect('/dashboard')
        }

        else if(result[0].email == data.email && result[0].password != data.password){
            return res.status(401).send({
                msg : "Invalid Credentials",
                error : true
            })
        }

    })
}
/* function login(req,res){
    const data = req.body;
    const param = [data.email]
    connection.query('select * from users where email = ?',param,(error,result) => {
        
        if(error){
            return res.status(500).send(error)
        }

        if(result.length < 1){
            return res.status(404).send({
                msg : "User Not Found" ,
                error : true
            })
        }
        
        if(result[0].email == data.email && result[0].password == data.password){

            console.log(result);

            const payload = {
                "name" : result[0].name,
                "email" : result[0].email,
                "login" : true
            }

            const token = jwt.sign(payload,process.env.JWTKEY,{expiresIn : '30d'})

            return res.status(200).send({
                token : token,
                msg : "Aunthenticated" ,
                error : false
            })
        }

        else if(result[0].email == data.email && result[0].password != data.password){
            return res.status(401).send({
                msg : "Invalid Credentials",
                error : true
            })
        }

    })
} */

module.exports = {renderLogin , login};