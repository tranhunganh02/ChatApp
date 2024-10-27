// ChatList.tsx
import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { Chat } from '@/data';

interface ChatListProps {
  chatList: Chat[];
}

const ChatList = (props: ChatListProps) => {
  const { chatList } = props;

  // Hàm render cho từng phần tử chat
  const renderChatItem = ({ item }: { item: Chat }) => {
    return (
     <Text>{item.userName}</Text>
    );
  };

  return (
    <FlatList
      style={{height:300, width:400}}
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
    padding: 10,
    alignItems: 'center',
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
});

export default ChatList;
