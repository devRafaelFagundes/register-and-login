const express = require("express");
const {registerUser, loginUser} = require("../controller/auth-controller")
const authMiddlware = require("../middlware/authmiddlware")
const router = express.Router();

router.get('/home', (req, res)=>{
    res.cookie('teste', 'valor do cookie');
    res.render('login-register.ejs')
})
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/welcome', authMiddlware, (req, res)=>{
    const username = req.userInfo.username;
    res.render('welcomeLogged.ejs', {username})
})

module.exports = router;