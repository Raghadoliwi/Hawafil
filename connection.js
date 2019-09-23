import React, { Component } from 'react';
import { Platform, 
  StyleSheet, 
  Text, 
  View ,
  AppRegistry
} from 'react-native';
import firebase from 'firebase';

export default class App extends Component {
  UNSAFE_componentWillMount(){
    var config = {
      apiKey: "AIzaSyAtpvd_8Vhp9mLX8zOKmQrrQflrzURbEgk",
      authDomain: "hawafil-6face.firebaseapp.com",
      databaseURL: "https://hawafil-6face.firebaseio.com",
      projectId: "hawafil-6face",
      storageBucket: "hawafil-6face.appspot.com",
      messagingSenderId: "165149934110"
    };
    firebase.initializeApp(config);
    
    /*
    // test inserting to the database
     firebase.database().ref('users/001').set(
      {
        name: 'lama',
        age: 20
      }
    ).then(() => {
      console.log('inserted');
    }).catch((error) => {
      console.log('error');
    }); 
    */
  }//end initializing method

  render() {
    return (
      <Text>Hello </Text>
);//end return
  }//end render
}//end class app

///////////////
/* 
firebase.auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log('default app user ->', credential.user.toJSON());
    }
  }); */
