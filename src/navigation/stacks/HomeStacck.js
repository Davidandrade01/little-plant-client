import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screensName } from "../../utils"
import {HomeScreen, ProductScreen,SearchScreen} from "../../screens/Home"

import React from 'react'

const Stack=createNativeStackNavigator()

export  function HomeStacck() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={screensName.home.home} component={HomeScreen} />
        <Stack.Screen name={screensName.home.product} component={ProductScreen} />
        <Stack.Screen name={screensName.home.search} component={SearchScreen} />
    </Stack.Navigator>
  )
}