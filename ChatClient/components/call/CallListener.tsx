// // components/CallListener.tsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'expo-router';

// import socket from '../utils/socket'; // Giả sử bạn đã cấu hình socket ở đây

const CallListener = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const incomingCall = useSelector((state: RootState) => state.call.incomingCall);

//   useEffect(() => {
//     // Lắng nghe sự kiện cuộc gọi đến từ socket
//     socket.on('incoming-call', (data) => {
//       dispatch(setIncomingCall(data)); // Cập nhật cuộc gọi đến vào Redux
//     });

//     // Cleanup: Ngắt kết nối sự kiện khi component bị hủy
//     return () => {
//       socket.off('incoming-call');
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (incomingCall) {
//       // Điều hướng đến trang Incoming Call khi có cuộc gọi đến
//       router.push('/calls/incoming');

//       // Reset trạng thái cuộc gọi sau khi đã điều hướng
//       dispatch(resetIncomingCall());
//     }
//   }, [incomingCall, router, dispatch]);

  return null; // Không cần render gì cả
};

export default CallListener;
