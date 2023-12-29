import { View, Text,SafeAreaView,StatusBar as StatusBarRn}  from 'react-native'
import React from 'react'
import { styled } from './StatusBar.styles'

export  function StatusBar(props) {
    const {backgroundColor ,... rest}= props 
    const styles= styled(backgroundColor)
  return (
    <View>
      <StatusBarRn backgroundColor={backgroundColor} {...rest} />
      <SafeAreaView style={styles.SafeAreaView}/>
    </View>
  )
}