import React , {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
	StatusBar,
  Div,
  TouchableHighlight,
	ScrollView,
	SafeAreaView,
  Image,
  Alert} from 'react-native';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';


export default class asManager extends React.Component {


constructor(props){
    super(props)
    this.state={typeOf:'',
                name: '',
                email: '',
                password: '',
                phoneNo:'',
                nationalId : '',
                instName: '',
                nameBorders:'#EAEAEA',
                emailBorders:'#EAEAEA',
                numberBorders:'',
                idBorders:'',
                passBorders:'#EAEAEA',
                instBorders:'',


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


    validateSAID = (id) => {
    id = id.trim();
    if (isNaN(parseInt(id))) {
      return -1;
    }
    if (id.length !== 10) {
      return -1;
    }
    var type = id.substr(0, 1);
    if (type !== '2' && type !== '1') {
      return -1;
    }
    var sum = 0;
    for (var i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        var ZFOdd = String('00' + String(Number(id.substr(i, 1)) * 2)).slice(-2);
        sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
      } else {
        sum += Number(id.substr(i, 1));
      }

    }
    return (sum % 10 !== 0) ? -1 : type;
  }


    addInstit = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( (data) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
              this.userId = user.uid
              firebase.database().ref('managers/'+this.userId).set(
                {
                  name: this.state.name,
                  phoneNo: this.state.phoneNo,
                  nationalId: this.state.nationalId,
                  instName:this.state.instName,
                })
            }

          });
    }).then(() => this.props.navigation.navigate('manageBuses'))
    //raghad plz edit the above line to the page you wanna navigate to after insertion

    .catch(error => this.setState(error => console.log(error.message)))
  }//end adding a parent




 async handleDocPicker() {

// Pick a single file
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


          <ScrollView>
          <KeyboardAwareScrollView
resetScrollToCoords={{ x: 0, y: 0 }}
contentContainerStyle={styles.container}
scrollEnabled={false}>

                <View style={styles.smallContainer}>

                <Text style={styles.Main}>• كـ مؤسسة تعليمية •</Text>

                <Text style={styles.Sub}>── معلومات ممثل المنشأة ──</Text>


                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="الاسم"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                />

                </View>


                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                />

                </View>

                <View style={styles.phoneContainer}>

                <TextInput style={styles.keyNo}
                value="+966"
                editable={false}
                />

                <TextInput style={styles.phoneInput}
                placeholder="رقم الجوال"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={(phoneNo) => this.setState({phoneNo})}
                value={this.state.phoneNo}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="الهوية/الإقامة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={nationalId => this.setState({ nationalId })}
                value={this.state.nationalId}
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
                <Text style={styles.SubSub}>*يسمح بملفات (PNG , PDF , JPG)</Text>

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
                                 Main:{
                                 color:'#4C73CC',
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:20,
                                 marginTop:10,
                                fontSize:20,
                                 },
                                Sub:{
                                 color:'#9F9F9F',
                                 fontSize:12,
                                 marginBottom:10,

                                },
                                SubSub:{
                                 color:'#9F9F9F',
                                 fontSize:10,
                                 marginBottom:30,
                                },
                                container: {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#F7FAFF',
                                },
                                 smallContainer:{
                                 marginTop:30,
                                  marginBottom:30,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:700,
                                 overflowY: 'scroll',
                                 paddingVertical:35,
                                 shadowOpacity: 0.04,
                                         shadowRadius: 5,
                                         shadowColor: 'black',
                                         shadowOffset: { height: 0, width: 0 }
                                 },

                                 typeContainer:{
                                 justifyContent: 'center',

                                 backgroundColor: 'white',
                                 borderRadius:10,

                                 flex: 1,
                                 flexDirection: 'row',
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
                                 phoneContainer:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:25,
                                 borderWidth: 1,
                                 width:250,
                                 marginBottom:20,
                                 flexDirection: 'row',
                                 //justifyContent:'flex-end',
                                 justifyContent:'space-around',
                                 borderColor: '#EAEAEA'
                                 },
                                 phoneInput:{

                                 height:40,
                                 width:200,

                                 borderColor: '#EAEAEA',

                                 },

                                 keyNo:{

                                 color:'grey',

                                 },

                                inputContainertwo: {
                                  borderColor: '#EAEAEA',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius:25,
                                  borderWidth: 1,
                                  width:250,
                                  height:40,
                                  marginBottom:15,
                                  paddingHorizontal:10,
                                 },

                                 pass:{
                                   borderBottomColor: '#FFFFFF',
                                    flex:1,
                                    textAlign:'right',
                                 },
                                 email:{
                                  borderBottomColor: '#FFFFFF',
                                   flex:1,
                                   textAlign:'right',

                                 },

                                 buttonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'40%',
                                 borderRadius:30,

                                 },
                                 typeButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:5,
                                 width:'38%',
                                 borderRadius:30,
                                 },

                                 attachButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',

                                 width:'30%',
                                 borderRadius:30,


                                 },


                                 signupButton: {
                                 backgroundColor: "#4C73CC",
                                 },

                                typeButton: {
                                 backgroundColor: "#DFE8FB",
                                    marginLeft:10,
                                    marginRight:10,

                                 },

                                pressedButton: {
                                 backgroundColor: "#7597DB",
                                    marginLeft:10,
                                    marginRight:10,

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
