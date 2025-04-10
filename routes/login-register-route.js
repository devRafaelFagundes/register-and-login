const express = require("express");
const {registerUser, loginUser} = require("../controller/auth-controller")
const router = express.Router();

router.get('/home', (req, res)=>{
    res.render('login-register.ejs')
})
router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router;