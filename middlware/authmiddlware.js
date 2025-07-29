const jwt = require("jsonwebtoken")

const authMiddlware = async (req, res, next)=>{
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(' ')[1];

    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            success : false,
            message : "access denied, no tokens were found"
        })
    }

    try {
        const decodedInformation = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        console.log(decodedInformation)
        req.userInfo = decodedInformation;
        if(!req.userInfo.isConfirmed) {
            return res.status(400).json({
                success : false,
                message : 'Waiting for the email confirmation'
            })
        }
        
        next();
    } catch (e) {
        return res.status(500).json({
            success : false,
            message : "something went wrong"
        })
    }
}
module.exports = authMiddlware;