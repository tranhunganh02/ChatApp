// messages.tsx
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { CircleComponent, ContainerComponent, IconButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UserList } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '@/constants/appColor';
import { LinearGradient } from 'expo-linear-gradient';
import { appInfo } from '@/constants/appInfors';
import { User, Chat } from '@/data';

const Messages = () => {
  const heightScreen = appInfo.sizes.HEIGHT;

  const users: User[] = [
    { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '3', name: 'Alice Johnson', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '4', name: 'Bob Brown', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ];

  const chatData: Chat[] = [
    {
      id: '1',
      userName: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      content: 'Hey, how are you?',
      time: '10:45 AM',
      status: true
    },
    {
      id: '2',
      userName: 'Jane Smith',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      content: 'I am good, thanks!',
      time: '10:50 AM',
      status: false
    },
    {
      id: '3',
      userName: 'Alice Johnson',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      content: 'Let\'s meet at 5 PM.',
      time: '11:00 AM',
      status: true
    },
    {
      id: '4',
      userName: 'Bob Brown',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      content: 'Can you send the report?',
      time: '11:30 AM',
      status: true
    }
  ];

  return (
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
          <SectionComponent>
            <UserList userList={users} />
          </SectionComponent>
      </SectionComponent>

      <View style={{
        width: appInfo.sizes.WIDTH,
        height: appInfo.sizes.HEIGHT * 0.68, paddingVertical: 24, borderTopLeftRadius: 24, // Bo góc bên trái phía trên
        borderTopRightRadius: 24, backgroundColor: appColors.white,
        bottom:20,
        paddingHorizontal: 4
      }}>
        <ChatList chatList={chatData} />
      </View>
    </ContainerComponent>
  );
};

export default Messages;


interface ChatListProps {
  chatList: Chat[];
}

const ChatList = (props: ChatListProps) => {
  const { chatList } = props;

  // Hàm render cho từng phần tử chat
  const renderChatItem = ({ item }: { item: Chat }) => {
  
    const image = encodeURIComponent(item.image); // Encode the image URL
    return (
      <Link  href={{ pathname: "/message/[id]", params: { id: item.id,  username: item.userName, image: image }}}>
      <SectionComponent  styles={styles.chatItem}>
        <Image source={{ uri: item.image }} style={styles.chatImage} />
        <View style={item.status ? styles.userOnline : styles.userOffline}></View>
        <View style={styles.chatDetails}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.messageContent}>{item.content}</Text>
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </SectionComponent>
      </Link>
    );
  };

  return (
    <FlatList
    
      data={chatList}
      keyExtractor={(item) => item.id}
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
