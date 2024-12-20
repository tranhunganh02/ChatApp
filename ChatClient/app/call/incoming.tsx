import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
  PanResponder,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
import webSocketService from "@/services/WebSocketService";
const IncomingCallScreen = () => {

    const router = useRouter();

    const handleAccept = () => {
      router.push('/call/video'); // Điều hướng đến Video Call khi chấp nhận
    };
  
    const handleReject = () => {
      router.back(); // Quay lại trang trước
    };

    const pan = useRef(new Animated.ValueXY()).current;
    const panOffsetX = useRef(0); // Biến tham chiếu để lưu giá trị hiện tại của pan.x
  
    useEffect(() => {
      // Sử dụng addListener để cập nhật panOffsetX khi pan.x thay đổi
      const listener = pan.x.addListener(({ value }) => {
        panOffsetX.current = value;
      });
      return () => {
        pan.x.removeListener(listener);
      };
    }, []);
  
    // Tạo một PanResponder để xử lý cử chỉ trượt
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: panOffsetX.current, // Sử dụng giá trị từ panOffsetX
            y: 0,
          });
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (e, gestureState) => {
          if (gestureState.dx > SCREEN_WIDTH * 0.5) {
            Alert.alert("Call Answered");
            Animated.spring(pan, {
              toValue: { x: SCREEN_WIDTH - 100, y: 0 },
              useNativeDriver: false,
            }).start();
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }
        },
      })
    ).current;

    useEffect(() => {
      const handleCallNotification = (callData: any) => {
        Alert.alert(
          "Cuộc gọi đến",
          `Bạn có cuộc gọi từ ${callData.caller_name}`,
          [
            { text: "Từ chối", onPress: () => router.back() },
            { text: "Chấp nhận", onPress: () => router.push("/call/video") },
          ]
        );
      };
  
      webSocketService.subscribeToCallNotifications(handleCallNotification);
  
      return () => {
        //webSocketService.disconnect(); // Ngắt kết nối WebSocket khi thoát màn hình
      };
    }, []);
  return (
    <View style={styles.container}>
      <Image
        // source={require("./assets/profile.jpg")}
        style={styles.avatar}
      />

      <Text style={styles.callerName}>Borsha Akther</Text>
      <Text style={styles.callingText}>Incoming call</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="alarm-outline" size={30} color="#fff" />
          <Text style={styles.actionText}>Remind me</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={30} color="#fff" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* Nút trượt để trả lời */}
      <View style={styles.answerContainer}>
        <TouchableOpacity style={styles.slideToAnswer} onPress={handleAccept}>
          <Ionicons name="call" size={30} color="green" />
          <Text style={styles.slideText}>click to answer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slideToAnswer}>
          <MaterialIcons name="cancel" size={30} color="red" onPress={handleReject} />
          <Text style={styles.slideText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.sliderContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.slider, { transform: [{ translateX: pan.x }] }]}
        >
          <Text style={styles.sliderText}>📞</Text>
        </Animated.View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 100,
    height: 40,
    backgroundColor: "green",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderText: {
    color: "#fff",
    fontSize: 20,
  },
  sliderContainer: {
    width: SCREEN_WIDTH - 40,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 50,
  },
  time: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  callerName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  callingText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 50,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  answerContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  slideToAnswer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
  },
  slideText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default IncomingCallScreen;