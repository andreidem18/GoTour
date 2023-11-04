const jwt = require('jsonwebtoken');
const {user} = require('../models');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; 
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.sendStatus(403);
            const loggedUser = await user.findByPk(decoded.id);
            req.user = loggedUser;
            next();
        }
    )
}

module.exports = verifyJWT;
