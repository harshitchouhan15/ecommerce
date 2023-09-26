import styled from "styled-components"
import { Link,  useLocation } from 'react-router-dom';
import { useEffect } from "react"
import {axiosInstance} from "../../config"
import { useState } from "react"



const Container=styled.div`
margin: 0 auto;
width: 100vw;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
   padding: 20px 0;
  
    @media screen and (max-width:768px){
     padding: 10px 0px;
     

    }
   
`

const Product=styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
width: 18vw;
background-color: white;
margin-top: 20px;
box-shadow: 2px 2px 3px 2px  #e5e5e6;
&:hover{
 
}
  ;
  @media screen and (max-width:768px){
    gap: 0px;
    
   width: 50vw;
     
     border-bottom: 1px solid #c1c1c2;
     
    }
`

const Details=styled.span`
  display: flex;
  flex-direction: column
  ;
  gap: 5px;
  padding: 10px;
  overflow: hidden;
  &>p{
    
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: black;
  };
  &>div{
    display: flex;
    gap: 5px;
    color: black;
    align-items: center;
  };
  &>span{
    color: green;
  }
  @media screen and (max-width:768px){
    
    border-right: 0.5px solid #7f7f80;
    gap: 6px;

     
    }

`

 
 const Image=styled.div`
  height: 45vh;
 display: flex;
 align-items: center;
 justify-content: center;
  width: 100%;
 
  &>img{
  width: 93%;
  height: 93%;
  background-color: transparent;
  };
  &:hover{
   
    &>img{
      width: 100%;
  height: 100%;
    }
    
  } @media screen and (max-width:768px){
    height: 30vh;
     &>img{
      width: 100%;
      height: 100%;
     }
    }
 
 ` 

const Products = ({filters}) => {
  const location=useLocation()
  const queryValue=location.pathname.split("/")[2]
  const product=location.pathname.split("/")[3]
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])


 useEffect(()=>{

     const getProducts=async()=>{
      try{
        const res= await axiosInstance.get(queryValue?`/products/?category=${queryValue}${product&&`&product=${product}`}`:"/products/")
        
      setProducts(res.data)
      }catch(e){
        console.log(e)
      }
     }
     getProducts()

 },[queryValue])

useEffect(()=>{


  if(filters){setFilteredProducts(products.filter((item)=>
  Object.entries(filters).every(([key,value]) =>
          item[key]  &&  item[key].includes(value))))

  }
   
                           

 },[products,filters])





return (
  <Container>
{queryValue?
 filteredProducts.map((item,i)=>(
  <Link key={i} className="link" to={`/product/${item._id}`}>
  <Product>

     
       
         
        <Image> <img src={item.image}/> </Image> 
 
       <Details>
       <h4>  {item.brand}</h4>
       <p>{item.desc}</p>
     
        <div>Rs {item.price}</div>
        <span>Free Delivery</span>
       
       </Details>
     
       </Product>
       </Link >

)):products.map((item,i)=>(
  <Link key={i} className="link" to={`/product/${item._id}`}>
  <Product>

     
       
         
        <Image> <img src={item.image}/> </Image> 
 
       <Details>
       <h4>  {item.brand}</h4>
       <p>{item.desc}</p>
        <div>Rs {item.price}</div>
      
        <span>Free Delivery</span>
       </Details>
     
       </Product>
       </Link >
)
) 

      }
  </Container>
)

}

export default Products




