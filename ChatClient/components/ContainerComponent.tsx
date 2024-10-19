import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StatusBar,
  ColorValue,
} from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { RowComponent, TextComponent } from '.';

import { appColors } from '../constants/appColor';
import { fontFamilies } from '../constants/fontFamilies';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  styleContainer?: StyleProp<ViewStyle>;
  back?: boolean;
  customHeader?: boolean;
  backgroundRadient?: boolean;
}

const ContainerComponent = (props: Props) => {
  const { children, isScroll, isImageBackground, title, styleContainer, back, customHeader,backgroundRadient } = props;

  const navigation: any = useNavigation()


  const headerComponent = () => {
    return (
      <>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
              justifyContent: 'flex-start',

            }}>
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginRight: 12 }}>
                <Ionicons name='arrow-back' size={24} color={appColors.text} />
              </TouchableOpacity>
            )}
            {title ? (
              <TextComponent
                text={title}
                size={16}
                font={fontFamilies.medium}
                flex={1}
              />
            ) : (
              <></>
            )}
          </RowComponent>
        )}
        {returnContainer}
      </>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      //source={require('../assets/images/splash-img.png')}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    customHeader ?
      <View style={[globalStyles.container, styleContainer]}>
          {children}
      </View>
      :
      <SafeAreaView style={[globalStyles.container]}>
      
        {headerComponent()}
      </SafeAreaView>
  );
};

export default ContainerComponent;