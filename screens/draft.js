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
import editParent from './editParent';
import editChild from './editChild';
import addChild from './addChild';


  export default class driverDashboard extends React.Component {
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


      }
    }
    editAttendance = (attendance) => {
      this.state.childrenList.attendance=attendance;
      console.log(this.state.childrenList.attendance);
      var phoneNo = this.state.parentIn.phoneNo;

      if (phoneNo != null){
       firebase.database().ref('children/'+phoneNo).update({
          attendance:attendance
        })
        Alert.alert('تم تحديث حالة الحضور');
      }
   }//end edit child.


         componentDidMount(){ //to fetch data

     firebase.auth().onAuthStateChanged((user) => {
       if (user) {

         var userId = firebase.auth().currentUser.uid;
     //insType = firebase.auth().currentUser.instName;

     firebase.database().ref('drivers/'+userId).on('value', snapshot => {

       this.setState({

         driverIn: {
           name: snapshot.val().name,
           inst: snapshot.val().inst,
         },

       });

     });

     firebase.database().ref('managers/').on('value', snapshot => {
   // retrieve all managers
   if (this.state.driverIn.inst==snapshot.val().instName)

   item.push({
       instName: snapshot.val().instName ,
       instType: snapshot.val().instType ,

   })

       this.setState({

         managerIn:{
         insName : snapshot.val().insName,
         insType: snapshot.val().insType ,
         }
       });

     });

     firebase.database().ref('buses/').on('value', (snap) => {
         let allInsttBus = [];
         snap.forEach((child) => {
             items.push({
                 driverName: child.val().driverName ,
                 busNo: child.val().busNo ,
                 neighborhood: child.val().neighborhood ,
                 carPlate: child.val().carPlate ,
                 inst:child.val().inst,
             })
         })//end snap for each

     })
     console.log (this.state.driverIn.insName);
     console.log (this.state.managerIn.insName);


     let insType =this.state.driverIn.insName;
     let insType2 =this.state.managerIn.insName;





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

{this.state.item && this.state.item.instType == 'university' ? (): }



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
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#3C68BF',
    borderRadius: 550,
  },
  cards:{
    borderRadius: 25, width: 250, marginTop: 20, borderWidth: 0.5, shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },

  }
  ,

  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:250,
    borderRadius:30,

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
  viewStudentsButtonContainer: {
    height:45,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  	marginBottom:10,
  	width:250,
  	borderRadius:30
  },
  viewStudentsText:{
     color: '#EDC51B',

  },

viewStudentsButton:{
  backgroundColor: "white",
  borderColor:'#EDC51B',
  borderRadius:25,
  borderWidth :1
},

  addText: {
    color: 'white',
    fontSize: 18 ,
		fontWeight:'bold'
  }
});
