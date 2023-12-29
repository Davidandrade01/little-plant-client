import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
//yup formik
import {  useFormik } from 'formik'
import * as Yup from 'yup'

//hooks
import {useAuth } from '../../hooks'

//api
import {userCtrl} from '../../api' 

// react Paper

import { TextInput, Button } from 'react-native-paper'

//Style

import { globalStyles } from '../../styles'
import { StyleSheet } from 'react-native'

import Toast from 'react-native-toast-message'

export  function ChangeUsernameScreen() {
const {user}=useAuth()
const {updateUser}=useAuth()
const navigation=useNavigation()
//console.log(user)
  const formik=useFormik({
    initialValues:{
      username:user.username
    },
    validationSchema:Yup.object({
      username:Yup.string().required(true)
    }),
    validationSchema:false,

    onSubmit:async(formValues)=>{
      try {
        
        await userCtrl.updateUserApi(user.id, formValues)
        
        updateUser("username", formValues.username);

        navigation.goBack()

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

  }

  )

  return (
    <View style={Styles.container}>
      
      <TextInput
      label="Username"
      style={globalStyles.form.input}
      value={formik.values.username}
      error={formik.errors.username}
      onChangeText={(text)=>formik.setFieldValue("username", text)}
      
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

const Styles=StyleSheet.create({
  container: {
    padding: 20,
  },
})