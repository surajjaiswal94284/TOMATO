const jwt=require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    //console.log("Token:",token);
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded:",token_decode);
        //req.body.userId = token_decode.id;
        req.body.userId = token_decode.userId;

        //console.log('Token-Decoded-id:',req.body.userId);
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}
module.exports=authMiddleware;
