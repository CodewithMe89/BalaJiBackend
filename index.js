const connectDB = require("./DB/DatabaseConnection")
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
connectDB()

const Product = require('./Models/Product')
const Cart = require('./Models/Cart')
const express = require('express')
const app = express();
const port = 3000;

//middlewares
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: true
}))

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
        const {productDetails,selectedSize,quantity} = req.body;

        if(!productDetails || !selectedSize || !quantity){
            return res.status(404).json({error:"Invalid data request"})
        }
        
        const existingCartItem = await Cart.findOne({
            productDetails: productDetails,
            selectedSize: selectedSize
        });

        if(existingCartItem){
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            return res.status(200).json({message: "Item quantity updated successfully!", existingCartItem});
        }

        const newCartItem = await new Cart({
            productDetails,
            selectedSize,
            quantity: 1
        }).save()

        res.status(201).json({message:"Item is added Successfully!", newCartItem})
    }
    catch(err){
        res.status(500).json({err:"Unable to save data in cart"})
    }
})

//fetch cart data
app.get('/cart',async(req,res)=> {
    try{
const cartItem = await Cart.find().populate('productDetails');
if(!cartItem){
    return res.status(404).json({message:"Cart item not found"})
}

res.status(200).json({message:"Cart item fetched Successfully !", cartItem})
    }
catch(err){
     res.status(500).json({err:"Unable to fetch cart Item "})
}
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

app.put("/cart/:id", async(req,res) => {
    try{
        const {action} = req.body;
        const id = req.params.id;

        const cartItem = await Cart.findById(id)

        if(!cartItem){
            return res.status(404).json({message: "Cart item doesn't exists"});
        }

        if(action === "increment"){
            cartItem.quantity += 1;
        }else if(action === "decrement"){
            cartItem.quantity -= 1;
        }else{
            return res.status(404).json({message:"Invalid action request "})
        }

        await cartItem.save();

        res.status(200).json({message:"Cart Item update successfully!", cartItem})

    }catch(err){
        res.status(500).json({err:"Unable to update Cart Item!"})
    }
})
app.listen(port,() => {
    console.log("Server is connected Successfully!", port )
})