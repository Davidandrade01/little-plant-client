import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import React from 'react'

import { KeyboardAvoidingView } from 'react-native'

//Toast
import Toast from 'react-native-toast-message'
//yup formik 
import { useFormik } from 'formik'
import * as Yup  from 'yup'
//api
import { authCtrl } from '../../../api'

//styles
import { globalStyles } from '../../../styles'

export  function RegisterForm({showLogin}) {

  const formik = useFormik({
    initialValues:{
      email:"",
      username:"",
      password:"",
      repeatPassword: ""

    },

    validationSchema: Yup.object({
      email:Yup.string().email(true).required(true),
      username:Yup.string().required(true),
      password:Yup.string().required(true),
      repeatPassword:Yup.string().required(true).oneOf([Yup.ref("password")],true)

    }),
    validateOnChange: false,

    onSubmit: async(formValue)=>{
      //console.log("Sending form")
      //console.log(formValue)

      try {
        const {email, password, username}= formValue
        await authCtrl.register(email, username, password)
        showLogin()
       

      } catch (error) {
        throw error

        Toast.show({
          
          text1: 'Already registered user',
          position: 'center',
        });
        
      }
    }
  })
  return (
    <KeyboardAvoidingView>
    <View>
      
      <TextInput  label="Email" 
      style={globalStyles.form.input}
       autoCapitalize='none'
       onChangeText={(text)=>formik.setFieldValue("email",text)}
       value={formik.values.email}
       error={formik.errors.email}
       
       />

      <TextInput  label="Username" 
      style={globalStyles.form.input}
      onChangeText={(text)=>formik.setFieldValue("username",text)}
      value={formik.values.username}
      error={formik.errors.username}
      
    
      />

      <TextInput  label="Password" 
      style={globalStyles.form.input}
      autoCapitalize='none'
      secureTextEntry
      onChangeText={(text)=>formik.setFieldValue("password", text)}
      value={formik.values.password}
      error={formik.errors.password}
      />
      <TextInput  label="Confirm Password" 
      style={globalStyles.form.input}
      autoCapitalize='none'
      onChangeText={(text)=>formik.setFieldValue("repeatPassword",text)}
      value={formik.values.repeatPassword}
      error={formik.errors.repeatPassword}

      secureTextEntry/>
      

      <Button mode='contained' style={globalStyles.form.btnSubmit}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      >
        Register
      </Button>

      <Button mode='text' style={globalStyles.form.btnText} labelStyle={globalStyles.form.btnTextLabel}
      onPress={showLogin}
      >
        Login
      </Button>
    </View>
    </KeyboardAvoidingView>
  )
}