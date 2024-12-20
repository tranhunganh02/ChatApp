
// import React, { useState } from 'react';
// import {
//   Button,
//   SafeAreaView,
//   View,
// } from 'react-native';
// import { mediaDevices, RTCView, MediaStream } from 'react-native-webrtc';

// const App = () => {
//   const [stream, setStream] = useState<MediaStream | null>(null);

//   const start = async (): Promise<void> => {
//     if (!stream) {
//       try {
//         const s: MediaStream = await mediaDevices.getUserMedia({ video: true });
//         setStream(s);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   };

//   return (
//     <SafeAreaView>
//       {stream && (
//         <RTCView
//           streamURL={stream.toURL()}
//           style={{ flex: 1 }}
//         />
//       )}
//       <View>
//         <Button
//           title="Start"
//           onPress={start}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;
// import { useRef, useState } from 'react';
// import {
// 	ScreenCapturePickerView,
// 	RTCPeerConnection,
// 	RTCIceCandidate,
// 	RTCSessionDescription,
// 	RTCView,
// 	MediaStream,
// 	MediaStreamTrack,
// 	mediaDevices,
// 	registerGlobals
// } from 'react-native-webrtc';
// registerGlobals();


// const [remoteStream, setRemoteStream] = useState(null);
// const [localStream, setLocalStream] = useState(null);
// const [webcamStarted, setWebcamStarted] = useState(false);
// const [channelId, setChannelId] = useState(null);
// const pc = useRef();
// const servers = {
//   iceServers: [
//     {
//       urls: [
//         'stun:stun1.l.google.com:19302',
//         'stun:stun2.l.google.com:19302',
//       ],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };
// const startWebcam = async () => {
//   pc.current = new RTCPeerConnection(servers);
//   const local = await mediaDevices.getUserMedia({
//     video: true,
//     audio: true,
//   });
//   pc.current.addStream(local);
//   setLocalStream(local);

//   const remote = new MediaStream();
//   setRemoteStream(remote);

//   // Push tracks from local stream to peer connection
//   local.getTracks().forEach(track => {
//     pc.current.getLocalStreams()[0].addTrack(track);
//   });

//   // Pull tracks from peer connection, add to remote video stream
//   pc.current.ontrack = event => {
//     event.streams[0].getTracks().forEach(track => {
//       remote.addTrack(track);
//     });
//   };

//   pc.current.onaddstream = event => {
//     setRemoteStream(event.stream);
//   };
// };

//  const startCall = async () => {
//     const channelDoc = firestore().collection('channels').doc();
//     const offerCandidates = channelDoc.collection('offerCandidates');
//     const answerCandidates = channelDoc.collection('answerCandidates');

//     setChannelId(channelDoc.id);

//     pc.current.onicecandidate = async event => {
//       if (event.candidate) {
//         await offerCandidates.add(event.candidate.toJSON());
//       }
//     };

//     //create offer
//     const offerDescription = await pc.current.createOffer();
//     await pc.current.setLocalDescription(offerDescription);

//     const offer = {
//       sdp: offerDescription.sdp,
//       type: offerDescription.type,
//     };

//     await channelDoc.set({offer});

//     // Listen for remote answer
//     channelDoc.onSnapshot(snapshot => {
//       const data = snapshot.data();
//       if (!pc.current.currentRemoteDescription && data?.answer) {
//         const answerDescription = new RTCSessionDescription(data.answer);
//         pc.current.setRemoteDescription(answerDescription);
//       }
//     });

//     // When answered, add candidate to peer connection
//     answerCandidates.onSnapshot(snapshot => {
//       snapshot.docChanges().forEach(change => {
//         if (change.type === 'added') {
//           const data = change.doc.data();
//           pc.current.addIceCandidate(new RTCIceCandidate(data));
//         }
//       });
  //   });
  // };