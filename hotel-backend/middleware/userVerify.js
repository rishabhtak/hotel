const jwt = require('jsonwebtoken');
require('dotenv').config()

const userVerify = (req, res, next) => {
    //get the user from jwt token and add id to req object
 
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate with a vaild token' })
        }
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Please authenticate with a vaild token' })
    }
}

module.exports = userVerify;