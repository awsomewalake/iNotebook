const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const JWT_SECRET = "thisisajwtsecret";

router.post("/api/auth/createuser",[
    body('email',"Enter Valid Email").isEmail(),
    body('name',"Min Name Length 3 is required").isLength({ min: 3 }),
    body('password',"Min Password lenght 5 is required").isLength({ min: 5 })
    ], async (req,res)=>{
        // If Errors then return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //check whether user with same email exist already
        try {
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({error:"User with this email already exist"})
            }
            var salt = await bcrypt.genSaltSync(10);
            var secPass = await bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            // var jwt = require('jsonwebtoken');
            const data = {
                u:{
                    id:user._id
                }
            }
            var authtoken = jwt.sign(data, JWT_SECRET);
            // res.json(user)
            console.log(authtoken);
            res.json({authtoken})
        } catch (error) {
                // console.log(error);
                console.error(error.message);
                res.status(500).send("Some error occured")
        }
})

module.exports = router
