import { View, Text } from 'react-native'
import React from 'react'

import Toast from "react-native-root-toast";
import { size } from "lodash";

//api
import { orderCtrl } from '../../../api';

//Paper
import { TextInput,Button } from 'react-native-paper'
// FORMIK & YUP
import {  useFormik } from 'formik'
import * as Yup from 'yup'

//utils
import {ENV,screensName} from '../../../utils'

//hooks
import {useAuth, useBag} from '../../../hooks'
//Styles

import { styles } from './Pay.styles'
import {globalStyles} from '../../../styles'

//stripe
const stripe=require("stripe-client")(ENV.STRIPE.PUBLISHED_KEY)

import { useNavigation } from "@react-navigation/native";

export  function Pay({totalPayment,selectedAddress,products}) {

  const {user}=useAuth()
  const { empytCart} = useBag();
  const navigation = useNavigation();
 
 const formik=useFormik({

    initialValues:{
        name: "David Andrade",
        number: "4242424242424242",
        exp_month: "11",
        exp_year: "39",
        cvc: "123",
    },

    validationSchema:Yup.object({
        name: Yup.string().min(6, true).required(true),
        number: Yup.string().min(16, true).max(16, true).required(true),
        exp_month: Yup.string().min(2, true).max(2, true).required(true),
        exp_year: Yup.string().min(2, true).max(2, true).required(true),
        cvc: Yup.string().min(3, true).max(3, true).required(true),
    }),

    validateOnChange:false,

    onSubmit: async (formValue) => {
      try {
        const result = await stripe.createToken({ card: formValue });

        if (result?.error) {
          Toast.show(result.error.message, {
            position: Toast.positions.CENTER,
          });
        } else {
          const response = await orderCtrl.payment(
            result.id,
            user.id,
            products,
            selectedAddress
          );

          if (size(response) > 0) {
            await empytCart();
            navigation.navigate(screensName.account.root, {
              screen: screensName.account.orders,
              
            });
            Toast.show("Payment Accepted", {
              position: Toast.positions.CENTER,
            });
          } else {
            new Error("Error in order");
          }
        }
      } catch (error) {
        console.error("Error on payment:", error); 
        Toast.show("Error on payment", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment</Text>

      <TextInput style={globalStyles.form.input}
        label="Name of card Holder"
        onChangeText={(text)=>formik.setFieldValue("name",(text))}
        value={formik.values.name}
        error={formik.errors.name}
        
      />
      <TextInput style={globalStyles.form.input}
        label="Card Number"
        value={formik.values.number}
        error={formik.errors.number}
        onChangeText={(text)=>formik.setFieldValue("number",(text))}
      />

      <View style={styles.inputGroup}>
        <View style={styles.viewMonthYearInputs}>
          <TextInput style={styles.inputDate}
            label="Month"
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
            onChangeText={(text)=>formik.setFieldValue("exp_month", (text))}
            
          />
          <TextInput style={styles.inputDate}
            label="Year"
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
            onChangeText={(text)=>formik.setFieldValue("exp_year", (text))}
          />
        </View>
        <TextInput style={styles.cvv}
          label="CVV/CVC"
          value={formik.values.cvc}
          error={formik.errors.cvc}
          onChangeText={(text)=>formik.setFieldValue("cvc", (text))}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
     Pay now! {totalPayment && (` € ${totalPayment.toFixed(2)}`)}
      </Button  >
    </View>
  )
}


