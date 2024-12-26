// messages.tsx
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter,Router } from "expo-router";
import {
  CircleComponent,
  ContainerComponent,
  IconButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  UserList,
} from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { appColors } from "@/constants/appColor";
import { LinearGradient } from "expo-linear-gradient";
import { appInfo } from "@/constants/appInfors";
import { User, Chat, Message } from "@/data";
import { authSelector, AuthState, removeAuth } from "@/state/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import authenticationAPI from "@/apis/authApi";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { formatDate } from "@/utils/date";
import webSocketService from "@/services/WebSocketService";
import { fetchChats, selectChats } from "@/state/reducers/chatReducer";
import { AppDispatch } from "@/state/store";

const Messages = () => {
  const heightScreen = appInfo.sizes.HEIGHT;

  //const auth: AuthState = useSelector(authSelector);
  const { chats, loading, error } = useSelector(selectChats);
  const { getItem } = useAsyncStorage("auth");
  const dispatch = useDispatch<AppDispatch>();
  const auth: AuthState = useSelector(authSelector);
  const router = useRouter();

  // useEffect(() => {
  //   if (auth && auth.accessToken) {
  //     webSocketService
  //       .connect(auth.accessToken)
  //       .then(() => {
  //         console.log("WebSocket connected successfully");
  //       })
  //       .catch((error) => {
  //         console.error("Failed to connect WebSocket:", error);
  //       });
  //   }
  // }, []);
  useEffect(() => {
    if (auth && auth.accessToken) {
      dispatch(fetchChats(auth.accessToken))
        .unwrap()
        .catch((error) => {
          if (error === 'Unauthorized') {
            handleLogout();
          } else {
            console.log('Error fetching chats:', error);
          }
        });
    }
  },);
  
  const handleLogout = async () => {
    // Xóa thông tin xác thực từ AsyncStorage
    await AsyncStorage.removeItem('auth');
    // Xóa thông tin xác thực từ Redux
    dispatch(removeAuth());
    // Có thể điều hướng người dùng đến trang đăng nhập hoặc trang chính
    router.replace("/onboarding"); // Nếu bạn sử dụng react-navigation hoặc expo-router
  };
  return loading ? (
    <></>
  ) : 
  // error ? (<>
  // <ContainerComponent>
  //   <TextComponent text="Ban chua co doan chat"/>
  // </ContainerComponent>
  // </>) 
  // :
  (
    <ContainerComponent isImageBackground>
      <SectionComponent
        styles={{
          paddingHorizontal: 0,
          height: heightScreen * 0.3,
          width: appInfo.sizes.WIDTH,
        }}
      >
        <SectionComponent styles={{ paddingTop: 12 }}>
          <RowComponent justify="space-between">
            <IconButtonComponent
              icon={
                <Ionicons name="search-outline" size={30} color={"white"} />
              }
              colorButton={"#363a4d"}
            />
            <TextComponent text="Home" title color="white" size={20} />
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
              }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={40} />
        {/* <SectionComponent>
            <UserList userList={users} />
          </SectionComponent> */}
      </SectionComponent>

      <View
        style={{
          width: appInfo.sizes.WIDTH,
          height: appInfo.sizes.HEIGHT * 0.68,
          paddingVertical: 24,
          borderTopLeftRadius: 24, // Bo góc bên trái phía trên
          borderTopRightRadius: 24,
          backgroundColor: appColors.white,
          bottom: 20,
          paddingHorizontal: 4,
        }}
      >
        <ChatList chatList={chats} currentId={auth.userId} />
      </View>
    </ContainerComponent>
  );
};

export default Messages;

interface ChatListProps {
  chatList: Chat[];
  currentId: number;
}

const ChatList = (props: ChatListProps) => {
  const { chatList, currentId } = props;

  const renderChatItem = ({ item }: { item: Chat }) => {
    let chatImage = item.chat_image;
    let userName = item.name;
    let targetId = item.id;

    if (!item.is_group) {
      const otherMember = item.users.find((member) => member.id !== currentId);
      if (otherMember) {
        userName = otherMember?.name ?? undefined;
        chatImage = otherMember.avatar;
        targetId = otherMember.id;
      }
    }

    return (
      <Link
        href={{
          pathname: "/message/[id]",
          params: {
            id: targetId!,
            username: userName,
            image: chatImage,
            isGroup: item.is_group ? "true" : "false",
          },
        }}
      >
        <SectionComponent styles={styles.chatItem}>
          {chatImage ? (
            <Image source={{ uri: chatImage }} style={styles.chatImage} />
          ) : (
            <Image
              source={require("@/assets/images/avatar_default.jpeg")}
              style={styles.chatImage}
            />
          )}

          <View style={styles.chatDetails}>
            <Text style={styles.userName}>{userName}</Text>
            {item.last_message ? (
              (() => {
                switch (item.last_message.type) {
                  case "TEXT":
                    return (
                      <Text style={styles.messageContent}>
                        {item.last_message.content}
                      </Text>
                    );
                  case "IMAGE":
                    return (
                      <Text style={styles.messageContent}>"Một Tệp Tin"</Text>
                    );
                  case "CALL":
                    return (
                      <Text style={styles.messageContent}>"Một Cuộc Gọi"</Text>
                    );
                }
              })()
            ) : (
              <Text style={styles.messageContent}> Ch co</Text>
            )}
          </View>
          <Text style={styles.messageTime}>
            {item.last_message
              ? formatDate(item.last_message.timestamp) ?? ""
              : ""}
          </Text>
        </SectionComponent>
      </Link>
    );
  };

  return (
    <FlatList
      data={chatList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderChatItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
  },
  messageContent: {
    color: "gray",
  },
  messageTime: {
    fontSize: 10,
    color: "gray",
  },
  userOnline: {
    height: 10,
    width: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    left: 55,
    backgroundColor: "green",
  },
  userOffline: {
    height: 10,
    width: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    left: 55,
    backgroundColor: "gray",
  },
});
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
