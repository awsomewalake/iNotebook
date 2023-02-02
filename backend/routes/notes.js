const express = require("express");
// const { model } = require('mongoose')
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//Route1: Get all Notes using: GET "/api/notes/fetchallnotes". Login Required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//Route2: Add new Notes using: POST "/api/notes/addnote". Login Required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Min Title Length 3 is required").isLength({ min: 3 }),
    body("description", "Min Description lenght 5 is required").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If Errors then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Create a new Note
    const { title, description, tag } = req.body;

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//Route3: Update an existing note using: PUT "/api/notes/updatenote". Login Required


router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // find the note to be updated

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id)
        {
            // console.log(note.user.toString)
            return res.status(401).send("Not Allowed");
        }
        note  = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
        res.json({note});
    })



//Router4: Delete an existing note using: DELETE "/api/notes/deletenote". Login Required


router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        const {title, description, tag} = req.body;

        // find the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id)
        {
            // console.log(note.user.toString)
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"deleted": "Deleted"});
    })

module.exports = router;
