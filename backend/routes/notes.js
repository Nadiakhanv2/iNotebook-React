const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");


    // Route 1 ---Get all the notes using : GET "/api/auth/getuser". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
   res.json(notes);
});


// Route 2 ---Add a new note using : POST "/api/auth/addnote". Login required

router.get(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
);


module.exports = router;
