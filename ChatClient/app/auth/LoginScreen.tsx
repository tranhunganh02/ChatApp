import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ContainerComponent from "@/components/ContainerComponent";
import SectionComponent from "@/components/SectionComponent";
import TextComponent from "@/components/TextComponent";
import fontFamilies from "@/constants/fontFamilies";
import SpaceComponent from "@/components/SpaceComponent";
import IconButtonComponent from "@/components/IconButtonComponent";
import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import { Validate } from "@/utils/validate";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (input: string) => {
    setEmail(input);
    if (!Validate.email(input)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <ContainerComponent isScroll back>
      <SectionComponent>
        <TextComponent
          text="Log in to Chatbox"
          color="#3D4A7A"
          size={18}
          font={fontFamilies.poppinsRegular.fontFamily}
          styles={styles.title}
        />
        <SpaceComponent height={20} />
        <TextComponent
          text="Welcome back! Sign in using your social account or email to continue us"
          color="#797C7B"
          size={14}
          font={fontFamilies.poppinsRegular.fontFamily}
          styles={styles.subtitle}
        />
      </SectionComponent>

      <SpaceComponent height={20} />

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
          />
          <IconButtonComponent
            icon={
              <Image
                source={require("@/assets/images/icons/google-icon.png")}
              />
            }
            onPress={() => console.log("Google button pressed")}
            stylesButton={styles.socialButton}
          />
          <IconButtonComponent
            icon={
              <Image source={require("@/assets/images/icons/apple-icon.png")} />
            }
            onPress={() => console.log("Apple button pressed")}
            stylesButton={styles.socialButton}
          />
        </View>
      </SectionComponent>

      <SpaceComponent height={20} />

      <SectionComponent styles={styles.orComponent}>
        <View style={styles.horizontalLine} />
        <TextComponent text="OR" styles={styles.orText} />
        <View style={styles.horizontalLine} />
      </SectionComponent>

      <SectionComponent>
        <InputComponent
          value={email}
          onChange={handleEmailChange}
          affix={
            <TextComponent
              text="Your email"
              styles={styles.affixInput}
              color={emailError ? "red" : undefined}
            />
          }
          suffix={
            emailError ? (
              <TextComponent
                text="Invalid email address"
                color="red"
                styles={{ textAlign: "right", marginTop: 5 }}
              />
            ) : null
          }
        />
        <InputComponent
          value={password}
          onChange={setPassword}
          isPassword
          affix={<TextComponent text="Password" styles={styles.affixInput} />}
        />
      </SectionComponent>

      <SpaceComponent height={30} />

      <SectionComponent>
        <ButtonComponent
          text="Log in"
          type="primary"
          onPress={() => console.log("Log in pressed")}
          textStyles={styles.loginText}
          styles={{ width: "100%" }}
          textColor="#fff"
          textFont={fontFamilies.poppinsRegular.fontFamily}
          useGradient={true}
          gradientColors={["#000000", "#3F54A3"]}
        />
      </SectionComponent>

      <SectionComponent>
        <TouchableOpacity>
          <TextComponent
            text="Forgot password?"
            color="#3D4A7A"
            size={14}
            styles={{ textAlign: "center", letterSpacing: 0.1 }}
          />
        </TouchableOpacity>
      </SectionComponent>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    fontWeight: "300",
    lineHeight: 20,
    letterSpacing: 0.1,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginHorizontal: "auto",
  },
  socialButton: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontWeight: "700",
    fontSize: 16,
  },
  affixInput: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.1,
  },
  orComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#999",
  },
});
