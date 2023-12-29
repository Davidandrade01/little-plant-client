import { View, Text,Image,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

//components

import {BagInfo} from './BagInfo'

//lodash
import { map } from 'lodash'


export function ProductList(props) {
    const { products } = props;
  
    return (
      <View>
        <Text style={styles.title}>Products:</Text>
  
        {map(products, (product) => (
          <BagInfo key={product.id} product={product} />
        ))}
      </View>
    );
  }


const styles= StyleSheet.create({
    title:{
        fontSize:18,
        fontWeight:"bold"
    },

    
    
})