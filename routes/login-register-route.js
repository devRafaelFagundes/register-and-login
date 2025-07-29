require("dotenv").config();
const express = require("express");
const {registerUser, loginUser} = require("../controller/auth-controller")
const authMiddlware = require("../middlware/authmiddlware")

const jwt = require('jsonwebtoken')
const User = require('../model/user')
const router = express.Router();

router.get('/home', (req, res)=>{
    res.render('login-register.ejs')
})
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/welcome', authMiddlware, (req, res)=>{
    const username = req.userInfo.username;
    res.render('welcomeLogged.ejs', {username})
})

router.get('/confirmation/:token', async (req, res, next) => {
    const token = req.params.token;
    try {
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const username = decodedToken.username;
        const user = await User.findOne({
            username
        })
        if(!user) {
            return res.status(404).json({
                sucess: false,
                message: "User not found"
            })
        }
        user.isConfirmed = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'User successfully authenticated by gmail'
        })

    } catch (error) {
        return next(error)
    }

})
module.exports = router;