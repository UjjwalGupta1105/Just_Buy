const mongoose=require("mongoose")

const productsSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true 
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxlength:[8,"Price cannot exceed 8  characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
              type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxlength:[true,"Stocks Cannot exeed 4 Characters"],
        default:1  
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
    }],
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const Data=new mongoose.model("Data",productsSchema)
module.exports=Data