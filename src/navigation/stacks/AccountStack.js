import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {AccountScreen,AddEditAddress,AddressScreen,ChangeEmailScreen,
  ChangeNameScreen,ChangePasswordScreen,ChangeUsernameScreen,OrderScreen,OrdersScreen} from "../../screens/Account"
import { screensName } from "../../utils/screensNames"

export  function AccountStack() {

    const Stack= createNativeStackNavigator()
  return (
   
    <Stack.Navigator   >
        <Stack.Screen name={screensName.account.account}
         component={AccountScreen} options={{headerShown:false}}
         />
        <Stack.Screen name={screensName.account.addEditAddress}
         component={AddEditAddress}  options={{title:"Edit Addresses" }}/>


        <Stack.Screen name={screensName.account.addresses} 
        component={AddressScreen} options={{title:"My Address"}} />

        <Stack.Screen name={screensName.account.changeEmail}
         component={ChangeEmailScreen} options={{title:"Edit Email"}} />

        <Stack.Screen name={screensName.account.changeName} 
        component={ChangeNameScreen} options={{title:"Your Name"}} />

        <Stack.Screen name={screensName.account.changePassword} 
        component={ChangePasswordScreen} options={{title:"Change your Password"}} />

        <Stack.Screen name={screensName.account.changeUsername}
         component={ChangeUsernameScreen} options={{title:"Change UserName"}} />

        <Stack.Screen name={screensName.account.order}
         component={OrderScreen} options={{title:" ", presentation: "modal"}} />

        <Stack.Screen name={screensName.account.orders} 
        component={OrdersScreen}  options={{title:" My Orders"}}/>
    </Stack.Navigator>

  )
}