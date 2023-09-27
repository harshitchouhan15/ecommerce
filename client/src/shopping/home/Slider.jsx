import styled from "styled-components"
import watch from "./watch.jpg"
import cloth from "./cloth.jpg"
import shoe from "./shoesup.jpg"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const Container=styled.div`
    height: 75vh;
    display: flex;
    align-items: center;
  margin-top: 7.2vh;
    padding: 0;
    overflow: hidden;

    &:hover{
&>span{
    opacity: 1;
}
    }
    @media screen and (max-width:768px){
      height: 40vh;
      margin-top: 56px;
    }
`
const Slide=styled.div`
    
width: max-content;
        display: flex;
        transform: translateX(-${props=>props.slideNumber*100}vw);
        transition: all 1s ease;
   
`

             


const Image=styled.img`
height: 75vh;
width: 100vw;
@media screen and (max-width:768px){
      height: 40vh;
      
    }

`
const Arrow=styled.span`
    width: 50px;
    height: 50px;
    border-radius: 50%;
   background-color: transparent;
    cursor: pointer;
    display: flex;
    opacity: 0;
    align-items: center;
    transition: all 0.5s ease-in;
    z-index: 5;
    justify-content: center;
    position: absolute;
    left: ${props => props.left};
    right: ${props => props.right};
    @media screen and (max-width:768px){
      height: 35px;
      width: 35px;
      opacity: 1;
    }
`
const Slider = () => {

    const [num,setNum]=useState(0)

useEffect(()=>{
    const interval = setInterval(() => {
        num===2?setNum(0):setNum(n=>n+1)
    }, 4000);

    return ()=>clearInterval(interval)
},[num])

    const handleClick=(button)=>{
if(button==='left')
{num>0?setNum(num-1):setNum(2)}
else{num<2?setNum(num+1):setNum(0)}

    }
  return (
   <Container>
    <Slide slideNumber={num}>

        {data.map(item=>(  <Link to={`/productList/${item.title}/`}>
 
 
   <Image src={item.src}/>
    
</Link>
        ))}
       
    
    </Slide>
    <Arrow onClick={()=>handleClick('left')} left="0" ><ArrowLeftIcon fontSize="large"  htmlColor="#cecdcf"/></Arrow>
    <Arrow onClick={()=>handleClick('right')} right="0"><ArrowRightIcon fontSize="large" htmlColor="#cecdcf"/></Arrow>
   </Container>
  )
}

export default Slider

const data=[
    {
        title:'watch',
        
        src:watch,
      
    },
    {
        title:'cloth',
        
        src:cloth,
      
    },
    {
        title:'shoes',
        
        src:shoe,
       
    }]