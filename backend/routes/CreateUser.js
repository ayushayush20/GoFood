const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "Thisisthejwtsecretstringof32bits";

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Min password length: 5").isLength({ min: 5 })
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            location: req.body.location
        }).then(res.json({ success: true }));

    } catch (error) {
        console.log(error)
        res.json({ success: true });
    }
})

router.post("/login", [
    body('email').isEmail(),
    body('password', "Min password length: 5").isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    } 
    const { email, password } = req.body;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        const pwdCompare = await bcrypt.compare(password, userData.password)
        if (!pwdCompare) {
        //if (req.body.password !== userData.password) { 
            return res.status(400).json({ success, error: "Incorrect password!" });
        }

        const dataObj = {
            user: {
                id:userData.id
            }
        };
        success = true;
        const authToken = jwt.sign(dataObj, jwtSecret); 
        res.json({ success, authToken})
    } catch (error) {
        console.error(error.message)
        res.send("server error") 
    }
})

module.exports = router;