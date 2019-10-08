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
import DropdownMenu from 'react-native-dropdown-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/*
Children:
- Name
- Bus
- School name (institution)
- type of school
- parentPhoneNumber
- district
*/

const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class editChild extends React.Component {
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
     sName: '' ,
     school: '',
     level: '',
     busNo: '',
     district: '',
     errorMessage: null
     }

     //it's better to use Alert.alert, same one we used in forget password.
     showAlertDialog = () =>{
  Alert.alert(
  'هل أنت متأكد؟',
  '',
  [
    {
      text: 'إلغاء',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'نعم', onPress: () => console.log('OK Pressed')},
  ],
  {cancelable: false},
);}

     editChild = () => {
       var user = firebase.auth().currentUser;
       var uid;
       if (user != null){
         uid = user.uid;
         return firebase.database().ref('parents/'+uid).once('value')
         .then(function(snapshot) {
           var phoneNo = snapshot.val().phoneNo;
          });
       }
    }//end edit child.

     static navigationOptions = function(props) {
     return {
       title: 'إضافة قائد مركبة',
       headerLeft: <View style={{paddingLeft:16, }}>
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
          <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>
          <ScrollView style={{flex: 1, marginBottom:20}}>
                <View style={styles.smallContainer}>
                <Text style={styles.header}>•  تعديل البيانات • </Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                placeholder="اسم الطالب "
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={workerId => this.setState({ sName })}
                value={this.state.workerId}
                />
                </View>


                <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                placeholder="المدرسة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={ driverName => this.setState({ school })}
                value={this.state.driverName}
                />

                </View>

                <Text style={styles.level}> المرحلة:  </Text>
               <View style={styles.typeContainer}>


<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.typeOf === 'level1'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'level1'})} >
<Text style={styles.typeText}>تمهيدي</Text>
                </TouchableHighlight>


<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.typeOf === 'level2'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'level2'})} >
<Text style={styles.typeText}>ابتدائي</Text>
                </TouchableHighlight>


<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.typeOf === 'level3'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'level3'})} >
<Text style={styles.typeText}>متوسط</Text>
                </TouchableHighlight>

<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.typeOf === 'level4'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'level4'})} >
<Text style={styles.typeText}>ثانوي</Text>
                </TouchableHighlight>

              </View>

                <View style={styles.busContainer}>

                <TextInput style={styles.input}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={busNo => this.setState({ busNo })}
                //line below is added new by lama:
                value={this.state.busNo}
                />
                </View>




                <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                onPress={this.editChild}>

                <Text style={styles.saveText}>حفظ</Text>

                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.delete]}
                onPress=  {this.showAlertDialog}>

                <Text style={styles.saveText}>حذف الطالب</Text>

                </TouchableHighlight>
                /*
                    <TouchableHighlight style={[styles.buttonContainer, styles.cancel]}
                onPress={this.editChild}>

                <Text style={styles.saveText}>إلغاء</Text>


                </TouchableHighlight>
*/


                </View>

                </ScrollView>
                </KeyboardAwareScrollView>

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
                                 marginTop:130,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:400,

                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:35,
                                   marginBottom:10,
                                   top:50,
                                   paddingHorizontal:10,
                                  flexDirection: 'row',

                                 },
                                 input:{
                                       flex:1,
                                      height:40,
                                   alignSelf:'flex-end',
                                     borderColor: '#EAEAEA',

                                 },
                                 header:{
    color: "#8197C6",
    fontSize: 15 ,//problema
    fontWeight:900,
    bottom: -20,
  },
  level:{
       flex:1,
                                      width: 70,
                                   alignSelf:'flex-end',
                                     color: '#9F9F9F',
                                     top:60,
                                     right:7
  },


                             busContainer:{
                                  borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:35,
                                   marginBottom:10,
                                   top:-7,
                                   paddingHorizontal:10,
                                  flexDirection: 'row',

                             },

                                 buttonContainer: {
                                  height:30,
                                   flexDirection: 'row',
                                  justifyContent: 'center',
                                   alignItems: 'center',
    //marginBottom:20,
                                 width:60,
                                  borderRadius:30,
    //top: -10
  },
  save: {
    //backgroundColor: "#FF4DFF",
    width: 60,
    height:30,
    top: 20,
    left:110,
    backgroundColor:"#3C68BF",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  delete:{
      width: 100,
    height:30,
    top: -10,
    left:25,
    backgroundColor:"#DC143C",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  cancel:{
    width: 60,
    height: 30,
    top: -39,
    left:-110,
    backgroundColor:"#EDC51B",
  },
  saveText: {
    color: 'white',
    fontSize: 15
  },
typeContainer:{
justifyContent: 'center',
backgroundColor: 'white',
borderRadius:10,
flex: 1,
bottom: -15,
flexDirection: 'row',

},

typeButtonContainer: {
borderRadius: 5,
flexDirection: 'row',
 width: 60,
    height:30,
    backgroundColor:"#3C68BF",
},
typeButton: {
backgroundColor: "#DFE8FB",
marginLeft:5,
marginRight:5,

},

pressedButton: {
backgroundColor: "#7597DB",
marginLeft:10,
marginRight:10,
justifyContent: 'center',
alignItems: 'center',
width:60,
borderRadius:30,
 },

});
