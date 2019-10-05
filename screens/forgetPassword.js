import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
	StatusBar,
  Div,
  TextInput,
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
import Constants from 'expo-constants';

export default class forgetPassword extends React.Component {
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
                <View style={styles.container}>

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
                </View>
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

                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 },
                                 smallContainer:{
                                 marginTop:20,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:275,
                                 height:250,
                                 shadowOpacity: 0.04,
                                         shadowRadius: 5,
                                         shadowColor: 'black',
                                         shadowOffset: { height: 0, width: 0 }
                                 },


                                 firstButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#5681D5',
                                 borderWidth:1,
                                 },
                                secondButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#8BC8E4',
                                 borderWidth:1,
                                 },
                                thirdButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#BBC3D4',
                                 borderWidth:1,
                                 },


                                typeButton: {
                                 backgroundColor: "#ffffff",
                                    margin:7,

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
                                email:{
                                 borderBottomColor: '#FFFFFF',
                                  flex:1,
                                  textAlign:'right',

                                },
                                buttonContainer: {
                                height:35,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom:10,
                                width:'35%',
                                borderRadius:30,

                                },

                                firstText: {
                                 color: '#5681D5',
                                    fontSize:15,
                                 },
                                secondText: {
                                 color: '#8BC8E4',
                                    fontSize:15,
                                 },
                                thirdText: {
                                 color: '#BBC3D4',
                                    fontSize:15,
                                 },
                                 signupButton: {
                                 backgroundColor: "#4C73CC",
                                 },


                                signupText: {
                                 color: 'white',
                                 },

                                 });
