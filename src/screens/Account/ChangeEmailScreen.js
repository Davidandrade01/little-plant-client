import { View, Text,  } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

//React Paper
import { Button,TextInput } from 'react-native-paper'

//Yup Formik

import { useFormik } from 'formik'
import * as Yup from "yup"


//hooks
import { useAuth } from '../../hooks'
import { userCtrl } from '../../api'
//Styles

import { globalStyles } from '../../styles'
import { StyleSheet } from 'react-native'

export function ChangeEmailScreen() {

  const {user}=useAuth()
  const {updateUser}=useAuth()
  const navigation=useNavigation()

const formik=useFormik({
  initialValues: {
    email:user.email
  },
  validationSchema:Yup.object({
    email:Yup.string().required(true)
  }),
  validateOnChange:false,

  onSubmit: async(formvalues)=> {

   
    try {
      //console.log(formavalues)
      await userCtrl.updateUserApi(user.id, formvalues)
      updateUser("email",formvalues.email)
      navigation.goBack()

      

    } catch (error) {
      throw error
    }
  }
})

  return (
    <View style={styles.container}>
      

    <TextInput
      label="Email"
      style={globalStyles.form.input}
      value={formik.values.email}
      onChangeText={(text)=>formik.setFieldValue("email",text)}
      error={formik.errors.email}
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

const styles= StyleSheet.create({
  container: {
    padding: 20,
  },
})