import express from "express"

import data from "./data"

import dotenv from "dotenv" ;

import config from "./config"

import mongoose from "mongoose"

import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import bodyParser from "body-parser";

dotenv.config();

const mongodbUrl = config.MONGODB_URL

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log(error));

const app = express()

app.use(bodyParser.json())

app.use("/api/users" , userRoute)
app.use("/api/products" , productRoute)

// app.get("/api/products" , (req,res) => {
//     res.send(data.products)
// })

// app.get("/api/products/:id" , (req , res) => {
//     const productId = req.params.id;
//     var findData = data.products.find((x) => x._id === productId)
//     if(findData){
//         res.send(findData)
//     }
//     else{
//         res.status(404).send({msg : "Product Not Found"})
//     }
    
// })


app.listen(5000 , () => console.log('http://localhost:5000'))
