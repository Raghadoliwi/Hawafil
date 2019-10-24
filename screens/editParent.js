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


const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class editParent extends React.Component {
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
     pName: '' ,
     phoneNo: '',
        password: '',
  confirmPassword:'',
     currentColor: '#EAEAEA',
      passError:'none',
     neighborhood: '',
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

     handleInserting = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( (data) => {
            firebase.auth().onAuthStateChanged( user => {
                if (user) {
                  this.userId = user.uid
                  firebase.database().ref('drivers/'+this.userId).set(
                    {
                      name: this.state.driverName,
                      id: this.state.workerId,
                      phoneNo: this.state.phoneNo,
                      inst: this.state.inst,
                      busNo: this.state.busNo,
                      busPlate: this.state.busPlate,
                    })
                }
              });
        }).then(() => this.props.navigation.navigate('renderManageDrivers'))
        //raghad plz edit the above line to the page you wanna navigate to after insertion
        .catch(error => console.log(error.message ))
    }//end inserting a driver


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
let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'النخيل'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]
        return (
          <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>
          <ScrollView style={{flex: 1, marginBottom:20}}>
                <View style={styles.smallContainer}>
                <Text style={styles.header}>•  تعديل البيانات الشخصية • </Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                placeholder="اسم ولي الأمر "
                keyboardType="acii-capable"
                underlineColorAndroid='transparent'
                onChangeText={pName => this.setState({ pName })}
                value={this.state.pName}
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


                   <View style={[styles.inputContainer,]}>

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

                  onChangeText={(value) => {
                    this.setState({neighborhood:value})
                    this.setState({neighborhoodBorder: '#EAEAEA'})
                  } }
                />
              </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                onPress={this.handleInserting}>

                <Text style={styles.saveText}>حفظ</Text>

                </TouchableHighlight>

                    <TouchableHighlight style={[styles.buttonContainer, styles.cancel]}
                onPress={this.handleInserting}>

                <Text style={styles.saveText}>إلغاء</Text>


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
                                 marginTop:130,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:400,

                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:35,
                                   marginBottom:10,
                                   top:40,
                                   paddingHorizontal:10,
                                  flexDirection: 'row',

                                 },
                                 input:{
                                       flex:1,
                                      height:40,
                                   alignSelf:'flex-end',
                                     borderColor: '#EAEAEA',

                                 },
                                 header:{
    color: "#8197C6",
    fontSize: 15 ,//problema
    fontWeight:'bold',
    bottom:-15 ,
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
    width: 60,
    height:30,
    top: 15,
    left:35,
    backgroundColor:"#3C68BF",
   //alignSelf:'flex-end'
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
      borderRadius:30,
      borderWidth: 1,
      width:200,
      height:35,
      bottom: -45,
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
  keyText:{
                                 flex:1,
                                 height:40,
                                 textAlign:'center',
                                 //marginRight: 30,
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 borderColor: '#EAEAEA',
                                 color:'#646464' ,

  }
});
