import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { appInfo } from "@/constants/appInfors";
import fontFamilies from "@/constants/fontFamilies";

export default function SplashScreen() {
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
