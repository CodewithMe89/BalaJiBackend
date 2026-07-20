const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true
        },
        sizes: [{
            type:String
        }],
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        imgURL: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        brand:{
            type: String,
            required: true
        },
        tagline:{
            type: String,
            trim: true
        },
        description:{
            type:String,
            required: true
        },
        price:{
            type:Number,
            required: true,
            min: 0
        },
        discountPercentage:{
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        features: [
            {
                type:String,
            },
        ],
        details: [{
            type:String,
        },],
        reviews:[reviewSchema],
        exchangePolicy:{
            type:String,
            default:"Easy 15 days returns and exchange",
        },
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product

