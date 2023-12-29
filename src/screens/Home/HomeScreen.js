import React, { useEffect, useState} from 'react';
import { View, Text,ScrollView } from 'react-native';
import { productCtrl } from '../../api';
import GridCards from '../../components/Shared/GridCards';
import { Layout } from '../../layouts'



export function HomeScreen() {
const [products, setProducts]=useState(null)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await productCtrl.getLatestPublished();
      //console.log(response.data);
      setProducts(response.data)

    } catch (error) {
      throw error;
    }
  };

  return (
    
    <Layout.Basic>
    <GridCards  products={products} />
    </Layout.Basic>
      
      
    
   
  );
}