const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { updateProfileValidationRules, validate } = require('../middleware/validationMiddleware');
const User = require('../models/User');

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put('/', authMiddleware, updateProfileValidationRules(), validate, async (req, res, next) => {
    const { name, email } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        user.name = name;
        user.email = email;
        // Update other fields as needed

        await user.save();
        res.json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
