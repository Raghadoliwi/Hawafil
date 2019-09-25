import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert} from 'react-native';
  import firebase from 'firebase'

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class App extends React.Component {
  UNSAFE_componentWillMount(){
    var config = {
      apiKey: "AIzaSyAtpvd_8Vhp9mLX8zOKmQrrQflrzURbEgk",
      authDomain: "hawafil-6face.firebaseapp.com",
      databaseURL: "https://hawafil-6face.firebaseio.com",
      projectId: "hawafil-6face",
      storageBucket: "hawafil-6face.appspot.com",
      messagingSenderId: "165149934110"
    };
      //firebase.initializeApp(config);
    
  state = { 
            email: '' ,
            password: '',
            errorMessage: null
          }

    handleLogin = () => {
      const {email, password} = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage:
        error.message}))
      console.log('handleLogin')
    }
  }
   render() {
    return (
      <View style={styles.container}>

      <View style={styles.smallContainer}>
      
        <View style={styles.inputContainer}>
          
          <TextInput style={styles.email}
              placeholder="اسم المستخدم"
              keyboardType="ascii-capable"
              underlineColorAndroid='transparent'
              onChangeText={email => this.setState({ email })}
              //line below is added new by lama:
              //value={this.state.email}                
              />
        </View>
        
        <View style={styles.inputContainer}>
         
          <TextInput style={styles.pass}
              placeholder="كلمة المرور"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              //lines below are added by lama:
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              //value={this.state.password}                
              />
        </View>
          
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>

        <Text style={styles.loginText}>تسجيل الدخول</Text>


        </TouchableHighlight>


        <TouchableHighlight style={styles.forgetPass} onPress={() => this.onClickListener('restore_password')}>
            <Text style={styles.forgetPassText}> نسيت كلمة المرور؟</Text>
        </TouchableHighlight>
 <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  }}
/>
        <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.onClickListener('register')}>
            <Text style={styles.registerText}>التسجيل كمستخدم جديد</Text>
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
  smallContainer:{
    marginTop:100,
     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:10,
      width:300,
      height:400
  },
  inputContainer: {
      borderColor: '#EAEAEA',
      backgroundColor: '#FFFFFF',
      borderRadius:45,
      borderWidth: 2,  
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      //alignItems:'center'
  },
  email:{
      height:45,
      
      marginLeft:145,
      borderColor: '#EAEAEA', 
      flex:1,
      //fontFamily: 'Tajawal'
      
  },
  pass:{
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
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  forgetPass: {
    height:45,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    //alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  forgetPassText: {
color:'#8BC8E4',
fontSize:12,
//marginLeft:20
  },
  loginButton: {
    backgroundColor: "#4C73CC",
  },
  loginText: {
    color: 'white',
    //fontFamily:'Tajawal',
    //fontStyle:'' 
  },
registerButton: {
    backgroundColor: "white",
    borderColor:'#EDC51B',
    borderRadius:25,
    borderWidth :1
  },
  registerText:{
     color: '#EDC51B',
    //fontFamily:'Tajawal',
    //fontStyle:''  
  }
});
