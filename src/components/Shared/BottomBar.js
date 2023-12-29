import { View, Text } from 'react-native'
import React from 'react'
//Components
import { Favorites } from './Favorites';
import { BuyBtn } from './BuyBtn';
// Styles
import { StyleSheet } from "react-native";
export  function BottomBar(props) {
  const { productId } = props;
 
  return (
    <View style={styles.container}>
      <View style={styles.box_wishlist}>
        <Favorites productId={productId}/>
      </View>

      <View style={styles.box_buy}>
        <BuyBtn productId={productId}/> 
      </View>
    </View>
  )
}




 const styles=StyleSheet.create({
    container:{
        position: "absolute",
        left:0,
        bottom:0,
        backgroundColor:"#fff",
        width:"100%",
        padding:10,
        flexDirection:"row",
        height:70,
        shadowColor:"#000",
        shadowOffset:{
          width: 0,
          height:12
        },
        shadowOpacity:0.58,
        shadowRadius:16.0,
        elevation:24,
    },

    box_wishlist:{
      width:"20%"
    },

    box_buy:{
      width:"80%"
    }
})