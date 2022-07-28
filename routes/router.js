const router = require('express').Router();
const {renderSignup , signup ,checkUser,verifyEmail} = require('../controller/signup.controller');
const {renderLogin , login} = require('../controller/login.controller.js');
const {renderDashboard} = require('../controller/dashboard.controller');
const {errorDisplay} = require('../controller/error.controller');
const {isAuth} = require("../middlewear/jwtMiddlewear")

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/signup',renderSignup);
router.post('/signup',signup);
router.post('/checkUser',checkUser);
router.post('/verifyEmail',verifyEmail);

router.get('/login',renderLogin);
router.post('/login',login);

/* router.get('/dashboard',isAuth,renderDashboard) */

router.get('/error',errorDisplay);



module.exports = router;