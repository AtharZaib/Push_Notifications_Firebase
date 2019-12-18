import React, {Component} from 'react';
import { View, Text } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends Component {

async componentDidMount() {
  console.log('Component di mouse')
  this.checkPermission();
}

  //1
async checkPermission() {
  console.log("Permision")
  const enabled = await firebase.messaging().hasPermission();
  console.log(enabled)
  if (enabled) {
      this.getToken();
  } else {
    console.log("Permision disabled")
      this.requestPermission();
  }
}

  //3
async getToken() {
  console.log('Get Token')
  // let fcmToken = await AsyncStorage.getItem('fcmToken');
  // if (!fcmToken) {
  //   console.log('No Token')
      fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken)
  //     if (fcmToken) {
  //         // user has a device token
  //         console.log(fcmToken)
  //         console.log("Token on way")
  //         await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  // }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Welcome to React Native!</Text>
      </View>
    );
  }
}