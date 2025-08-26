const jwt = require('jsonwebtoken');
require('dotenv').config(); // <-- add ()

const jwtAuthmiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    const token = authorization.split(' ')[1]; // <-- split by space
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
        req.user = decoded; // attach payload
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const generatetoken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:300000}); // generate token
};

module.exports = { jwtAuthmiddleware, generatetoken };
