import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { KeyboardAvoidingView } from 'react-native'
import React from 'react'
import {useAuth} from '../../../hooks'

import Toast from 'react-native-toast-message'

//api
import { authCtrl } from '../../../api/auth'

//Yup Formik
import { useFormik } from 'formik'
import * as  Yup from "yup"
//Styles
import { globalStyles } from '../../../styles'


export function LoginForm({showRegister}) {
//const useData=useAuth()
const {login}=useAuth()


const formik=useFormik({
  initialValues:{
    email:"",
    password:"",
    
  },

  validationSchema:Yup.object({
    email:Yup.string().email(true).required(true),
    password:Yup.string().required(true).min(8,true)
  }),

  validateOnChange: false,

  onSubmit:async (formValue)=> {
    try {
      //console.log(formValue)
       const {email, password}=formValue
    

       const response= await authCtrl.login(email,password)//login api de auth
       //console.log(response)
     login(response.jwt)//Que será enviado com parametro token para a funcao login em Authcontext e lá será armazenado
                        //login função de Authcontext
    } catch (error) {
      throw error
      Toast.show("Incorrect email or password",{
        position:Toast.positions.CENTER
      })
    }
  }
})


  return (
    <KeyboardAvoidingView>
       <View>
        <TextInput label="Email" style={globalStyles.form.input}
        autoCapitalize='none'
        onChangeText={(text)=>formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.values.error}
      
        />

        <TextInput label="Password"  style={globalStyles.form.input}
        autoCapitalize='none'
        secureTextEntry
        onChangeText={(text)=>formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        
        />

        <Button mode='contained' style={globalStyles.form.btnSubmit}  
        onPress={formik.handleSubmit} loading={formik.isSubmitting}>
          Login
        </Button>

        <Button mode='text' style={globalStyles.form.btnText} labelStyle={globalStyles.form.btnTextLabel}
        onPress={showRegister}
      >
        Register
      </Button>

      </View>
    </KeyboardAvoidingView>
   
  )
}