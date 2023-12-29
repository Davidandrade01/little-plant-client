import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";

export  function Empty() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty Bag</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});