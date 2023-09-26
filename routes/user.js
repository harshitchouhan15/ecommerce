const router=require('express').Router()
const Product=require('../models/Product')
const Cart=require('../models/Cart')
const {verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('./verifyToken')
const User=require('../models/User')
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()


//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
try{
const prevUser=await User.findById(req.params.id)
const prevUsername=prevUser.username


    const updatedCart=await Cart.findOneAndUpdate({username:prevUsername}, {
        $set:req.body
    },
    {new:true})


    const updatedUser=await User.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },
    {new:true})
    const {password,...others}=updatedUser._doc
    
//new token
   
    const accessToken=jwt.sign(
        {
            id:updatedUser._id,
            isAdmin:updatedUser.isAdmin
        },
        process.env.SECRET_KEY
     
     )
   
     const newDetails={...others,accessToken}
    
 
    res.status(200).json({newDetails,updatedCart})

}catch(err){
    res.status(500).json(err)
}
   
})

//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{

    try{
     await User.findByIdAndDelete(req.params.id)
    
      
        res.status(200).json("user deleted!")
    
    }catch(err){
        res.status(500).json(err)
    }
})




module.exports=router