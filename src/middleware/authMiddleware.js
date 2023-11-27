const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const bearer = authHeader?.split(' ')[0];
        if(bearer !== 'Bearer') return res.status(401).send({
            message: 'Not authorized'
        })
        const token = authHeader?.split(' ')[1];
        if(!token) return res.status(500).send({
            message: 'Token not found'
        })
        if(!process.env.ACCESS_TOKEN_SECRET) return res.status(500).send({
            message: 'Access token secret is not defined'
        })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return next();
    } catch (error) {
        return res.status(401).send({
            message: 'Authentication failed'
        })
    }
}

module.exports = { authToken }