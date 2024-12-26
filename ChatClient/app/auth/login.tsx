import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Validate } from "@/utils/validate";
import {
  ButtonComponent,
  ContainerComponent,
  IconButtonComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "@/components";
import fontFamilies from "@/constants/fontFamilies";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import authenticationAPI from "../../apis/authApi";
import { addAuth, AuthState } from "@/state/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '654572401234-buuhpdch9dduqe54slqi5qb6kafget1c.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId: '654572401234-pagvv4uk4ukh1t7ptc26if62replkdsj.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist
});
export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = (input: string) => {
    setEmail(input);
    if (!Validate.email(input)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authenticationAPI.HandleAuthentication(
          "auth/login",
          undefined,
          { email, password },
          "post"
        );

        console.log("API response:", res.data); // Log API response

        if (res.data && res.data.accessToken) {
          const dataUser: AuthState = {
            userId: res.data.userId, // Thêm id vào đây nếu cần
            avatar: res.data.avatar,
            accessToken: res.data.accessToken,
          };

          console.log("Data user being dispatched:", dataUser); // Log data user

          dispatch(addAuth(dataUser));
          await AsyncStorage.setItem("auth", JSON.stringify(dataUser));
          router.replace("/(tabs)/message");
        } else {
          console.error("No access token received");
        }
      } catch (error) {
        console.log("Login error:", error);
      }
    } else {
      Alert.alert("Email is not correct!!!!");
    }
  };

  const signInGG = async () => {
    try {
      console.log("chuan bi login");
      
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      
      const res = await authenticationAPI.HandleAuthentication(
        "auth/login-gg",
        undefined,
        {
          "email": response.user.email, 
          "familyName": response.user.familyName, 
          "givenName": response.user.givenName, 
          "avatar": response.user.photo, 
        },
        "post"
      );

        console.log("API response:", res.data); // Log API response

        if (res.data && res.data.accessToken) {
          const dataUser: AuthState = {
            userId: res.data.userId, // Thêm id vào đây nếu cần
            avatar: res.data.avatar,
            accessToken: res.data.accessToken,
          };

          console.log("Data user being dispatched:", dataUser); // Log data user

          dispatch(addAuth(dataUser));
          await AsyncStorage.setItem("auth", JSON.stringify(dataUser));
          router.replace("/(tabs)/message");
        } else {
          console.error("No access token received");
        }
      
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
          console.log("error login", error.message);
          
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("error login", error.message);
            break;
          default:
          // some other error happened
        }
      } else {
        console.log("error login", error);
      }
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
            onPress={() => signInGG()}
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
          placeholder="Enter your email"
          // affix={
          //   <TextComponent
          //     text="Your email"
          //     styles={styles.affixInput}
          //     color={emailError ? "red" : undefined}
          //   />
          // }
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
          onChange={(val) => setPassword(val)}
          isPassword
          affix={<TextComponent text="Password" styles={styles.affixInput} />}
        />
      </SectionComponent>

      <SpaceComponent height={30} />

      <SectionComponent>
        <ButtonComponent
          text="Log in"
          type="primary"
          onPress={handleLogin}
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
