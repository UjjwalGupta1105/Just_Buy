const express=require("express")
require("../server")
const router=express.Router()
router.use(express.json())
const auth=require("../middleware/auth")
const stripe=require("stripe")("sk_test_51PNhLnP334ckTMRPnN6iL0uEaKxgh1AAfNS5K4VwZqBPtxiSrfHsHVsK8KTnI1LtKd8MLFLD5ZApzY4FEPCJj2LU001HInZOZi")

// router.post("/payment/process",async(req,res)=>{
//     try {
//         console.log("CameJholaaa")
//         const myPayment=await stripe.paymentIntents.create({
//         amount:req.body.amount,
//         currency:"inr",
//         metadata:{
//             company:"Ecommerse"
//         }
//     })
//         res.status(201).send({
//             success:true,client_secret:myPayment.client_secret
//         })
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// })

// router.get("/stripeapikey",async(req,res)=>{
//     try {
//         console.log("CameJholaaa....")
//         res.status(201).send({
//             stripeApiKey:"pk_test_51PNhLnP334ckTMRPunKELsoP0yNS5z0usOXuGDD6jQK06CqCFAAAExpmjCfc60zsgUUGJFR2vAI7unNPC1nNR5ba00tPIacOA3"
//         })
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// })

// module.exports=router
