const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require('express-validator');

const User = require("../models/User");

// @route   POST /api/users
// @desc    Register a user
// @access  Public 
router.post("/",
    // Validate input
    [
        check("name", "Please add a name").notEmpty(),
        check("email", "Please input an email address").isEmail(),
        check("password", "Please enter a password within 6 to 20 characters").isLength({ min: 6, max: 20 })
    ], async (req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        // Destructure req.body
        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }
            // Else create new user
            user = new User({
                name,
                email,
                password
            });

            // Hash/encrypt password
            const salt = await bcrypt.genSalt(10);

            // Set password to hashed password
            user.password = await bcrypt.hash(password,
                salt)

            // Save user to database
            await user.save();

            // Create payload
            const payload = {
                user: {
                    id: user.id
                }
            }

            // Sign token
            jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }
    });


module.exports = router;