
import Footer from "../home/Footer"
import Navbar from "../home/Navbar"
import Newsletter from "../home/Newsletter"
import Products from "../home/Products"
import { useState } from "react"
import styled from "styled-components"

const Container=styled.div`
    padding: 20px;
    margin-bottom: 20px;
  
 
`
const Flexbox=styled.div`
    display: flex;
    justify-content: space-between;
   margin-top: 7vh;
    align-items: center;
    @media screen and (max-width:520px){
   align-items: start;
    }
`
const Left=styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    &>h2{
        font-weight: 500;
        font-size: 18px;
        color: crimson;
    }
    &>select{
        padding: 10px;
        
    };
    @media screen and (max-width:520px){
 
   gap: 5px;

   &>h2{
    font-size: 15px;
    color: crimson;
   }
}
`


const ProductList = () => {
  const [filters,setFilters]=useState({})


const handleFilter=(e)=>{
   setFilters(prev=>{
       return {...prev,[e.target.name]:e.target.value}}
       )
}


  return (
    <div>
        <Navbar/>
      
        <Container>
   
    <Flexbox>
        <Left>
<h2>Filter Products:</h2>
<select name="color" id="" onChange={handleFilter}>
<option value="">Color</option>
    <option >white</option>
    <option >blue</option>
    <option >gray</option>
    <option >red</option>
    <option >green</option>
    <option >yellow</option>
    <option >black</option>
</select>
<select name="size" id="" onChange={handleFilter}>
<option value="">Size</option>
    <option >S</option>
    <option >M</option>
    <option >L</option>
    
</select>
        </Left>

 
    </Flexbox>
</Container>
        <Products filters={filters} />
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default ProductList