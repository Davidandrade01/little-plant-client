import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import React from 'react'

//api
import {wishlistCtrl} from '../../api'
import {useAuth} from '../../hooks'
//Paper
import { IconButton } from "react-native-paper";

export function Favorites(props) {
    //console.log(productId)
    const {productId}= props
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [hasWishlist, setHasWishlist] = useState(undefined);
  
    useEffect(() => {
      checkWish();
    }, [productId]);
  

  const checkWish= async()=>{
    
    try {
      const response = await wishlistCtrl.checkWishlist(user.id, productId);
      setHasWishlist(response);
    } catch (error) {
      setHasWishlist(false);
    }
  }
    const addWish=async()=>{
      try {
        setLoading(true);
        await wishlistCtrl.addToWishList(user.id, productId);
        setHasWishlist(true)
      } catch (error) {
        throw error
        
      }
      setLoading(false);
    };

    
    if(hasWishlist === undefined) return null
  return (
   <IconButton icon="heart-outline" 
   style={styles.iconbtn} size={30}
    onPress={addWish} disabled={loading} />
  )
}



const styles= StyleSheet.create({
iconbtn:{
    
    height:"100%",
    margin:0,
    width:60,
}
})