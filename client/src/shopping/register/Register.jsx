import {styled} from "styled-components"
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect,  useState } from "react";
import {axiosInstance} from "../../config"

import { useDispatch } from "react-redux";
import { loginSuccess,loginFailure } from "../redux/userRedux";
import {Top,StyledLink} from "./Signin"
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormControl, InputAdornment, InputLabel } from "@mui/material";
import IconButton from '@mui/material/IconButton';

const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
 position: relative;
 
`

const Card=styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 60vh;
    transition: all 0.5s ease;
  
    width: 23vw;
    padding: 20px;
    box-shadow: 2px 2px 8px 4px #cfced2;
    &>input{
        padding: 25px;
    }
   
    @media screen and (max-width:768px){
        width: 75vw;
        animation:slide 1 1s ease-in forwards;
        height: 59vh;
        @keyframes slide {
        0%{
            transform: translateX(-80vw);
        }
        to{
            transform: translateX(0);
        }
    }
    }
   
    &>span{
        align-self: center;
        font-size: 18px;
        font-weight: 500;
    }
`

const Button=styled.button`
    border: none;
    cursor: pointer;
    padding: 10px 15px;
 z-index: 999;
 align-self: center;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    background-color: #039625;
    background-color: ${props=>props.bg};
    color: whitesmoke;
    transition: background-color 0.6s ease;
    
    &:focus{
        cursor:wait;
        background-color: #25dc14;
    }
&:hover{
    
}

`



const Register = () => {
    const [error,setError]=useState(false)
   const [username,setUsername]=useState("")
   const [email,setEmail]=useState("")
   const dispatch=useDispatch()
   const [password,setPassword]=useState("")
   const [showPassword, setShowPassword] = useState(false);
  
   useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

   const handleClick=async(e)=>{
    e.preventDefault()
    const details={
        
        username:username,
        
        email:email,
        password:password
    }

    try{

  const res=await axiosInstance.post("/auth/signup",details)

dispatch(loginSuccess(res.data.userData))

    }catch(err){
        dispatch(loginFailure())
        setError(true)
        console.log(err)
    }
   
}


  return (
    <Container>
     <Top> 
     <StyledLink head={true} to='/'> Snaplyt</StyledLink> 
    <StyledLink  to='/login'>Login</StyledLink>  </Top> 
       
       
        <Card onSubmit={handleClick} >

        <TextField onChange={e=>setUsername(e.target.value)}  id="outlined-basic" label="Your Name" variant="outlined" />
        <TextField onChange={e=>setEmail(e.target.value)} type='email' id="outlined" label="Email Address" variant="outlined" />


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
        
        <Button  type='submit'>Create Account</Button>

        {error&&<Error>Try with unique username and email.</Error>}

       <Last>
          <span>Already have an Account? </span><StyledLink to="/login">Login</StyledLink >
       </Last>   

        </Card>
    </Container>
  )
}

export default Register

const Last=styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 6px;
 
`

const Error=styled.span`
align-self: center;
color:red;
text-align: center;
font-size: 16px;
`