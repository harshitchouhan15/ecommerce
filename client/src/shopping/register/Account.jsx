import {axiosInstance} from "../../config"
import React from 'react'
import { loginFailure } from "../redux/userRedux";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {handleCart} from "../../apiCalls.js"
import { removeCart } from "../redux/cartRedux";
import styled from 'styled-components'
import { loginSuccess } from "../redux/userRedux";
import profile from "../assets/user.svg"

const Container=styled.div`
display: flex;
height: 100vh;
overflow: hidden;
position:relative;

width: 100vw;
padding-top: 20px;
gap: 25px;
justify-content: center;
@media screen and (max-width:768px){
    flex-direction: column;
    justify-content: start;
    gap: 0;
align-items: center;
}

`

const Left=styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
 justify-content: space-between;
   background-color: transparent;
    margin-top: 15vh;
    padding: 20px;
    height: 70vh;
    padding: 0;
width: 22vw;
@media screen and (max-width:768px){
    margin-top: 14vh;
    height: 15vh;
    background-color: white;
width: 90vw;
}
&>*{
    box-shadow: 2px 2px 4px 2px  #f4e3ef;
 
    padding: 20px;
 
}
`

const Top=styled.div`
      display: flex;
    
   
    gap: 20px;
    font-size: 22px;
    
    align-items: center;
    height: 22%;
    background-color:white;
    transition: all 0.6s ease;
    padding: 20px;
    &>div{
    display: flex;
    flex-direction: column;
    
    &>span{
        font-size: 14px;
        font-weight: 300;
    }

}
    @media screen and (max-width:768px){
    height: 25vh;
    width: 100vw;

}&>img{
    width: 60px;
}
   
    
`
const Bottom=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 70%;
    background-color: white;
    transition: all 0.6s ease;
    @media screen and (max-width:768px){
    display: none;
}
    &:hover{
        transform: scale(1.05);
    transform: translate(3px,-3px);
}
`

const Right=styled.div`
display: flex;
box-shadow: 2px 2px 4px 2px #c9c8cb;
width: 55vw;
gap: 40px;
flex-direction: column;
position: relative;
background-color: white;
    margin-top: 15vh;
    padding: 20px;
    height: 70vh;
    @media screen and (max-width:768px){
        width: 90vw;
    height: max-content;
    margin-top: 4vh;
   

}

&>h3{
    font-size: 25px;
    font-weight: 400;
    color: #3131fa;
    text-align: center;
}
`
const Column=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
&>p{
font-size: 22px;
}
`





const StyledLink=styled(Link)`
color: #434242;
text-decoration: none;
font-size: 18px;
transition:all 0.4s ease;
font-weight: 600;
&:hover{
    color: #3030f7;
    transform: translate(3px,-3px);

    padding: 10px;
    border-radius: 4px;
}
`

const Button=styled.button`
    border: none;
    padding: 10px 15px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    border:${props=>props.color&&"1px solid #11bf11"};
    border-radius: 5px;
    color: #11bf11;
    position:absolute;
    right:50px;
    top:${props=>props.top};
   background-color: transparent;
    right:${props=>props.right};
    &:hover{
    color: #087d08;
   }
   &:focus{
    cursor: wait;
   }
    @media screen and (max-width:768px){
   display: none;

}

`
const MobileButton=styled.button`
        border: 1px solid #11bf11;
        box-shadow: 1px 1px  #11bf11;
    padding: 10px 15px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    border:"1px solid teal";
    border-radius: 5px;
    color: #11bf11;
    display: none;
    align-self: center;
    
   background-color: transparent;
   &:hover{
    color: #087d08;
   }
   &:focus{
    cursor: wait;
   }
    
    @media screen and (max-width:768px){
   display: block;
padding: 10px 10px 0 10;
margin-bottom: 20px;
}
`


const Input=styled.input`
padding: 8px;
font-size: 20px;
font-weight: 500;
width: 60%;
@media screen and (max-width:768px){
    width: 100%;
    border-radius: 8px;
  
}

&:focus{
    outline: none;
    border: none;
border-bottom: 1px solid teal;

}

`

const Account = () => {
const [inputs,setInputs]=useState({})
const cart=useSelector(state=>state.cart)
const user=useSelector(state=>state.user.currentUser)
const dispatch=useDispatch()

 
    const handleLogout=()=>{
        handleCart(user?._id,{...cart,username:user?.username},user?.accessToken);
      dispatch(loginFailure());
      dispatch(removeCart())
      window.location.replace("/login")
    
      }

const handleChange=(e)=>{
    const value=e.target.value===''?e.target.defaultValue:e.target.value
    setInputs(n=>{
        return {
            ...n,[e.target.name]:value
        }
    })
}

const details={
    ...inputs
}

const updatedUser=async()=>{
    try{
        const res=await axiosInstance.put("/users/"+user._id, details, {headers:{token:"Bearer "+user.accessToken}})
    dispatch(loginSuccess(res.data.newDetails))
    window.location.reload()
    }catch(err){
        console.log('')
    }
   
}


  return (
   <Container>
    
    <Left>
<Top>

<img src={profile}/>
<div>
    <span>Welcome!</span>
<p>
   {user?.username}
</p>
</div>

</Top>
<Bottom>
<StyledLink to="/checkout">MY CART</StyledLink>
<StyledLink to="/">MY ORDERS</StyledLink>
<StyledLink to="/">ACCOUNT SETTINGS</StyledLink>
<StyledLink to="/">SAVED ADDRESSES</StyledLink>
<StyledLink to="/">PAYMAENT METHODS</StyledLink>
<StyledLink >  <span   onClick={handleLogout}>LOG OUT</span></StyledLink>

</Bottom>
    </Left>

    <Right>
        <h3>Update Account</h3>
<Column>

<p>Your name</p>
<Input type="text" defaultValue={user?.username} onChange={handleChange} name="username" placeholder={user?.username} />
</Column>
<Column>
    <p>Email address</p>
<Input type="email" defaultValue={user?.email} onChange={handleChange} name="email" placeholder={user?.email} /></Column>




<MobileButton onClick={updatedUser}>Update</MobileButton>
    <Button onClick={updatedUser} top="85%"  color="crimson" bg="white">Update</Button>



    </Right>


   </Container>
  )
}

export default Account
