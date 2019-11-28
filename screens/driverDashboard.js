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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


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
        morning:0,
            noon:0,
            afternoon:0,
            attendees:0,
            mornStudents:[],
            noonStudents:[],
            afternoonStudents:[],


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

       this.setState({instName: snapshot.val().inst});
       this.setState({busNo: snapshot.val().busNo});

     });

     firebase.database().ref('managers/').on('value', (snap)=> {
   // retrieve all managers
   snap.forEach((child) => {
     try {
          if (this.state.instName===child.val().instName) {
          this.setState({instType: child.val().instType},
          // retrieving number of students
        function() {
            let mornStudents = [];
            let noonStudents = [];
            let afternoonStudents = [];
              let attendees = [];

          if (this.state.instType && this.state.instType==='university' ){

            firebase.database().ref('students/').on('value', (snap) => {

              snap.forEach((child) => {
                  console.log(child.val().university+child.val().busNo );
                if(child.val().university===this.state.instName && child.val().busNo===this.state.busNo) {

                  if ( child.val().departure) {
                      mornStudents.push({
                        studentKey:child.key,
                        name: child.val().name ,
                        neighborhood: child.val().neighborhood ,
                        phoneNo: child.val().phoneNo ,
                      });
                     this.setState({morning:mornStudents.length});
                   }
                   if (child.val().arrival ==='13:00') {
                     noonStudents.push({
                       studentKey:child.key,
                       name: child.val().name ,
                       neighborhood: child.val().neighborhood ,
                       phoneNo: child.val().phoneNo ,
                     });
                      this.setState({noon:noonStudents.length});
                    }
                    else if (child.val().arrival ==='15:00') {
                      afternoonStudents.push({
                        studentKey:child.key,
                        name: child.val().name ,
                        neighborhood: child.val().neighborhood ,
                        phoneNo: child.val().phoneNo ,
                      });
                       this.setState({afternoon:afternoonStudents.length});
                     }

                }

              })//end snap for each

              this.setState({
                mornStudents: mornStudents
              });
              this.setState({
                noonStudents: noonStudents
              });
              this.setState({
                afternoonStudents: afternoonStudents
              });

            });
          }
          else {
            firebase.database().ref('children/').on('value', (snap) => {

              snap.forEach((child) => {
                  console.log(child.val().inst+child.val().busNo );
                if(child.val().inst===this.state.instName && child.val().busNo===this.state.busNo) {

                  if ( child.val().attendance==1) {
                      attendees.push({
                        studentKey:child.key,
                        name: child.val().name ,
                        district: child.val().district ,
                        phoneNo: child.key.substring(0, 9),
                      });
                     this.setState({attendeesNumber:attendees.length});

                   }


                }

              })//end snap for each
              this.setState({
                attendees: attendees
              });
              console.log(this.state);

            });
          }






        }





        );

        }
}

          catch(e){console.log(e.message);}
   })//end snap for each


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

      {this.state.instType==='university' ?
(
   [
     <View style={{flexDirection: 'row',marginTop:20}}>
 <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
 <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.titles]}>رحلة الذهاب</Text>
 <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
</View>,
           <Card containerStyle={styles.cards}>

           <Text style={styles.title}>6:00 صباحًا</Text>
           <View style={{flexDirection:'row-reverse',justifyContent:'space-between',marginTop:10,alignItems:'center',marginBottom:10}}>
           <Text style={styles.paragraph}>{this.state.morning} ركاب</Text>
              <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{flexDirection:'row-reverse'}]}
           onPress={() => this.props.navigation.navigate('studentsList',{rideTime:'morning',intType:this.state.instType,mornStudents:this.state.mornStudents})}>
           <View style={{flexDirection:'row-reverse'}}>
           <Text style={[styles.fontStyle,{writingDirection:'ltr'}]}>التفاصيل</Text>
<FontAwesomeIcon icon={ faChevronLeft } size={ 20 } style={{color:'white'}}/>
</View>
           </TouchableHighlight>
           </View>
             </Card>,
             <View style={{flexDirection: 'row',marginTop:20}}>
          <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
          <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.titles]}>رحلات العودة</Text>
          <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
         </View>,

         <Card containerStyle={styles.cards}>

         <Text style={styles.title}>1:00 ظهرًا</Text>
         <View style={{flexDirection:'row-reverse',justifyContent:'space-between',marginTop:10,alignItems:'center',marginBottom:10}}>
         <Text style={styles.paragraph}>{this.state.noon} ركاب</Text>
            <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{flexDirection:'row-reverse'}]}
         onPress={() => this.props.navigation.navigate('studentsList',{rideTime:'noon',intType:this.state.instType,noonStudents:this.state.noonStudents})}>
         <View style={{flexDirection:'row-reverse'}}>
         <Text style={[styles.fontStyle,{writingDirection:'ltr'}]}>التفاصيل</Text>
