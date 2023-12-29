import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

//Components
import{AdjustsProfileMenu,orderProfileMenu} from './Profile.data'

//hooks
import {useAuth} from '../../hooks'


export  function Profile() {
    const navigation=useNavigation()
    const {logout}=useAuth()

    const alertLogout=()=>{
       Alert.alert(
        "Logout",
        "Are you sure?",
        [{
            text:"Cancel"
        },{
            text:"LogOut",
            onPress:logout   //função feita no useAuth
        }
            

        ],
        {cancelable:false}
       )
    }

  return (
    <>
        <List.Section>
            <List.Subheader> Profile </List.Subheader>
            {AdjustsProfileMenu.map((item,index)=>(
                <List.Item 
                 key={index}
                 title={item.title}
                 titleStyle={Styles.titleItem}
                 description={item.description}
                 left={(props)=><List.Icon{...props} icon={item.leftIcon}/>}
                 onPress={()=>navigation.navigate(item.screen)}
                
                />
            ))}
        </List.Section>
      



        <List.Section>
            <List.Subheader> Order </List.Subheader>
            {orderProfileMenu.map((item,index)=>(
                <List.Item 
                 key={index}
                 title={item.title}
                 titleStyle={Styles.titleItem}
                 description={item.description}
                 left={(props)=><List.Icon{...props} icon={item.leftIcon}/>}
                 onPress={()=>navigation.navigate(item.screen)}
                
                />
            ))}
        </List.Section>


        <List.Section>
        <List.Item 
               
                 title="Close Section"
                 titleStyle={Styles.titleLogoutItem}
                 description={"log in with another account"}
                 left={(props)=><List.Icon{...props} icon="logout"/>}

                 onPress={alertLogout}
                 
                
                />
           
        </List.Section>

    </>
  )
}

const Styles=StyleSheet.create({
    titleItem:{
        fontWeight:"bold",


    },

    titleLogoutItem:{
        fontWeight:"bold",
        color:"#bb0000"

    }
})