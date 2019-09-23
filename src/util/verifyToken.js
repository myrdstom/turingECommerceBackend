import jwt from 'jsonwebtoken';

export default class verifyToken {
    static authenticate = (req, res, next) => {
        const token = req.header('Bearer');
        if (!token) {
            return res.status(401).json({
                error: {
                    status: 401,
                    code: 'AUT_02',
                    message: 'Access Unauthorized',
                    field: 'NoAuth',
                },
            });
        }
        try {
            const legit = jwt.verify(token, process.env.JWT_KEY);
            req.legit = legit;
            next(null, {legit});
        } catch (e) {
            res.status(400).json({
                error: {
                    status: 400,
                    code: 'AUT_03',
                    message: 'Invalid token',
                },
            });
        }
    };
}
