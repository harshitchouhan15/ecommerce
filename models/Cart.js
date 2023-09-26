const mongoose=require('mongoose')

const CartSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    products:{
        type:Array,
        default:[],
        required:false,
        unique:false
    
    },

    quantity:{
    type:Number,
    default:0,
    required:false,
    unique:false
    
    },
    total:{
        type:Number,
        default:0,
        required:false,
        unique:false
    }
},

    {timestamps:true}
)

module.exports=mongoose.model('Cart',CartSchema)