const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validationResult, check } = require('express-validator');

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route   GET /api/contacts
// @desc    Get all users contacts
// @access  Private 
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/contacts
// @desc    Add contact
// @access  Private 
router.post("/", [auth, [
    check("name", "Name is required").notEmpty()
]], async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { name, email, phone, type } = req.body;

    // Create new contact
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        // Save contact to database
        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   PUT /api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put("/:id", (req, res) => {
    res.send("Update a contact");
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
// @access  Public 
router.delete("/:id", (req, res) => {
    res.send("Delete contact");
});


module.exports = router;