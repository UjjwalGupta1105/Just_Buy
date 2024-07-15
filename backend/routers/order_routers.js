const express=require("express")
const router=express.Router()
router.use(express.json())
const Data=require("../productModel")
const User=require("../userModel")
const Order=require("../orderModel")
const auth=require("../middleware/auth")
const authorizeRole=require("../middleware/auth")
const cookieParser=require("cookie-parser")
router.use(cookieParser())

router.post("/order/new",auth,async(req,res,next)=>{
    try {
        console.log("Another")
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }=req.body

    console.log("Theek Hai ")
    console.log( shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
          Date.now(),
         req.user.id,
    )

        const newOrder=new Order({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
             user:req.user.id,
        })
      console.log(newOrder)
        const finalOrder=await newOrder.save()
      console.log("Donoer")

        res.status(201).send(finalOrder)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get("/admin/order/:id",auth,authorizeRole,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","name email")
        res.status(201),send(order)
    } catch (error) {
        res.status(400),send(error)
    }
})
//Logged In User Orders
router.get("/order/me",auth,async(req,res)=>{
    try {
        console.log(req.user.id)
        const order=await Order.find({user:req.user.id})
        res.status(201).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
})
//get all orders ADMIN-:
router.get("/order",auth,authorizeRole,async(req,res)=>{
    try {
        console.log("Cameshale.....")
        const order=await Order.find()

        let totalAmount=0
        order.forEach((order)=>{
            totalAmount+=order.totalPrice
        })
        res.status(201).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
})
//update Order Admin
router.patch("/order/:id",auth,authorizeRole,async(req,res)=>{
    try {
        console.log("CameDhish....")
        const order=await Order.findById(req.params.id)

       if(order.orderStatus==="Delivered"){
        return new ErrorHandler("You have already delivered This Product....")
       }
       if( req.body.status==="Processing" && order.orderStatus==="Shipped"){
        order.orderItems.forEach(async(order)=>{
            await increaseStock(order._id,order.quantity)
           })
       }
       
       if(req.body.status==="Shipped"){
        order.orderItems.forEach(async(order)=>{
            await updateStock(order._id,order.quantity)
           
           })
       }
       
       order.orderStatus=req.body.status
       if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now()
       }

       await order.save({validateBeforeSave:false})
       
       console.log("CameDhish....2")

        res.status(201).send({
            isUpdated:true
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get("/order/:id",auth,authorizeRole,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id)

        res.status(201).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
})
async function increaseStock(id,quantity){
    const product=await Data.findById(id)
    console.log(product)
    product.stock=parseInt(product.stock) + parseInt(quantity)
    await product.save({validateBeforeSave:false})
}
async function updateStock(id,quantity){
    const product=await Data.findById(id)
    console.log(product)
    product.stock=product.stock-quantity
    await product.save({validateBeforeSave:false})
}
//deleteOrder BY ADMIN
router.delete("/admin/order/:id",auth,authorizeRole,async(req,res)=>{
    try {
        console.log("camedhaulaa....")
        const order=await Order.findByIdAndDelete(req.params.id)
        res.status(201).send({
            isDeleted:true
        })
    } catch (error) {
        res.status(400),send(error)
    }
})
module.exports=router