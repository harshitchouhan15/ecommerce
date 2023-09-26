import {axiosInstance} from "../../config"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import {addProduct} from "../redux/cartRedux"


const Container=styled.div`
    padding: 40px;
display: flex;

@media screen and (max-width:768px){
      flex-direction: column;
      gap: 20px;
  padding: 10px;
    }
`
const Left=styled.div`
   margin-top: 8vh;
width: 50vw;
@media screen and (max-width:768px){
    height: 60vh;
     margin-top: 8vh;
    width: 100%;
    }
`
const Image=styled.img`
    width: 94%;
    height: 82vh;
    @media screen and (max-width:768px){
        width: 97%;
    height: 100%;
    }
`
const Right=styled.div`
  padding-left: 60px;
display: flex;
margin-top: 8vh;
flex: 1;
gap: 30px;
padding-right: 20px;
flex-direction: column;
@media screen and (max-width:768px){
    padding-left: 5px;
    padding-right: 10px;
    gap: 20px;
    height: max-content;
    margin-top: 10px;
    &>p{
        
    }
    &>:last-child{
        display: flex;
        gap: 20px;
        &>:first-child{
            display: flex;
            align-items: center;
        }
    }
    }
&>span{
    font-size: 40px;
    font-weight: 300;
}
&>h1{
    font-weight: 400;
    color: #616060;
};
&>p{
    color:#212020;
    letter-spacing: 0.5px;
};
 &>div{
        display: flex;
        gap: 30px;
        align-items: center;
     
        &>div{
           display: flex;
           gap: 5px;
           align-items: center;
        }
    };
&>section{
    display: flex;
        gap: 30px;
        align-items: center;
        &>span{
           display: flex;
           gap: 5px;
           align-items: center;
        }
}
`
const Button=styled.button`
    padding:  14px;
    border-radius: 4px;
    background-color: white;
    width: 50px;
      height: 50px;
      display: flex;
    justify-content: center;
    align-items: center;
          cursor: pointer;
          transition: all 0.4s ease;
               color: ${props=>props.minus?"crimson":"#21cb4c"};
                border:${props=>props.minus?"2px solid crimson" : "2px solid #21cb4c"};
                font-size: 40px;
        
        
                @media screen and (max-width:768px){
      width: 45px;
      height: 45px;
     
      padding: 8px;}
`
const Quantity=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 30px;
`


const Detail = () => {
    const user=useSelector(state=>state.user.currentUser)
    const location=useLocation()
    const path=location.pathname.split('/')[2]
    const [product,setProduct]=useState({})
    const [quantity,setQuantity]=useState(1)
    
    

    const dispatch=useDispatch()

   useEffect(()=>{
    const getProduct=async()=>{
        const res=await axiosInstance.get("/products/"+path)
        setProduct(res.data)
    }
    getProduct()
   },[path])

   const handleCart=async()=>{
   user? dispatch(addProduct({...product,quantity})) :window.location.replace('/login')

   }
    
  return (
    <Container>
       <Left>
        <Image src={product.image}/>
       </Left>

       <Right>
        <h1>{product.brand}</h1>
        <p>{product.desc}</p>
              <span>Rs {product.price}</span>

              <div>
        <div><b>Color:</b><Value color={product.color}/></div>
        <div><b>Size:</b><p>{product.size}</p>  </div>
            </div>

            <section>
                <span><Button minus={true}  onClick={()=>setQuantity(n=>n>1?n-1:1)}>-</Button>
             <Quantity>{quantity}</Quantity>   
                <Button minus={false} onClick={()=>setQuantity(n=>n+1)}>+</Button></span>
                <Add  onClick={handleCart}>ADD TO CART</Add>
            </section>
       </Right>
    </Container>
  )
}

export default Detail

const Value=styled.div`
    width: 30px;
    height: 30px;
    background-color: ${props=>props.color};
    border-radius: 50%;
`


export const Add =styled.button`
    padding: 14px;
    border:none;
    background-color: #3434f8;
    color:white;
    border-radius: 5px;
    font-size: 18px;
    margin-left: 25px;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover{
transform: scale(1.05);
transform:translate(5px,-4px);
background-color: #21cb4c;


    };
    @media screen and (max-width:768px) {
        font-size: 15px;
margin-left: 15px;
padding: 12px;
    }



    `