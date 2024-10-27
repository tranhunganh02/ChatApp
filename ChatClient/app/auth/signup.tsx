import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Validate } from "@/utils/validate";
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from "@/components";
import fontFamilies from "@/constants/fontFamilies";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          text="Sign up with Email"
          color="#3D4A7A"
          size={18}
          font={fontFamilies.poppinsRegular.fontFamily}
          styles={styles.title}
        />
        <SpaceComponent height={20} />
        <TextComponent
          text="Get chatting with friends and family today by signing up for our chat app!"
          color="#797C7B"
          size={14}
          font={fontFamilies.poppinsRegular.fontFamily}
          styles={styles.subtitle}
        />
      </SectionComponent>

      <SpaceComponent height={20} />

      <SectionComponent>
        <InputComponent
          value={name}
          onChange={setName}
          affix={<TextComponent text="Your name" styles={styles.affixInput} />}
        />
        <InputComponent
          value={email}
          onChange={handleEmailChange}
          affix={
            <TextComponent
              text="Your email"
              color={emailError ? "red" : undefined}
              styles={styles.affixInput}
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
        <InputComponent
          value={confirmPassword}
          onChange={setConfirmPassword}
          isPassword
          affix={
            <TextComponent text="Confirm Password" styles={styles.affixInput} />
          }
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Create an account"
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