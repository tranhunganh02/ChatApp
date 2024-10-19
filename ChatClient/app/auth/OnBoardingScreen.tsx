import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import fontFamilies from "@/constants/fontFamilies";
import ContainerComponent from "@/components/ContainerComponent";
import SectionComponent from "@/components/SectionComponent";
import IconButtonComponent from "@/components/IconButtonComponent";
import ButtonComponent from "@/components/ButtonComponent";

export default function OnBoardingScreen() {
  return (
    <ContainerComponent
      isImageBackground={true}
      isScroll={true}
      styleContainer={styles.scrollContainer}
    >
      <SectionComponent>
        <View style={styles.container}>
          <Text style={[styles.title, fontFamilies.poppinsRegular]}>
            Connect friends easily & quickly
          </Text>
          <Text style={styles.subtitle}>
            Our chat app is the perfect way to stay connected with friends and
            family.
          </Text>
        </View>
      </SectionComponent>

      <SectionComponent>
        <View style={styles.socialContainer}>
          <IconButtonComponent
            icon={
              <Image
                source={require("@/assets/images/icons/facebook-icon.png")}
              />
            }
            onPress={() => console.log("Facebook button pressed")}
            stylesButton={styles.socialButton}
            colorButton="#404556"
          />
          <IconButtonComponent
            icon={
              <Image
                source={require("@/assets/images/icons/google-icon.png")}
              />
            }
            onPress={() => console.log("Google button pressed")}
            stylesButton={styles.socialButton}
            colorButton="#404556"
          />
          <IconButtonComponent
            icon={
              <Image source={require("@/assets/images/icons/apple-icon.png")} />
            }
            onPress={() => console.log("Apple button pressed")}
            stylesButton={styles.socialButton}
            colorButton="#404556"
          />
        </View>
      </SectionComponent>

      <SectionComponent>
        <View style={styles.orComponent}>
          <View style={styles.horizontalLine} />
          <Text style={styles.orText}>OR</Text>
        </View>

        <ButtonComponent
          text="Sign up with email"
          type="primary"
          onPress={() => console.log("Sign up with email pressed")}
          styles={styles.emailButton}
          textStyles={styles.emailButtonText}
          color="#787E97"
        />
      </SectionComponent>

      <SectionComponent>
        <View style={[styles.loginTextContainer]}>
          <Text style={[styles.loginText, fontFamilies.poppinsRegular]}>
            Existing account?{" "}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.loginTextButton, fontFamilies.poppinsRegular]}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </SectionComponent>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    fontSize: 68,
    color: "#fff",
    lineHeight: 78,
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.5,
    lineHeight: 26,
    marginBottom: 35,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginHorizontal: "auto",
    marginBottom: 35,
  },
  socialButton: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orComponent: {
    position: "relative",
    marginBottom: 35,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    opacity: 0.2,
  },
  orText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.1,
    textAlign: "center",
    width: "100%",
    position: "absolute",
    top: -8,
  },
  emailButton: {
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 25,
  },
  emailButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loginTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
  loginText: {
    color: "#fff",
  },
  loginTextButton: {
    color: "#fff",
    fontWeight: "700",
  },
});
