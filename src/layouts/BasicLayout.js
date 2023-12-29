import { View, Text , ScrollView } from 'react-native'
import React from 'react'
import { Search,StatusBar} from '../components/Shared'
// O hideSearch, passado como props, indicará a necessidade de apresentar a searchbar em algumas páginas.
export  function BasicLayout({children, hideSearch=false}) {



  return (
    <>
    <StatusBar backgroundColor="#0D2601"  barStyle="light-content"/>
    {!hideSearch && <Search.Input/>}

    
     <ScrollView>{children}</ScrollView>
    </>
  )
}