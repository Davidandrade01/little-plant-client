import { View, Text } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//Api
import { addressesCtrl, productCtrl } from '../../api'
//hooks
import {useBag,useAuth} from '../../hooks'
//utils
import { fn } from '../../utils'
//Components
import { Empty, LoadingScreen,ProductList,AddressList,Pay } from '../../components/Shared'

// Layout
import {Layout} from '../../layouts'
//Lodash
import { size, map } from "lodash";
//Styles
import { StyleSheet } from 'react-native'
import { Searchinput } from '../../components/Shared/Search/Searchinput'


export  function CartScreen() {
  const [products,setProducts]=useState(null)
  const [payment,setTotalPayment]=useState(null)
  const[address,setAddress]=useState("")
  const [selectedAddress,setSelectedAddress]=useState(null)
  const {cart}=useBag()
  const {user}=useAuth()

  //console.log(cart)
   // console.log(products)
    //console.log(payment)
  //  console.log( address)
  useEffect(()=>{
getProducts()

  },[cart])

  useEffect(()=>{
    loadAddress()
  },[])
  const getProducts=async ()=>{
     const productTemp=[]
     let totalPaymentTemp=0

     for await (const item of cart){
      const response=await productCtrl.getProductById(item.id)
      //console.log(response)
      const data=response.data.attributes
      productTemp.push({...data,...item}) 
      
      const priceProduct=fn.calcPrice(data.price, data.discount)
       totalPaymentTemp += priceProduct * item.qty

     }

     setProducts(productTemp)
     setTotalPayment(totalPaymentTemp)
  }


  const  loadAddress=async()=>{
    const response= await addressesCtrl.getAllAddresses(user.id)
    setAddress(response.data)
  }
  return (
    <Layout.Cart>
      {!products ? (
        <LoadingScreen text="Charging Cart" />
      ) : size(products) === 0 ? (
        <>
        <Searchinput/>
         <Empty/>
          
        </>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <View style={styles.container}>
           <ProductList products={products} />
           
          <AddressList address={address}
           selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}/>

           { selectedAddress && <Pay
           
           totalPayment={payment}
           selectedAddress={selectedAddress}
           products={products}
           
           />}
          
          </View>
        </KeyboardAwareScrollView>
      )}
    </Layout.Cart>
  )
}

const styles= StyleSheet.create({
  container:{
      padding: 10,
  }
})
