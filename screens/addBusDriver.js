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
     workerId: '',
     driverName: '',
     phoneNo: '',
     inst:'',
     busNo: '',
     errorMessage: null
     }
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
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={workerId => this.setState({ workerId })}
                value={this.state.workerId}
                />
                </View>


                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="اسم القائد"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={ driverName => this.setState({ driverName })}
                value={this.state.driverName}
                />

                </View>
                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="رقم الهاتف"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={phoneNo => this.setState({ phoneNo })}
                //line below is added new by lama:
                value={this.state.phoneNo}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="البريد الإلكتروني"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
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
                value={this.state.password}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="اسم المنشأة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={inst => this.setState({ inst })}
                value={this.state.inst}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="رقم الحافلة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={busNo => this.setState({ busNo })}
                //line below is added new by lama:
                value={this.state.busNo}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.email}
                placeholder="رقم اللوحة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={busPlate => this.setState({ busPlate })}
                //line below is added new by lama:
                value={this.state.busPlate}
                />
                </View>



                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                onPress={this.handleInserting}>

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
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:40,
                                   marginBottom:15,
                                   paddingHorizontal:10,


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
