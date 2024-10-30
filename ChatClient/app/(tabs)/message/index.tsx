// messages.tsx
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { CircleComponent, ContainerComponent, IconButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UserList } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '@/constants/appColor';
import { LinearGradient } from 'expo-linear-gradient';
import { appInfo } from '@/constants/appInfors';
import { User, Chat } from '@/data';
import { authSelector, AuthState } from '@/state/reducers/authReducer';
import { useSelector } from 'react-redux';
import authenticationAPI from '@/apis/authApi';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const Messages = () => {
  const heightScreen = appInfo.sizes.HEIGHT;

  //const auth: AuthState = useSelector(authSelector);
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthState>()
  const {getItem} = useAsyncStorage('auth')
  const auth:AuthState = useSelector(authSelector);


  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchChatData = async () => {
      if (auth && auth.accessToken) {
        try {
          console.log(`AccessToken : ${auth.accessToken}`);
          const response = await authenticationAPI.HandleAuthentication(
            'chats/user',
            auth.accessToken,
            undefined,
            "get"
          );
          setChatData(response.data);
        } catch (error) {
          console.error('Error fetching chat data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No user data found');
        setLoading(false);
      }
    };
  
    fetchChatData();
  }, [auth]);  // Add auth as a dependency
  
  

  return loading ? <>

  
  </> : (
    <ContainerComponent isImageBackground>
      <SectionComponent styles={{
        paddingHorizontal:0, height: heightScreen * 0.3, width: appInfo.sizes.WIDTH
      }}>
     
          <SectionComponent styles={{ paddingTop: 12 }}>
            <RowComponent justify='space-between'>
              <IconButtonComponent icon={<Ionicons name='search-outline' size={30} color={"white"} />} colorButton={"#363a4d"} />
              <TextComponent text='Home' title color='white' size={20} />
              <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s" }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </RowComponent>
          </SectionComponent>
          <SpaceComponent height={40} />
          {/* <SectionComponent>
            <UserList userList={users} />
          </SectionComponent> */}
      </SectionComponent>

      <View style={{
        width: appInfo.sizes.WIDTH,
        height: appInfo.sizes.HEIGHT * 0.68, paddingVertical: 24, borderTopLeftRadius: 24, // Bo góc bên trái phía trên
        borderTopRightRadius: 24, backgroundColor: appColors.white,
        bottom:20,
        paddingHorizontal: 4
      }}>
        <ChatList chatList={chatData} currentId={auth.id}/>
      </View>
    </ContainerComponent>
  );
};

export default Messages;


interface ChatListProps {
  chatList: Chat[];
  currentId: String;
}

const ChatList = (props: ChatListProps) => {
  const { chatList, currentId } = props;

  const renderChatItem = ({ item }: { item: Chat }) => {
    let chatImage;
    let userName;

    if (item.isGroup) {
      chatImage = item.chatImage; // Sử dụng chatImage cho nhóm
      userName = item.user.name; // Giả sử bạn lấy tên nhóm từ user
    } else {
      // Tìm user khác không phải là currentId trong members
      const otherMember = item.members.find(member => member.id != currentId);
      userName = otherMember?.name; // Lấy tên của user khác
    }
    return (
      <Link href={{ pathname: "/message/[id]", params: { id: item.id, username: userName, image: chatImage } }}>
          <SectionComponent styles={styles.chatItem}>
            { 
            chatImage ? <Image source={{ uri: chatImage }} style={styles.chatImage} />
            :
            <Image source={require('@/assets/images/avatar_default.jpeg')} style={styles.chatImage} />

            }
            
              <View style={styles.chatDetails}>
                  <Text style={styles.userName}>{userName}</Text>
                  {/* Thêm mã khác nếu cần */}
              </View>
              <Text style={styles.messageTime}>{item.createdAt}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: "100%"
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
    fontWeight: 'bold',
  },
  messageContent: {
    color: 'gray',
  },
  messageTime: {
    fontSize: 10,
    color: 'gray',
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
  }
});
