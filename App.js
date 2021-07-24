 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropType from 'prop-types';
import auth from '@react-native-firebase/auth';
import {signInAnonymous, signOut, createUser} from './Firebase';

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
        <Text>Login</Text>
        <Button onClick = { signOut } title= "Log Out"></Button>
        {/*<Button></Button>
        <Button></Button>*/}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {user.email}</Text>
      <Button onClick = {createUser }  title="Log in with Jane"></Button>
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

  