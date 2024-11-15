import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { appInfo } from "@/constants/appInfors";
import fontFamilies from "@/constants/fontFamilies";
import { useRouter } from "expo-router";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  addAuth,
  authSelector,
  AuthState,
} from "../state/reducers/authReducer";
export default function OnboardingPage() {
  const router = useRouter();

  const { getItem, setItem } = useAsyncStorage("auth");
  const [isShowSplash, setIsShowSplash] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
      router.replace("/(tabs)/message");
      // router.replace("/call/incoming")
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const data = await getItem();

    if (data) {
      var convertData: AuthState = JSON.parse(data);
      dispatch(addAuth(convertData));
      console.log("data da dang nhap truoc do", data);
    } else {
      console.log("no data");
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/splash-image.png")}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/splash-logo.png")} />
        <Text style={[styles.title, fontFamilies.acmeRegular]}>Textit</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    lineHeight: 72 * 1.08,
    top: 90,
  },
});
