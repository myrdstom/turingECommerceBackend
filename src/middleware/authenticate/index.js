const { body } = require('express-validator/check');

export default class Validations {
    static validity = method => {
            switch (method) {
                case 'login': {
                    return [
                        body('email', 'the email field is empty').exists(),
                        body('password', 'the password field is empty')
                          .exists(),
                        body('email', 'Invalid Email').exists()
                    ];
                }
                case 'create': {
                    return [
                        body('email', 'the email field is empty').exists(),
                        body('password', 'the password field is empty')
                          .exists(),
                        body('email', 'Invalid Email').exists()
                    ];
                }
            }
        }
    }

