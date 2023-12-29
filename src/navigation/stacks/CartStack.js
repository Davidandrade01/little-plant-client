import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {screensName} from  "../../utils"
import { CartScreen } from "../../screens/Cart"


const Stack=createNativeStackNavigator()

export  function CartStack() {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen  name={screensName.cart.cart} component={CartScreen}/>
   </Stack.Navigator>
  )
}