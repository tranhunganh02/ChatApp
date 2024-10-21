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
import { Colors } from "react-native/Libraries/NewAppScreen";

const UserSetting = () => {
  const item = [
    { icon: "person", text: "Account" },
    { icon: "chat", text: "Chat" },
    { icon: "notifications", text: "Notifications" },
    { icon: "help", text: "Help" },
    { icon: "cloud", text: "Storage and Data" },
    { icon: "share", text: "Invite a Friend" },
  ];

  const renderOption = function (icon: string, text: string) {
    return (
      <TouchableOpacity style={styles.option}>
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
    <ScrollView style={styles.container}>
      <View style={styles.topbar}></View>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 0,
        }}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          color={Colors.black}
        />

        <Text style={{}}>Settings</Text>
      </TouchableOpacity>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Add the actual profile image URL here
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Nazrul Islam</Text>
          <Text style={styles.profileStatus}>Never give up 💪</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.optionContainer}>
        {item.map((i) => renderOption(i.icon, i.text))}
        {/* <TouchableOpacity style={styles.option}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="chat" size={24} color="gray" />
          <Text style={styles.optionText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="cloud-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Storage and Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="share-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Invite a Friend</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
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
    // borderBottomWidth: 1,
    // borderBottomColor: "#f0f0f0",
  },
  optionText: {
    marginLeft: 20,
    fontSize: 16,
    color: "#000",
  },
});

export default UserSetting;
