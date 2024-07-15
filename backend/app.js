if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:"/.env"})
}
// env.config({path:".env"})
// const port=process.env.PORT
const port=4000
const path=require("path")
const express=require("express")
const app=express()
const router=require("./routers/product_routers")
app.use(router)
const userRouter=require("./routers/users_routers")
app.use(userRouter)
const orderRouter=require("./routers/order_routers")
app.use(orderRouter)
// const paymentRouter=require("./routers/payment_routers")
// app.use(paymentRouter)
app.use(express.json())
const Data=require("./productModel")
const User=require("./userModel")
const Order=require("./orderModel")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const fileUpload=require("express-fileupload")
const bodyParser=require("body-parser")
router.use(cookieParser())

app.use(express.static("build"))

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

const connectdatabase=require("./server")
connectdatabase()

app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`)
})
console.log(`Port is ${process.env.PORT}`)

module.exports=app