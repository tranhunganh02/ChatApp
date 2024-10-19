import fontFamilies from "@/constants/fontFamilies";
import LoginScreen from "@/app/auth/LoginScreen";
import OnBoardingScreen from "@/app/auth/OnBoardingScreen";
import SplashScreen from "@/app/SplashScreen";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ButtonComponent from "@/components/ButtonComponent";
import SignUpScreen from "./auth/SignUpScreen";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return <SignUpScreen />;
}
