const express = require("express");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { validationResult, check } = require('express-validator');

const router = express.Router();
const User = require("../models/User");


// @route   GET /api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(401).send("Server Error");
    }
});

// @route   POST /api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post("/",
    // Authenticate user and get token
    [
        check("email", "Please input a valid email").isEmail(),
        check("password", "Password is required").exists()
    ], async (req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password } = req.body;

        // Check if user exists by email
        try {
            let user = await User.findOne({ email });

            // If user does not exist
            if (!user) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            // If user exists, compare password
            const isMatch = await bcrypt.compare(password, user.password);
            // If password does not match
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            // If password matches, create payload
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
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });


module.exports = router;