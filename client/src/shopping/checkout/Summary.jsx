import {axiosInstance} from "../../config"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components"
import {Add } from "../productdetail/Detail"
import { removeCart, removeProduct } from "../redux/cartRedux"
import cart from "../assets/cart.jpg"
import StripeCheckout from 'react-stripe-checkout';
import { Link } from "react-router-dom";


const Container=styled.div`
    padding: 20px;
    overflow-x: hidden;
    height: max-content;
    @media screen and (max-width:768px){
     padding: 5px;
    }
    &>h1{
        text-align: center;
        font-weight: 400;
        margin-block: 10vh 30px;
      
        
    }

`

const Wrapper=styled.div`
    display: flex;
    
    justify-content: space-between;
    @media screen and (max-width:768px){
    flex-direction: column;
    gap: 30px;
    }
`
const Left=styled.div`
    width: 73%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media screen and (max-width:768px){
      width: 93%;
      margin-inline: auto;
    }
    &>div{
        padding:10px 90px 10px 10px;
        box-shadow:2px 2px 4px 2px #ceced0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media screen and (max-width:768px){
      padding: 15px;
box-shadow: none;
border-bottom: 1px solid #afaeae;
      flex-direction: column;
    }
        &>div{
            display: flex;
            flex-direction: column;
            gap: 15px;
            @media screen and (max-width:768px){
                margin-top: 25px;
      flex-direction: row;
      align-items: center;
    }
            &>div{
                font-size: 29px;
                font-weight: 400;
                @media screen and (max-width:768px){
      font-size: 20px;
    }
            }
            &>span{
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 29px;
                @media screen and (max-width:768px){
      font-size: 20px;
    }
            }
        }
        &>span{
            display: flex;
            align-items: center;
            gap: 20px;
            &>div{
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
        }
    }
`
const Right=styled.div`
  width: 25%;
    display: flex;
    flex-direction: column;
    box-shadow:2px 2px 4px 2px #ceced0;
    gap: 30px;
    padding: 10px 20px;
    height: max-content;
    @media screen and (max-width:768px){
     width: 100%;
     padding-top: 10px;
    gap: 15px;
     box-shadow: none;
     background-color: #ebe9e9;
    }
    &>:nth-child(5){
        font-weight: 500;
        font-size: 25px;
        padding-top: 10px;
        border-top: 0.6px solid #a09fa2;
    }
    &>h1{
        font-weight: 400;
        text-align: center;
    }
    &>div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>:first-child{
            font-weight: bold;
        }
    }
`
const Image=styled.img`
    height: 30vh;
    width: 15vw;
    @media screen and (max-width:768px){
      height: 150px;
      width: 120px;
    }
`

const Cart=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 70vh;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
    @media screen and (max-width:768px){
      height: 50vh;
      
      gap: 30px;
      &>img{
        width: 70vw;

        height: 50%;
      }
    }
   ; &>img{
width: 40%;
height: 75%;
    }
`

const Summary = () => {
  
    const total=useSelector(state=>state.cart.total)
    const user = useSelector(state=>state.user.currentUser)
     const products=useSelector(state=>state.cart.products)
   const [stripeToken,setStripeToken] = useState(null)
    const [index,setIndex]=useState(products.length)
    const dispatch=useDispatch()
    const [toggle,setToggle]=useState(true)

    const amountInPaise = total*100-4000; // Amount in the smallest currency unit (paise)
const amountInRupees = amountInPaise / 100; // Convert to Rupees
const formattedAmount = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
}).format(amountInRupees);

console.log(`Amount to pay: ${formattedAmount}`);


    useEffect(()=>{
        const sendToken = async()=>{
            dispatch(removeCart())
            try{
                const res = await axiosInstance.post("/stripe/payment", {
                    tokenId:stripeToken.id,
                    amount:total-40
                }, 
                {headers:{token:"Bearer "+user?.accessToken}})
    
                
            }catch(e){
                console.log('')
            }
          
        }
        stripeToken&&sendToken()
    },[stripeToken])

useEffect(()=>{
    index<products.length&&
    dispatch(removeProduct({products,index}))
    setToggle(!toggle)
},[index])

  return (
   <Container>
  {products.length>0 ? <h1>YOUR BAG</h1> :  <h1>YOUR BAG IS EMPTY</h1> } 

    <Wrapper>
        {products.length>0 ? 
        <>
        <Left>
    {products?.map((item,i)=>(
        <div>
            <span>
                <Image src={item?.image}/>
                <div>               
                  <span><b>Product:</b>{item?.desc}</span>
                  <span><b>Size:</b>{item?.size}</span>
                  <span><b>Color:</b>{item?.color}</span>
                </div>
            </span>
            <div>
                <span>
                   <span>Qty:</span>
                    <div>{item?.quantity}</div>
                    
                </span>
                <div>Rs {item?.price}</div>
                <Remove onClick={()=>setIndex(i)}> <DeleteIcon /> <span>Remove</span> </Remove>
            </div>
        </div>
    ))}
 </Left>

 <Right>
    
    <h1>ORDER SUMMARY</h1>
<div><span>Subtotal</span><span>Rs {total}</span></div>
<div><span>Estimated Shipping</span><span>Rs 40</span></div>
<div><span>Shipping Discount</span><span>Rs 40</span></div>
<div><span>Total</span><span>Rs {total-40}</span></div>

<StripeCheckout  
name = "Snaptly"
shippingAddress
billingAddress
description={`your total is Rs ${total-40}`}
amount={new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(formattedAmount)}
token={(token)=>setStripeToken(token)}
stripeKey = "pk_test_51NkRQsSGljuXgAGwVwkcGy0Sksn1YY82UZLJBHAYXebjPKNYFdIUJR4FfaepDcW1yP8qb4ivZE8wXlBDMagrhBLX00Fwb5qPAI"
>


<Add style={{width:"90%"}}>CHECKOUT NOW</Add>

</StripeCheckout>
    


 </Right>
        </>  :

        <Cart>
            <img src={cart} alt="" />
            
        <Link to='/'>    <Add> Shop now</Add>  </Link>
        </Cart>

        }
 
   </Wrapper>
   </Container>
  )
}

export default Summary

const Remove=styled.button`
    border: 1px solid crimson;
color: #f61744;
border-radius: 4px;
font-size: 18px;
font-weight: 400;
display: flex;
gap: 5px;
align-items: center;
cursor: pointer;
    background-color: white;
    padding: 10px 15px;
    &:hover{
        background-color: #fefdfd;
    };
    @media screen and (max-width:768px){
        padding: 8px 12px;
        border:none;
        &>span{
            display: none;
        }
    }

`