<FontAwesomeIcon icon={ faChevronLeft } size={ 20 } style={{color:'white'}}/>
</View>
         </TouchableHighlight>
         </View>
           </Card>,

           <Card containerStyle={styles.cards}>

           <Text style={styles.title}>3:00 عصرًا</Text>
           <View style={{flexDirection:'row-reverse',justifyContent:'space-between',marginTop:10,alignItems:'center',marginBottom:10}}>
           <Text style={styles.paragraph}>{this.state.afternoon} ركاب</Text>
              <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{flexDirection:'row-reverse'}]}
           onPress={() => this.props.navigation.push('studentsList',{rideTime:'afternoon',intType:this.state.instType,afternoonStudents:this.state.afternoonStudents})}>
           <View style={{flexDirection:'row-reverse'}}>
           <Text style={[styles.fontStyle,{writingDirection:'ltr'}]}>التفاصيل</Text>
<FontAwesomeIcon icon={ faChevronLeft } size={ 20 } style={{color:'white'}}/>
</View>
           </TouchableHighlight>
           </View>
             </Card>,




             ]
 )
    :  (
      [
              <Card containerStyle={styles.cards}>

              <Text style={styles.title}>رحلة اليوم</Text>
              <View style={{flexDirection:'row-reverse',justifyContent:'space-between',marginTop:10,alignItems:'center',marginBottom:10}}>
              <Text style={styles.paragraph}>{this.state.attendeesNumber} ركاب</Text>
                 <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{flexDirection:'row-reverse'}]}
              onPress={() => this.props.navigation.navigate('studentsList',{rideTime:'attendees',intType:this.state.instType,attendees:this.state.attendees})}>
              <View style={{flexDirection:'row-reverse'}}>
              <Text style={[styles.fontStyle,{writingDirection:'ltr'}]}>التفاصيل</Text>
   <FontAwesomeIcon icon={ faChevronLeft } size={ 20 } style={{color:'white'}}/>
   </View>
              </TouchableHighlight>
              </View>
                </Card>
                ]
    )}





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
title: {
  marginTop: 10,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'right',
    color: '#3C68BF',
},


  paragraph: {

    fontSize: 14,
    textAlign: 'right',
    color: '#c8c8c8',

  },


  cards:{
    borderRadius: 25, width: 325, marginTop: 20, borderWidth: 0.5, shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },


  },
  typeButtonContainer: {
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: '38%',
    borderRadius: 30,
  },
  trackingButton: {
    backgroundColor: "#EDC51B",
    marginLeft: 10,
    marginRight: 10,
  },
  attachButton: {
    backgroundColor: "#8BC8E4",


  },
  trackingContainer: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row-reverse',
  },
  buttonContainer: {
    height:45,
    flex: 1,
  alignSelf:'center',
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
    alignSelf:'flex-start' ,
  	justifyContent: 'center',
    flexDirection:'row-reverse',
  	alignItems: 'center',

  	width:100,

  	borderRadius:30,
      backgroundColor: "#EDC51B",
      color:'white'

 },

 smallContainer: {
   marginTop: 15,
   marginBottom: 15,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'white',
   borderRadius: 10,
   width: 300,
   paddingVertical: 17,
   shadowOpacity: 0.04,
   shadowRadius: 5,
   shadowColor: 'black',
   shadowOffset: {
     height: 0,
     width: 0
   }
 },

  viewStudentsText:{
     color: 'white',

  },
  typeText: {
    color: 'white',
  },

  addText: {
    color: 'white',
    fontSize: 18 ,
		fontWeight:'bold'
  },
  fontStyle:{
    color:'white'
  },
  titles:{
    color:'grey',
    fontSize:16
  }
});
