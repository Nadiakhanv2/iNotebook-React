const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

const router = express.Router();

    // Route 1 ---Get all the notes using : GET "/api/auth/getuser". Login required

router.get("/fetchallnotes", fetchuser, (req, res) => {
  
  res.json([]);
});

module.exports = router;
