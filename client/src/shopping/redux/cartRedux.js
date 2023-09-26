import {createSlice} from "@reduxjs/toolkit"

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        quantity:0,
        products:[],
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.products.push(action.payload)
            state.quantity++
            state.total+=action.payload.price*action.payload.quantity
        },
        removeProduct:(state,action)=>{
            if(action.payload.index===0){
                state.products.shift()
            }else{
                const first=state.products.slice(0,action.payload.index)
                const last= state.products.slice(action.payload.index+1,state.products.length)
                const updatedProducts=first.concat(last)
                state.products=updatedProducts
            }
          
            state.quantity--
            state.total-=action.payload.products[action.payload.index].price*action.payload.products[action.payload.index].quantity
        },
        removeCart:(state)=>{

            state.products=[]
            state.quantity=0
            state.total=0
        }, 
         retainCart:(state,action)=>{
            state.products=action.payload.products
            state.quantity=action.payload.quantity
            state.total=action.payload.total
        },
    }
   
})

export const {addProduct,removeProduct,removeCart,retainCart}=cartSlice.actions
export default cartSlice.reducer

