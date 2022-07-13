const express = require('express');
const User= require('../models/User');
const router = express.Router();

router.post("/", (req, res) => {
    // Create a user using : POST "/api/auth/". Doesn't require authentication.
    const user = User(req.body);
    user.save()
    
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;