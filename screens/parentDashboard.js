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
  childrenList: {
    name: '' ,
    busNo: '' ,
    inst: '' ,
    level: '' ,
    district: '' ,
  }
});

console.log (this.state.parentIn.name);
console.log (this.state.parentIn.phoneNo);
let parentPhoneNo=this.state.parentIn.phoneNo;
firebase.database().ref('children/'+parentPhoneNo).on('value', (snap) => {
    if (snap.val()){//check if it's null
    this.setState({
      childrenList: {
        name: snap.val().name ,
        busNo: snap.val().busNo ,
        inst: snap.val().inst ,
        level: snap.val().level ,
        district: snap.val().district ,
      attendance: snap.val().attendance
      }
    });
}


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



 {this.state.parentIn ? (
                <Card containerStyle={styles.cards} title="معلومات ولي الأمر">
                <Text style={styles.paragraph} key={this.state.parentIn.name}>• اسم ولي الأمر: {this.state.parentIn.name}</Text>

                    <Text style={styles.paragraph} key={this.state.parentIn.phoneNo}>رقم الجوال: 0{this.state.parentIn.phoneNo}</Text>
                    <Text style={styles.paragraph} key={this.state.parentIn.email}>• البريد الإلكتروني: {this.state.parentIn.email}</Text>
                    <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
                         onPress={() => {
                           try {this.props.navigation.push('editParent')}
                           catch (e) {console.log(e.message);}
                           }
                         }>
                              <Text style={styles.editText}>تعديل</Text>
                            </TouchableHighlight>


                </Card>

) : null}
   <Text style={styles.perInfo}>──────  التابعين ──────</Text>

   <TouchableHighlight style={[styles.buttonContainer, styles.addButton]}
 onPress={() => this.props.navigation.navigate('addChild')}>
        <Text style={styles.addText}>إضافة تابع</Text>
      </TouchableHighlight>

{this.state.childrenList && this.state.childrenList.name != '' ? (


              <Card containerStyle={styles.cards} title={this.state.childrenList.name}>

                <Text style={styles.paragraph} key={this.state.childrenList.inst}>
               • المدرسة: {this.state.childrenList.inst}
                </Text>
                 <Text style={styles.paragraph}>
                 • المرحلة: {this.state.childrenList.level}
                </Text>
                <Text style={styles.paragraph}>
                 • رقم الحافلة: {this.state.childrenList.busNo}
                </Text>
                 <Text style={styles.paragraph}>
                 • الحي : {this.state.childrenList.district}
                </Text>

<View style={styles.typeContainer}>
                <TouchableHighlight style={[styles.typeButtonContainer, this.state.childrenList.attendance === '1'?styles.pressedButton:styles.typeButton]} onPress ={() => this.editAttendance('1')} >

                <Text style={styles.typeText}>حضور</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.typeButtonContainer, this.state.childrenList.attendance === '0'?styles.pressedButton:styles.typeButton]} onPress ={() => this.editAttendance('0')}>

                <Text style={styles.typeText}>غياب</Text>
                </TouchableHighlight>
</View>

                 <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
                 onPress={() => this.props.navigation.push('editChild',{parentNo:this.state.parentIn.phoneNo})} >
                <Text style={styles.editText}>تعديل</Text>
              </TouchableHighlight>







              </Card>



) : (
  // if there are no children
  <View>
  <Text style={styles.perText}> لا يوجد لديك تابعين</Text>
  </View>
)}



      <View style={styles.childrenContainer}>

      </View>

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
    width: 90,
    height:30,
    bottom: 5,
    backgroundColor:"#3C68BF",
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
