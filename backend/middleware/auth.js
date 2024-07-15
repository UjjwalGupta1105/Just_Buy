require('dotenv').config({path:"../.env"})
const jwt=require("jsonwebtoken")
const User=require("../userModel")
const cookieParser=require("cookie-parser")


const auth=async(req,res,next)=>{
    
    try {
         console.log("CAME")
        const token=req.cookies.jwt
        console.log(token)
        const verify=jwt.verify(token,"mynameisujjwalguptacurrentyingorkhpurinMMMUTecebranch")
        console.log(verify)
        req.user=await User.findOne({_id:verify._id})
        console.log(req.user)
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}
const authorizeRole=async(req,res,next)=>{
    try {
        if(req.user.role=="admin"){
            next()
        }
    } catch (error) {
        res.status(403).send("Your Role is not allowed to access this....")
    }
        
     } 
module.exports=auth,authorizeRole
