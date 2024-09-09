const { check, validationResult } = require('express-validator');

// Validation rules for user registration
const registerValidationRules = () => {
    return [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ];
};

// Validation rules for user login
const loginValidationRules = () => {
    return [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ];
};

// Middleware to handle validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    registerValidationRules,
    loginValidationRules,
    validate,
};
