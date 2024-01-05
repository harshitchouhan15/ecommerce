const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const path = require('path')
const orderRoute=require('./routes/order')
const cartRoute=require('./routes/cart')
const productRoute=require('./routes/product')
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const stripeRoute=require('./routes/stripe')
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongoDB connection successful")
})
.catch((err)=>{
    console.error(err)
})

const app=express()
app.use(express.json())

app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend is running!")
})



app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/cart", cartRoute)
app.use("/api/stripe", stripeRoute)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
// tresyasgdkbdka