const jwt=require('jsonwebtoken')
const dotenv=require("dotenv")
dotenv.config()

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token;
    if(authHeader){
        const token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY ,  (err,user)=>{
            if (err) {
                return res.status(401).json("invalid token!");
              }
    
            req.user=user
            next()
        })
    }else{
       return res.status(400).json("not allowed")
    }

  
}

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        req.params.id===req.user.id ?
        next() : 

        res.status(400).json("not authorized!")

    })
}

const verifyTokenAndAdmin=(req,res,next)=>{

const admin= ()=>{
   req.user.isAdmin ?
    next() : 
    res.status(401).json("not authorized!")
}

    verifyToken(req,res,admin)
}


const verifyTokenAndCart=(req,res,next)=>{
    verifyToken(req,res,()=>{
        req.body.username===req.user.username||req.user.isAdmin ?
        next() : 

        res.status(401).json("not authorized!")

    })
}

module.exports={
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndCart,
    verifyToken
}

