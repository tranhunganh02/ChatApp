import groupApi, { GroupChatRequest } from "@/apis/groupApi";
import searchApi, { UserSearch } from "@/apis/searchApi";
import { SectionComponent } from "@/components";
import { authSelector, AuthState } from "@/state/reducers/authReducer";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Button,
} from "react-native";
import { useSelector } from "react-redux";

export default function Search() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<UserSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth: AuthState = useSelector(authSelector);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState(""); 

  const handleSearch = async () => {
    if (!searchText.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accessToken = auth.accessToken;
      console.log(accessToken);

      const data = await searchApi.searchUsersByName(searchText, accessToken);
      console.log(data);
      setResults(data);
      console.log(results);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleMemberSelect = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id)); // Bỏ chọn
    } else {
      setSelectedMembers([...selectedMembers, id]); // Chọn thành viên
    }
  };

  const renderItem = ({ item }: { item: UserSearch }) => (
    <Link
      href={{
        pathname: "/message/[id]",
        params: {
          id: item.id!,
          username: item.name,
          image: item.avatar,
          isGroup: "false",
        },
      }}
    >
      <SectionComponent styles={styles.chatItem}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.chatImage} />
        ) : (
          <Image
            source={require("@/assets/images/avatar_default.jpeg")}
            style={styles.chatImage}
          />
        )}

        <View style={styles.chatDetails}>
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      </SectionComponent>
    </Link>
  );
  const handleCreateGroupChat = async () => {
    if (selectedMembers.length < 1) {
      setError("Please select at least one member");
      return;
    }
    if (!groupName.trim()) {
      setError("Please enter a group name");
      return;
    }
  
   
    const groupData: GroupChatRequest = {
      name: groupName,
      user_ids: selectedMembers, 
    };
    console.log(groupData)
  
    try {
      // Gọi API để tạo nhóm chat
      const accessToken = auth.accessToken;  // Lấy token từ trạng thái người dùng đã đăng nhập
      console.log(accessToken);
      const newGroupData = await groupApi.createGroup(groupData, accessToken);
  
      // Đóng modal và reset lại các giá trị
      setIsModalVisible(false);
      setSelectedMembers([]);
      setGroupName("");
      setError(null);
  
      // Điều hướng tới màn hình chat nhóm mới
      router.push({
        pathname: "/message/[id]",
        params: {
          id: newGroupData.id.toString(),
          username: newGroupData.name,
          image: newGroupData.chat_image,
          isGroup: "true",  // Chỉ định đây là nhóm chat
        },
      });
    } catch (err) {
      setError("Failed to create group chat");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search..."
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={() => setIsModalVisible(true)} // Mở Modal tạo nhóm
        >
          <Text style={styles.createGroupText}>Create Group</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
       <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Members for Group</Text>
            <TextInput
              style={styles.groupNameInput}
              placeholder="Enter group name"
              value={groupName}
              onChangeText={setGroupName}
            />
            <FlatList
              data={results}
              renderItem={({ item }) => (
                <View style={styles.memberItem}>
                  <TouchableOpacity onPress={() => handleMemberSelect(item.id)}>
                    <Text
                      style={[
                        styles.memberText,
                        selectedMembers.includes(item.id)
                          ? { fontWeight: "bold", color: "blue" }
                          : {},
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Create Group" onPress={handleCreateGroupChat} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 20,
  },
  createGroupText: {
    color: "white",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },searchButton: {
    padding: 10,
    backgroundColor: "blue",
    marginLeft: 10,
    borderRadius: 5,
  },
  groupNameInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchButtonText: {
    color: "white",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  errorText: {},
  loadingText: {},
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memberItem: {
    paddingVertical: 5,
  },
  memberText: {
    fontSize: 16,
  },
  createGroupButton: {
    padding: 10,
    backgroundColor: "green",
    marginLeft: 10,
    borderRadius: 5,
  },
});