import { View, Text } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'

//hooks
import { useSearch } from '../../../hooks'
//loadash
import { map } from 'lodash'
// api
import {SearchHistoryCtrl} from '../../../api'
//Styles
import { StyleSheet,Dimensions,TouchableOpacity } from 'react-native'







export  function SearchHistory({open,height,onSearch}) {
 const [history,setHistory]=useState(null)
 const {setSearchText}=useSearch()
  

 useEffect(()=>{
  if(open)
    getHistory()
  
 },[open])

 const getHistory = async()=>{
  try {
    const response= await SearchHistoryCtrl.getSearchHistory()
    console.log(response)
    setHistory(response)

  } catch (error) {
    throw error 
  }
 }
 
 const onSearchWrapper=(itemSearch)=>{
    //console.log(itemSearch)
    onSearch(itemSearch)
    setSearchText(itemSearch)
    
 }
    
 if (!open || !history) return null;
  return (
    <View style={Styles.container}>
    {history.map((item,index) => (
      <TouchableOpacity key={index} onPress={()=>onSearchWrapper(item.search)}>
        <View style={Styles.historyItem}>
        <Text style={Styles.text}>{item.search}</Text>
        
        </View>
        </TouchableOpacity> // se for dado um console no response, ele apresentará o search e a data
    ))}
  </View>
  )
}
 const {width,height}=Dimensions.get("window")
const Styles=StyleSheet.create({
    container:{
        
        backgroundColor:"#D1D7DC",
        color:"#fff",
        left:0,
        bottom:10,
        width:"100%",
        height:"auto"
    },
    historyItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderWidth: 0,
      borderBottomWidth: 0.2,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      color: "#53005f",
      fontSize: 16,
      fontWeight: "bold",
    },
})
