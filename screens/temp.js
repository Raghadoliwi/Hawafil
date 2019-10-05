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

  /*
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
*/
//import Icon from 'react-native-vector-icons/Octicons';

export default class forgetPassword extends React.Component {


    UNSAFE_componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyBes0dgEE8268NEKb4vDaECnmwaWUGM1J8",
      authDomain: "hawafildb.firebaseapp.com",
      databaseURL: "https://hawafildb.firebaseio.com",
      projectId: "hawafildb",
      storageBucket: "",
      messagingSenderId: "932110912763",
      appId: "1:932110912763:web:68fca60e805543a655b45e",
      measurementId: "G-G21F8ME7TS"
    };


  }

  state={
                  email: '',
                  emailBorders:'#EAEAEA',

                }

static navigationOptions = function(props) {
return {
  title: 'استعادة كلمة المرور',
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
          <KeyboardAwareScrollView
resetScrollToCoords={{ x: 0, y: 0 }}
contentContainerStyle={styles.container}
scrollEnabled={false}>

                <View style={styles.smallContainer}>

                <Text style={styles.Main}>قم بإدخال بريدك الإلكتروني:</Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                />

                </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} >

                <Text style={styles.signupText}>إرسال</Text>

                </TouchableHighlight>

                </View>
                </KeyboardAwareScrollView>

                );
    }
}

const styles = StyleSheet.create({
                                 Main:{
                                 color:'#4C73CC',
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:20,
                                 marginTop:15,
                                fontSize:20,
                                 },
                                Sub:{
                                 color:'#9F9F9F',
                                 fontSize:12,
                                 marginBottom:10,

                                },
                                SubSub:{
                                 color:'#9F9F9F',
                                 fontSize:10,
                                 marginBottom:30,
                                },
                                container: {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#F7FAFF',
                                },
                                 smallContainer:{
                                 marginTop:30,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:800,
                                 overflowY: 'scroll',
                                 paddingVertical:35,
                                 },

                                 typeContainer:{
                                 justifyContent: 'center',

                                 backgroundColor: 'white',
                                 borderRadius:10,

                                 flex: 1,
                                 flexDirection: 'row',
                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:40,
                                   marginBottom:15,
                                   paddingHorizontal:10,

                                 },
                                 phoneContainer:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:25,
                                 borderWidth: 1,
                                 width:250,
                                 marginBottom:20,
                                 flexDirection: 'row',
                                 //justifyContent:'flex-end',
                                 justifyContent:'space-around',
                                 borderColor: '#EAEAEA'
                                 },
                                 phoneInput:{

                                 height:40,
                                 width:200,

                                 borderColor: '#EAEAEA',

                                 },

                                 keyNo:{

                                 color:'grey',

                                 },

                                inputContainertwo: {
                                  borderColor: '#EAEAEA',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius:25,
                                  borderWidth: 1,
                                  width:250,
                                  height:40,
                                  marginBottom:15,
                                  paddingHorizontal:10,
                                 },



                                 buttonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'40%',
                                 borderRadius:30,

                                 },


                                 signupButton: {
                                 backgroundColor: "#4C73CC",
                                 },


                                signupText: {
                                 color: 'white',
                                 },

                                typeText: {
                                 color: 'white',
                                 },


                                 });
