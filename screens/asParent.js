import React , {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
	StatusBar,
  KeyboardAvoidingView,
  TouchableHighlight,
	ScrollView,
	SafeAreaView,
  Picker,
  Image,
  Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dropdown } from 'react-native-material-dropdown';

import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';


  /*
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
*/
//import Icon from 'react-native-vector-icons/Octicons';




export default class App extends Component {
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

    state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword:'',
      phoneNo:'',

    nameBorder:'#EAEAEA',
    emailBorder:'#EAEAEA',
    phoneBorder:'#EAEAEA',

    passwordBorder:'#EAEAEA',
    conPasswordBorder:'#EAEAEA',
    passError:'none',

    errorMsgVisibilty:'none',
    }


    validateEmail = (email) => {

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(this.state.email)== false)
      {
      this.setState({emailBorder:'red'})
        }
      else {
        this.setState({emailBorder:'#91b804'})
      }
    }//end validate phone number

    identicalPass = (password) => {
    if (this.state.password != this.state.confirmPassword){
      this.setState({passError: 'flex'})
    }
    else {
      this.setState({passError: 'none'})
    }

    }//end identical check

      validateNumber = (phoneNo) => {
        //Regex
        const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
        if (!numRegex.test('0'+this.state.phoneNo)) {

    this.setState({phoneBorder: 'red'})

          }
          else {
          this.setState({phoneBorder: '#91b804'})
          }
    }//end validate phone number


    addParent = () => {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then( (data) => {
          firebase.auth().onAuthStateChanged( user => {
              if (user) {
                this.userId = user.uid
                firebase.database().ref('parents/'+this.userId).set(
                  {
                    name: this.state.fullName,
                    phoneNo: this.state.phoneNo,
                  })
              }
            });
      }).then(() => this.props.navigation.navigate('login'))
      //raghad plz edit the above line to the page you wanna navigate to after insertion
      .catch(error => this.setState({ errorMessage: error.message }))
  }//end adding a parent


