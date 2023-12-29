import { View, Text } from 'react-native'
import React from 'react'

//formik yup
import { useFormik } from 'formik'
import * as Yup from 'yup'
//hooks
import { useAuth } from '../../hooks'
//api
import { userCtrl } from '../../api'
//styles
import { StyleSheet } from 'react-native'
import { globalStyles } from '../../styles'
//react Paper
import { TextInput, Button } from 'react-native-paper'

import Toast from 'react-native-toast-message'


export  function ChangePasswordScreen() {

  const{user,logout}= useAuth()
  console.log(user.password)
  const formik=useFormik({
    initialValues:{
       password:"",
       repeatePassword: ""

    },
    validateOnChange:false,
    validationSchema:Yup.object({
      password:Yup.string().min(8,true).required(true),
      repeatePassword:Yup.string().min(8,true).required().oneOf([Yup.ref("password")],true)
    }),
    
    onSubmit:async(formvalues)=>{
      try {
        //console.log(formvalues)
        await userCtrl.updateUserApi(user.id, formvalues)
        logout()
      } catch (error) {
        throw error
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro',
          text2: 'Ocorreu um erro ao atualizar a senha.',
          visibilityTime: 4000, // Tempo que o Toast será exibido em milissegundos
          autoHide: true,
        });
      }
    }
  })


  return (
    <View style={styles.container}>

      <TextInput label='New Password'
      
       style={globalStyles.form.input}
       value={formik.values.password}
       onChangeText={(text)=>formik.setFieldValue("password",text)}
       error={formik.errors.password}
       secureTextEntry
       
      
      />
       <TextInput label='Confirm Password'
       style={globalStyles.form.input}
       value={formik.values.repeatePassword}
       onChangeText={(text)=>formik.setFieldValue("repeatePassword",text)}
       error={formik.errors.repeatePassword}
       secureTextEntry
       
      
      />

      <Button mode='contained'
      style={globalStyles.form.btnSubmit}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      >
        
        Update
      </Button>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});