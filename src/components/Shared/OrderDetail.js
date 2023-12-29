import { View, Text,Pressable } from 'react-native'
import React from 'react'
import { IconButton } from "react-native-paper";
import {  DateTime } from "luxon";
import { useNavigation } from "@react-navigation/native";
//styles
import { StyleSheet } from "react-native";
import { screensName } from '../../utils';

export  function OrderDetail(props) {
    const { order } = props;
    const data = order.attributes;
    const navigation = useNavigation();

    console.log(order)
    const goToOrder = () => {
        navigation.navigate(screensName.account.order, { id: order.id });
      };
  
  return (
    <Pressable onPress={goToOrder} style={styles.container}>
    <View>
      <Text>
        <Text style={styles.title}>Order: </Text>
        {order.id}
      </Text>
      <Text>
        <Text style={styles.title}>Total: </Text>
        {data.totalPayment}€
      </Text>
      <Text>
        <Text style={styles.title}>Purchase Date: </Text>
        {DateTime.fromISO(data.createdAt, { locale: "pt" }).toFormat(
          "dd/MM/yyyy"
        )}
      </Text>
    </View>
    <IconButton icon="eye" />
  </Pressable>
  )
}




export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontWeight: "bold",
  },
});