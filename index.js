const connectDB = require("./DB/DatabaseConnection")
const dotenv = require('dotenv')

dotenv.config()
connectDB()

const Product = require('./Models/Product')
const Cart = require('./Models/Cart')
const express = require('express')
const app = express();
const port = 3000;

//middlewares
app.use(express.json());

//save data in database 
app.post("/product",async (req, res) => {
    try{
        const productData = await new Product(req.body).save()

        if(productData){
            res.status(200).json({message: "Data is saved Successfully!"})
        }
    }
    catch(err){
        res.status(500).json({err:"Unable to save data!"})
    }
})

//fetch Data from DB
app.get("/product",async (req,res) => {
try{
    const productData = await Product.find()
    if(!productData){
        return res.status(404).json({message:"Unable to fetch Data!"})
    }
    res.status(200).json({message:"Data is fetch Successfully!",productData})
}
catch(err){
    res.status(500).json({err:"Unable to fetch Data!"})
}
})

//Delete data from database 

app.delete("/product/:id",async(req,res) => {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({message: "Data is not exist in DataBase"})
        }
        res.status(200).json({message:"Data is deleted Successfully!",deletedProduct})
    }catch(err){
        res.status(500).json({err:"Unable to delete data!"})
    }
})

//Update data in Database 
app.post("/product/:id", async(req,res) => {
    try{
        const id = req.params.id
        const updatedData = await Product.findByIdAndUpdate(id,req.body,{new:true})

        if(!updatedData){
            return res.status(404).json({message:"Data is not found in DB"},updatedData)
        }

        res.status(200).json({message:"Data is updated successfully"})
    }catch(err){
        res.status(500).json({err:"Unable to update the data"})
    }
})

//cart data save 
app.post("/cart", async(req,res) => {
    try{
        const {productDetails,selectedSize,quantity} = req.body
        if(!productDetails || !selectedSize || !quantity){
            res.status(404).json({message:"Invalid data request"})
        }
        const newCartItem = await new Cart(req.body).save()

        res.status(200).json({message:"Item is added Successfully!", newCartItem})
    }
    catch(err){
        res.status(500).json({err:"Unable to save data in cart"})
    }
})

//fetch cart data
app.get('/cart/:id',async(req,res)=> {
const id = req.params.id;
const cartItem = await Cart.findById(id);
if(!cartItem){
    return res.status(404).json({message:"Cart item not found"})
}
res.status(200).json({message:"Cart item fetched Successfully !", cartItem})
})

//delete cart item 
app.delete("/cart/:id", async(req,res) => {
    try{
        const id = req.params.id;
        const deleteCartItem = await Cart.findByIdAndDelete(id)

        if(!deleteCartItem){
            return res.status(404).json({err:"Cart item is not found"})
        }

        res.status(200).json({message:"Cart item is deleted!",deleteCartItem})
    }catch(err){
        res.status(500).json({err:"Unable to delete cart Item "})
    }
})

//update cart item 
app.post("/cart/:id", async(req,res) => {
    try{
        const id = req.params.id
        const UpdateCart = await Cart.findByIdAndUpdate(id,req.body,{new:true})

        if(!UpdateCart){
            return res.status(404).json({err:"Cart item is not available for update"})
        }

        res.status(200).json({message:"Cart item is updated Successfully!",UpdateCart})
    }catch(err){
        res.status(500).json({err:"Unable to update Cart"})
    }
})
app.listen(port,() => {
    console.log("Server is connected Successfully!", port )
})