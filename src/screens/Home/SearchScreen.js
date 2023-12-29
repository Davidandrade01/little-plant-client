import { View, Text } from 'react-native'
import React from 'react'
import {useState,useEffect}from 'react'

import GridCards from '../../components/Shared/GridCards'

//components
import {LoadingScreen} from '../../components/Shared'
//Layout
import {Layout} from '../../layouts'
//loadash
import { size } from 'lodash'

//utils

import { ENV } from '../../utils'

//api

import {productCtrl} from '../../api'

//Hooks

import { useSearch } from '../../hooks'

//styles
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'


export function SearchScreen() {

  const [products,setProducts]=useState(null)
  const {searchText}= useSearch()

  useEffect(()=>{
    getProductsSearch()
  },[searchText])

  const  getProductsSearch=async()=>{
    try {
     
      const response= await productCtrl.searchProduct(searchText)
      //console.log(response.data)
      //console.log(response.meta.pagination.total)
     setProducts(response.data)
     
     
    } catch (error) { 
      throw error
    }
  }
  return (
    <Layout.Basic>
      {!products ? (
        
        <LoadingScreen text="Buscando productos" />
        
      ) : size(products) === 0 ? (
        <View style={styles.containerNotfound}>
      <Text style={styles.searchText}>Sorry , did not find {searchText} !</Text>
      <Text style={styles.otherText}>
        Let´s find something cool
      </Text>
    </View>
      ) : (
        <GridCards products={products} />
      )}
    </Layout.Basic>
  );
      }
    


       const styles = StyleSheet.create({
        containerNotfound: {
          padding: 20,
        },
        searchText: {
          fontSize: 18,
          fontWeight: "bold",
        },
        otherText: {
          fontSize: 14,
          paddingTop: 5,
        },
      });