import styled from "styled-components"
import SendIcon from '@mui/icons-material/Send';
const Container=styled.div`
   height: 60vh;
   margin-top: 40px;
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e2f2fa;
  @media screen and (max-width:520px){
     height: 40vh;
    }
   
  &>h1{
    font-size: 60px;
    margin-bottom: 30px;
    font-weight: 500;
    @media screen and (max-width:520px){
     
      font-size: 42px;
      font-weight: 400;
    }
  }
  &>p{
    font-size: 20px;
    letter-spacing: 2px;
    font-weight: 500;
    margin-bottom: 20px;
    @media screen and (max-width:520px){
      letter-spacing: 0.2px;
      font-size: 18px;
      font-weight: 400;
    }
   
  }
  &>span{
    display: flex;
    align-items: center;
    width: 40vw;
    @media screen and (max-width:520px){
    width: 80vw;
    }
    &>input{
        border: none;
        padding: 14px;
        flex: 8;
        font-size: 16px;
        &:focus{
            outline: none;
        }
    }
    &>button{
        border: none;
        padding:  8px 20px;
        flex: 1;
        background-color: teal;
        color: white;
        cursor: pointer;
      font-size: 16px;
    }
  }
`

const Newsletter = () => {
  return (
  <Container>
<h1>Newsletter</h1>
<p>Get timely updates for your favorite products</p>
<span>
    <input type="email"  placeholder="Your Email"/>
    <button><SendIcon htmlColor="white"/></button>
</span>
  </Container>
  )
}

export default Newsletter