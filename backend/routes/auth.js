const express = require('express');
const {body, validationResult}=require('express-validator');
const User= require('../models/User');
const router = express.Router();

router.post("/", [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
],(req, res) => {
    // Create a user using : POST "/api/auth/". Doesn't require authentication.
    const user = User(req.body);
    user.save();
    
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;