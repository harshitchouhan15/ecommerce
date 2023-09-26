import styled from "styled-components"
import men from "../assets/men.jpg"
import women from "../assets/women.jpg"
import { Link } from 'react-router-dom';

const Container=styled.div`
    display: flex;
gap: 10px;
flex-direction: column;
&>h1{
    padding: 40px 20px 0 40px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 40px;
}
@media screen and (max-width:768px){
    flex-direction: column;
gap: 10px;
     height: max-content;
     padding: 0 ;
     margin-top: 10px;
     &>h1{
        font-size: 31px;
        text-align: center;
        padding: 20px 0;
     }
    }
`
const Box=styled.div`
    display: flex;
    height: 70vh;
padding: 20px;
margin-block: 0 30px;
overflow: hidden;

justify-content: space-evenly;
@media screen and (max-width:768px){
    flex-direction: column;
gap: 10px;
     height: max-content;
     padding: 0 ;
     margin-top: 10px;
    }
`

const Section=styled.div`
   width: 40vw;
    display: flex;
    justify-content: center;
   height: 65vh;
    flex-direction: column;
    
  
 position: relative;
    align-items: center;
    transition: all 0.8s ease;
    &:hover{
       transform: scale(1.03);
       
       &>button{
        opacity: 1;
       }
    }
    @media screen and (max-width:768px){
    padding: 0px;
    width: 100%;
    height: 45vh;
    };
      &>button{
            padding: 13px 30px;
            border: none;
            cursor: pointer;
            position: absolute;
            border-radius: 5px;
            font-weight: 500;
          
            font-size: 16px;
            transition: all 0.4s ease;
            opacity: 0;
            color: #5a5a5a;
            background-color: white;
            &:hover{
color:crimson
            }; 
            @media screen and (max-width:768px){
     padding: 15px;
     margin-top: 200px;
     opacity: 1;
    }
        }
`
const Image=styled.img`
    width: 100%;
    height: 100%;
  

`

const Categories = () => {
  return (
    <Container>
        <h1>Shop by category</h1>
        <Box>
        {data.map(item=>(
       <Link style={{textDecoration:'none'}} to={`/products/${item.title}`}>    <Section>
              
                   
                    <button>SHOP NOW</button>
               
                <Image src={item.src}/>
               
            </Section></Link> 
        ))}
        </Box>
    </Container>
  )
}

export default Categories

const data=[
    {title:'men/shirt',

    src:men},


{title:'women/top',src:women},



]