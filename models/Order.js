const mongoose=require('mongoose')

const OrderSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    delivered:{
        type:Boolean,
        default:false
    }
},
    {timestamps:true}
)

module.exports=mongoose.model('Order',OrderSchema)