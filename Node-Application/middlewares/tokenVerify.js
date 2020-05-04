let jwt = require('jsonwebtoken');

module.exports = {
    varifyToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send({
                success: false,
                message: 'Please pass the token for authentication'
            })
        } else {
            let token = req.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return res.status(401).send({
                    success: false,
                    message: 'Please pass the correct token for authentication'
                })
            } else {
                jwt.verify(token, 'techtammina', (err, decode) => {
                    if (err) {
                        return res.status(401).send({
                            success: false,
                            message: 'Token varification failed, please try again'
                        })
                    } else {
                        if (decode.userId) {
                            req.headers.userDetails = decode;
                            next();
                        } else {
                            return res.status(401).send({
                                success: false,
                                message: 'UnAuthorized'
                            })
                        }
                    }
                })
            }
        }
    }
}