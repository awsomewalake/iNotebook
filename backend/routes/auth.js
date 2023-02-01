const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post("/api/auth",[
    body('email',"Enter Valid Email").isEmail(),
    body('name',"Min Name Length 3 is required").isLength({ min: 3 }),
    body('password',"Min Password lenght 5 is required").isLength({ min: 5 })
    ], (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }).then(user => res.json(user))
          .catch(err=> {console.log(err)
        res.json({error:"Please Enter Unique Value"})})
        // res.send(req.body);
})

module.exports = router
