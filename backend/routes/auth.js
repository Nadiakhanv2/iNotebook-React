const express = require('express');
const {body, validationResult}=require('express-validator');
const User= require('../models/User');
const router = express.Router();

router.post("/", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password' , 'Password must be at least 5 characters').isLength({ min: 6 })
],(req, res) => {
    // Create a user using : POST "/api/auth/". Doesn't require authentication.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => res.json(user));
    res.send(req.body);
});

module.exports = router;