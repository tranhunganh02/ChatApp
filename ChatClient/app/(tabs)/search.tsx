// app/home/search.tsx
import searchApi, { UserSearch } from '@/apis/searchApi';
import { UserList } from '@/components';
import { authSelector, AuthState } from '@/state/reducers/authReducer';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function Search() {
  const router = useRouter()
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<UserSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]); 
  const auth: AuthState = useSelector(authSelector);
  
  const handleSearch = async () => {
    if (!searchText.trim()) {
      return; 
    }

    setLoading(true);
    setError(null);

    try {
      const accessToken = auth.accessToken;
      console.log(accessToken)
  
      const data = await searchApi.searchUsersByName(searchText, accessToken);


      setResults(data);
      console.log(results)
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
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
      </View>
      <UserList userList={results.length > 0 ? results : allUsers} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link  href={{ pathname: "/message/[id]", params: { id: item.id,  username: item.username, image: item.avatar }}}>
          <View style={styles.resultItem}>
            <Text>{item.username}</Text>
            <Text>{item.email}</Text>
            <Text>{item.avatar}</Text>
          </View>
          </Link>
        )}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
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
