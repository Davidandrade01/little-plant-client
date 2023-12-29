import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { markdownToHtml } from 'simple-markdown';

export  function Features({features}) {
  return (
   <RenderHtml contentWidth={200} source={{html: markdownToHtml(features)}}/>
  )
}

