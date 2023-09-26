import styled from "styled-components"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import MessageIcon from '@mui/icons-material/Message';

const Container=styled.div`
    display: flex;
    padding: 15px;
    @media screen and (max-width:520px){
      flex-direction: column;
      padding: 20px;
      gap: 20px;
    }
`
const Left=styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media screen and (max-width:520px){
      &>p{
        display: none;
      }
    }
    &>h1{
font-weight: 500;
    }
`
const Right=styled.div`
    flex: 1;
    display: flex;
   flex-direction: column;

    &>h2{
         font-weight: 500;
        font-size: 22px;
        margin-bottom: 10px;
    }
    &>span{
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 15px;
    }
`
const Center=styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    @media screen and (max-width:520px){
    
    }
    &>h2{
        font-weight: 500;
        font-size: 22px;
    }
    &>ul{
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        &>li{
            width: 50%;
            margin: 5px 0;
           
        }
    }
`
const Icons=styled.div`
    display: flex;
    gap: 15px;
`
const Contact=styled.span`
    color: ${props=>props.color};
    &>:last-child{
        color: black;
        
    }
`
const Item=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${select=>select.color};
`
const Footer = () => {
  return (
   <Container>
    <Left>
        <h1>Snaplyt</h1>
        <p>Lorem ipsum dolor sit amet, consectetur
             ratione nulla, minima unde ex rem eos necessitatibus sit iste provident, officiis quia deleniti eius illum!
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reiciendis itaque non recusandae.
              Laborum, facere dignissimos.</p>
              <Icons>
                <Item color='blue'><FacebookOutlinedIcon/></Item>
                <Item color='teal'><InstagramIcon/></Item>
                <Item color='crimson'><TwitterIcon/></Item>
                <Item color='#15023a'><PinterestIcon/></Item>
              </Icons>
    </Left>

    <Center>
        <h2>Useful Links</h2>
    <ul>
        <li>Home</li>
        <li>Men Fashion</li>
        <li>Wishlist</li>
        <li>Accessories</li>
        <li>Cart</li>
        <li> Women Fashion</li>
        <li>My Account</li>
        <li>Terms</li>
        <li>Order Tracking</li>
        <li>Offers</li>
    </ul>
    </Center>

    <Right>
<h2>Contact</h2>
<Contact color='#315c18'><LocationOnIcon/> <p> New York City 1254-5874</p></Contact>
<Contact color='#930725'><AddIcCallIcon/><p>0452-5748-5874</p></Contact>
<Contact color='#fff12a'><MessageIcon/><p>Message us</p></Contact>

    </Right>
   </Container>
  )
}

export default Footer