static navigationOptions = function(props) {
return {
  title: 'التسجيل',
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

      <ScrollView>



      <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
    scrollEnabled={false}>

            <View style={styles.smallContainer}>

            <Text style={[styles.header]}>• ﻛ ولي أمر •</Text>
            <Text style={[styles.fontStyle,styles.perInfo]}>──── المعلومات الشخصية ────</Text>


            <View style={[styles.inputContainer, {borderColor: this.state.nameBorder}]}>
            <TextInput style={[styles.fontStyle,styles.inputs]}
            placeholder="الاسم"
            keyboardType="TextInput"
            underlineColorAndroid='transparent'
            onChangeText={(fullName) => {
              this.setState({fullName})
              this.setState({nameBorder: '#EAEAEA'})
            } }
            value={this.state.fullName}
            />
            </View>

            <View style={[styles.inputContainer, {borderColor: this.state.emailBorder}]}>

            <TextInput style={[styles.fontStyle,styles.inputs]}
            placeholder="البريد الإلكتروني"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => {
              this.setState({email})
              this.setState({emailBorder: '#EAEAEA'})
            }
          }
            onEndEditing={(email) => this.validateEmail(email)}
            value={this.state.email}
            />
            </View>

            <View style={[styles.inputContainer, {borderColor: this.state.passwordBorder}]}>

            <TextInput style={[styles.fontStyle,styles.inputs]}
            placeholder="كلمة المرور"
            secureTextEntry={true}
            underlineColorAndroid='transparent'

            onChangeText={(password) => {
              this.setState({password})
              this.setState({passwordBorder: '#EAEAEA'})
            } }
            value={this.state.password}
            />
            </View>

            <View style={[styles.inputContainer, {borderColor: this.state.conPasswordBorder}]}>

            <TextInput style={[styles.fontStyle,styles.inputs]}
            placeholder="تأكيد كلمة المرور"
            secureTextEntry={true}
            underlineColorAndroid='transparent'

            onChangeText={(confirmPassword) => {
              this.setState({confirmPassword})
              this.setState({conPasswordBorder: '#EAEAEA'})
              this.setState({passError: 'none'})
            } }
              onEndEditing={(confirmPassword) =>{this.identicalPass(confirmPassword)} }
            value={this.state.confirmPassword}
            />
            </View>

            <View >

              <Text style={[styles.warning,styles.fontStyle, {display: this.state.passError}]}> كلمة المرور غير متطابقة </Text>
            </View>


            <View style={[styles.phoneContainer, {borderColor: this.state.phoneBorder}]}
            >

            <TextInput style={[styles.fontStyle,styles.keyText]}
            value="+966"
            editable={false}
            />

            <TextInput style={[styles.phoneInput,styles.fontStyle]}
            placeholder="رقم الجوال"
            keyboardType="numeric"
            ref="phoneNumber"
            underlineColorAndroid='transparent'
            onChangeText={(phoneNo) => {
              this.setState({phoneNo})
              this.setState({phoneBorder: '#EAEAEA'})
            } }
            onEndEditing={(phoneNo) => this.validateNumber(phoneNo)}
            value={this.state.phoneNo}
            />
            </View>



            <View >

              <Text style={[styles.fontStyle,styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
            </View>





            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addParent}>
            <Text style={[styles.fontStyle,styles.signUpText]}>تسجيل</Text>
            </TouchableHighlight>

            </View>

            </KeyboardAwareScrollView>

            </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: 'white',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:40,
                                   marginBottom:15,
                                   paddingHorizontal:10,
                                  // fontFamily: 'tajawal',


                                 },

                                 smallContainer:{
                                   marginTop:15,

                                   justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                  borderRadius:10,
                                    width:300,
                                    height:500,
                                    marginBottom:30,

                                    shadowOpacity: 0.04,
                                            shadowRadius: 5,
                                            shadowColor: 'black',
                                            shadowOffset: { height: 0, width: 0 }
                                 },

                                 header:{
                                 color: "#8197C6",
                                 fontSize: 20 ,//problema
                                 //fontWeight:900,

                                 bottom: 20,
                                 },

                                 perInfo:{
                                 color: "#9F9F9F",
                                 fontSize: 12 ,
                                 //fontWeight:100,
                                 bottom: 30,
                                 marginTop: 20,

                                 },
                                 inputs:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                textAlign:'right',
                                 borderColor: '#EAEAEA',
                                 marginLeft:10,

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
                                 },

                                 phoneInput:{


                                 width:200,

                                 borderColor: '#EAEAEA',

                                 },

                                 keyNo:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:30,
                                 borderWidth: 1,
                                 width:30,
                                 height:35,

                                 // marginLeft: 250,


                                 //justifyContent:'flex-end',
                                 //alignItems:'flex-end',
                                 borderColor: '#EAEAEA'
                                 },
                                 dropdown:{
                                   borderRadius:25,
                                 },

                                 neighborhoodList: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: 'white',
                                   width:250,
                                   height:100,
                                   marginBottom:-40,
                                   marginTop:5
                                 },

                                 keyText:{
                                 flex:1,
                                 height:40,
                                 textAlign:'center',
                                 //marginRight: 30,
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 borderColor: '#EAEAEA',
                                 color:'#646464' ,
                                 },

                                 /*inputIcon:{
                                  width:30,
                                  height:30,
                                  marginLeft:15,
                                  justifyContent: 'center'
                                  },*/


                                 inputDown:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,

                                 borderColor: '#EAEAEA',

                                 },
                                 MainContainer: {
                                    flex: 1,
                                    justifyContent: 'center',
                                    margin: 20

                                  },
                                 buttonContainer: {

                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 top: 20,
                                 width:250,
                                 borderRadius:30,
                                 },

                                 signupButton: {
                                 //backgroundColor: "#FF4DFF",
                                 width: 70,
                                 height:30,
                                 //top: 120,
                                 backgroundColor:"#3C68BF",
                                 //marginBottom: 300,
                                 },

                                 signUpText: {
                                 color: 'white',
                               },
                               warning:{
                                 color: 'red',
                                 fontSize:12,
                                 marginBottom:10,
                                 textAlign:'center'
                               },
                               fontStyle:{
                                //fontFamily:'Tajawal'
                               }

                                 });
