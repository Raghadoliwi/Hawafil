import React from 'react';
//import react in our code.

import { Text, View, StyleSheet,StatusBar, ScrollView, SafeAreaView,TouchableHighlight, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';



  export default class managerDashboard extends React.Component {
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
    constructor(props){
      super(props)
      this.state = {
        items : []
      }
    }

    componentDidMount(){ //to fetch data

      firebase.auth().onAuthStateChanged((user) => {
  if (user) {

var userId = firebase.auth().currentUser.uid;
firebase.database().ref('managers/'+userId).on('value', snapshot => {

  this.setState({
    managerIn: {
      name: snapshot.val().name,
      phoneNo: snapshot.val().phoneNo,
        instType: snapshot.val().instType,
          instName: snapshot.val().instName,
            nationalId: snapshot.val().nationalId

          }
        });

      });
      }
      });
      }








  static navigationOptions = function(props) {
  return {
    drawerLabel:'الرئيسية',
    title: 'الرئيسية',
    headerLeft: <View style={{paddingLeft:16}}>
        <Icon
            name="three-bars"
            size={25}
            color='white'
            onPress={() => props.navigation.openDrawer()} />
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
      <StatusBar
             barStyle = "light-content"
             hidden = {false}
             backgroundColor = "#00BCD4"
             translucent = {true}
             networkActivityIndicatorVisible = {true}
             />
      <ScrollView style={{flex: 1, marginBottom:20}}>



 {this.state.managerIn ? (
                <Card containerStyle={styles.cards} title="المعلومات الشخصية">
                <Text style={styles.paragraph} key={this.state.managerIn.name}>• اسم ممثل المنشأة: </Text>
                <Text style={styles.info}>{this.state.managerIn.name}</Text>
                <Text style={styles.paragraph} key={this.state.managerIn.nationalId}>•رقم الهوية: </Text>
                <Text style={styles.info}> {this.state.managerIn.nationalId}</Text>
                    <Text style={styles.paragraph} key={this.state.managerIn.phoneNo}>رقم الجوال: </Text>
                    <Text style={styles.info}> {this.state.managerIn.phoneNo}</Text>
                    <Text style={styles.paragraph} key={this.state.managerIn.instName}>• اسم المنشأة: </Text>
                    <Text style={styles.info}> {this.state.managerIn.instName}</Text>
                    <Text style={styles.paragraph} key={this.state.managerIn.instType}>•نوع المنشأة: </Text>
                    <Text style={styles.info}> {this.state.managerIn.instType}</Text>




                </Card>

) : null}


      </ScrollView>
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



    paragraph: {

      fontSize: 14,
      textAlign: 'right',
      color: '#3C68BF',
      borderRadius: 550,
      padding:10,
    },
    info: {

      fontSize: 14,
      fontWeight: '500',
      textAlign: 'right',
      color: '#c8c8c8',

    },
    cards:{
      borderRadius: 25, width: 250, marginTop: 20, borderWidth: 0.5, shadowOpacity: 0.04,
              shadowRadius: 5,
              shadowColor: 'black',
              shadowOffset: { height: 0, width: 0 },
              top:90,

    }
    ,
    buttonContainer: {
      height:45,
      top:25,
      flexDirection: 'row-reverse',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    typeContainer: {
    //  justifyContent: 'right',

      flex: 1,
      marginTop:10,
      flexDirection: 'row-reverse',
    },
    addButton: {
  		flex: 1,
  		alignSelf:'center',
        justifyContent: 'center',
      alignItems: 'center',
      width: 180,
      height:40,
      bottom: 5,
      backgroundColor:"#EDC51B",
      //marginBottom: 300,
    },
    editButton:{
   	  flex: 1,
  		alignSelf:'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      height:30,
      bottom: 5,
      backgroundColor:"#3C68BF",
      //marginBottom: 300,
    },
    editText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    addText: {
      color: 'white',
      fontSize: 18 ,
      fontWeight: '500',
    }
  });
