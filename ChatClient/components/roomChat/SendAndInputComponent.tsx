import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { appInfo } from '@/constants/appInfors'
import IconButtonComponent from '../IconButtonComponent'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import RowComponent from '../RowComponent'
import InputComponent from '../InputComponent'
import SpaceComponent from '../SpaceComponent'

const SendAndInputComponent = () => {
    const height = appInfo.sizes.HEIGHT
    const width = appInfo.sizes.WIDTH

    const [content, setContent] = useState('');
  return (
    <View style={{
        borderTopWidth:1,
        width: width-1,
        height: height*0.08,
        borderTopColor: "#EDEDED",
        position: "absolute",
        bottom:0,
        justifyContent:"center",
        paddingHorizontal:16
    }}>
     <RowComponent justify='space-between'>
        <IconButtonComponent icon={<MaterialCommunityIcons name='attachment' size={24}/>}/>
        <InputComponent 
        customStyle={{
            width: "57%",
            height: appInfo.sizes.HEIGHT * 0.0492,
            borderWidth:0.8,
            borderRadius:12,
            borderColor: "#EDEDED",
            backgroundColor: "#F3F6F6",
            paddingTop:4
        }}
        colorText='#797C7B'
        value={content} 
        placeholder='Write your message'
        onChange={val => setContent(val)}
        type='default'
        />
        {/* <SpaceComponent width={20}/> */}
        <RowComponent>
        <IconButtonComponent icon={<Ionicons name='image' size={22}/>}/>
        <SpaceComponent width={6}/>
        <IconButtonComponent icon={<Ionicons name='send-sharp' size={22}/>}/>
        </RowComponent>
     </RowComponent>
    </View>
  )
}

export default SendAndInputComponent