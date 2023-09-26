const router=require('express').Router()
const Order=require('../models/Order')
const {verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('./verifyToken')
const User=require('../models/User')


//VIEW  order
router.get("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
       const order=await Order.findById(req.params.id)
        res.status(200).json(order)

    }catch(err){
        res.status(500).json(err)
    }
})


//CREATE order
router.post("/create", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const neworder = new Order(req.body);
        const savedorder=await neworder.save()

        res.status(200).json(savedorder)

    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE order
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        
        const updatedorder=await Order.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },
        {new:true})

        res.status(200).json(updatedorder)

    }catch(err){
        res.status(500).json(err)
    }
})





module.exports=router