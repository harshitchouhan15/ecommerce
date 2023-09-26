const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
   
    brand:{
        type:String,
        required:true,
        unique:false
       
    },

    desc:{
        type:String,
        required:true,
        unique:false
    },
    image:{
        type:String,
        
        required:true

    },
    categories:{
        type:Array,
        default:[],
        required:false,
        unique:false
    },
    price:{
        type:Number,
        required:true,
        unique:false
    },
    size:{
        type:String,
         unique:false,
        required:true
    },
    color:{
        type:String,
        requied:true,
        unique:false
    }
},
    {timestamps:true}
)

module.exports=mongoose.model('Product',ProductSchema)