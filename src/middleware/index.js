const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).send({
                error: {
                    status: 401,
                    code: 'AUT_01',
                    message: 'Authorization code is empty',
                    field: 'NoAuth',
                },
            });
        }
        const token = authorization.split(' ');
        const newtoken = token.length > 1 ? token[1] : token[0];
        jwt.verify(newtoken, process.env.SECRET, (err, decoded) => {
            const { customer_id, email } = decoded.data;
            req.body.customer_id = customer_id;
            req.body.email = email;
        });
    } catch (error) {
        return res.status(401).send({
            error: {
                status: 401,
                code: 'AUT_02',
                message: 'Access Unauthorized',
                field: 'NoAuth',
            },
        });
    }
    return next();
};
