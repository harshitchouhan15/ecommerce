const router=require("express").Router()
const User=require('../models/User')
const jwt= require("jsonwebtoken")
const dotenv=require('dotenv')
const bcrypt=require("bcrypt")
const Cart=require('../models/Cart')
dotenv.config()

//SIGNUP
router.post('/signup',async (req,res)=>{
    const salt= await bcrypt.genSalt(10)
       req.body.password=await bcrypt.hash( req.body.password,salt)
    try{
       const user=new User({ 
           username:req.body.username,
           email:req.body.email,
           password:req.body.password
       })
       const savedUser=await user.save()
       const {password,...others }=savedUser._doc
       const accessToken=jwt.sign(
           {
               id:savedUser._doc._id,
               isAdmin:savedUser._doc.isAdmin
           },
          process.env.SECRET_KEY
       )
        const userData={...others,accessToken}

         //ASSIGN CART
         const newCart = new Cart({
            username:req.body.username
         });
         const userCart=await newCart.save()
       
        res.status(200).json({userData,userCart})
    }catch(err){
        res.status(500).json(err)
        console.error(err)
    }
})

//LOGIN
router.post('/login',async (req,res)=>{
    try{
       const user=await User.findOne({username:req.body.username})
       if(!user) return res.status(404).json('user not found!')

     
       const validated = await bcrypt.compare(req.body.password, user.password);


     if ( !validated) return res.status(400).json('wrong credentials')

    const accessToken=jwt.sign(
       {
           id:user._id,
           isAdmin:user.isAdmin
       },
       process.env.SECRET_KEY
    
    )


     const {password,...others }=user._doc
     const userDetails={...others,accessToken}

     //retain cart
     const userCart=await Cart.findOne({username:req.body.username})

     res.status(200).json({userDetails,userCart})
    }catch(err){
        console.error(err);
        res.status(500).json(err)
    }
})

module.exports=router