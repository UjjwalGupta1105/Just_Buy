const express=require("express")
require("../server")
const router=express.Router()
const User=require("../userModel")
router.use(express.json())
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const auth=require("../middleware/auth")
const authorizeRole=require("../middleware/auth")
const cookieParser=require("cookie-parser")
router.use(cookieParser())
const crypto=require("crypto")
const sendEmail=require("../utils/sendEmail")
const { error } = require("console")
const cloudinary=require("cloudinary")
const stripe=require("stripe")("sk_test_51PNhLnP334ckTMRPnN6iL0uEaKxgh1AAfNS5K4VwZqBPtxiSrfHsHVsK8KTnI1LtKd8MLFLD5ZApzY4FEPCJj2LU001HInZOZi")

router.post("/payment/process",async(req,res)=>{
    try {
        console.log("CameJholaaa")
        const myPayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerse"
        }
    })
        res.status(201).send({
            success:true,client_secret:myPayment.client_secret
        })
    } catch (error) {
        res.status(500).send(error)
    }
    
})

router.get("/stripeapikey",async(req,res)=>{
    try {
        console.log("CameJholaaa....")
        res.status(201).send({
            stripeApiKey:"pk_test_51PNhLnP334ckTMRPunKELsoP0yNS5z0usOXuGDD6jQK06CqCFAAAExpmjCfc60zsgUUGJFR2vAI7unNPC1nNR5ba00tPIacOA3"
        })
    } catch (error) {
        res.status(500).send(error)
    }
    
})


