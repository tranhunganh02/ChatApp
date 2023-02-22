import { View, Text, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';
import { updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
const Tab = createMaterialTopTabNavigator();
const width = Dimensions.get('window').width;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Auth = ({}) => {
  return (
    <View style={{flex:1}}>
        <View style={styles.header}>
            <Text style={[{fontSize: 40,color:'#ffff', fontWeight:'600'}]}>Chat App</Text>
        </View>
        <Tab.Navigator>
            <Tab.Screen name="Sign In" component={SignIn} />
            <Tab.Screen name="Sign Up" component={SignUp} />
        </Tab.Navigator>
    </View>
  )
}

function SignIn( { navigation } ) {
  const [hiddenPass, setHiddenPass] = useState(true);
  const [getEmail, setEmail] = useState('');
  const [getPass, setPass] = useState('');

  const validate = ( email, pass) => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!strongRegex.test(email)) {
        alert("Invalid email");
        return false;
    } else if (pass.length < 8) {
        alert("Invalid pass");
      return false;
    }
    else handleSignIn(email, pass);
  }

  const handleSignIn = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      navigation.navigate("Home", {user: user});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  } 
    return (
      <View style={[{flex:1},styles.component]}>
        <View style={[styles.componentTop,]}>
          <Text style={{fontSize:'30'}}>Login in your account</Text>
          {/* Email */}
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getEmail} 
                      onChangeText={(text) => setEmail(text)} 
                      placeholder='Email'/>
          </View>  
          {/* Password */}
          <View style={styles.input}>
            <Image/>
            <TextInput style={styles.inputText} 
                      value={getPass}
                      onChangeText={(text) => setPass(text)} 
                      secureTextEntry={hiddenPass? true : false}
                      autoCapitalize={false}
                      placeholder='Password'/>
            <TouchableOpacity style={{width:'20%', height:'100%',  justifyContent:'center'}}
                              onPress={() => setHiddenPass(!hiddenPass)}>
              <Image resizeMethod='stretch' source={require('../assets/icon/Hide.png')} style={{left:40}} />
            </TouchableOpacity>
          </View>        
          <View style={{width:'100%', flexDirection:'row', marginTop:20, alignItems:'center',height: '15%'}}>
            <TouchableOpacity style={{position:'absolute', right: 10}}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={validate}>
            <Text style={{color:'white', fontSize:20}}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.componentBottom,{}]}>
          <View style={{width:'100%', height:'20%', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <View style={{height:2, width:'20%', backgroundColor:'black', margin:10}}></View>
            <Text style={{}}>Or Login with</Text>
            <View style={{height:2, width:'20%', backgroundColor:'black', margin:10}}></View>
          </View>
          <View style={{flex:1, flexDirection:'row', width:'100%', height:'80%', justifyContent:'center',alignItems:'center', }}>
            <TouchableOpacity style={styles.social}>
              <Image source={require('../assets/icon/Facebook.png')}/>
              <Text style={{fontSize:18, fontWeight:'400'}}> FaceBook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.social}>
              <Image source={require('../assets/icon/Google.png')}/>
              <Text style={{fontSize:18, fontWeight:'400'}}> Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}
function SignUp({ navigation }) {

  const [getEmail, setEmail] = useState('');
  const [getUserName, setUserName] = useState('');
  const [getPass, setPass] = useState('');
  const [getImgURL, setImgURL] = useState('');
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, getEmail, getPass)
    .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: getUserName, photoURL: "https://example.com/jane-q-user/profile.jpg"
        });
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  }
    return (
      <View style={[{flex:1},styles.component]}>
        <View style={[styles.componentTop,{height:'70%'}]}>
          <Text style={{fontSize:25, marginBottom:50}} >Creat your account</Text>
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getUserName} 
                      onChangeText={(text) => setUserName(text)} 
                      placeholder='Full name'/>
          </View> 
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getEmail} 
                      onChangeText={(text) => setEmail(text)} 
                      placeholder='Email'/>
          </View> 
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      secureTextEntry={false}
                      value={getPass} 
                      onChangeText={(text) => setPass(text)} 
                      placeholder='Password'/>
          </View> 
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getImgURL} 
                      onChangeText={(text) => setImgURL(text)} 
                      placeholder='Profile picture URL (Optinal)'
                      // onSubmitEditing={}
                      />
          </View> 
        </View>
        <View style={[styles.componentBottom,{}]}>
          <TouchableOpacity 
            style={[styles.actionButton, {height:'25%'}]}
            onPress={handleSignUp}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    header:{
        height:'20%',
        width:width,
        backgroundColor:'#4D8D6E',
        alignItems:'center',
        justifyContent:'center'
    },
    component:{
        alignItems:'center',
        justifyContent:'center',
        padding: 35,
    },
    componentTop:{
      height:'60%',
      width: width,
      alignItems:'center',
    },
    componentBottom:{
      height:'35%',
      width:width,
      justifyContent:'center',
      alignItems:'center',
    },
    input:{
      width:'80%', flexDirection:'row',
      padding:10, backgroundColor:'white',
      marginTop:20, alignItems:'center',
      height: '17%'
    },
    inputText:{
      fontSize:20, 
      marginLeft:10, 
      width:'65%',
    },
    actionButton:{
      width:width - 100,
      height:'15%',
      justifyContent:'center', alignItems:'center',
      backgroundColor: '#4D8D6F',
      borderRadius:30
    },
    social:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width:'45%', height:'40%',
      backgroundColor:'white',
      margin:'2%',
    } 
  })
export default Auth;