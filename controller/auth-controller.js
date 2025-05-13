const { default: mongoose } = require("mongoose");
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        console.log(req.body)
    const matchUser = await User.findOne({$or : [{username}, {email}]})
    if (matchUser) {
        return res.status(400).json({
            success : false,
            message : "user already exists"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        username,
        email,
        password : hashedPassword,
    })
    if (newUser) {
        return res.status(200).json({
            success : true,
            message : "user created"
            })
        } else {
            return res.status(400).json({
                success : false,
                message : "something went wrong when trying to create the user"
            })
        }
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "something went wrong, try again later"
        })
    }
}
    

    

const loginUser = async (req, res) =>{
    try {
    const {username, email, password} = req.body;
    const matchUser = await User.findOne({$or : [{username}, {email}]})
    if (!matchUser) {
        return res.status(404).json({
            success : false,
            message : "username not found"
        })
    }
    const matchPassword = await bcrypt.compare(password, matchUser.password);
    if (!matchPassword) {
        return res.status(400).json({
            success : false,
            message : "incorrect password"
        })
    }

    const accessToken = jwt.sign({
        userId : matchUser._id,
        username,
        email
    }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn : "60m"
    })

    res.cookie('token', accessToken, {
        httpOnly : true,
        maxAge : 1000 * 60 * 30,
        sameSite : 'Strict',
        secure : process.env.NODE_ENV === 'production'
    });
    //httpnOnly: can not be requested by js
    //maxAge: max time of a valid cookie
    //secure: only httpS requests

    return res.status(200).json({
        success : true,
        message : "user logged in",
        username
    })

    } catch (e) {
        return res.status(500).json({
            success : false,
            message : "something went wrong, try again later"
        })
    }
    
}
module.exports = {registerUser, loginUser};