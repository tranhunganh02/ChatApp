import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { appColors } from '../constants/appColor'
import { fontFamilies } from '../constants/fontFamilies'

export const globalStyles = StyleSheet.create ({

   container: {
    flex:1,
    backgroundColor: appColors.white,

   },
   text: {
      color: appColors.white,
      fontSize: 12,
     fontFamily: fontFamilies.regular,
    },
    button: {
      borderRadius:12,
      minHeight:54,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: appColors.white,
      flexDirection: 'row',
      paddingHorizontal:10
    },
    shadow: {
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 6,
    },
  
    section: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    rowStart: {
      flexDirection: 'row',
      justifyContent:'flex-start',
      alignItems:'center',
    }
  
})