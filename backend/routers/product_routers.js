const express=require("express")
const router=express.Router()
const Data=require("../productModel")
router.use(express.json())
// const ApiFeatures=require("../utils/apifeatures")
const auth=require("../middleware/auth")
const authorizeRole=require("../middleware/auth")
const cookieParser=require("cookie-parser")
router.use(cookieParser())

const cloudinary=require("cloudinary")

// const ObjectId = require('mongodb').ObjectID;

// router.get("/",async(req,res)=>{
//     res.send("HII Welocme TO Our Page....Aakhirkaarrr")
// })

router.post("/product/new",auth,authorizeRole,async(req,res,next)=>{
    try {
        
        // let images=[]

        // if(typeof req.body.images==="string"){
        //     images.push(req.body.images)
        // }else{
        //     images=req.body.images
        // }

        // const imagesLinks=[]

        // for(let i=0;i<images.length;i++){
        //     const result=await cloudinary.v2.uploader.upload(images[i],{
        //         folder:"products"
        //     })

        //     imagesLinks.push({
        //         public_id:result.public_id,
        //         url:result.secure_url
        //     })
        // }

        // req.body.images=imagesLinks
        req.body.user=req.user.id
        const newproduct =new Data(req.body)
        console.log(newproduct)
        const savedproduct=await newproduct.save()
        res.status(201).send({
            success:true,
            product:savedproduct
        })
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/admin/product",async(req,res)=>{
    try {
        const productdata=await Data.find({})
        console.log(productdata)
        res.status(201).send(productdata)
    } catch(error){
        res.status(400).send("Error in parsing data")
    }
})
router.get("/admin/product/:id",async(req,res,next)=>{
    try {
        const id=req.params.id
        const productdata=await Data.findById({_id:id})
        res.status(201).send(productdata)
    }catch(error){
        res.status(400).send(error)
    }
})
router.patch("/admin/product/:id",auth,authorizeRole,async(req,res,next)=>{
    try {
        console.log("Tame")
        const id=req.params.id

        // let product=await Data.findById(id)

         // let images=[]

        // if(typeof req.body.images==="string"){
        //     images.push(req.body.images)
        // }else{
        //     images=req.body.images
        // }

        // if(images !==undefined){
             // for(let i=0;i<product.images.length;i++){
        //     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        // }

        // }

        // const imagesLinks=[]

        // for(let i=0;i<images.length;i++){
        //     const result=await cloudinary.v2.uploader.upload(images[i],{
        //         folder:"products"
        //     })

        //     imagesLinks.push({
        //         public_id:result.public_id,
        //         url:result.secure_url
        //     })
        // }

        // req.body.images=imagesLinks



        const productdata=await Data.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({
            isUpdated:true
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
router.delete("/admin/product/:id",auth,authorizeRole,async(req,res,next)=>{
    try {

        // for(let i=0;i<product.images.length;i++){
        //     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        // }

        const id=req.params.id
        const productdata=await Data.findByIdAndDelete(id)
        res.send({
            isDeleted:true
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get("/admin/reviews/:id",auth,authorizeRole,async(req,res,next)=>{
    try {

        const id=req.params.id
        const productdata=await Data.findById(id)
        res.send(productdata.reviews)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post("/product/reviews/:id",auth,async(req,res,next)=>{
    try {
        console.log("kaamkeshwar")
        const review={
            user:req.user._id,
            name:req.user.name,
            rating:Number(req.body.rating),
            comment:req.body.comment
        }
        console.log(review)
        
        const id_=req.params.id
        console.log(id_)

        const product=await Data.findById(id_)
        console.log(product)

        product.reviews=product.reviews.filter((rev)=>{
        console.log(rev.user.toString()!==review.user.toString())
          return rev.user.toString()!==review.user.toString()
        })
       
            product.reviews.push(review)
             product.numberOfReviews=product.reviews.length
       
        console.log("go go")

        let avg=0;
        product.reviews.forEach((rev)=>{
            avg+=rev.rating
        })
        product.rating=avg/product.reviews.length

        await product.save()

        res.status(201).send({
            success:true
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
router.patch("/product/review/:id",async(req,res,next)=>{
    try {
        const id=req.params.id
        const productdata=await Data.findById({_id:id})
        res.status(201).send(productdata.reviews)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.delete("/admin/reviews/:productId/:reviewId",auth,async(req,res,next)=>{
    try {
        console.log("KaamDhenu....")
        console.log(req.params.productId)
        console.log(req.params.reviewId)
        
        const productId=req.params.productId
        const productdata=await Data.findById(productId)
        console.log(productdata)

        const newReviews=productdata.reviews.filter((rev)=>{
                return rev._id.toString()!==req.params.reviewId.toString()
        })
        console.log(newReviews)
        productdata.reviews=newReviews
        console.log(productdata)
        console.log("KaamDhenu....2")
        let avg=0;
        productdata.reviews.forEach((rev)=>{
            avg+=rev.rating
        })
        if(productdata.reviews.length===0){
            productdata.rating=0
        }
        else{
             productdata.rating=avg/productdata.reviews.length
        }
        productdata.numberOfReviews=productdata.reviews.length

        await productdata.save()

        res.status(201).send({
            success:true
        })
    } catch (error) {
        res.status(500).send(error)
    }
})




module.exports=router;