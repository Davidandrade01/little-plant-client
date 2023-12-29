import { View, Text, StyleSheet,Pressable,} from 'react-native'
import React from 'react'

import { useNavigation } from "@react-navigation/native";
//React Paper
import { Button, IconButton } from "react-native-paper";



export function AddressInfo({ address, selectedAddress, setSelectedAddress }) {
    const navigation = useNavigation();
  
    const handlePress = () => {
      setSelectedAddress(address);
    };
  
    return (
      <Pressable onPress={handlePress}>
        <View style={[styles.container, address.id === selectedAddress?.id && styles.checked]}>
          <Text style={styles.title}>{address.title}</Text>
          <Text>{address.name}</Text>
          <Text>{address.address}</Text>
          <Text>
            {address.state}, {address.city}, {address.postal_code}
          </Text>
          <Text>{address.country}</Text>
          <Text>Phone: {address.phone}</Text>
  
          <View style={styles.actions}>
            <Button style={styles.btn} mode="contained">
              Delete
            </Button>
            <IconButton icon="pencil" />
          </View>
        </View>
      </Pressable>
    );
  }
  



 const styles = StyleSheet.create({
  container: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  btn:{
    backgroundColor:"#D96941"
  },

  checked:{
    backgroundColor:"#d9d9d9",
    borderColor:"#0D2601"
  }

});