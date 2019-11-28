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

import * as Font from 'expo-font';


export default class asStudent extends Component {
  state = {
  fullName: '',
  email   : '',
  password: '',
  confirmPassword:'',
  university:'',
  busNo:'',
  neighborhood:'',
  phoneNo : '',
  currentColor: '#EAEAEA',
  passError:'none',
  text: '',
  universities:[],
  buses:[],
  nameBorder:'#EAEAEA',
  emailBorder:'#EAEAEA',
  passwordBorder:'#EAEAEA',
  conPasswordBorder:'#EAEAEA',
  neighborhoodBorder:'#EAEAEA',
  uniBorder:'#EAEAEA',
  busBorder:'#EAEAEA',
  formErrorMsg:'',
  errorMsgVisibilty:'none',
    fontLoaded: false
  }

  /*async componentDidMount() {
  await Font.loadAsync({
    'Tajawal': require('../assets/fonts/Tajawal.ttf'),
    'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
  });

  this.setState({ fontLoaded: true });
}*/
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



  componentDidMount(){ //to fetch data
      firebase.database().ref('managers/').once('value', (snap) => {

          snap.forEach((child) => {

            this.setState({ universities: this.state.universities.concat({value:child.val().instName} ) })


          })
      })//end on


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

this.setState({currentColor: 'red'})

      }
      else {
      this.setState({currentColor: '#91b804'})
      }
}//end validate phone number


  addStudent = () => {
    if (this.state.fullName == ''|| this.state.email == ''||this.state.password == ''||this.state.confirmPassword==''||this.state.university==''||this.state.busNo==''||this.state.phoneNo==''||this.state.neighborhood=='') {
      this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
      this.setState({errorMsgVisibilty: 'flex'})
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور أكثر من ٦ خانات'})
      this.setState({errorMsgVisibilty: 'flex'})
      return;
    }
    if (this.state.emailBorder == 'red'||this.state.passwordBorder == 'red'||this.state.conPasswordBorder=='red'||this.state.uniBorder=='red'||this.state.busBorder=='red'||this.state.currentColor=='red'||this.state.neighborhoodBorder=='red'){
      this.setState({formErrorMsg: 'فضًلا، قم بتصحيح الأخطاء'})
      this.setState({errorMsgVisibilty: 'flex'})
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( (data) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
              this.userId = user.uid
              user.sendEmailVerification();
              firebase.database().ref('students/'+this.userId).set(
                {
                  name: this.state.fullName,
                  phoneNo: '0'+this.state.phoneNo,
                  busNo: this.state.busNo,
                  neighborhood: this.state.neighborhood,
                  university:this.state.university,
                  approved: 0,
                  arrival: 'none',
                  departure: false,
                })

                this.props.navigation.navigate('login')
            }
          });
              Alert.alert("تم التسجيل بنجاح، تفقد بريدك الإلكترني")
        }
        )
    .catch((error) => {
      console.log(error.message)
      //or password is less than 6 characters, the below msg shows for both. which doesnt make sense
      this.setState({formErrorMsg: 'البريد الإلكتروني مسجل مسبقًا، قم بتسجيل الدخول'})
      this.setState({errorMsgVisibilty: 'flex'})
    })

}
//end adding a parent


static navigationOptions = function(props) {
return {
  title: 'التسجيل',
  headerLeft: <View style={{paddingLeft:16, }}>
     <Icon
         name="chevron-left"
         size={30}
         color='white'
         onPress={() => {
           Alert.alert(
'',
'هل أنت متأكد؟',
[
  {
    text: 'لا',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
{text: 'نعم', onPress: () => props.navigation.goBack()}
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

let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'النخيل'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]



        return (
          <ScrollView>



          <KeyboardAwareScrollView
resetScrollToCoords={{ x: 0, y: 0 }}
contentContainerStyle={styles.container}
scrollEnabled={false}>

                <View style={styles.smallContainer}>

                <Text style={[styles.header]}>• ﻛ طالب •</Text>
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


                <View style={[styles.phoneContainer, {borderColor: this.state.currentColor}]}
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
                  this.setState({currentColor: '#EAEAEA'})
                } }
                onEndEditing={(phoneNo) => this.validateNumber(phoneNo)}
                value={this.state.phoneNo}
                />
                </View>

                <View style={[styles.neighborhoodList,styles.fontStyle, {borderColor: this.state.neighborhoodBorder}]}>
                              <Dropdown
                              itemColor='#919191'
                              baseColor='#919191'
                              textColor='#919191'

                              itemTextStyle={[styles.fontStyle,{textAlign:'right'}]}
                  style={[styles.fontStyle,{marginTop:5,textAlign:'right'}]}
                  dropdownOffset={{ top: 0, left: 0}}
                                   inputContainerStyle={[{textAlign:'right', borderBottomColor: 'transparent'},styles.fontStyle ]}
                                  containerStyle={[styles.fontStyle,{marginBottom:-15,textAlign:'right',paddingHorizontal:10, borderWidth:1, borderColor:this.state.neighborhoodBorder, borderRadius:25}]}
                                  pickerStyle={[styles.fontStyle,{paddingHorizontal:10,shadowOpacity:'0.1',shadowRadius:'5',textAlign:'right',color:'#EAEAEA',borderBottomColor:'transparent',borderRadius:25,borderWidth: 0}]}
                                  itemPadding={10}
                                  shadeOpacity={0}
                                  rippleInsets={{top: 0, bottom: 0}}
                                  dropdownMargins	={{min: 0, max: 0}}
                                  dropdownPosition ={0}
                  label='الحي السكني'

                  data={riyadhDistricts}

                  onChangeText={(value) => {
                    this.setState({neighborhood:value})
                    this.setState({neighborhoodBorder: '#EAEAEA'})
                  } }
                />
              </View>

              <View style={[styles.fontStyle,styles.neighborhoodList, {borderColor: this.state.uniBorder}]}>
                            <Dropdown
                            itemColor='#919191'
                            baseColor='#919191'
                            textColor='#919191'

                            itemTextStyle={[styles.fontStyle,{textAlign:'right'}]}
                style={[styles.fontStyle,{marginTop:5,textAlign:'right'}]}
                dropdownOffset={{ top: 0, left: 0}}
                                 inputContainerStyle={[{textAlign:'right', borderBottomColor: 'transparent'},styles.fontStyle ]}
                                containerStyle={[styles.fontStyle,{marginBottom:-15,textAlign:'right',paddingHorizontal:10, borderWidth:1, borderColor:this.state.neighborhoodBorder, borderRadius:25}]}
                                pickerStyle={[styles.fontStyle,{paddingHorizontal:10,shadowOpacity:'0.1',shadowRadius:'5',textAlign:'right',color:'#EAEAEA',borderBottomColor:'transparent',borderRadius:25,borderWidth: 0}]}
                                itemPadding={10}
                                shadeOpacity={0}
                                rippleInsets={{top: 0, bottom: 0}}
                                dropdownMargins	={{min: 0, max: 0}}
                                dropdownPosition ={0}

                label='الجامعة'

    onChangeText={(value) => {
      console.log(this.state.universities);
      this.setState({university:value})
      this.setState({uniBorder: '#EAEAEA'})
    } }
                   data={this.state.universities}
              />
            </View>



                <View style={styles.inputContainer}>
                <TextInput style={[styles.fontStyle,styles.inputs]}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={(busNo) => this.setState({busNo})}
                value={this.state.busNo}

                />

                </View>
                <View >

                  <Text style={[styles.fontStyle,styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                </View>





                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addStudent}>
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
                                    height:700,
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
                                 marginTop:30,
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
