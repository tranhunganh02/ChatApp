import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const VideoCallScreen = () => {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Image
          //   source={require("./assets/images/icon.png")}
          style={styles.video}
        />
        <View style={styles.remoteVideoOverlay}>
          <Image
            // source={require("./assets/images/icon.png")}
            style={styles.remoteVideo}
          />
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.iconcontainer}>
          <TouchableOpacity onPress={() => setMuted(!muted)}>
            <MaterialIcons
              name={muted ? "mic-off" : "mic"}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.iconcontainer}>
          <TouchableOpacity onPress={() => setVideoOn(!videoOn)}>
            <MaterialIcons
              name={videoOn ? "videocam" : "videocam-off"}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.iconcontainer}>
          <TouchableOpacity onPress={() => alert("Call Ended")}>
            <MaterialIcons name="volume-up" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconcontainer}>
          <TouchableOpacity onPress={() => alert("Call Ended")}>
            <MaterialIcons name="chat-bubble" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconcontainer}>
          <TouchableOpacity onPress={() => alert("Call Ended")}>
            <MaterialIcons name="call" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconcontainer: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  remoteVideoOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 100,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default VideoCallScreen;
