// import { View, Text, Button } from 'react-native'
// import React from 'react'
// import { Link } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'

// export default function OnboardingPage() {
//   return (
//     <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
//         {/* <StatusBar style="light" /> */}
//       <Text>OnboardingPage</Text>
//       <Link href="/auth/login" asChild>
//         <Button title="Open login Page" />
//       </Link>
//       <Link href="/auth/signup" asChild>
//         <Button title="Open register" />
//       </Link>
//     </View>
//   )
// }

import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { appInfo } from "@/constants/appInfors";
import fontFamilies from "@/constants/fontFamilies";
import { useRouter } from "expo-router";

export default function OnboardingPage() {

  const router = useRouter();  

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      router.replace("/onboarding")
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

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