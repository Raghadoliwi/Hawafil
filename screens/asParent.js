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
import Constants from 'expo-constants';



export default class asParent extends Component {

  constructor(props) {
    super(props);
    state = {
      fullName: '',
      email   : '',
      password: '',
    editable : '',
    school:'',
    busno:'',

    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
  static navigationOptions = function(props) {
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
      <View style={styles.smallContainer}>
      <Text style={styles.header}>• ﻛ ولي أمر •</Text>
      <Text style={styles.perInfo}>المعلومات الشخصية</Text>
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
               <View
  style={{
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
    width: 200,
     marginLeft:1,
     bottom: 15,
  }}
/>
              <Text style={styles.addChild}>إضافة التابعين</Text>

               <View style={styles.inputContainerDown}>
               <TextInput style={styles.inputDown}
              placeholder="اسم الطالب"
              keyboardType="ascii-capable"
              underlineColorAndroid='transparent'
              onChangeText={(childName) => this.setState({childName})}/>

              </View>
              <View style={styles.inputContainerDown}>
               <TextInput style={styles.inputDown}
              placeholder="رقم الحافلة"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(busNo) => this.setState({busNo})}/>

              </View>
              <View style={styles.inputContainerDown}>
               <TextInput style={styles.inputDown}
              placeholder=" المرحلة الدراسية"
              keyboardType="ascii-capable"
              underlineColorAndroid='transparent'
              onChangeText={(school) => this.setState({school})}/>

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

    fontWeight:"900",
    bottom: 30,
  },
  perInfo:{
    color: "#9F9F9F",

    fontWeight:"100",
    bottom: 40,
    marginTop: 20,
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
      marginBottom:25,
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
  addChild:{
    color: "#9F9F9F",

    fontWeight:"100",
    bottom: 9,

  },
  inputContainerDown:{
    backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderWidth: 1,
      width:250,
      height:35,
      //marginBottom:15,
     bottom: 10,
      //flexDirection: 'row-reverse',
      //justifyContent:'flex-end',
     // alignItems:'left',
      borderColor: '#EAEAEA',
      marginTop:15,

  },
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
    top: 30,
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
