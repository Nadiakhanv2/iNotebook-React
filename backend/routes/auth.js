const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET="Nadiaisasupersecret";

// Route 2 ---Create a user using : POST "/api/auth/createuser". Doesn't require authentication.no login required
router.post(
  "/createuser", fetchuser ,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //  if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whther the user with this email exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        id: user._id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);

      // res.json(user);
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
    // Route 2 ---Authenticate a user using : POST "/api/auth/login". Doesn't require authentication.no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ], async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ msg: "Please try to login with correct credentials" });
      }
      const data = {
        id: user._id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

})
  

    // Route 3 ---Get logedin user details using : POST "/api/auth/getuser". Login required
    router.post("/getuser", async (req, res) => {
      try {
        const user = await User.findById(req.user.id);

        //  = req.user.id;
        // const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    });
module.exports = router;
