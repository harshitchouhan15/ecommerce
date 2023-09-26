const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const {verifyTokenAndAuthorization,verifyToken,verifyTokenAndAdmin}=require('./verifyToken')

router.post("/payment", verifyToken, (req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"inr"
    },
    (err,stripeRes)=>{
        if(err){
            res.status(500).json(err)
            console.error(err)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})


module.exports= router
