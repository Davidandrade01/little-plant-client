import { View,ScrollView, Text,Pressable,ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

//utils
import {screensName} from'../../utils'

//api
import {addressesCtrl} from '../../api'

//hooks
import { useAuth } from '../../hooks'

//React Paper
import { IconButton, Button } from 'react-native-paper'

// Styles
import { StyleSheet } from 'react-native'
import { globalStyles } from '../../styles'



export  function AddressScreen() {
  const[direction, setDirection]=useState(null)
  const[reload,setReload]=useState(false)
  const {user}=useAuth()
  const navigation=useNavigation()
  
  
  
 useFocusEffect(
  useCallback(()=>{
    retrieveAddresses()
  },[reload])
  
 )
 const onReload =()=>setReload((prevState)=>!prevState) //On Reload tem que ficar abaixo de useFocusEffect
                                                        //para sódepois que mudar o estado a página recarregar
                                                        //já que este hook está monitorando reload 
 
 
    const retrieveAddresses=async()=> {
       const response= await addressesCtrl.getAllAddresses(user.id)
       console.log(response.data)
       
       
      setDirection(response?.data || [])// caso o usuário não tenha endereço 
      
    }

    function AddOrEditAddress(){

      navigation.navigate(screensName.account.addEditAddress)
      
    }

    function editAddress(addressId){//addressId é o valor de item.id levado pelo button update abaixo
      navigation.navigate(screensName.account.addEditAddress,{
        addressId

      })
      //console.log(addressId)
    }


    function delAlert(addressId){
      Alert.alert("Delete" , "Are you sure? ",
      [
        {
          text:"Cancel",
          
        },
        
          {
            text:"Delete",
            onPress:()=>delAddress(addressId)//Este callback é para a func náo ser executada antes de clicar neste del
          },
        
    ],
    {cancelable:false}
      )
      
    
      
    }


    const delAddress=async(addressId)=>{
      
      
        await addressesCtrl.deleteAddress(addressId)
        onReload()
     
        
      
    }

   
  
  return (
    <ScrollView style={styles.container}>

      <Pressable onPress={AddOrEditAddress}>
        <View style={styles.addAddress}>
          <Text style={styles.addAdressText}>
            Add new direction
          </Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>

      </Pressable>

      {!direction ? (
        <Text style={styles.noAddressText}>Please indicate any delivery address</Text>
      ): <View  >
        
        {direction.map((item)=>(
          <View style={styles.box}  key={item.id}>
              <Text style={styles.title}>
                {item.attributes.title}</Text>
              <Text>{item.attributes.name}</Text>
              <Text>{item.attributes.address}</Text>
              

            <View >
              <Text> {item.attributes.state},{item.attributes.city},{item.attributes.postal_code}</Text>
              <Text>{item.attributes.country}</Text>
              <Text>Phone: {item.attributes.phone}</Text>
            </View>

            <View style={styles.actions}>

                <Button  mode='contained'
                style={globalStyles.form.btnSubmit}
                onPress={() => editAddress(item.id)}>
                  Update
                </Button>

                <Button mode='text' 
                 style={globalStyles.form.btnDanger}
                 onPress={()=>delAlert(item.id)}
                 >
                  Delete
                </Button>

            </View>

          </View>
        ))}
        
        
        
        </View>}

    </ScrollView>
  )
}

 const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  box:{
    marginTop:20,
    borderWidth:0.9,
    borderRadius:5,
    borderColor:"#d9d9d9",
    padding:15,
  },

  title:{
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  actions:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:30,
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAdressText: {
    fontSize: 16,
  },

  noAddressText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
});

