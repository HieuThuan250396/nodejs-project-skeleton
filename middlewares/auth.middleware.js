const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, jwtKey);

    try {
        const user = await User.findOne({
            _id: data._id,
            'tokens.token': token,
        });

        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource',
        });
    }
};

module.exports = auth;
