const router=require('express').Router()
const Product=require('../models/Product')
const {verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('./verifyToken')
const User=require('../models/User')



//VIEW  ALL PRODUCTS
router.get("/",async (req,res)=>{
    let products
    const cat=req.query.category
   const product = req.query.product
        try{
            if(cat && product){
                products = await Product.find({categories:{ $all:[cat,product]
                   
                }        
                    })
                
            }
           
            else  if(cat){
        products= await Product.find({categories:{$in : [cat]}})
    }
    
    else{
        products= await Product.find()
       
    }
    res.status(200).json(products)
    
    }catch(err){
        return res.status(500).json('products not found!')
    }
})





//VIEW  SINGLE PRODUCT
 router.get("/:id",async (req,res)=>{
   try{
       let product
       product= await Product.findById(req.params.id)
     
   if(!product) return res.status(404).json('products not found!')
       res.status(200).json(product)
   }catch(err){
       return res.status(500).json('products not found!')
    }
})



//CREATE PRODUCT
router.post("/create",  async(req,res)=>{
    if(req.body.isAdmin){
        try{
          
            const newProduct = new Product(req.body);
            const savedProduct=await newProduct.save()
    
            res.status(200).json(savedProduct)
    
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(400).json("not admin!")
    }
  
})

//UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },
        {new:true})

        res.status(200).json(updatedProduct)

    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE PRODUCT
router.delete("/:id", async(req,res)=>{

    try{
     await Product.findByIdAndDelete(req.params.id)
    
      
        res.status(200).json("product deleted!")
    
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports=router