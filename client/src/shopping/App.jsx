
import { useSelector } from "react-redux"
import { BrowserRouter as Router,Routes,Route , Navigate} from "react-router-dom"
import Checkout from "./checkout/Checkout"
import Home from "./home/Home"
import Productdetail from "./productdetail/Productdetail"
import ProductList from "./Productlist/ProductList"
import AccountPage from "./register/AccountPage"
import Register from "./register/Register"
import Login from "./register/Signin"

const App = () => {
 
  const user=useSelector(state=>state.user.currentUser)
  


  return ( 
  <Router>
<Routes>
 < Route exact path="/" element={<Home/>}/>
 <Route path="/checkout" element={user?<Checkout/>:<Navigate to = "/login"/>}/>
 <Route path="/products/:cat/:product" element={<ProductList/>}/>
 <Route path="/product/:id" element={<Productdetail/>}/>
 <Route path="/productList/:id" element={<ProductList/>}/>
 <Route path="/register" element={!user?<Register/>:<Navigate to = "/"/>}/>
 <Route path="/login"  element={!user?<Login/>:<Navigate to = "/"/>}/>

 <Route path="/account"  element={user?<AccountPage/>:<Navigate to = "/login"/>}/>

</Routes>







  </Router>
       
   

  )
  
  
}

export default App
