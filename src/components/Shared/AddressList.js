import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

import {map} from 'lodash'

// componentes
import { AddressInfo } from './AddressInfo'

//Styles



export  function AddressList({address,selectedAddress,setSelectedAddress}) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Shipping Address: </Text>
    {map(address, (item) => (
      <AddressInfo
        key={item.id}
        addressId={item.id}
        address={item.attributes}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
       
      />
    ))}
  </View>
    
  )
}

const styles= StyleSheet.create({
    container: {
        marginTop: 30,
      },

       title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },

  
})