import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSelector, AuthState, removeAuth } from "@/state/reducers/authReducer";  // Cập nhật đường dẫn này nếu cần
import { ContainerComponent } from "@/components";

const UserSetting = () => {
  const dispatch = useDispatch();
  const  router  = useRouter()
  const auth: AuthState = useSelector(authSelector);
  const handleLogout = async () => {
    // Xóa thông tin xác thực từ AsyncStorage
    await AsyncStorage.removeItem('auth');
    // Xóa thông tin xác thực từ Redux
    dispatch(removeAuth());
    // Có thể điều hướng người dùng đến trang đăng nhập hoặc trang chính
    router.replace("/onboarding"); // Nếu bạn sử dụng react-navigation hoặc expo-router
  };

  const item = [
    { icon: "person", text: "Account" },
    { icon: "chat", text: "Chat" },
    { icon: "notifications", text: "Notifications" },
    { icon: "help", text: "Help" },
    { icon: "cloud", text: "Storage and Data" },
    { icon: "logout", text: "Logout", action: handleLogout }, // Thêm hành động logout
  ];

  const renderOption = function (icon: string, text: string, id: number, action?: () => void) {
    return (
      <TouchableOpacity style={styles.option} key={"" + id} onPress={action}>
        <View style={styles.iconcontainer}>
          <MaterialIcons
            name={icon as any}
            size={24}
            color="gray"
            style={styles.icon}
          />
        </View>

        <Text style={styles.optionText}>{text}</Text>
      </TouchableOpacity>
    );
  };

 

  return (
    <ContainerComponent isScroll>
      <View style={styles.topbar}></View>
      {/* Profile Section */}
      <Link href={{ pathname: "/setting/user" }}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: auth.avatar? auth.avatar : "https://via.placeholder.com/100" }} // Add the actual profile image URL here
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nazrul Islam</Text>
            <Text style={styles.profileStatus}>Never give up 💪</Text>
          </View>
        </View>
      </Link>

      {/* Settings Options */}
      <View style={styles.optionContainer}>
        {item.map((i, index) => renderOption(i.icon, i.text, index, i.action))}
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  iconcontainer: {
    width: 50,
    height: 50,
    backgroundColor: "#e0f0ff",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
  topbar: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  profileContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileStatus: {
    fontSize: 14,
    color: "gray",
  },
  optionContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  optionText: {
    marginLeft: 20,
    fontSize: 16,
    color: "#000",
  },
});

export default UserSetting;
