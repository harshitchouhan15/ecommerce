import React from 'react'
import styled from 'styled-components'

import Footer from '../home/Footer'
import Navbar from '../home/Navbar'
import Summary from './Summary'

const Box=styled.div`
&>:last-child{
     @media screen and (max-width:520px){
      display: none;
    }
  }
`

const Checkout = () => {


  return (
    <Box>
        <Navbar/>
        
        <Summary/>
        <Footer/>
    </Box>
  )
}

export default Checkout