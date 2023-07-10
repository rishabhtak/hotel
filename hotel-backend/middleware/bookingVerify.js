const jwt = require('jsonwebtoken');
require('dotenv').config()

const bookingVerify = (req, res, next) => {
    //get the user from jwt token and add id to req object

    try {
        const token = req.header('auth-token');
        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            req.user = data.user;
        }
        else {
            req.user = null;
        }

        next();


    } catch (error) {
        return res.status(401).json({ error: 'Some error' })
    }
}

module.exports = bookingVerify;