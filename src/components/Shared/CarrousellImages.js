import { View, Text, Image, Dimensions } from 'react-native'
import Carousel, { Pagination } from "react-native-snap-carousel";

import React from 'react'
import { useState } from 'react'
import { map,size } from 'lodash'
//Styles
import { StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export  function CarrousellImages({image}) {
  const [imageActive, setImageActive] = useState(0);

  const renderItem = ({ item }) => {
    return <Image source={{ uri: item }} style={styles.image} />;
  };
  return (
    <> 
     <Carousel
        layout="default"
        data={image}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setImageActive(index)}
      />
      <Pagination
        dotsLength={size(image)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
      />
    </>
  );
}





 const styles = StyleSheet.create({
  image: {
    width,
    height: width,
    resizeMode: 'center',
  },
  dotsContainer: {
    bottom: 15,
  },
});