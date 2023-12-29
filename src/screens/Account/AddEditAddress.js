
import React, { useEffect } from 'react'
import { ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Formik yup
import { useFormik } from 'formik';
import * as Yup from 'yup'

//React Paper
import { TextInput, Button } from 'react-native-paper'

//api
import {addressesCtrl} from '../../api'

//hooks
import {useAuth} from '../../hooks'

//styles
import {globalStyles} from '../../styles'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';




  export function AddEditAddress(props) {
    //console.log(props) este props está sendo através da página addressScrens pelo button update
    const {route:{params}}= props
    const addressId=params?.addressId //pode ser que o params seja gerado (através do button update da página Address screen, ))
                                      //ou não(pois o button (add new direction, nao tranporta id          
    const navigation=useNavigation()
    const {user}=useAuth()
   console.log(addressId)

    useEffect(()=>{

      if(addressId){
        
        navigation.setOptions({title:"Update direction"})// tive que usar useEffect para não gerar um warning
      }
      else{
        navigation.setOptions({title:"Add new direction"})
      }
     
    }) 
    
    useEffect(()=>{
      if(addressId){
        retrieveAddress()
      }
      
    },[addressId])

    const retrieveAddress=async()=>{
     const response= await addressesCtrl.getAddressById(addressId)
     await formik.setFieldValue("title",response.title)
     await formik.setFieldValue("name",response.name)
     await formik.setFieldValue("address",response.address)
     await formik.setFieldValue("postal_code",response.postal_code)
     await formik.setFieldValue("city",response.city)
     await formik.setFieldValue("state",response.state)
     await formik.setFieldValue("country",response.country)
     await formik.setFieldValue("phone",response.phone)
     await formik.setFieldValue("title",response.title)
     
    }
    
    const formik=useFormik({
      initialValues:{
          
          title:"",
          name:"",
          address:"",
          postal_code:"",
          city:"",
          state:"",
          country:"",
          phone:"",
          
      },
      validationSchema:Yup.object({
        title:Yup.string().required(true),
        name:Yup.string().required(true),
        address:Yup.string().required(true),
        postal_code:Yup.string().required(true),
        city:Yup.string().required(true),
        state:Yup.string().required(true),
        country:Yup.string().required(true),
        phone:Yup.string().required(true),
      }),
      validateOnChange:false,

      onSubmit:async (formValues)=>{
        try {
          if(addressId){
            await addressesCtrl.updateAddress(addressId,formValues,)
          }
          else{
            //console.log(formValues)
          await addressesCtrl.createAddresses(user.id, formValues)
          }
          
          
          navigation.goBack()
        } catch (error) {
          throw error 
        }
      }
    })
    return (
      <KeyboardAwareScrollView extraScrollHeight={25}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} >
      
          <TextInput label="Title" style={globalStyles.form.input}
           value={formik.values.title}
           onChangeText={(text)=>formik.setFieldValue("title", text)}
           error={formik.errors.title}
          
          />
          <TextInput label="Name" style={globalStyles.form.input}
          value={formik.values.name}
          onChangeText={(text)=>formik.setFieldValue("name", text)}
          error={formik.errors.name}
          
          />
          <TextInput label="Street" style={globalStyles.form.input}
          value={formik.values.address}
          onChangeText={(text)=>formik.setFieldValue("address", text)}
          error={formik.errors.address}
          />
          <TextInput label="Postal Code" style={globalStyles.form.input}
           value={formik.values.postal_code}
           onChangeText={(text)=>formik.setFieldValue("postal_code", text)}
           error={formik.errors.postal_code}
          />
          <TextInput label="City" style={globalStyles.form.input}
             value={formik.values.city}
             onChangeText={(text)=>formik.setFieldValue("city", text)}
             error={formik.errors.city}
          />
          <TextInput label="State" style={globalStyles.form.input}
           value={formik.values.state}
           onChangeText={(text)=>formik.setFieldValue("state", text)}
           error={formik.errors.state}/>

          <TextInput label="Country" style={globalStyles.form.input}
           value={formik.values.country}
           onChangeText={(text)=>formik.setFieldValue("country", text)}
           error={formik.errors.country}/>


          <TextInput label="Phone" style={globalStyles.form.input}
           value={formik.values.phone}
           onChangeText={(text)=>formik.setFieldValue("phone", text)}
           error={formik.errors.phone}
          />
  
          <Button mode='contained' style={globalStyles.form.btnSubmit}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          >
            {addressId ? "Update":"Create"}
          </Button>

        </ScrollView>
      </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }

const styles=StyleSheet.create({
  container:{
    flexGrow: 1,
    padding:50,
   
    
  }
})