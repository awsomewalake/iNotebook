const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const JWT_SECRET = "thisisajwtsecret";
var fetchuser = require("../middleware/fetchuser")

//Create a user 
router.post("/createuser",[
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
            // console.log(authtoken);
            res.json({authtoken})
        } catch (error) {
                // console.log(error);
                console.error(error.message);
                res.status(500).send("Internal Server Error")
        }
})


//Authenticate a user
router.post("/login",[
    body('email',"Enter Valid Email").isEmail(),
    body('password',"Password cannot be blank").exists()
    ], async (req,res)=>{
        // If Errors then return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //Check Login Creds
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"Please Try to login with correct credentials"})
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if(!passCompare){
                return res.status(400).json({error:"Please Try to login with correct credentials"})
            }
            const data = {
                u:{
                    id:user._id
                }
            }
            var authtoken = jwt.sign(data, JWT_SECRET);
            // res.json(user)
            // console.log(authtoken);
            res.json({authtoken})

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

//Get User Details 
router.post("/getuser", fetchuser ,  async (req,res)=>{
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send({user});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    
    })
module.exports = router
