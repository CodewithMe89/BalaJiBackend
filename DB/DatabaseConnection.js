const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.PRODUCT_URI)
        console.log("DataBase is connected Successfully!")
    }
    catch(err){
        console.log("DataBase is not connected Successfully!", err.message)
    }
}

module.exports = connectDB