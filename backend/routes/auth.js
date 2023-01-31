const express = require('express')
const router = express.Router();

router.get("/api/auth", (req,res)=>{
    const obj = {
        name: "atharva",
        num: 911
    }
    res.json(obj)
})
module.exports = router