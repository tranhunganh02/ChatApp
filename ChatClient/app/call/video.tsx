// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useState, useEffect } from "react";
// import { View, TouchableOpacity, StyleSheet, Platform, Text } from "react-native";
// import { Camera, CameraView, CameraType } from "expo-camera";
// import { useRouter } from "expo-router";

// const VideoCallScreen = () => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [muted, setMuted] = useState(false);
//   const [videoOn, setVideoOn] = useState(true);
//   const [facing, setFacing] = useState<CameraType>('back');
//   const router = useRouter();
//   // Yêu cầu quyền truy cập camera
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   // Nếu chưa được cấp quyền
//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Camera access is denied</Text>
//       </View>
//     );
//   }

//   const endCall = () => {
//     router.replace("/(tabs)/message");
//   }

//   // Hàm chuyển đổi camera
//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   return (
//     <View style={styles.container}>
//       {/* Khung lớn hiển thị video đối phương */}
//       <View style={styles.remoteVideoContainer}>
//         <View style={styles.remoteVideo} />
//       </View>

//       {/* Khung nhỏ cho camera của người dùng */}
//       {videoOn && (
//         <View style={styles.localVideoOverlay}>
//           {Platform.OS !== "web" ? (
//             <CameraView style={styles.localVideo} facing={facing}>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//                   <Text style={styles.text}>Flip Camera</Text>
//                 </TouchableOpacity>
//               </View>
//             </CameraView>
//           ) : (
//             hasPermission ? (
//               <CameraView style={styles.localVideo} facing={facing}>
//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//                     <Text style={styles.text}>Flip Camera</Text>
//                   </TouchableOpacity>
//                 </View>
//               </CameraView>
//             ) : (
//               <iframe
//                 src="https://your-iframe-url-here"
//                 style={styles.localVideo}
//                 allow="microphone; camera;"
//               />
//             )
//           )}
//         </View>
//       )}

//       {/* Thanh điều khiển */}
//       <View style={styles.controls}>
//         <View style={styles.iconContainer}>
//           <TouchableOpacity onPress={() => setMuted(!muted)}>
//             <MaterialIcons
//               name={muted ? "mic-off" : "mic"}
//               size={30}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.iconContainer}>
//           <TouchableOpacity onPress={() => setVideoOn(!videoOn)}>
//             <MaterialIcons
//               name={videoOn ? "videocam" : "videocam-off"}
//               size={30}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.iconContainer}>
//           <TouchableOpacity onPress={() => alert("Volume Up")}>
//             <MaterialIcons name="volume-up" size={30} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.iconContainer}>
//           <TouchableOpacity onPress={() => alert("Chat")}>
//             <MaterialIcons name="chat-bubble" size={30} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.iconContainer}>
//           <TouchableOpacity onPress={endCall}>
//             <MaterialIcons name="call" size={30} color="red" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   remoteVideoContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   remoteVideo: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "black",
//   },
//   localVideoOverlay: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     width: 100,
//     height: 150,
//     borderRadius: 10,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   localVideo: {
//     width: "100%",
//     height: "100%",
//   },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     paddingVertical: 20,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   iconContainer: {
//     width: 50,
//     height: 50,
//     backgroundColor: "gray",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default VideoCallScreen;

import React, { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
// import { mediaDevices, RTCView } from "react-native-webrtc";

const App = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  // const start = async (): Promise<void> => {
  //   if (!stream) {
  //     try {
  //       const s: MediaStream = await mediaDevices.getUserMedia({ video: true });
  //       setStream(s);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  return (
    // <SafeAreaView>
    //   {stream && <RTCView streamURL={stream.toURL()} style={{ flex: 1 }} />}
    //   <View>
    //     <Button title="Start" onPress={start} />
    //   </View>
    // </SafeAreaView>
    <View></View>
  );
};

export default App;
