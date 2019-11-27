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
export default class editDriver extends React.Component {
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
       uid:'',
     email: '' ,
     nationalId:'',
     phoneNo:'',
    password: '',
  confirmPassword:'',
  currentColor: '#EAEAEA',
      passError:'none',
     errorMessage: null,
    nameBorders:'#EAEAEA',
    emailBorders:'#EAEAEA',
        idBorders:'#EAEAEA',
        phoneBorders:'#EAEAEA',
  passwordBorder:'#EAEAEA',
  errorMsgVisibilty:'none',
  conPasswordBorder:'#EAEAEA',
  errorMsgVisibilty:'none',
  formErrorMsg:'',
     }


          componentDidMount(){ //to fetch data
const { navigation } = this.props;
            firebase.auth().onAuthStateChanged((user) => {
        if (user) {

       this.state.uid=firebase.auth().currentUser.uid;
       email= firebase.auth().currentUser.email;
       firebase.database().ref('drivers/'+this.state.uid).on('value', snapshot => {

        this.setState({
          name: snapshot.val().name ,
          phoneNo: snapshot.val().phoneNo,
          nationalId:snapshot.val().nationalId,
          email: email
        });

       });



        }
       });

        }


        validateIdentity = (id) => {

      console.log(id);
    console.log(this.state.nationalId);
        try { id = this.state.nationalId.toString().trim();
          console.log(id);
        }
        catch (e){
          console.log(e.message);
          console.log(id);
        }

        if (id.length !== 10) {
            this.setState({idBorders:'red'})
            console.log(id);
              console.log(id.length);
              console.log('length');
            return;
        }
        var type = id.substr(0, 1);
        if (type !== '2' && type !== '1') {
            this.setState({idBorders:'red'})
              console.log('initial');
            return;

        }
      console.log('hello');
        var sum = 0;
        for (var i = 0; i < 10; i++) {
          if (i % 2 === 0) {
            var ZFOdd = String('00' + String(Number(id.substr(i, 1)) * 2)).slice(-2);
            sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
          } else {
            sum += Number(id.substr(i, 1));
          }

        }
        this.setState({idBorders:'#91b804'})
        return;

      }



     validateEmail = (email) => {
     if (this.state.email == ''){
       this.setState({emailBorders:'red'})
     }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(this.state.email)== false)
  {

  this.setState({emailBorders:'red'})
    }
  else {
    this.setState({emailBorders:'#91b804'})
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
    if (this.state.phoneNo == ''){
      this.setState({phoneBorders:'red'})
    }
    const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    if (!numRegex.test('0'+this.state.phoneNo)) {
      console.log('number bad');
      console.log('0'+this.state.phoneNo);


      }
      else {
      this.setState({phoneBorders: '#91b804'})
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


     editProfile = () => {
const { navigation } = this.props;
var user = firebase.auth().currentUser;

       if (this.state.nationalId == '' || this.state.name == ''|| this.state.phoneNo == ''|| this.state.email == '') {
         this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }

       if (this.state.emailBorders == 'red'||this.state.passwordBorder == 'red'||this.state.conPasswordBorder=='red'||this.state.nameBorders=='red'||this.state.idBorders=='red'||this.state.phoneBorders=='red'){
         this.setState({formErrorMsg: 'فضًلا، قم بتصحيح الأخطاء'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }



   if (this.state.password == '') {
     if (this.state.email != ''){
       user.updateEmail(this.state.email);
     }
         if (this.state.driverName != ''){
           firebase.database().ref('drivers/'+this.state.uid).update({name : this.state.name,})
         }

         if (this.state.phoneNo != ''){
           firebase.database().ref('drivers/'+this.state.uid).update({phoneNo : this.state.phoneNo,})
         }
         if (this.state.workerId != ''){
           firebase.database().ref('drivers/'+this.state.uid).update({nationalId : this.state.nationalId,})
         }
  navigation.navigate('driverDashboard')
       }
       else {
         if (this.state.password.length < 6) {
           this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور أكثر من ٦ خانات'})
           this.setState({errorMsgVisibilty: 'flex'})
           return;
         }
          user.updatePassword(this.state.password).then(() => {
          navigation.navigate('login')
         }, (error) => {
           console.log(error);
           // An error happened.
         });
       }


    }//end edit driver

    static navigationOptions = function(props) {
    return {
      title: 'تعديل',
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
      let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]

        return (
<KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>
                <ScrollView style={{flex: 1, marginBottom:20}}>
                  <View style={styles.smallContainer}>

                        <Text style={styles.Main}> • البيانات الشخصية • </Text>

                        <View style={[styles.inputContainer,{borderColor: this.state.nameBorders}]}>

                        <TextInput style={styles.email, styles.input}
                        placeholder="الاسم"
                        keyboardType="TextInput"
                        underlineColorAndroid='transparent'
                        onChangeText={ name => this.setState({ name })}
                        value={this.state.name}
                        />

                        </View>

                        <View style={[styles.inputContainer, {borderColor: this.state.idBorders}]}>

                        <TextInput style={styles.email, styles.input}
                        placeholder="الهوية/الإقامة"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'

                        onChangeText={(nationalId) => {
                          this.setState({nationalId})
                          this.setState({idBorders: '#EAEAEA'})

                        }}
                          onEndEditing={(nationalId) => this.validateIdentity(nationalId)}
                        value={this.state.nationalId}
                        />
                        </View>

                        <View style={[styles.inputContainer, {borderColor: this.state.emailBorders}]}>

                        <TextInput style={styles.email, styles.input}
                        placeholder="البريد الإلكتروني"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => {
                          this.setState({email})
                          this.setState({emailBorders: '#EAEAEA'})
                        }
                      }
                        onEndEditing={(email) => this.validateEmail(email)}
                        value={this.state.email}
                        />
                        </View>

                    <View style={[styles.phoneContainer, {borderColor: this.state.phoneBorders}]}
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


                       <View style={[styles.inputContainer,{borderColor: this.state.passwordBorder}]}>



                     <TextInput style={styles.pass, styles.input}
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

                     <View >

                       <Text style={[styles.warning,styles.fontStyle, {display: this.state.passError}]}> كلمة المرور غير متطابقة </Text>
                     </View>



                     <View>

                        <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                                   </View>


<View style={styles.typeContainer}>


                                   <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                                   onPress={this.editProfile}>

                                   <Text style={styles.saveText}>حفظ</Text>


                                   </TouchableHighlight>




</View>
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
