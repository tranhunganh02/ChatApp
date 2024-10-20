import { User } from '@/data';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
// userData.ts

interface Props {
  userList: User[]; // Định nghĩa kiểu cho danh sách người dùng
}

const UserList = (props: Props) => {

    const {userList} = props

  return (
    <FlatList
     showsHorizontalScrollIndicator={false}
      data={userList}
      horizontal
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      renderItem={({ item }) => (
        <Link  href={{ pathname: "/message/[id]", params: { id: item.id,  username: item.name, image: item.image }}}>
        <View style={styles.userContainer}>
          <Image source={{ uri: item.image }} style={styles.userImage} />
          <Text style={styles.userName}>{item.name}</Text>
        </View>
        </Link>
      )}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    marginRight: 20
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom:8
  },
  userName: {
    fontSize: 14,
    color: "white",
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});

export default UserList;
