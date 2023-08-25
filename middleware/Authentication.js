const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
     const token= req.headers.authorization;
// console.log("sdfffffffff",req)
    if(token){
        jwt.verify(token,"jitendra",(err,decoded)=>{
            if(decoded){
                  req.body.user_id=decoded.user_id;
                // console.log(decoded)
                
                next();
            }else{
                res.send({"msg":"Token didn't match, Please Login First!"})
            }
        })
    }else{
        res.send({"msg":"Please Login First!"})
    }
}

module.exports={auth}