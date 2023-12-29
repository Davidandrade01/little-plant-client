import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import {useAuth} from '../../hooks'
import { StyleSheet } from 'react-native'
import { Profile } from '../../components/Profile/Profile'

export  function AccountScreen() {

  const {user}=useAuth()
  
  return (
    <>

      <ScrollView>
      <View style={styles.salutation}>
      <Text style={styles.title}>Welcome,</Text>
      <Text style={styles.name}>

        {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` :
        
        user.email
        
        }

      </Text>
      </View>

      <Profile/>
    </ScrollView>
    </>
  
  )
}



 const styles = StyleSheet.create({
  salutation:{
    height:100,
    justifyContent:"center",
    padding:20
  },
  title:{
    fontSize:20,

  },
  name:{
    fontSize:20,
    fontWeight:"bold"
  }
})