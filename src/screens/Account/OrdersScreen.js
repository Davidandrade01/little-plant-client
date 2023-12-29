
import React from 'react'
import { useEffect,useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

//components
import {LoadingScreen,OrderList} from '../../components/Shared'
//lodash
import { size } from 'lodash';
//Toast
import Toast from "react-native-root-toast";
//hooks
import {useAuth} from '../../hooks'
//api
import { orderCtrl } from '../../api';
//layout
import {Layout} from '../../layouts'
//styles
import { View, Text,StyleSheet  } from 'react-native'

export  function OrdersScreen() {
  const [orders,setOrders]=useState(null)
  const {user}=useAuth()

  useEffect(()=>{
    getOrders()
  },[])
  const getOrders=async(userId)=>{
    try {
      const response=await orderCtrl.getAll(user.id)
      //console.log(response)
      setOrders(response.data)
    } catch (error) {
      Toast.show("Error al obtener los pedidos", {
        position: Toast.positions.CENTER,
      });
    }
  }

  return (
    <Layout.Basic hideSearch>
    <View style={styles.container}>
      {!orders ? (
        <LoadingScreen text="Charging orders..." />
      ) : size(orders) === 0 ? (
        <Text style={styles.noOrders}>No orders</Text>
      ) : (
        <>
          <Text style={styles.title}>My orders:</Text>
          <OrderList orders={orders}/>
        </>
      )}
    </View>
  </Layout.Basic>
  )
}



 const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  noOrders: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
  },
});