const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");


    // Route 1 ---Get all the notes using : GET "/api/auth/getuser". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try{
    const notes = await Notes.find({ user: req.user.id });
   res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  
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
    try {
      
    
    const { title, description, tag } = req.body;
    //  if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description , tag , user: req.user.id
    })
    const savedNote= await note.save()
    res.json(savedNote);
    } catch (error){
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


module.exports = router;
