import { useState } from "react"
import { View, KeyboardAvoidingView,Image,Text, Platform } from "react-native"
import {LoginForm, RegisterForm } from '../../../components/Auth'
import lpslogo from '../../../../assets/lpslogo.png'

import {styles} from './AuthScreen.Styles'

export  function AuthScreen() {

  const [showLogin, setShowLogin]=useState(true)

  const OnShowLoginRegister=()=> setShowLogin((prevState)=>!prevState)
  return (
    <>
    <View style={styles.container}>
      
     
      <Image source={lpslogo} style={styles.logo}/>  
      
      <KeyboardAvoidingView 
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       >
        
        {showLogin ? <LoginForm showRegister={OnShowLoginRegister}/> : <RegisterForm showLogin={OnShowLoginRegister}/> }
      </KeyboardAvoidingView>
   
       
      
      
    </View>
    
    </>
  )
}