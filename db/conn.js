const mongoose = require("mongoose")

const uri = "mongodb+srv://jassa:jassa@cluster0.qquvy4w.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(uri, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`Connected Successfully 👍`)
    }
    catch(err){
        console.log(`Error occurred ${err}`)
    }
}
module.exports = connectDB