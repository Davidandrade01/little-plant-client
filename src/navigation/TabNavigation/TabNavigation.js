
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { View } from "react-native"
import { Badge } from "react-native-paper"
import Ionicons from '@expo/vector-icons/Ionicons';

//hooks
import { useBag } from "../../hooks";

//Stacks
import { HomeStacck,AccountStack,CartStack, WishlistStack } from "../stacks"

//Utils
import {screensName} from "../../utils"

// Styles
import {styles} from './TabNavigation.styles'




const Tab=createBottomTabNavigator()

export default function TabNavigation() {
  return (
   <Tab.Navigator screenOptions={({route})=>({
    tabBarIcon:(routeStatus)=>setIcon(route,routeStatus),
    tabBarActiveTintColor:"#8ABF17",//Green
    tabBarStyle:styles.tabBar,
    
    headerShown: false,
   })}>
    
    <Tab.Screen
     name={screensName.home.root}
     component={HomeStacck}
     options={{title:"Home"}}
     />
    <Tab.Screen 
    name={screensName.cart.root}
    component={CartStack} 
    options={{title:"Cart"}}
    />
    <Tab.Screen name={screensName.wishlist.root}
     component={WishlistStack}
      options={{title:"WishList"}}
      />
    <Tab.Screen
     name={screensName.account.root}
      component={AccountStack}
       options={{title:"Account"}}
       />
    
    
    
   </Tab.Navigator>
  )
}


function setIcon(route,routeStatus){
  const {totalProducts}= useBag()
 
let iconName="";
let color= "#D9D9D9";//Gray

//console.log(route)
//console.log(routeStatus)

if(routeStatus.focused===true){
  color="#8ABF17" //Green
}

if(route.name == screensName.home.root){
  iconName= "home"
}



if(route.name == screensName.wishlist.root){
  iconName= "heart"
}

if(route.name == screensName.account.root){
  iconName= "person"
}

if(route.name == screensName.cart.root){
  iconName= "cart"

  return(
    <View>
      <Ionicons name={iconName} size={25} color={color} />
      
        {totalProducts >0 && <Badge style={styles.badge}>{totalProducts}</Badge>} 
   
    </View>
  )
}


return <Ionicons name={iconName} size={25} color={color} />
}