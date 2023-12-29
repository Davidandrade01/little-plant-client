import { View, Text, TouchableWithoutFeedback,Image,ImageBackground} from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import {screensName} from '../../utils'


export default function GridCards({ title, products }) {
//console.log(products)

const navigation= useNavigation()




  const goToProduct=(item)=>{
    //console.log(item.id)
    navigation.navigate(screensName.home.product,{itemId:item.id})
  }
  return (
   
      <>
        
        {title && <Text style={styles.title}>{title}</Text>}

          <View style={styles.container}>
            <View style={styles.gridContainer}>
              {map(products, (item) => {
                const product = item.attributes;
                //console.log(product);
                console.log(product.main_image.data.attributes.url);
                return <TouchableWithoutFeedback   onPress={()=>goToProduct(item)} key={item.id}>
                    <View style={styles.box}>
                      <View style={styles.card}>
                      <Image source={{uri:product.main_image.data.attributes.url}} style={styles.image}/>
                        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail' >{product.title}</Text>
                      </View>
            
                    </View>
                </TouchableWithoutFeedback>
              })}
            </View>
          </View>
          </>
  );
}


const styles=StyleSheet.create({

  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
    container:{
      padding: 10,
      marginTop: 20,
    },
    img:{
      alignItems:"center",
      paddingTop:10
    },


    gridContainer:{
     
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      margin: -3,
    },
    
    box:{
      width: "50%",
      padding: 3,
    },
    card:{
      
      backgroundColor: "#fff",
      borderRadius: 6,
      padding: 10,
    },

    image: {
      height: 150,
     
    },
   
    name: {
      marginTop: 15,
      fontSize: 18,
      textAlign:"center"
      
    }


})