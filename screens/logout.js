import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  Image,
  Alert} from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';

import login from '../App'
export default class logout extends Component {


    static navigationOptions = function(props) {
          firebase.auth().signOut()
    return {

      title: '',
      headerLeft: <View style={{paddingLeft:16}}>
         <Icon
             name="chevron-left"
             size={25}
             color='white'
             onPress={() => props.navigation.goBack()} />
     </View>,

     headerTintColor: 'white',
           headerStyle: {
              backgroundColor: "#4C73CC"
           }
   }
  };

      render() {

          return (

                  <View style={styles.container}>

                  </View>
                  );
      }


}
