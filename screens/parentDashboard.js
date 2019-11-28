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
import { Linking } from 'expo';
import Geocoder from 'react-native-geocoder';

  export default class parentDashboard extends React.Component {
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
    editAttendance = (attendance,index,key) => {
      this.state.childrenList[index].attendance=attendance;
      this.forceUpdate()

      console.log(this.state.childrenList);
console.log(this.state.childrenList.length);
      if (key != null){
        firebase.database().ref('children/'+key).update({
           attendance:attendance
         })
        Alert.alert('تم تحديث حالة الحضور');
      }

      console.log(this.state.childrenList);
   }//end edit child.

   getCurrentPosition(childKey) {



        navigator.geolocation.getCurrentPosition(
          (position) => {
              var latitude= position.coords.latitude;
              var longitude= position.coords.longitude;
              var confirmMsg='تغيير الموقع لـ ('+latitude+','+longitude+')؟'

Alert.alert(
'',
confirmMsg,
[{text: 'نعم',onPress: () => {    firebase.database().ref('children/'+childKey).update({
     lat: latitude,
     long: longitude,
   })//end update
      Alert.alert('تم تحديث موقعك بنجاح');
 }
},
{
text: 'لا',
onPress: () => console.log('Cancel Pressed'),
style: 'cancel',
},

],
{cancelable: false},
);

          })


        }//end method

    componentDidMount(){ //to fetch data

      firebase.auth().onAuthStateChanged((user) => {
  if (user) {

var userId = firebase.auth().currentUser.uid;
email= firebase.auth().currentUser.email;
firebase.database().ref('parents/'+userId).on('value', snapshot => {


  this.setState({
    parentIn: {
      name: snapshot.val().name,
      email:email,
      phoneNo: snapshot.val().phoneNo
    }
  });

});

this.setState({
  childrenList: []
});

//console.log (this.state.parentIn.name);
//console.log (this.state.parentIn.phoneNo);
let parentPhoneNo=this.state.parentIn.phoneNo;
firebase.database().ref('children/').on('value', (snap) => {
  let childrenList = [];
  snap.forEach((child) => {
    if (child.key.includes(parentPhoneNo)){
      childrenList.push({
        childKey:child.key,
        name: child.val().name ,
        busNo: child.val().busNo ,
        long:child.val().long,
        lat:child.val().lat,
        inst: child.val().inst ,
        level: child.val().level ,
        district: child.val().district ,
      attendance: child.val().attendance
      });



  }
  this.setState({
    childrenList: childrenList
  });
  })//end snap for each



})//end on



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

      <TouchableHighlight style={[styles.buttonContainer, styles.addButton]}
    onPress={() => this.props.navigation.navigate('addChild')}>
           <Text style={styles.addText}>إضافة تابع</Text>
         </TouchableHighlight>

   <Text style={styles.perInfo}>──────  التابعين ──────</Text>




      {this.state.childrenList ?
         (
    this.state.childrenList.map((u, i ) => {
return (  <Card containerStyle={styles.cards} title={this.state.childrenList[i].name}>

  <View style={styles.infoContainer}>
      <Text style={styles.paragraph}>المدرسة: </Text>
         <Text style={styles.info}>{this.state.childrenList[i].inst}</Text>
      </View>


      <View style={styles.infoContainer}>
          <Text style={styles.paragraph}>المرحلة: </Text>
             <Text style={styles.info}>{this.state.childrenList[i].level}</Text>
          </View>

          <View style={styles.infoContainer}>
              <Text style={styles.paragraph}>رقم الحافلة: </Text>
                 <Text style={styles.info}>{this.state.childrenList[i].busNo}</Text>
              </View>

              <View style={styles.infoContainer}>
                  <Text style={styles.paragraph}>الحي: </Text>
                     <Text style={styles.info}>{this.state.childrenList[i].district}</Text>
                  </View>









  <View style={styles.typeContainer}>
     <TouchableHighlight style={[styles.typeButtonContainer, this.state.childrenList[i].attendance === '1'?styles.pressedButton:styles.typeButton]} onPress ={() => this.editAttendance('1',i,this.state.childrenList[i].childKey)} >

     <Text style={styles.typeText}>حضور</Text>
     </TouchableHighlight>

     <TouchableHighlight style={[styles.typeButtonContainer, this.state.childrenList[i].attendance === '0'?styles.pressedButton:styles.typeButton]} onPress ={() => this.editAttendance('0',i,this.state.childrenList[i].childKey)}>

     <Text style={styles.typeText}>غياب</Text>
     </TouchableHighlight>
  </View>
<View style={{flexDirection:'row-reverse'}}>
      <TouchableHighlight style={[styles.buttonContainer, styles.editButton,{backgroundColor:'#3C68BF'}]}
      onPress={() => this.props.navigation.push('editChild',{childKey:this.state.childrenList[i].childKey})} >
     <Text style={styles.editText}>تعديل</Text>
   </TouchableHighlight>
   <TouchableHighlight style={[styles.buttonContainer, styles.editButton,{backgroundColor:'#F4D65B'}]}
   onPress ={() => this.getCurrentPosition(this.state.childrenList[i].childKey)} >
   <Text style={styles.editText}>تحديث الموقع</Text>
   </TouchableHighlight>
</View>




    </Card>)


  }) )
    :null}
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

  },
  info: {

    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    color: '#b5b5b5',

  },
  cards:{
    borderRadius: 25, width: 250, marginTop: 20, borderWidth: 0.5, shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },

  }
  ,
  pressedButton: {
    backgroundColor: "#7597DB",

  },
  perInfo:{
  color: "#9F9F9F",
  fontSize: 12 ,
  //fontWeight:100,
  bottom: 10,
  marginTop: 40,
  alignSelf: 'center',
  },

  perText:{
    marginTop: 20,
    alignSelf:'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C68BF',
    /*
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    borderRadius: 550,
    */
  },

  typeText: {
    color: 'white',
  },
  typeButton: {
    backgroundColor: "#DFE8FB",

  },
    typeContainer: {
      justifyContent: 'center',
      width:'100%',
      backgroundColor: 'white',
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row-reverse',
    },

    infoContainer: {
    //  justifyContent: 'right',

      flex: 1,
      marginTop:5,
      flexDirection: 'row-reverse',
    },

    typeButtonContainer: {
      height: 40,
      width:55,
justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      borderRadius: 30,
      marginLeft:5,
      marginRight:5,
    },
  buttonContainer: {
    height:45,
    top:20,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
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
  addText: {
    color: 'white',
    fontSize: 18 ,
		fontWeight:'bold'
  },

  editButton:{
 	  flex: 1,
		alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height:30,
    bottom: 5,
    marginRight:5,
    marginLeft:5
    //marginBottom: 300,
  },
  editText: {
    color: 'white',
    fontSize: 12,
		fontWeight:'bold'
  }
});



/*
const parentStack = createStackNavigator(
  {
  parentDashboard: { screen: parentDashboard },
editParent: { screen: editParent },
});
const MyDrawerNavigator = createDrawerNavigator({
    'الرئيسية': {
      screen: parentStack,
    },
    'تعديل البيانات': {
      screen: editParent,
    },
  },
  {
    initialRouteParams: 'الدخول',
    defaultNavigationOptions: {
      headerStyle: {
      backgroundColor:  '#4C73CC',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
  );
const MyApp = createAppContainer(MyDrawerNavigator);
export default class App extends React.Component {
   render() {
     return <MyApp />;
   }
 }*/
