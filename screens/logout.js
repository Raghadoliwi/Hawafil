import React , {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
	StatusBar,
  Div,
  TouchableHighlight,
	ScrollView,
	SafeAreaView,
  Image,
  Alert} from 'react-native';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';

export default class logout extends React.Component {

constructor(props){
  super(props);
}
UNSAFE_componentWillMount(){
  const { navigation } = this.props;

  firebase.auth().signOut()
  .then(function() {
  // Sign-out successful.
        navigation.navigate('login');
    })
    .catch(function(error) {
  // An error happened.
  console.log(error.message)
});
  /*
  firebase.auth().signOut()
  this.state.email = '';
  this.state.password = '';
  this.props.navigation.navigate('login');
*/
/*
  firebase
  .auth()
  .signOut()
  .then( (data) => {
    this.state.email = '';
    this.state.password = '';
    this.props.navigation.navigate('login');
  })
  .catch( (error) => {
    console.log(error.message)
  })

  */
}

render(){
  return null;
}
}
