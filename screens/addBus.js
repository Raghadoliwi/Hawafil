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

const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class addBusDriver extends React.Component {
    /*UNSAFE_componentWillMount(){
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
     }*/

     static navigationOptions = function(props) {
     return {
       title: 'إضافة قائد مركبة',
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
          <View style={{padding: 10, flex: 1}, styles.container} >
          <ScrollView style={{flex: 1, marginBottom:20}}>

                <Text style={styles.Main}> إضافة قائد مركبة</Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="الرقم الوظيفي"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                //line below is added new by lama:
                //value={this.state.email}
                />
                </View>


                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="اسم القائد"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                //line below is added new by lama:
                //value={this.state.email}
                />

                </View>
                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="رقم الهاتف"
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

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="اسم المنشأة"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                //line below is added new by lama:
                //value={this.state.email}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="رقم الحافلة"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                //line below is added new by lama:
                //value={this.state.email}
                />
                </View>




                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>

                <Text style={styles.loginText}>إضافة</Text>


                </TouchableHighlight>





                </ScrollView>
                </View>

                );
    }
}

const styles = StyleSheet.create({
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
                                 borderRadius:45,
                                 borderWidth: 2,
                                 width:250,
                                 height:45,
                                 marginBottom:20,
                                 flexDirection: 'row',

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
