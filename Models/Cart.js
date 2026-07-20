const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        selectedSize:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            default: 1,
            min: 1
        },
        productDetails:{
            type:mongoose.Schema.Types.ObjectId,ref:"Product",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart