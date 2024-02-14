//router-level middleware
const jwt = require('jsonwebtoken')
//this is to implement jwt middleware for particular routes
const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwt middleware - router level middleware");
     //get the token from user request
     const token = req.headers['authorization']?.slice(7)
     console.log(token);
   try {
    //token verification
    const tokenVerification = jwt.verify(token,'superkey2024')
    console.log(tokenVerification);

    req.payload = tokenVerification.userId

    next()
   } 
   catch (err) {
    res.status(401).json("Authorization failed....please login again")
   }
    

}

module.exports = jwtMiddleware