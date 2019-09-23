const { body } = require('express-validator/check');

export default class Validations {
    static validity = method => {
        switch (method) {
            case 'create': {
                return [
                    body('email', 'The field(s) are/is required.').exists(),
                    body('password', 'The field(s) are/is required.').exists(),
                    body('email', 'Invalid Email').isEmail(),
                    body('password')
                        .isLength({ min: 8 })
                        .withMessage('Password must be at least 8 chars long')
                        .matches(/\d/)
                        .withMessage('Password must contain a number'),
                ];
            }
            case 'login': {
                return [
                    body('email', 'the email field is empty').exists(),
                    body('password', 'the password field is empty').exists(),
                    body('email', 'Invalid Email').exists(),
                ];
            }
        }
    };

    static displayError = (req, res, errors) => {
        const errorArr = [];

        errors.array().forEach(error => {
            const data = {
                status: 400,
                code: 'USR_10',
                message: error.msg,
                field: error.param,
            };
            errorArr.push(data);
        });
        return res.status(422).json({ errors: errorArr });
    };
}
