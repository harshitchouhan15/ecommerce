import styled from "styled-components"
import profile from "../assets/user.svg"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Badge from '@mui/material/Badge';
import {handleCart} from "../../apiCalls.js"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../redux/userRedux";
import { removeCart } from "../redux/cartRedux";
import { Avatar, Modal,  } from "@mui/material";
import { useState } from "react";
import ListIcon from '@mui/icons-material/List';

const Container=styled.div`
  display: flex;
  align-items: center;
  background-color: #f2eeee;
  padding:  0 15px;
  position: fixed;
 color: crimson;
  height: 7.2vh;
  z-index: 999;
  width: 100vw;
  @media screen and (max-width:768px){
    height: 56px;
    padding: 12px 5px;
  }
`
const StyledLink=styled(Link)`
text-decoration:none;
color: crimson;
display: flex;
align-items: center;
gap: 5px;
&>img{
  width: 40px;
  @media screen and (max-width:768px){
   display: none;
  }
}
`
const Left=styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  align-items: center;
  color: crimson;
  @media screen and (max-width:768px){
    gap: 10px;
  }
 
  
`
const User=styled(Link)`
text-decoration:none;
 color: crimson;
display: flex;
align-items: center;
gap: 5px; @media screen and (max-width:768px){
   display: none;
  };
&>img{
  width: 40px;
  @media screen and (max-width:768px){
   display: none;
  }
}
`



const Right=styled.div`
  display: flex;
  flex: 1;
justify-content: end;
gap: 20px;
padding-right: 20px;
  align-items: center;
  @media screen and (max-width:768px){
    gap: 10px;
    padding-right: 10px;
  }
  &>span{
    cursor: pointer;
  }
`

const HomeLink=styled(Link)`
color: crimson;
font-size: 35px;
font-weight: 500;
text-decoration: none;
@media screen and (max-width:768px){
    font-size: 20px;
  }
`

const Navbar = () => {
  const quantity=useSelector(state=>state.cart.quantity)
  const [slide,setSlide]=useState(false)
  const user=useSelector(state=>state.user.currentUser)

  return (
    <Container>
       <ToggleButton onClick={()=>setSlide(true)} > <ListIcon fontSize="large" htmlColor="crimson"/> </ToggleButton>
    <Left>
<HomeLink  to='/'>Snaptly</HomeLink>
 </Left>

    
      
      <Right>
     {!user&&<>{window.innerWidth>768&& <StyledLink to="/register">Register</StyledLink>} 
        <StyledLink to='/login'>Sign in</StyledLink></>
        
        } 
             {user&&<User  to="/account"><PersonOutlineIcon/> {user.username}
</User>
}

        <span><StyledLink  to={user?'/checkout':"/login"}>
  
        <Badge badgeContent={quantity} color="primary">
        <ShoppingCartOutlinedIcon htmlColor="crimson"/>
</Badge>
         </StyledLink></span>
      </Right>

      <Modal open={slide} onBackdropClick={()=>setSlide(false)}>
        <Menu slide={slide}/>
      </Modal>
    </Container>
  )
}

export default Navbar


const ToggleButton=styled.div`
  display: none;
  @media screen and (max-width:768px){
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px;
    margin-right: 5px;
  }
`



const MenuContainer=styled.div`
  display: flex;
  flex-direction: column;
  outline: none;
  gap: 20px;
  
  padding: 25px 0;
  position: fixed;
  top: 0;
 left: ${props=>props.slide?0:"-76vw"};
  
  transition:position 1s ease;
  height: 100vh;
  width: 75vw;
  background-color: white;
  &>*{
    padding: 0 25px;
  }
`

const Top=styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 18px;
  margin-block:18px 30px;

`

const Links=styled(Link)`
 
  text-decoration: none;
color: #3f3f41;
  padding-bottom: 7px;
  border-bottom: 0.5px solid #cfcfcf;
font-size: 16px;
font-weight: 400;
`

const Signin=styled(Link)`
  font-size: 22px;
text-decoration: none;
color: #0e0f0f;
font-weight: 500;
align-self: center;
`
const Button=styled.button`
  padding: 10px 14px;
  border: none;
  color: white;
  font-weight: 500;
  background-color: crimson;
  border-radius: 5px;
margin-top: 45px;
align-self: center;
  font-size: 20px;
`

const Menu=({slide})=>{
const user=useSelector(state=>state.user.currentUser)
const dispatch=useDispatch()
const cart=useSelector(state=>state.cart)


const handleLogout=()=>{
  handleCart(user?._id,{...cart,username:user?.username},user?.accessToken);
  dispatch(loginFailure());
  dispatch(removeCart())
  window.location.replace("/register")
}
  return (
    <MenuContainer slide={slide}>
      <Top>
        <Link to={user?"/account":"/register"}><Avatar sx={{width:"20vw",height:"20vw"}} src={profile}/></Link>

<Signin to={user?"/account":"/register"} >{user&&user?.username}</Signin>
  </Top>


<Links to="/">Home</Links>
<Links to={user?"/checkout":"/register"}>My Cart</Links>
<Links >My orders</Links>
<Links to={user?"/account":"/login"}>Settings</Links>
<Links >Help</Links>
<Links >Contact Us</Links>

{user&&<Links  ><span onClick={handleLogout}>Logout</span>  </Links>}


{!user&&
  <Signin  to="/login"><Button>Sign in</Button></Signin>
}


    </MenuContainer>
  )
}
