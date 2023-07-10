const jwt = require('jsonwebtoken');
require('dotenv').config()

const adminVerify = (req, res, next) => {
    //get all the users for admin access
 
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate admin with a vaild token' })
        }
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.admin = data.admin;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Please authenticate admin with a vaild token' })
    }
}

module.exports = adminVerify;