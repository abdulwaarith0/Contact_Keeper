const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require('express-validator');

const User = require("../models/User");

// @route   POST /api/users
// @desc    Register a user
// @access  Public 
router.post("/", [
    check("name", "Please add a name").notEmpty(),
    check("email", "Please input an email               address").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6, max: 20 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    res.send("Passed");
});


module.exports = router;