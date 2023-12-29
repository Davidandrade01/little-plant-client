import { View, Text } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'



//components
import {Layout} from '../../layouts'
import { LoadingScreen,CarrousellImages,TotalPrice,
  Features,Separator,BottomBar} from '../../components/Shared'
//api

import { productCtrl } from '../../api'
//Loadash
import { forEach } from 'lodash'

// styles
import { StyleSheet } from "react-native";

export  function ProductScreen(props) {

  const {
    route:{params},
  }=props


  const [product,setProduct]=useState(null)
  const [image, setImage]=useState([])
  //console.log(product)
  const productId=params.itemId

  useEffect(()=>{
    getProductById()
  },[productId])

  const getProductById= async()=>{
    try {
      
      const response= await productCtrl.getProductById(productId)
      setProduct({...response.data.attributes, id: response.data.id})
      const mainImage= response.data.attributes.main_image.data.attributes.url
      const images=response.data.attributes.images.data

      const price = parseFloat(response.data.attributes.price).toFixed(2);

      const arrayImages=[mainImage]

      forEach(images,(item)=>{
        //console.log(item.attributes.url)
        arrayImages.push(item.attributes.url)
      })
      setImage(arrayImages)
      //console.log(image)
    
      //console.log(response)
    } catch (error) {
      throw error
    }
  }
  return (
    <>
    <Layout.Basic>
      {!product ? (
       <LoadingScreen text="Chargin product" size="large"/> 
      ):(
        <>
        <View style={styles.containerTitle}>
          <Text style={styles.titleBox}>{product.title}</Text>
          <CarrousellImages image={image}/>
          <TotalPrice price={product.price} discount={product.discount}/>
          <Separator height={30}/>
          <Features features={product.characteristics}/>
          <Separator height={70}/>
        </View>
        </>
      )}
      
      

    </Layout.Basic>

    { product && <BottomBar productId={productId} />}
    </>
  )
}



 const styles = StyleSheet.create({
  containerTitle: {
    padding: 10,
    paddingBottom: 0,
  },
  titleBox: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
});