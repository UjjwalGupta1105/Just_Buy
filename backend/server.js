if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:"/.env"})
}
const cloudinary=require("cloudinary")
const mongoose=require("mongoose")
const password = encodeURIComponent("Ujjwal000@")

const connectdatabase=()=>{
    mongoose.connect(`mongodb+srv://ujjwalgupta0506:${password}@ecommerce.in0izd5.mongodb.net/Ecommerce?retryWrites=true&w=majority`
).then(()=>{
    console.log("connected successfull")
}).catch((err)=>{
    console.log(err)
})
}
 const myCloudinary=cloudinary.config({
    cloud_name:  "daebtgeu8",
    api_key:"498225184491468",
    api_secret:"VXlvJ_7CojKjJ1qPBZouFAMCqWY",
})
module.exports=connectdatabase;
console.log(`connected link is ${process.env.DB_URL}`)
