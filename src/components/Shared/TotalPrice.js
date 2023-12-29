import { View, Text } from 'react-native'
import React from 'react'
import { fn } from '../../utils';
//Styles

 import { StyleSheet } from 'react-native'

export  function TotalPrice({price, discount}) {
    return (
        <View>
          {discount && (
            <View style={styles.containerData}>
              <Text style={styles.dataText}>Before:</Text>
              <Text style={[styles.dataValue, styles.oldPrice]}>{price}€</Text>
            </View>
          )}
    
          <View style={styles.containerData}>
            <Text style={styles.dataText}>Now:</Text>
            <Text style={[styles.dataValue, styles.currentPrice]}>
              {fn.calcPrice(price, discount)}€
            </Text>
          </View>
    
          {discount && (
            <View style={styles.containerData}>
              <Text style={styles.dataText}>discount:</Text>
              <Text style={[styles.dataValue, styles.saving]}>
                {((price * discount) / 100).toFixed(2)}€ (-{discount}%)
              </Text>
            </View>
          )}
        </View>
      );
    }


const styles= StyleSheet.create({
    containerData: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
      },
      dataText: {
        width: "45%",
        fontSize: 18,
        color: "#747474",
        textAlign: "right",
      },
      dataValue: {
        width: "55%",
        fontSize: 18,
        paddingLeft: 5,
      },
      oldPrice: {
        textDecorationLine: "line-through",
      },
      currentPrice: {
        fontSize: 23,
        color: "#bc0e0d",
      },
      saving: {
        color: "#bc0e0d",
      },
    });
