const connectDB = require('./DB/DatabaseConnection')
const fs = require('fs')
const Product = require('./Models/Product')
connectDB();

const readableStream = fs.readFileSync("product.json","utf-8")
const jsonData = JSON.parse(readableStream)

const seedProductData = () => {
    try{
        for (const product of jsonData){
            const newProduct = new Product({
                productName: product.productName,
                sizes: product.sizes,
                ratings: product.ratings,
                imgURL: product.imgURL,
                category: product.category,
                gender: product.gender,
                brand: product.brand,
                tagline: product.tagline,
                description: product.description,
                price: product.price,
                discountPercentage: product.discountPercentage,
                features: product.features,
                details: product.details,
                reviews: product.reviews,
                exchangePolicy: product.exchangePolicy
            })
            newProduct.save()
        }
    }catch(err){
        console.log("Error while seeding mass data")
    }
}

seedProductData()