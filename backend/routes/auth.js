const express = require('express')
const router = express.Router();
const User = require('../models/User')
router.post("/api/auth", (req,res)=>{
    const obj = {
        name: "atharva",
        num: 911
    }
    // res.json(obj)
    console.log(req.body)
    const user = User(req.body);
    user.save();
    res.send(req.body)
})
module.exports = router
