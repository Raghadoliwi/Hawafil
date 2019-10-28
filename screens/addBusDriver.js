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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';
//import AsyncStorage from '@react-native-community/async-storage';
const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class addBusDriver extends React.Component {
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
     nationalId: '',
     driverName: '',
       currentColor: '#EAEAEA',
     phoneNo: '',
     inst:'',
     busNo: '',
     district:'',
      busPlate: '',
     nameBorders:'#EAEAEA',
     emailBorder:'#EAEAEA',
 neighborhoodBorder:'#EAEAEA',
   passwordBorder:'#EAEAEA',
   conPasswordBorder:'#EAEAEA',
     formErrorMsg:'',
     errorMsgVisibilty:'none',
     }

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

   validateEmail = (email) => {

     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
     if(reg.test(this.state.email)== false)
     {
     this.setState({emailBorder:'red'})
       }
     else {
       this.setState({emailBorder:'#91b804'})
     }
   }//end validate email


   /*
   : driverName,
   : nationalId,
   : phoneNo,
   : busNo,
   : busPlate,
   : district,
   inst: instName,
   */
     handleInserting = () => {
       if (this.state.name == ''|| this.state.email == ''||this.state.id == ''||this.state.phoneNo==''||this.state.busNo==''||this.state.busPlate==''||this.state.district=='') {
         this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }
       if (this.state.emailBorder == 'red'||this.state.passwordBorder == 'red'||this.state.conPasswordBorder=='red'||this.state.uniBorder=='red'||this.state.busBorder=='red'||this.state.currentColor=='red'||this.state.neighborhoodBorder=='red'){
         this.setState({formErrorMsg: 'فضًلا، قم بتصحيح الأخطاء'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }
       //keep the previously signed in user
       //var prevUser = firebase.auth().currentUser;
const {navigation} = this.props;
              var instName = navigation.getParam('inst', 'NO-INST');
              var driverName= this.state.driverName;
              var nationalId = this.state.nationalId;
              var phoneNo= this.state.phoneNo;
              var busNo= this.state.busNo;
              var busPlate = this.state.busPlate;
              var district= this.state.district;

/*
                  firebase.auth().onAuthStateChanged( user => {
                      if (user) {
                        this.userId = user.uid +'5'
                        if (instName === 'NO-INST'){return;}
                    }
                  });
                  */

// /'drivers/'+this.userId
                //  firebase.database().ref('drivers/'+this.userId).set(
              //  var myKey = firebase().ref().child('drivers').push().key;
              firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.nationalId)
              .then( (data) => {
                  firebase.auth().onAuthStateChanged( user => {
                      if (user) {
                        this.userId = user.uid
                firebase.database().ref('drivers/'+this.userId).set(
                    {
                      name: driverName,
                      id: nationalId,
                      phoneNo: phoneNo,
                      busNo: busNo,
                      busPlate: busPlate,
                      district: district,
                      inst: instName,
                    }
                  ).then(function() {
                      Alert.alert('تمت الإضافة بنجاح');
                      navigation.navigate('renderManageDrivers');
                    })
                    .catch((error) => {
                      console.log(error.message)
                      this.setState({formErrorMsg: 'البريد الإلكتروني مسجل مسبقًا، قم بتسجيل الدخول'})
                      this.setState({errorMsgVisibilty: 'flex'})
                    })

                    console.log(this.state.errorMessage);
                    }//end







     static navigationOptions = function(props) {
     return {
       drawerLabel:'إضافة قائد مركبة',
       title: 'إضافة قائد مركبة',
       headerLeft: <View style={{paddingLeft:16, }}>
   				<Icon
   						name="chevron-left"
   						size={30}
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
      let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]

        return (
            <View style={{padding: 10, flex: 1}, styles.container} >
          <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
            scrollEnabled={false}>

          <View style={styles.smallContainer}>
          <Text style={styles.header}>• إضافة قائد مركبة •</Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email, styles.input}
                placeholder="رقم الهوية"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={nationalId => this.setState({ nationalId })}
                value={this.state.nationalId}
                />
                </View>


                <View style={[styles.inputContainer, {borderColor: this.state.nameBorder}]}>

                <TextInput style={styles.email, styles.input}
                placeholder="اسم القائد"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(driverName) => {
                  this.setState({driverName})
                  this.setState({nameBorder: '#EAEAEA'})
                } }
                value={this.state.driverName}
                />

                </View>

              //  <TextInput style={[styles.fontStyle,styles.inputs]}

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

                <View style={[styles.phoneContainer, {borderColor: this.state.currentColor}]}
                    >

                    <TextInput style={styles.keyText}
                    value="+966"
                    editable={false}
                    />

                    <TextInput style={styles.phoneInput}
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
//الى هنا سويت فالديشن

                <View style={[styles.neighborhoodList, {borderColor: this.state.neighborhoodBorder}]}>
                                      <Dropdown
                                      itemColor='#919191'
                                      baseColor='#919191'
                                      textColor='#919191'

                                      itemTextStyle={{textAlign:'right'}}
                          style={{textAlign:'right'}}
                          dropdownOffset={{ top: 0, left: 0}}
                                           inputContainerStyle={{textAlign:'right', borderBottomColor: 'transparent' }}
                                          containerStyle={{marginBottom:-15,textAlign:'right',paddingHorizontal:10, borderWidth:1, borderColor:this.state.neighborhoodBorder, borderRadius:25}}
                                          pickerStyle={{paddingHorizontal:10,shadowOpacity:'0.1',shadowRadius:'5',textAlign:'right',color:'#EAEAEA',borderBottomColor:'transparent',borderRadius:25,borderWidth: 0}}
                                          itemPadding={10}
                                          shadeOpacity={0}
                                          rippleInsets={{top: 0, bottom: 0}}
                                          dropdownMargins	={{min: 0, max: 0}}
                                          dropdownPosition ={0}
                          label='الحي السكني'

                          data={riyadhDistricts}

                          onChangeText={(district) => {
                            this.setState({district})
                            this.setState({neighborhoodBorder: '#EAEAEA'})
                          } }
                          value={this.state.district}
                        />
                      </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email, styles.input}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={busNo => this.setState({ busNo })}
                //line below is added new by lama:
                value={this.state.busNo}
                />
                </View>
                <View >

                  <Text style={[styles.fontStyle,styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                </View>

<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
onPress={this.handleInserting}>

<Text style={styles.loginText}>إضافة</Text>


</TouchableHighlight>




                </View>
              </KeyboardAwareScrollView>
              </View>

                );
    }
}

const styles = StyleSheet.create({
  container: {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  backgroundColor: '#F7FAFF',
},

                                 Main:{
                                 color:'#4C73CC',
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:50,
                                 },
                                 container: {
                                   flex: 1,
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   backgroundColor: '#F7FAFF',
                                 },
                                 smallContainer:{
                                    marginTop:40,
                                    justifyContent: 'center',
                                   alignItems: 'center',
                                   backgroundColor: 'white',
                                   borderRadius:10,
                                     width:300,
                                     height:600
                                 },
                                 header:{
                                   color: "#8197C6",
                                   fontSize: 15 ,//problema
                                   fontWeight:"900",
                                   bottom: 15,
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
                                 input:{
                                   flex:1,
                                   height:40,
                                   //flexDirection:'row-reverse',
                                   //justifyContent:'flex-end',
                                   //marginright:16,
                                  textAlign:'right',
                                   borderColor: '#EAEAEA',
                                   marginLeft:10,
                                   marginRight:10,

                                 },
                                 pass:{
                                 height:45,
                                 marginLeft:170,
                                 borderBottomColor: '#FFFFFF',
                                 flex:1,
                                 },
                                 email:{
                                 height:45,
                                 marginLeft:170,
                                 borderBottomColor: '#FFFFFF',
                                 flex:1,
                                 },

                                 buttonContainer: {
                                 height:45,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:250,
                                 borderRadius:30,
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
                                 neighborhoodList: {
                                  borderColor: '#EAEAEA',
                                   backgroundColor: 'white',
                                    width:250,
                                   height:100,
                                top:30   },
                                warning:{
                                   color: 'red',
                                   fontSize:12,
                                   marginBottom:10,
                                       },
                                 loginButton: {
                                 backgroundColor: "#4C73CC",
                                 },
                                 loginText: {
                                 color: 'white',
                                 },

                                 registerText:{
                                 color: '#EDC51B',
                                 },
                                 });
