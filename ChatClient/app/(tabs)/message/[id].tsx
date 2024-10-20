import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ContainerComponent, IconButtonComponent, MessageItemComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '@/constants/appColor';
import fontFamilies from '@/constants/fontFamilies';
import { globalStyles } from '@/styles/globalStyles';
import SendAndInputComponent from '@/components/roomChat/SendAndInputComponent';
import { Message } from '@/data';

export default function Page() {
  const { id, username, image } = useLocalSearchParams();
  const route = useRouter()

  const currentUserId = 1

  const messages: Message[] = [
    { senderId: 1, content: 'Hello!', time: '10:00 AM', status: true },
    { senderId: 2, content: 'Hi, how are you?', time: '10:01 AM', status: true },
    { senderId: 1, content: 'I\'m good, thanks!', time: '10:02 AM', status: true },
  ];
  

  return (
    <ContainerComponent>
      <SectionComponent styles={[globalStyles.shadow, {width:"100%"}]}>
        <RowComponent justify='space-between'>
            <IconButtonComponent icon={<Ionicons name='arrow-back' size={22}/>} onPress={() => route.back()}/>
            <RowComponent>
            <Image
                source={{ uri: image.toString() }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <SectionComponent>
                <TextComponent text={username.toString()} font={fontFamilies.acmeRegular.fontFamily} size={24}/>
                <TextComponent text={"active now"} color={appColors.gray} title/>
              </SectionComponent>
            </RowComponent>
            <SpaceComponent width={4}/>
            <RowComponent>
              <IconButtonComponent icon={<Ionicons name='call-outline' size={22}/>}/>
              <IconButtonComponent icon={<Ionicons name='videocam-outline' size={24}/>}/>
            </RowComponent>
        </RowComponent>
      </SectionComponent>

      <FlatList
      style={{
        paddingHorizontal: 16
      }}
      data={messages}
      renderItem={({ item }) => (
        <MessageItemComponent message={item} currentUserId={currentUserId} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />

      <SendAndInputComponent />
    </ContainerComponent>
  )
}