router.post("/register",async(req,res)=>{
    try {
        console.log("Came..")
        // const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        //     folder:"avatars",
        //     width:150,
        //     crop:"scale"
        // })
        const {name,email,password}=req.body
        console.log(`${name} + ${email} + ${password}`)
        const newUser=new User(
            {
                name,
                email,
                password,
        })
//         const newUser =new User({
// name,
// email,
// password,
// // avatar:{
// //     public_id:mycloud.public_id,
// //     url:mycloud.secure_url
// // }
//         })
        
        console.log(newUser)
        console.log("Gone...")
        const token=await newUser.generateAuthToken()
        const savedUser=await newUser.save()
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+5*24*60*60*1000),
            secure:true,
            httpOnly:true
        })
        res.status(201).send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/register",async(req,res,next)=>{
    try {
        // const apiFeatures= new ApiFeatures(Data.find({}),req.query).search()
        const userData=await User.find({})
        res.send(userData)
    } catch(error){
        res.status(400).send(error)
    }
})
router.post("/login",async(req,res)=>{
 try {
        const email=req.body.email
        const password=req.body.password 

        if(!email||!password){
        throw new error("Please Enter Email & Password....")
        }
        console.log("came")
        const user=await User.findOne({email:email})
        // console.log(user.password)
        const isMatch =await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=await user.generateAuthToken()
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+5*24*60*60*1000),
                secure:true,
                httpOnly:true
            })
            res.status(201).send(user)
        }
        else{
            throw new error("Please Enter Valid Email & Password....")
        }
    } 
    catch (error) {
        console.log("error_camela...")
        res.status(400).send("Please Enter Valid Email & Password....")
    }
})
router.get("/logout",auth,async(req,res,next)=>{
    try {
      res.clearCookie("jwt")
    //   await req.user.save()
      res.status(201).send("Successfully Logged-Out")
    } catch(error){
        res.status(400).send(error)
    }
})
router.post("/password/forgot",async(req,res)=>{
    try {
        console.log("Kii Holo...")
        const user=await User.findOne({email:req.body.email})
        const resetToken=user.generatePasswordToken();

        await user.save({validateBeforeSave:false})

        // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/reset/${resetToken}`
        const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
        const message=`Your reset Token is-:\n\n ${resetPasswordUrl} \n\n If You have Not Requested For This then Ignore It.... `

        // console.log(resetPasswordUrl)
        console.log(message)

        try {
            await sendEmail({
                email:user.email,
                subject:`Ecommerse Password Recovery....`,
                message,
            })

            res.status(200).send({
                message:`Your Pasword is sended to ${user.email}.`
            })
        } catch (error) {
            user.resetPasswordToken=undefined
            user.resetPasswordExpire=undefined

            await user.save({validateBeforeSave:false})
        }

        
    } catch (error) {
        res.status(400).send({
            message:"Your ResetPassword Request Could Not Be Processed at this moment...."
        })
    }
})
router.patch("/password/reset/:token",async(req,res)=>{
    try {
        console.log("camgola")
        const resettoken=crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user=await User.findOne({resetPasswordToken:resettoken,resetPasswordExpire:{$gt:Date.now()}})
        console.log(user)

        if(req.body.password!=req.body.confirmPassword){
            throw new error("Confirm Password and Password are NOT Same....")
        }
        user.password=req.body.password
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined
        console.log("Dono")
        await user.save()
        res.status(200).json({
            success:true
        })

    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/me",auth,async(req,res,next)=>{
   try {
       const user=await User.findById(req.user.id)
       res.status(200).send(user)
   } catch (error) {
       res.status(400).send("You Are Not Singned in Please Register Yourself First....")
   }
})
router.post("/me/updatePassword",auth,async(req,res,next)=>{
    try {
        console.log("comeshah hola")
        const user=await User.findById(req.user.id)
        const isMatch =await bcrypt.compare(req.body.password,user.password)
        console.log(isMatch)
        
        if(!isMatch){
            // res.status(400).write("Password is Incorrect....")
        }
        if(req.body.newPassword!=req.body.confirmNewPassword){
            // res.status(400).write("Confirm Password and Password are NOT Same....")

        }
        user.password=req.body.newPassword
        console.log(user)
        await user.save()
        console.log("gono")
        res.status(201).json({
            success:true
        })
    } catch (error) {
        res.status(400).send(error)
    }
 })
 router.patch("/me/update",auth,async(req,res,next)=>{
    try {
        console.log("CAMOLA")
        console.log(req.user.id)
       const updates={
          name:req.body.name,
          email:req.body.email
       }
       console.log(updates)
    //    if(req.body.avatar!=""){
    //     const user=await User.findById(req.user.id)
    //     const imageId=user.avatar.public_id

    //     await cloudinary.v2.uploader.destroy(imageId)
    //    }
       // const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        //     folder:"avatars",
        //     width:150,
        //     crop:"scale"
        // })

    //    newUserData.avatar={
    //     public_id:mycloud.public_id,
    //         url:mycloud.secure_url
    //    }

       const user=await User.findByIdAndUpdate(req.user.id,updates,{new:true})
       console.log(user)
       res.status(201).json({
        success:true
       })
    } catch (error) {
     res.status(400).send(error)
    }
 })
 //By Admin-:
 router.get("/admin/users",auth,authorizeRole,async(req,res,next)=>{
    try {
       const users=await User.find()
       res.status(201).send(users)
    } catch (error) {
     res.status(400).send("Your Request Cannot be Processed at This Time....")
    }
 })
 router.get("/admin/user/:id",auth,authorizeRole,async(req,res,next)=>{
    try {
       const user=await User.findById(req.params.id)
       res.status(201).send(user)
    } catch (error) {
     res.status(400).send("User with this id Does Not Exists....")
    }
 })
 router.patch("/admin/user/update/:id",async(req,res,next)=>{
    try {
       const updates={
          name:req.body.name,
          email:req.body.email,
          role:req.body.role
       }
       const user=await User.findByIdAndUpdate(req.params.id,updates)
       await user.save()
       res.status(201).send({
        success:true
       })
    } catch (error) {
     res.status(400).send("Your Request Cannot be Processed at This Time....")
    }
 })
 router.delete("/admin/user/delete/:id",async(req,res,next)=>{
    try {
        console.log("CameShame")
       const user=await User.findByIdAndDelete(req.params.id)

    //    const imageId=user.avatar.public_id

       //     await cloudinary.v2.uploader.destroy(imageId)

       res.status(201).send({
        success:true
       })
    } catch (error) {
     res.status(400).send("Facing issue In Deleting User....")
    }
 })

module.exports=router