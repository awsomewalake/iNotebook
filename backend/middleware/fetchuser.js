var jwt = require('jsonwebtoken')
const JWT_SECRET = "thisisajwtsecret";
const fetchuser = async (req,res,next)=>
{
    //get the user from jwt token and add id to req obj
    const token = req.header('auth-token')
    if(!token)
    {
        res.status(401).send({error: "Please Authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        // console.log(data.u);
        req.user = data.u;
        next();
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a valid token"})
    }
    
}
module.exports = fetchuser;