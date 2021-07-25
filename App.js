 
import React, { useState, useEffect, createContext, Children } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import {signOut, createUser} from './Firebase';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style = {styles.container}>
        <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
        <Text>Login</Text>
        <Button onClick = {createUser }  title="Log in with Jane"></Button>
        <Button onClick = { signOut } title= "Logoff"></Button>
        {/*<Button></Button>
        <Button></Button>*/}
     </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {user.email}</Text>
    </View>
  );
} 

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    })

    GoogleSignin.configure({
      webClientId: '1002126785268-paott6eu4344i6j8rq9975jrddtcdid4.apps.googleusercontent.com',
    });
      
     
        async function onGoogleButtonPress() {
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();
          
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
        }