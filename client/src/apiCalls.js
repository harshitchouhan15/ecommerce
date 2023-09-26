import {axiosInstance} from "./config"


export const handleCart=(id,cartDetails,accessToken)=>{
  
    const addToCart=async()=>{
        try{
            const res= await axiosInstance.put("/cart/update/"+id, cartDetails,
            {headers:{token:"Bearer "+accessToken}}
            )
          
        }catch(err){
            console.log(err)
        }
    }

    addToCart()

  }