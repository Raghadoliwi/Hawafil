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
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';

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
      visibilty: 'none',
                  email: '',
                  emailBorders:'#EAEAEA',
                  errorMsg:'',

                }


                      forgetPassword = () => {
                        if (this.state.email == '') {
                          this.setState({emailBorders: 'red'})
                          return;
                        }
                        firebase.auth().sendPasswordResetEmail(this.state.email)
                        .then(function() {
                          this.props.navigation.navigate('login');
                          })
                          .catch((error) => {

                            if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.')
                            {
                              this.setState({errorMsg: 'لا يوجد مستخدم بهذا البريد الإلكتروني'})
                              this.setState({visibilty: 'flex'})
                            }
                            else if(error.message == 'The email address is badly formatted.'){
                              this.setState({errorMsg: 'فضلًا، قم بإدخال بريد إلكتروني صحيح'})
                              this.setState({visibilty: 'flex'})
                            }

                          // Error occurred. Inspect error.code.
                            });


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

              <View style={[styles.inputContainer, {borderColor:this.state.emailBorders}]}>


                <TextInput style={styles.email}
                    placeholder="البريد الإلكتروني"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => {
                      this.setState({email})
                      this.setState({visibilty: 'none'})
                      this.setState({emailBorders: '#EAEAEA'})

                    } }/>
              </View>
              <View >

                <Text style={[styles.warning, {display: this.state.visibilty}]}> {this.state.errorMsg} </Text>
              </View>

              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}

              onPress={this.forgetPassword}>

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
                                 warning:{
                                   color: 'red',
                                   fontSize:12,
                                   textAlign:'right',
                                   marginBottom:10,
                                 },

                                signupText: {
                                 color: 'white',
                                 },

                                 });
