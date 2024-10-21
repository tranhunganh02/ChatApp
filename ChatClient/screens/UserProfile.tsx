import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

const UserProfile = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#001331" }}>
      {/* Profile Section */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={{ uri: "https://placekitten.com/200/200" }} // replace with your image source
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#f7f7f7",
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Jhon Abraham
        </Text>
        <Text style={{ color: "#8e9aa4", fontSize: 16 }}>@jhonabraham</Text>
      </View>

      {/* Contact Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>💬</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>📹</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>📞</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>⋮</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <View
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}
      >
        <Text style={styles.label}>Display Name</Text>
        <Text style={styles.value}>Jhon Abraham</Text>

        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.value}>jhonabraham20@gmail.com</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>33 street west, Subidbazar, Sylhet</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>(320) 555-0104</Text>

        {/* Media Section */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Media Shared</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // replace with actual media image
              style={styles.mediaImage}
            />
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // replace with actual media image
              style={styles.mediaImage}
            />
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // replace with actual media image
              style={styles.mediaImage}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  label: {
    color: "#6f7b87",
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#2e3b4e",
    marginBottom: 15,
  },
  iconWrapper: {
    backgroundColor: "#2a3a4e",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
  },
  iconText: {
    fontSize: 24,
    color: "#fff",
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
};

export default UserProfile;
