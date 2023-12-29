import { View, Text } from 'react-native'
import React from 'react'
//Styles
import { StyleSheet } from 'react-native'
//paper
import { Button, IconButton } from 'react-native-paper'
//hook
import {useBag} from '../../hooks'

import Toast from "react-native-root-toast";



export  function BuyBtn({productId}) {

  const { addCart } = useBag()


  const addproduct= async()=>{
    try {
      await addCart(productId)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Button mode='contained' contentStyle={styles.container} 
    labelStyle={styles.label} style={styles.btn}
    onPress={addproduct}>
         Add to cart 
    </Button>
  )
}


 const styles = StyleSheet.create({
    container: {
      backgroundColor: "#0D2601",
      height: "100%",
    },
    btnLabel: {
      fontSize: 18,
    },
    btn: {
      borderRadius: 5,
    },
  });