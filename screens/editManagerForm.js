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
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';


const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class editManagerForm extends React.Component {
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
       userIdNo:'',
     name: '' ,
     phoneNo: '',
     email: '',
        password: '',
  confirmPassword:'',
  instName:'',
     currentColor: '#EAEAEA',
      passError:'none',
     neighborhood: '',
      errorMessage: null,
    nameBorders:'#EAEAEA',
    emailBorder:'#EAEAEA',
    instBorders:'#EAEAEA',
    phoneBorder:'#EAEAEA',
  passwordBorder:'#EAEAEA',
  conPasswordBorder:'#EAEAEA',
  passError:'none',
  formErrorMsg:'',
  errorMsgVisibilty:'none',
     }


     componentDidMount(){ //to fetch data

       firebase.auth().onAuthStateChanged((user) => {
   if (user) {

 var userId = firebase.auth().currentUser.uid;
 this.state.userIdNo=userId;
 email= firebase.auth().currentUser.email;
 firebase.database().ref('managers/'+userId).on('value', snapshot => {


   this.setState({
     name: snapshot.val().name ,
     phoneNo: snapshot.val().phoneNo,
     email: email,
     instName: snapshot.val().instName,
   });

 });



   }
 });



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

this.setState({phoneBorder: 'red'})

    }
    else {
    this.setState({phoneBorder: '#91b804'})
    }
}//end validate phone number



//it's better to use Alert.alert, same one we used in forget password.
     showAlertDialog = () =>{
  Alert.alert(
  'هل أنت متأكد؟',
  '',
  [
    {
      text: 'إلغاء',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'نعم', onPress: () => console.log('OK Pressed')},
  ],
  {cancelable: false},
);}



     editProfile = () => {
         const { navigation } = this.props;
         console.log(this.state.changePassword);

         if (this.state.changePassword && this.state.password.length < 6 && this.state.password.length > 0) {
           console.log('short password');
           this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور أكثر من ٦ خانات'})
           this.setState({errorMsgVisibilty: 'flex'})
           return;
         }

         if (this.state.changePassword && this.state.confirmPassword=='') {
           console.log('confirm');
           this.setState({formErrorMsg: 'عفوًا أدخل كلمة مرور تأكيدية'})
           this.setState({errorMsgVisibilty: 'flex'})
           return;
         }
         if (this.state.password=='' && this.state.confirmPassword!='') {
           console.log('confirm');
           this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور'})
           this.setState({errorMsgVisibilty: 'flex'})
           return;
         }

       if (this.state.name == '' || this.state.email == ''|| this.state.phoneNo == '' || this.state.instName=='') {
         this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }
       if (this.state.phoneBorder=='red'|| this.state.currentColor=='red'||this.state.emailBorder == 'red'||this.state.passwordBorder == 'red'||this.state.conPasswordBorder=='red'){
         this.setState({formErrorMsg: 'فضًلا، قم بتصحيح الأخطاء'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }






       var user = firebase.auth().currentUser;
       var uid;
       if (user != null) {
         uid = user.uid;
         if (this.state.password == '') {
           if (this.state.email != ''){
             user.updateEmail(this.state.email);
           }

           if (this.state.name != ''){
             firebase.database().ref('managers/'+ this.state.userIdNo).update({name : this.state.name,})
           }

           if (this.state.phoneNo != ''){
             firebase.database().ref('managers/'+ this.state.userIdNo).update({phoneNo : this.state.phoneNo,})
           }
           if (this.state.instName != ''){
             firebase.database().ref('managers/'+ this.state.userIdNo).update({instName : this.state.instName,})
           }
           navigation.navigate('renderManageDrivers')
         }
         else {
           user.updatePassword(this.state.password).then(() => {
             navigation.navigate('login')
           }, (error) => {
             console.log(error);
             // An error happened.
           });
         }



       }

this.setState({phoneBorder: '#EAEAEA'})
this.setState({emailBorder: '#EAEAEA'})
this.setState({nameBorders: '#EAEAEA'})
this.setState({passwordBorder: '#EAEAEA'})
this.setState({conPasswordBorder: '#EAEAEA'})


    }//end edit profile.



     static navigationOptions = function(props) {
     return {
       title: 'تعديل البيانات الشخصية',
       headerLeft: <View style={{paddingLeft:16, }}>
       <Icon
           name="chevron-left"
           size={30}
           color='white'
           onPress={() => {
             Alert.alert(
  '',
  'هل أنت متأكد؟',
  [{text: 'نعم', onPress: () => props.navigation.goBack()},
    {
      text: 'لا',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },

  ],
  {cancelable: false},
);

           }} />
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
                <Text style={styles.header}>•  تعديل البيانات الشخصية • </Text>

                <View style={[styles.inputContainer, {borderColor: this.state.nameBorders}]}>

                <TextInput style={styles.input}
                placeholder=" اسم ممثل المنشأة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                />
                </View>


                  <View style={[styles.phoneContainer, {borderColor: this.state.phoneBorder}]}
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


                   <View style={[styles.inputContainer, {borderColor: this.state.emailBorder}]}>

                <TextInput style={styles.input}
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

                <View style={[styles.inputContainer, {borderColor: this.state.instBorders}]}>

                <TextInput style={styles.input}
                placeholder=" اسم المنشأة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(instName) => {
                  this.setState({ instName })
                  this.setState({instBorders: '#EAEAEA'})
                }}
                value={this.state.instName}
                />
                </View>


                 <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                placeholder="كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                autoCapitalize="none"
                blurOnSubmit={false}
                textContentType="newPassword"
                onChangeText={(password) => {
                  console.log(password);
                  if (password.length>0){
                  console.log(this.state.changePassword);
                  this.setState({changePassword:true})
                  console.log(this.state.changePassword);
                  this.setState({password})
                  console.log(this.state.password);
                  this.setState({passwordBorder: '#EAEAEA'})
                  console.log('aa'+this.state.password);
                }
                else {
                  this.setState({changePassword:false})
                  this.setState({password})
                  console.log('bb'+this.state.password);
                  console.log('empty!');
                }

}
}

              onEndEditing={() => {
                  console.log(this.state.password);
                if (this.state.password==''){
                  this.setState({changePassword:false})
                  console.log('endEditing');
                }
              }}
                value={this.state.password}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.input}
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


                <View >

                  <Text style={[styles.fontStyle,styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                onPress={this.editProfile}>

                <Text style={styles.saveText}>حفظ</Text>

                </TouchableHighlight>




                </View>

                </ScrollView>
                </KeyboardAwareScrollView>

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
                                 input:{
                                   flex:1,
                                   height:40,
                                   //flexDirection:'row-reverse',
                                   //justifyContent:'flex-end',
                                   //marginright:16,
                                  textAlign:'right',
                                   borderColor: '#EAEAEA',
                                   marginLeft:10,

                                 },
                                 header:{
                                 color: "#8197C6",
                                 fontSize: 20 ,//problema
                                 //fontWeight:900,

                                 bottom: 20,
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
   neighborhoodList: {
   borderColor: '#EAEAEA',
    backgroundColor: 'white',
     width:250,
    height:100,
     marginBottom:-45,
     marginTop:40
   },
  save: {
    //backgroundColor: "#FF4DFF",
    width: 70,
    height:30,
    //top: 120,
    backgroundColor:"#3C68BF",
    //marginBottom: 300,
  },

  cancel:{
    width: 60,
    height: 30,
    bottom: 15,
    left:-40,
    backgroundColor:"#EDC51B",
  },
  saveText: {
    color: 'white',
    fontSize: 15
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
  },
});
