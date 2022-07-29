const router = require('express').Router();
const multer = require('multer');
const {renderSignup ,checkUser,verifyEmail,verified} = require('../controller/signup.controller');
const {renderLogin , login} = require('../controller/login.controller.js');
const {renderDashboard} = require('../controller/dashboard.controller');
const {fileUpload} = require('../controller/fileUpload.controller');
const {isAuth} = require("../middlewear/jwtMiddlewear")

const Upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,cb)
        {
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg")
        }
    })
}).single("file")

router.get('/',(req,res)=>{
    const token = req.cookies.JWTtoken;
    
    if(token){
        return res.redirect('/dashboard');
    }
    res.render('index')
})

router.get('/signup',renderSignup);
router.post('/checkUser',checkUser);
router.post('/verifyEmail',verifyEmail);
router.get('/verified',verified);

router.get('/login',renderLogin);
router.post('/login',login);
router.post('/fileUpload',Upload,fileUpload);

router.get('/logout',(req,res) => {
    res.clearCookie('JWTtoken');
    res.redirect('/');
})

router.get('/dashboard',isAuth,renderDashboard)





module.exports = router;