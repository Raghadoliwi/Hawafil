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

export default class asManager extends React.Component {


constructor(props){
    super(props)
    this.state={typeOf:'',
                name: '',
                email: '',
                password: '',
                confirmPassword:'',
                phoneNo:'',
                nationalId : '',
                instName: '',
                nameBorder:'#EAEAEA',
                emailBorder:'#EAEAEA',
                phoneBorder:'#EAEAEA',
                idBorder:'#EAEAEA',
                passwordBorder:'#EAEAEA',
                conPasswordBorder:'#EAEAEA',
                passError:'none',
                instBorder:'#EAEAEA',
                errorMsgVisibilty:'none',
                formErrorMsg:'',
              }

}

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
        this.setState({idBorder:'red'})
        console.log(id);
          console.log(id.length);
          console.log('length');
        return;
    }
    var type = id.substr(0, 1);
    if (type !== '2' && type !== '1') {
        this.setState({idBorder:'red'})
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
    this.setState({idBorder:'#91b804'})
    return;

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
        console.log(phoneNo);
      const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
      if (!numRegex.test('0'+this.state.phoneNo)) {

  this.setState({phoneBorder: 'red'})

        }
        else {
        this.setState({phoneBorder: '#91b804'})
        }
  }//end validate phone number

    addInstit = () => {
      if (this.state.name == '' || this.state.email == ''||this.state.password == ''||this.state.confirmPassword=='') {
        this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
        this.setState({errorMsgVisibilty: 'flex'})
        return;
      }
      if (this.state.emailBorder == 'red'||this.state.passwordBorder == 'red'||this.state.conPasswordBorder=='red'||this.state.nameBorder=='red'||this.state.idBorder=='red'||this.state.instBorder=='red'){
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
              firebase.database().ref('managers/'+this.userId).set(
                {
                  name: this.state.name,
                  phoneNo: '0'+this.state.phoneNo,
                  nationalId: this.state.nationalId,
                  instName:this.state.instName,
                })
                Alert.alert("تم التسجيل بنجاح")
                this.props.navigation.navigate('login')
            }
          })
        })
    .catch((error) => {
      console.log(error.message)
      this.setState({ errorMessage: error.message })
      //or password is less than 6 characters, the below msg shows for both. which doesnt make sense
      this.setState({formErrorMsg: 'البريد الإلكتروني مسجل مسبقًا، قم بتسجيل الدخول'})
      this.setState({errorMsgVisibilty: 'flex'})
    })


  }//end adding an institution




 async handleDocPicker() {


// Pick a single file
    const DocumentPicker = require('react-native-document-picker').default;
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        console.log (JSON.stringify(err));
        throw err;
      }
    }

 }


 static navigationOptions = function(props) {
 return {
   title: 'التسجيل',
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
        return (


          <ScrollView>
          <KeyboardAwareScrollView
resetScrollToCoords={{ x: 0, y: 0 }}
contentContainerStyle={styles.container}
scrollEnabled={false}>
<View style={styles.smallContainer}>

<Text style={styles.header}>• كـ مؤسسة تعليمية •</Text>

<Text style={styles.perInfo}>── معلومات ممثل المنشأة ──</Text>


<View style={[styles.inputContainer, {borderColor: this.state.nameBorder}]}>
<TextInput style={[styles.fontStyle,styles.inputs]}
placeholder="الاسم"
keyboardType="TextInput"
underlineColorAndroid='transparent'
onChangeText={(name) => {
  this.setState({name})
  this.setState({nameBorder: '#EAEAEA'})
} }
value={this.state.name}
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

<View style={[styles.inputContainer, {borderColor: this.state.idBorder}]}>

<TextInput style={[styles.inputs]}
placeholder="الهوية/الإقامة"
keyboardType="numeric"
underlineColorAndroid='transparent'

onChangeText={(nationalId) => {
  this.setState({nationalId})
  this.setState({idBorder: '#EAEAEA'})

}}
  onEndEditing={(nationalId) => this.validateIdentity(nationalId)}
value={this.state.nationalId}
/>
</View>


<Text style={styles.Sub}>معلومات المنشأة</Text>
<View style={styles.typeContainer}>
<TouchableHighlight style={[styles.typeButtonContainer, this.state.typeOf === 'school'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'school'})} >

<Text style={styles.typeText}>مدرسة</Text>
</TouchableHighlight>

<TouchableHighlight style={[styles.typeButtonContainer, this.state.typeOf === 'university'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'university'})}>

<Text style={styles.typeText}>جامعة</Text>
</TouchableHighlight>
</View>



<View style={styles.inputContainertwo}>

<TextInput style={styles.email}
placeholder="اسم المنشأة"
keyboardType="TextInput"
underlineColorAndroid='transparent'
onChangeText={instName => this.setState({ instName })}
value={this.state.instName}
/>

</View>

<TouchableHighlight style={[styles.attachButtonContainer, styles.attachButton]}
onPress={this.handleDocPicker}>

<Text style={styles.signupText}>إرفاق الإثبات</Text>

</TouchableHighlight>
<Text style={styles.SubSub}> *يسمح بملفات (PNG , JPG) </Text>

<View >

  <Text style={[styles.fontStyle,styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
</View>

<TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addInstit}>

<Text style={styles.signupText}>تسجيل جديد</Text>

</TouchableHighlight>


</View>

                </KeyboardAwareScrollView>
</ScrollView>
                );
    }
}

const styles = StyleSheet.create({

  Sub: {
    color: '#9F9F9F',
    fontSize: 12,
    marginBottom: 10,

  },
  SubSub: {
    color: '#9F9F9F',
    fontSize: 10,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
  },
  smallContainer: {
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
      width: 0
    }
  },
  header: {
    color: "#8197C6",
    fontSize: 20, //problema
    //fontWeight:900,
    marginTop: 30,
    bottom: 20,
  },
  warning:{
    color: 'red',
    fontSize:12,
    marginBottom:10,
    textAlign:'center'
  },

  perInfo: {
    color: "#9F9F9F",
    fontSize: 12,
    //fontWeight:100,
    bottom: 30,
    marginTop: 20,

  },

  typeContainer: {
    justifyContent: 'center',

    backgroundColor: 'white',
    borderRadius: 10,

    flex: 1,
    flexDirection: 'row',
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
  phoneContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    height:45,
    flexDirection: 'row',
    //justifyContent:'flex-end',
    justifyContent: 'space-around',
    borderColor: '#EAEAEA'
  },
  phoneInput: {

    height: 40,
    width: 200,

    borderColor: '#EAEAEA',

  },

  keyNo: {

    color: 'grey',

  },

  inputContainertwo: {
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    width: 250,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
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

  pass: {
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: 'right',
  },
  email: {
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: 'right',

  },

  buttonContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '40%',
    borderRadius: 30,

  },
  typeButtonContainer: {
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: '38%',
    borderRadius: 30,
  },

  attachButtonContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: '30%',
    borderRadius: 30,


  },


  signupButton: {
    backgroundColor: "#4C73CC",
  },

  typeButton: {
    backgroundColor: "#DFE8FB",
    marginLeft: 10,
    marginRight: 10,

  },

  pressedButton: {
    backgroundColor: "#7597DB",
    marginLeft: 10,
    marginRight: 10,

  },
  attachButton: {
    backgroundColor: "#8BC8E4",


  },
  signupText: {
    color: 'white',
  },

  typeText: {
    color: 'white',
  },


});
