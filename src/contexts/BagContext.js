
import { createContext,useEffect, useState } from "react";

//Api
import { bagCtrl } from "../api";

export const BagContext=createContext()

export function BagProvider({children}){
 const [cart, setCart]=useState([])
 const [totalProducts, setTotalProducts]=useState(0)
 const [reload,setReload]=useState(false)


 useEffect(() => {
   retrieveCart();
   countTotalProducts();
 }, [reload]);
 const onReload= ()=>setReload((prevState)=>!prevState)

 const retrieveCart=async()=>{
   try {
      const response=await bagCtrl.getAllProducts()
      
     setCart(response)
     
   } catch (error) {
     throw error
   }
}

 const addCart= async(productId)=>{
    
   try {
      await bagCtrl.addBag(productId);
      onReload();
    } catch (error) {
      throw error;
    }
       
    
 }

 const checkProductById=async(productId)=>{


 }
 


 const countTotalProducts = async () => {
   try {
     const response = await bagCtrl.count();
     setTotalProducts(response)
    //console.log(response)
   } catch (error) {
     throw error;
   }
   
 };
 
 const increase= async(productId)=>{
   
  await bagCtrl.increaseProduct(productId)
  onReload()
 }



 const decrease=async(productId)=>{
    await bagCtrl.decreaseProduct(productId)
    onReload()
 }


 const deleteProduct= async(productId)=>{

   try {
    await bagCtrl.deleteProduct(productId)
    onReload()
   } catch (error) {
    throw (error)
   }
 }
 const empytCart=async()=>{
    try {
      await bagCtrl.deleteAll()
      onReload()
    } catch (error) {
      throw error
    }
 }

 const data= {cart,addCart,totalProducts,
            retrieveCart,countTotalProducts,
            increase,decrease,
            deleteProduct,empytCart}
 
 return <BagContext.Provider value={data}>{children}</BagContext.Provider>

}

