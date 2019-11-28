
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
import viewMap from '../screens/viewMap';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';

export default class studentDashboard extends React.Component {


constructor(props){
    super(props)
    this.state={
      userId: null,
      arrival: 'none',
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
  }//end UNSAFE_componentWillMount

  componentDidMount(){ //to fetch data
firebase.auth().onAuthStateChanged((user) => {
if (user) {
var userId = firebase.auth().currentUser.uid;
email= firebase.auth().currentUser.email;
firebase.database().ref('students/'+userId).on('value', snapshot => {
this.setState({
    arrival: snapshot.val().arrival,
    departure: snapshot.val().departure,
    userId: userId
});
});
}
})


}//end componentDidMount

onDepartureToggle = () => {
  var temp = !this.state.departure

this.setState((state, props) => ({
  departure: temp,
}));
 //update in  db
   firebase.database().ref('students/'+this.state.userId).update({
    departure: temp
    })
 //Alert
 Alert.alert('تم تحديث حالة الحضور');


}//end on onDepartureToggle

onArrivalToggle = (arr) => {
   if (arr==='13:00' && this.state.arrival === '13:00'){
     var temp = 'none'

   this.setState((state, props) => ({
     arrival: 'none',
   }));
   //update in  db
     firebase.database().ref('students/'+this.state.userId).update({
      arrival: 'none'
      })
   Alert.alert('تم تحديث حالة الحضور');

 }//end if

 else if (arr==='15:00' && this.state.arrival === '15:00'){
   var temp = 'none'

 this.setState((state, props) => ({
   arrival: 'none',
 }));
 //update in  db
   firebase.database().ref('students/'+this.state.userId).update({
    arrival: 'none',
    })
 Alert.alert('تم تحديث حالة الحضور');

 }
   else{
     this.setState((state, props) => ({
       arrival: arr,
     }));
      //update in  db
        firebase.database().ref('students/'+this.state.userId).update({
         arrival: arr
         })
         Alert.alert('تم تحديث حالة الحضور');
   }

    //Alert
}//end onarrivaltoggle

getCurrentPosition() {
     navigator.geolocation.getCurrentPosition(
       (position) => {
           var latitude= position.coords.latitude;
           var longitude= position.coords.longitude;
           //var latitudeDelta= LATITUDE_DELTA;
           //var longitudeDelta= LONGITUDE_DELTA;
           firebase.database().ref('students/'+this.state.userId).update({
            lat: latitude,
            long: longitude,
          })//end update
       })
       Alert.alert('تم تحديث موقعك بنجاح');
     }//end method

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

          <ScrollView style={styles.scroll}>
          <KeyboardAwareScrollView
resetScrollToCoords={{ x: 0, y: 0 }}
contentContainerStyle={styles.container}
scrollEnabled={false}>
<View style={styles.smallContainer}>
<View style={styles.trackingContainer}>
<TouchableHighlight style={[styles.typeButtonContainer,styles.trackingButton]} onPress ={() => this.getCurrentPosition()} >
<Text style={styles.typeText}>حدّث موقعي</Text>
</TouchableHighlight>
</View>

<Text style={styles.SubSub}>ــــــ وقت الذهاب ــــــ</Text>

                <View style={styles.typeContainer}>

                    <TouchableHighlight style={[styles.typeButtonContainer, this.state.departure === true? styles.pressedButton:styles.typeButton]} onPress ={this.onDepartureToggle}>
                    <Text style={styles.typeText}>6:00</Text>
                    </TouchableHighlight>
                </View>

            <Text style={styles.SubSub}>ــــــ وقت الإياب ــــــ</Text>
                <View style={styles.typeContainer}>
                    <TouchableHighlight style={[styles.typeButtonContainer, this.state.arrival === '13:00'?styles.pressedButton:styles.typeButton]} onPress ={() => this.onArrivalToggle('13:00')}>
                    <Text style={styles.typeText}>13:00</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.typeButtonContainer, this.state.arrival === '15:00'?styles.pressedButton:styles.typeButton]} onPress ={() => this.onArrivalToggle('15:00')}>
<Text style={styles.typeText}>15:00</Text>
                        </TouchableHighlight>
                </View>


</View>


                </KeyboardAwareScrollView>
</ScrollView>
                );
    }
}

const styles = StyleSheet.create({
  scroll: {
    height:600,
    backgroundColor: '#F7FAFF',
  },
  Sub: {
    color: '#9F9F9F',
    fontSize: 12,
    marginBottom: 10,

  },
  SubSub: {
    color: '#9F9F9F',
    fontSize: 10,
    marginBottom: 19,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
    marginBottom: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row-reverse',
  },

  trackingContainer: {
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row-reverse',
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
  trackingButton: {
    backgroundColor: "#EDC51B",
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
  neighborhoodList: {
    borderColor: '#EAEAEA',
    backgroundColor: 'white',
    width:250,
    height:100,
    marginBottom:-40,
    marginTop:5
  },
  dropdown:{
    borderRadius:25,
  },
  inputDown:{
  flex:1,
  height:40,
  //flexDirection:'row-reverse',
  //justifyContent:'flex-end',
  //marginright:16,

  borderColor: '#EAEAEA',

  },


});
