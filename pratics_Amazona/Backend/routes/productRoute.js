import express from "express";
import Product from "../modals/productModals"
// import User from "../modals/userModals"
import { isAuth , isAdmin } from '../util';


const router = express.Router();



 router.get("/" ,async(req , res) => {
    const products = await Product.find({})
    res.send(products)
 })

 
 router.get("/:id" ,async(req , res) => {
    var productId = req.params.id
    const products = await Product.findOne({_id : productId})
    res.send(products)
 })

 router.post("/"  , isAuth , isAdmin ,  async(req ,res) => {
    const product = new Product({
        name : req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand: req.body.brand,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description,
        rating : req.body.rating,
        numReviews : req.body.numReviews
    })

    const newProduct = await product.save()

    if(newProduct){
        return res.status(201).send({message : 'New Product Create' , data : newProduct})
    }
    return res.status(501).send({meassage : "Error in Creating Product ,"})

 })

 

 router.put("/:id" , isAuth , isAdmin , async(req ,res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id : productId});
    console.log("product_productRouter ===>" ,  product)
    if(product){

        product.name = req.body.name
        product.price=req.body.price
        product.image=req.body.image
        product.brand= req.body.brand
        product.category=req.body.category
        product.countInStock=req.body.countInStock
        product.description=req.body.description
        product.rating = req.body.rating
        product.numReviews = req.body.numReviews

            const updatedProduct = await product.save()

    if(updatedProduct){
        return res.status(200).send({message : 'Product Updated' , data : updatedProduct})
    }
    return res.status(501).send({meassage : "Error in Updating Product ,"})
        
    }
    
  

    const newProduct = await product.save()

    if(newProduct){
        return res.status(201).send({message : 'New Product Create' , data : newProduct})
    }
    return res.status(501).send({meassage : "Error in Creating Product ,"})

 })


 router.delete("/:id", isAuth , isAdmin, async (req , res) => {
    try {
        var deleteProduct = await Product.findById(req.params.id);
        console.log("deleteProduct ====>" , deleteProduct)
        if (deleteProduct) {
            await deleteProduct.deleteOne();
            res.send({ message: "Product Deleted" });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in Deletion" });
    }
});

//  router.delete("/:id" , async(req , res) => {
//     const deleteProduct = await Product.findById(req.params.id);
//     if(deleteProduct){
//         await deleteProduct.remove();
//         res.send({meassage : "product Delete"})
//     }else{
//         res.send("Error in Deletion")
//     }
//  })
 
export default router