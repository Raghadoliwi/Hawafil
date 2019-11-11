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
import { Dropdown } from 'react-native-material-dropdown';


const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class editStudent extends React.Component {
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
      universities:[],
      buses:[],
    name:'',
     phoneNo: '',
     neighborhood:'',
     university:'',
     busNo: '',
     neighborhoodBorder:'#EAEAEA',
     uniBorder:'#EAEAEA',
     busBorder:'#EAEAEA',

     errorMessage: null,
    nameBorders:'#EAEAEA',
    emailBorders:'#EAEAEA',
  passwordBorder:'#EAEAEA',
  conPasswordBorder:'#EAEAEA',
     }


          componentDidMount(){ //to fetch data

            firebase.database().ref('managers/').once('value', (snap) => {

                snap.forEach((child) => {

                  this.setState({ universities: this.state.universities.concat({value:child.val().instName} ) })


                })
            })//end on
const { navigation } = this.props;
firebase.auth().onAuthStateChanged((user) => {
if (user) {
  var userId = firebase.auth().currentUser.uid;
  this.state.userIdNo=userId;
  email= firebase.auth().currentUser.email;
  firebase.database().ref('students/'+userId).on('value', snapshot => {
  this.setState({
      name: snapshot.val().name,
      phoneNo: snapshot.val().phoneNo,
      busNo: snapshot.val().busNo,
      neighborhood:snapshot.val().neighborhood,
      university: snapshot.val().university,
    });
})


}//end if
}
);






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
const { navigation } = this.props;
       if (this.state.name == '' || this.state.neighborhood == ''|| this.state.phoneNo == ''|| this.state.busNo == ''|| this.state.university == '') {
         this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }


       var userIdNo=this.state.userIdNo;

   if (this.state.password == '') {
         if (this.state.userIdNo != ''){
           firebase.database().ref('students/'+userIdNo).update({name : this.state.name,})
         }

         if (this.state.phoneNo != ''){
           firebase.database().ref('students/'+userIdNo).update({phoneNo : this.state.phoneNo,})
         }
         if (this.state.neighborhood != ''){
           firebase.database().ref('students/'+userIdNo).update({id : this.state.neighborhood,})
         }
         if (this.state.busNo != ''){
           firebase.database().ref('students/'+userIdNo).update({busNo : this.state.busNo,})
         }
         if (this.state.university != ''){
           firebase.database().ref('students/'+userIdNo).update({busPlate : this.state.university,})
         }
  navigation.navigate('studentDashboard')
       }
       else {
          firebase.database().ref('students/'+userIdNo).updatePassword(this.state.password).then(() => {
          navigation.navigate('login')
         }, (error) => {
           // An error happened.
         });
       }


    }//end edit driver

     static navigationOptions = function(props) {


     return {
        title: 'تعديل بيانات الطالب',
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
      let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]

        return (
<KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>

                <ScrollView style={{flex: 1, marginBottom:20}}>
                  <View style={styles.smallContainer}>

                        <Text style={styles.Main}> • تعديل البيانات الشخصية • </Text>


                        <View style={styles.inputContainer}>

                        <TextInput style={styles.email, styles.input}
                        placeholder="اسم الطالب"
                        keyboardType="TextInput"
                        underlineColorAndroid='transparent'
                        onChangeText={ name => this.setState({ name })}
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

                        <View style={[styles.inputContainer, {borderColor: this.state.emailBorders}]}>

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

                        <View style={styles.inputContainer}>

                       <TextInput style={styles.input}
                       placeholder="كلمة المرور"
                       secureTextEntry={true}
                       underlineColorAndroid='transparent'
                       autoCapitalize="none"
                       onChangeText={(password) => {
                         this.setState({password})
                         this.setState({passwordBorder: '#EAEAEA'})
                       } }
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

                     <TextInput style={styles.email, styles.input}
                     placeholder="رقم الحافلة"
                     keyboardType="numeric"
                     underlineColorAndroid='transparent'
                     onChangeText={busNo => this.setState({ busNo })}
                     //line below is added new by lama:
                     value={this.state.busNo}
                     />
                     </View>



                     <View>

                        <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
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
                                 Main:{
                                   marginTop:100,
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
                                   marginTop: 30,
                                   marginBottom: 30,
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   backgroundColor: 'white',
                                   borderRadius: 10,
                                   width: 300,


                                   paddingVertical: 35,
                                   shadowOpacity: 0.04,
                                   shadowRadius: 5,
                                   shadowColor: 'black',
                                   shadowOffset: {
                                     height: 0,
                                     width: 0}


                                 },
                                 neighborhoodList: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: 'white',
                                   width:250,
                                   height:100,
                                   marginBottom:-40,
                                   marginTop:5
                                 },
                                 dropdown:{
                                   borderRadius:25,
                                 },
                                 inputDown:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,

                                 borderColor: '#EAEAEA',

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
                                 container: {
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 flex: 1,
                                 backgroundColor: '#F7FAFF',
                                 },

                                                                Main:{
                                                                color:'#4C73CC',
                                                                marginTop:30,
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
                                                                header: {
                                                                  color: "#8197C6",
                                                                  fontSize: 20, //problema
                                                                  //fontWeight:900,
                                                                  marginTop: 30,
                                                                  bottom: 20,
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

                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                top: 20,
                                                                width:250,
                                                                borderRadius:30,
                                                                },


                                                                loginButton: {
                                                                backgroundColor: "#4C73CC",
                                                                },
                                                                loginText: {
                                                                color: 'white',
                                                                },



  save: {
    //backgroundColor: "#FF4DFF",
    width: 70,
    height:30,
    //top: 120,

    backgroundColor:"#3C68BF",
    //marginBottom: 300,
  },
  delete:{
marginRight:10,
    width: 140,
    height:30,
    //top: 120,

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
  typeContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
   warning:{
                                 color: 'red',
                                 fontSize:12,
                                 marginBottom:10,
                                 textAlign:'center'
                               }
});