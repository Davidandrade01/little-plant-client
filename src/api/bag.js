// lodash
import {map, forEach} from "lodash"
//Api
import { ENV } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";



async function getAllProducts(){
    const response= await AsyncStorage.getItem(ENV.STORAGE.BAG)
    if(!response){
        return []
    }

    else {
        return JSON.parse(response)
    }
}

 async function addBag(productId){
    const products=await getAllProducts()
    
    const objIndex=products.findIndex((item)=>item.id===productId)

    if(objIndex<0){
        products.push({id:productId, qty:1})
        
    }

    else{
        const item=products[objIndex]
        products[objIndex].qty=item.qty+1
    }
    // console.log(products)

await AsyncStorage.setItem(ENV.STORAGE.BAG,  JSON.stringify(products))
   

}

async function count() {
    const products = await getAllProducts();
    let count = 0;
    forEach(products, (product) => {
      count += product.qty;
    });
    return count;
  }


  async function deleteProduct(productId){
    const product=await getAllProducts()
    const updateProducts= product.filter((item)=>item.id!== productId)
    await AsyncStorage.setItem(ENV.STORAGE.BAG,JSON.stringify(updateProducts))
  }


  async function increaseProduct(productId){
    try {
        const products= await getAllProducts()
        
        map (products,(item)=>{
            if(item.id=== productId){
                return (item.qty +=1)
            }
        })

        await AsyncStorage.setItem(ENV.STORAGE.BAG,JSON.stringify(products))
    } catch (error) {
        
    }
  }


  async function decreaseProduct(productId) {
    try {
      let isDelete = false;
  
      const products = await getAllProducts();
      map(products, (item) => {
        if (item.id === productId) {
          if (item.qty === 1) {
            isDelete = true;
            return null;
          } else {
            return (item.qty -= 1);
          }
        }
      });
  
      if (isDelete) {
        await deleteProduct(productId);
      } else {
        await AsyncStorage.setItem(ENV.STORAGE.BAG, JSON.stringify(products));
      }
    } catch (error) {
      throw error;
    }
  }

  export async function deleteAll( ){
    AsyncStorage.removeItem(ENV.STORAGE.BAG)
  }
export const bagCtrl={
    addBag,
    getAllProducts,
    count,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    deleteAll,

}