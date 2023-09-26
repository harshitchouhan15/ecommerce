const router=require('express').Router()
const Cart=require('../models/Cart')
const {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken, verifyTokenAndCart}=require('./verifyToken')
const User=require('../models/User')


//VIEW  CART
router.get("/:id", async(req,res)=>{
    try{
       const cart=await Cart.findOne({username:req.params.id})
        res.status(200).json(cart)

    }catch(err){
        res.status(500).json(err)
    }
})




//UPDATE CART
router.put("/update/:id",verifyTokenAndAuthorization,  async(req,res)=>{

    const cart=await Cart.findOne({username:req.body.username})

    if(req.body.username===cart?.username){
        try{
        
            const updatedCart=await Cart.findOneAndUpdate({username:req.body.username}, {
                $set:req.body
            },
            {new:true})
           
            res.status(200).json(updatedCart)
    
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(404).json("not allowed!")
    }
  
})





module.exports=router