import {styled} from "styled-components"
import TextField from '@mui/material/TextField';
import photo2 from "./assets/2.jpg"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {axiosInstance} from "../../config"

import {Link} from 'react-router-dom'
import { loginSuccess } from "../redux/userRedux";
import { retainCart } from "../redux/cartRedux";
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormControl, InputAdornment, InputLabel } from "@mui/material";
import IconButton from '@mui/material/IconButton';
const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
overflow: hidden;
 width: 100vw;
`
const MyTextField=styled(TextField)`
    &:focus{
        
    }
`
const Card=styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50vh;

   
    width: 20vw;
    padding: 20px;
    animation: slide forwards 1s ease-out;
    box-shadow: 2px 2px 6px 3px #d4d2d7;
background-color: white;
  
    @media screen and (max-width:768px){
width: 70vw;
height: 45vh;
     
      animation: appear 1 forwards 1.6s ease-out;
      @keyframes appear {
        0%,50%{
          transform: translateX(-100vw);
        }
      to{
       
        transform:translateX(0)
      }
    }
    }

    @keyframes slide {
      to{
        transform: translateX(30vw);
      }
    }
    &>span{
        align-self: center;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
    }
`
const Image=styled.img`
    
    width: 100%;
   
    height: 100%;
    animation: reduce forwards 1s ease-out;
    
    position: absolute;
    @media screen and (max-width:768px){
      animation: slide forwards 1.6s ease-out;
      width: 100vw;
height: 45vh;
      @keyframes slide {
        0%,50%{
          transform:translateX(0)
        }
      to{
       
        transform:translateX(105vw)
      }
    }
    }
 
    @keyframes reduce {
      to{
        width: 55vw;
        height: 80vh;
        transform:translateX(-15vw)
      }
    }
`
export const Top=styled.div`
position: fixed;
top: 0;
display: flex;
z-index: 2;
align-items: center;
width: 100vw;
height: 8vh;
padding: 15px;
justify-content: space-between;

`
const Button=styled.button`
    
    cursor: pointer;
    padding: 10px 15px;
 
  
    font-size: 20px;
    font-weight: 400;
   border:none;
    background-color: #039625;
    color: white;
    transition: all 0.6s ease;
    border-radius: 5px;
    &:focus{
        cursor:wait;
        background-color: #25dc14;
    }
&:hover{

    transform:translate(2px,-2px)
}

`

const Login = () => {

 const [error,setError]=useState(false)
 const [showPassword, setShowPassword] = useState(false);
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()

    useEffect(() => {
      if (error) {
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    }, [error]);

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const details={
        username:name,
        password:password
      }
      try{
const res=await axiosInstance.post("/auth/login",details)
dispatch(loginSuccess(res.data.userDetails))
dispatch(retainCart(res.data.userCart))

      }catch(err){
        console.log('')
        setError(true)
      }
     
    }

  return (
    <Container>
     <Top> 
     <StyledLink head={true} to='/'> Snaptly</StyledLink> 
    <StyledLink  to='/register'> Register</StyledLink>  </Top> 
       
        <Image  src={photo2} />
        <Card onSubmit={handleSubmit} >
        
        <MyTextField id="outlined" onChange={e=>setName(e.target.value)} label="Your Name" variant="outlined" />
        
        <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={e=>setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={e=>e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
       
        <Button  type="submit">Login</Button>
       {error && <Error> Wrong credentials! </Error>}
        <span>Don't  have an Account?</span> <StyledLink style={{textAlign:"center"}} to="/register">Create Account</StyledLink >
        
        
        </Card>
    </Container>
  )
}

export default Login

const Error=styled.span`
align-self: center;
color:red;
font-size: 16px;
`

export const StyledLink=styled(Link)`
color: crimson;
font-size: 22px;
font-weight: 400;
text-decoration: none;

padding: 5px;
font-size: ${props=>props.head&&"35px"};
font-weight: ${props=>props.head&&"500"};
transition: all 0.6s ease;
@media screen and (max-width:768px){
  font-size: ${props=>props.head&&"30px"};
};
    
&:hover{
  
    transform:translate(2px,-2px)
}
`