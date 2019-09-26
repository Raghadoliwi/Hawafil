import React , {Component} from 'react';
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



export default class asStudent extends Component {
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
      email   : '',
  password: '',
      editable : '',
  university:'',
  busno:'',
  neighborhood:'',

  }


    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }

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
                <View style={styles.container}>
                <View style={styles.smallContainer}>
                <Text style={styles.header}>• ﻛ طالب •</Text>
                <Text style={styles.perInfo}>──── المعلومات الشخصية ────</Text>
                <View style={styles.inputContainer}>

                <TextInput style={styles.inputs}
                placeholder="الاسم"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={(fullName) => this.setState({fullName})}/>
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.inputs}
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.inputs}
                placeholder="كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
                </View>
                <View style={styles.phoneContainer}>

                <View  style={styles.keyNo}><TextInput style={styles.keyText}
                value="+٩٦٦"
                editable={false}
                /></View>
                <View>
                <TextInput style={styles.phoneInput}
                placeholder="رقم الجوال"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
                </View>
                </View>


                <View style={styles.inputContainer}>
                <TextInput style={styles.inputDown}
                placeholder="اسم الجامعة"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={(university) => this.setState({university})}/>

                </View>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputDown}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={(busNo) => this.setState({busNo})}/>

                </View>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputDown}
                placeholder=" الحي السكني"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={(neighborhood) => this.setState({neighborhood})}/>

                </View>
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                <Text style={styles.signUpText}>التالي</Text>
                </TouchableHighlight>
                </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginTop: 30,
                                 backgroundColor: '#F7FAFF',
                                 },

                                 inputContainer: {
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:30,
                                 borderWidth: 1,
                                 width:250,
                                 height:35,
                                 marginBottom:15,
                                 bottom: 20,
                                 //  flexDirection: 'row-reverse',
                                 // justifyContent:'flex-end',
                                 // alignItems:'left',
                                 borderColor: '#EAEAEA'
                                 },

                                 smallContainer:{
                                 marginTop:0,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:550
                                 },

                                 header:{
                                 color: "#8197C6",
                                 fontSize: 30 ,//problema
                                 //fontWeight:900,
                                 bottom: 20,
                                 },

                                 perInfo:{
                                 color: "#9F9F9F",
                                 fontSize: 12 ,
                                 //fontWeight:100,
                                 bottom: 30,
                                 marginTop: 20,
                                 marginBottom:20,
                                 },
                                 inputs:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 alignSelf:'flex-end',
                                 borderColor: '#EAEAEA',
                                 marginLeft:10,

                                 },
                                 phoneContainer:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:30,
                                 borderWidth: 1,
                                 width:200,
                                 height:35,
                                 bottom: 20,
                                 marginBottom:20,
                                 marginRight: 40,
                                 flexDirection: 'row-reverse',
                                 //justifyContent:'flex-end',
                                 alignItems:'flex-end',
                                 borderColor: '#EAEAEA'
                                 },

                                 phoneInput:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 alignSelf:'flex-end',
                                 borderColor: '#EAEAEA',
                                 marginLeft:10,
                                 },

                                 keyNo:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:30,
                                 borderWidth: 1,
                                 width:60,
                                 height:35,
                                 marginBottom:-2,
                                 // marginLeft: 250,
                                 left:205,
                                 flexDirection: 'row-reverse',
                                 //justifyContent:'flex-end',
                                 //alignItems:'flex-end',
                                 borderColor: '#EAEAEA'
                                 },

                                 keyText:{
                                 flex:1,
                                 height:40,
                                 textAlign:'center',
                                 //marginRight: 30,
                                 flexDirection:'row-reverse',
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
                                 alignSelf:'flex-end',
                                 borderColor: '#EAEAEA',
                                 marginLeft:10,
                                 },

                                 buttonContainer: {
                                 height:45,
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
                                 }

                                 });