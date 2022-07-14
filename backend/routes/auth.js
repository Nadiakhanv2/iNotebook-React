const express = require('express');
const {body, validationResult}=require('express-validator');
const User= require('../models/User');
const router = express.Router();
 // Create a user using : POST "/api/auth/createuser". Doesn't require authentication.no login required
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password' , 'Password must be at least 5 characters').isLength({ min: 6 })
],async (req, res) => {
  //  if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whther the user with this email exists
    let user= await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    
    
  //     .then((user) => res.json(user))
  //   .catch(err => { console.log(err) })
  // res.json({err : 'please enter a unique value for emial' , message: 'err.message'})
});

module.exports = router;