import React, { ReactNode } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { appColors } from '../constants/appColor';
import { fontFamilies } from '../constants/fontFamilies';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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
  const {
    children,
    isScroll,
    isImageBackground,
    title,
    styleContainer,
    back,
    customHeader,
  } = props;

  const navigation = useNavigation();

  // Render header component if `title` or `back` is present
  const headerComponent = () => (
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
              <Ionicons name="arrow-back" size={24} color={appColors.text} />
            </TouchableOpacity>
          )}
          {title && (
            <TextComponent text={title} size={16} font={fontFamilies.medium} flex={1} />
          )}
        </RowComponent>
      )}
    </>
  );

  // Render content based on `isScroll` prop
  const returnContainer = isScroll ? (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

  // Conditionally render background
  return isImageBackground ? (
    <ImageBackground style={{ flex: 1 }} imageStyle={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {headerComponent()}
        {returnContainer}
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <LinearGradient
      colors={["#080d2b", "#343573"]} // Đặt màu gradient ở đây
      style={{ flex: 1 }} // Thêm style để chiếm toàn bộ không gian
    >
      <SafeAreaView style={[globalStyles.container, styleContainer]}>
        <StatusBar style='light'/>
        {headerComponent()}
        {returnContainer}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ContainerComponent;
