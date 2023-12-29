import { View,  } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

//Formik Yup
import {  useFormik } from 'formik'
import * as Yup from "yup"

//hooks
import { useAuth } from '../../hooks'

//api
import { userCtrl } from '../../api'

//Toast
import Toast from 'react-native-toast-message'
//React paper

import { Button,TextInput,} from 'react-native-paper'

//Styles

import {globalStyles} from  '../../styles'
import { StyleSheet } from 'react-native'


  export function ChangeNameScreen() {
    const navigation=useNavigation()
    const {user,updateUser}=useAuth()
    //console.log(user)
    const formik = useFormik({
      initialValues: {
        firstname: user.firstname,
        lastname: user.lastname, 
      },
      validationSchema: Yup.object({
        firstname: Yup.string().min(1).required('firstname is required'), 
        lastname: Yup.string().required('lastname is required'), 
      }),
      validateOnChange: false,
      onSubmit: async (formValues) => {
        try {
          //console.log(formValues);

          await userCtrl.updateUserApi(user.id,formValues) // o user.id e o formavalues vão ser enviados para
                                                       //a função da api update user como userId e formData
                                                       //esta função updateUserApi atualiza no banco de dados

          updateUser("firstname",formValues.firstname) //Este updateUser é uma função de useAuth atualiz. loacalmente
                                                      //isto vai permitir que no site, e não no banco de dados, atualize a 
                                                      //saudação que está biuscando o first e o lastname
          updateUser("lastname",formValues.lastname)
          navigation.goBack()
        } catch (error) {
          Toast.show("An error has occurred. Try again", {
            position: Toast.positions.CENTER,
          });
        }
      },
    });
  
    return (
      <View style={styles.container}>
        
  
        <TextInput
          label="firstname"
          
          style={globalStyles.form.input}
          value={formik.values.firstname} 
          onChangeText={(text) => formik.setFieldValue("firstname", text)} 
          error={formik.errors.firstname} 
        />
  
        <TextInput
          label="lastname"
         
          style={globalStyles.form.input}
          value={formik.values.lastname}
          onChangeText={(text) => formik.setFieldValue("lastname", text)} 
          error={formik.errors.lastname} 
        />
  
        <Button
          mode="contained"
          style={globalStyles.form.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          Update
        </Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
  });