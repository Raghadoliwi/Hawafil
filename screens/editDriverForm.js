import React from 'react';
//import react in our code.

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
  import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';
import DropdownMenu from 'react-native-dropdown-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class editDriverForm extends React.Component {
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
     email: '' ,
    password: '',
  confirmPassword:'',
     currentColor: '#EAEAEA',
      passError:'none',
     workerId: '',
     driverName: '',
     phoneNo: '',
     inst:'',
     busNo: '',
     errorMessage: null,
    nameBorders:'#EAEAEA',
    emailBorders:'#EAEAEA',
  passwordBorder:'#EAEAEA',
  conPasswordBorder:'#EAEAEA',
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

}//end inserting a bus

  validateNumber = (phoneNo) => {
    //Regex
    const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    if (!numRegex.test('0'+this.state.phoneNo)) {
      console.log('number bad');
      console.log('0'+this.state.phoneNo);


      }
      else {
      this.setState({currentColor: '#91b804'})
      }
}//end validate phone number

     editProfile = () => {
       var user = firebase.auth().currentUser;
       var uid;
       if (user != null) {
         uid = user.uid;
         if (this.state.email != ''){
           user.updateEmail(this.state.email);
         }
         if (this.state.password != ''){
           user.updatePassword(this.state.password);
         }

         if (this.state.driverName != ''){
           firebase.database().ref('drivers/'+uid).update({name : this.state.driverName,})
         }

         if (this.state.phoneNo != ''){
           firebase.database().ref('drivers/'+uid).update({phoneNo : this.state.phoneNo,})
         }
         if (this.state.workerId != ''){
           firebase.database().ref('drivers/'+uid).update({id : this.state.workerId,})
         }
         if (this.state.busNo != ''){
           firebase.database().ref('drivers/'+uid).update({busNo : this.state.busNo,})
         }
         if (this.state.inst != ''){
           firebase.database().ref('drivers/'+uid).update({inst : this.state.inst,})
         }

       }
    }//end edit driver

     static navigationOptions = function(props) {
     return {
       title: 'إضافة قائد مركبة',
       headerLeft: <View style={{paddingLeft:16, }}>
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
<KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>
                <ScrollView style={{flex: 1, marginBottom:20}}>
                <View style={styles.smallContainer}>
                <Text style={styles.Main}> • تعديل البيانات الشخصية •</Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="الرقم الوظيفي"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={workerId => this.setState({ workerId })}
                value={this.state.workerId}
                />
                </View>


                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="اسم القائد"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={ driverName => this.setState({ driverName })}
                value={this.state.driverName}
                />

                </View>
            <View style={[styles.phoneContainer, {borderColor: this.state.currentColor}]}
                >

                <TextInput style={styles.keyText}
                value="+966"
                editable={false}
                />

                <TextInput style={[styles.phoneInput]}
                placeholder="رقم الجوال"
                keyboardType="numeric"
                ref="phoneNumber"
                underlineColorAndroid='transparent'
                onChangeText={(phoneNo) => {
                  this.setState({phoneNo})
                  this.setState({currentColor: '#EAEAEA'})
                } }
                onEndEditing={(phoneNo) => this.validateNumber(phoneNo)}
                value={this.state.phoneNo}
                />
                </View>


                   <View style={[styles.inputContainer]}>

                <TextInput style={styles.inputs}
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

                  <View style={styles.inputContainer}>

                <TextInput style={styles.pass}
                placeholder="كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.pass}
                placeholder="تأكيد كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="اسم المنشأة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={inst => this.setState({ inst })}
                value={this.state.inst}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={busNo => this.setState({ busNo })}
                //line below is added new by lama:
                value={this.state.busNo}
                />
                </View>



  <View >

     <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                onPress={this.editProfile}>

                <Text style={styles.saveText}>حفظ</Text>

                </TouchableHighlight>
                 <View>
           <TouchableHighlight style={[styles.buttonContainer, styles.delete]} onPress=  {this.showAlertDialog}>

          <Text style={styles.saveText}>حذف الحافلة </Text>
        </TouchableHighlight>
        </View>
/*
                    <TouchableHighlight style={[styles.buttonContainer, styles.cancel]}
                onPress={this.editProfile}>

                <Text style={styles.saveText}>إلغاء</Text>


                </TouchableHighlight>

*/

                </View>

                </ScrollView>
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
                                 bottom:50,
                                 },
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 },
                                 smallContainer:{
                                 marginTop:100,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:600,


                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:35,
                                   marginBottom:15,
                                   bottom:20,
                                   paddingHorizontal:10,
                                  flexDirection: 'row',


                                 },

                                 pass:{
                                 height:45,
                                 borderBottomColor: '#FFFFFF',
                                 flex:1,
                                width:250,
                                 alignSelf: 'flex-end'

                                 },
                                 email:{
                                 height:45,
                                 borderBottomColor: '#FFFFFF',
                                 flex:1,
                                 width:250,
                                 alignSelf: 'flex-end'
                                 },

                                 buttonContainer: {
                                  height:45,
                                   flexDirection: 'row',
                                  justifyContent: 'center',
                                   alignItems: 'center',
    //marginBottom:20,
                                 width:250,
                                  borderRadius:30,
    //top: -10
  },
  save: {
    //backgroundColor: "#FF4DFF",
    width: 60,
    height:30,
    top: 70,
    left:110,
    backgroundColor:"#3C68BF",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  delete:{
      width: 100,
    height:30,
    top: 40,
    left:25,
    backgroundColor:"#DC143C",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  cancel:{
    width: 60,
    height: 30,
    bottom: -10,
    left:-110,
    backgroundColor:"#EDC51B",
  },
  saveText: {
    color: 'white',
    fontSize: 15
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
      alignItems:'felx-end',
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
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 borderColor: '#EAEAEA',
                                 color:'#646464' ,

  },
   warning:{
                                 color: 'red',
                                 fontSize:12,
                                 marginBottom:10,
                                 textAlign:'center'
                               }
});
