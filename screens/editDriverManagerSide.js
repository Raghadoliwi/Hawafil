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

const MenuIcon = ({ navigate }) => <Icon
    name='chevron-left'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class editDriverManagerSide extends React.Component {
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
  confirmPassword:'',
     currentColor: '#EAEAEA',
      passError:'none',
     workerId: '',
     driverName: '',
     phoneNo: '',
     inst:'',
     busNo: '',
     errorMessage: null,
    nameBorders:'#EAEAEA',
    emailBorders:'#EAEAEA',
  passwordBorder:'#EAEAEA',
  conPasswordBorder:'#EAEAEA',
     }


          componentDidMount(){ //to fetch data



const { navigation } = this.props;
      var driverId = navigation.getParam('id', 'NO-ID');
      console.log(driverId);
if (driverId !== 'NO-ID'){

  firebase.database().ref('drivers/'+driverId).on('value', snapshot => {
console.log(snapshot);
  this.setState({
      driverKey:snapshot.key,
      nationalId: snapshot.val().nationalId,
      driverName: snapshot.val().name,
     phoneNo: snapshot.val().phoneNo,
      busNo: snapshot.val().busNo,
      busPlate:snapshot.val().busPlate,
    });
});





}






        }




     validateEmail = (email) => {

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(this.state.email)== false)
  {

  this.setState({emailBorder:'red'})
    }
  else {
    this.setState({emailBorder:'#91b804'})
  }
}//end validate phone number

/*identicalPass = (password) => {
if (this.state.password != this.state.confirmPassword){
  this.setState({passError: 'flex'})
}
else {
  this.setState({passError: 'none'})
}

}//end inserting a bus
*/
  validateNumber = (phoneNo) => {
    //Regex
    const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    if (!numRegex.test('0'+this.state.phoneNo)) {
      console.log('number bad');
      console.log('0'+this.state.phoneNo);


      }
      else {
      this.setState({currentColor: '#91b804'})
      }
}//end validate phone number

     editProfile = () => {
const { navigation } = this.props;
       if (this.state.workerId == '' || this.state.driverName == ''|| this.state.phoneNo == ''|| this.state.busNo == ''|| this.state.busPlate == '') {
         this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
         this.setState({errorMsgVisibilty: 'flex'})
         return;
       }


       var driverKey=this.state.driverKey;

   if (this.state.password == '') {
         if (this.state.driverName != ''){
           firebase.database().ref('drivers/'+driverKey).update({name : this.state.driverName,})
         }

         if (this.state.phoneNo != ''){
           firebase.database().ref('drivers/'+driverKey).update({phoneNo : this.state.phoneNo,})
         }
         if (this.state.workerId != ''){
           firebase.database().ref('drivers/'+driverKey).update({id : this.state.workerId,})
         }
         if (this.state.busNo != ''){
           firebase.database().ref('drivers/'+driverKey).update({busNo : this.state.busNo,})
         }
         if (this.state.busPlate != ''){
           firebase.database().ref('drivers/'+driverKey).update({busPlate : this.state.busPlate,})
         }
  navigation.navigate('renderManageDrivers')
       }
      /* else {
          firebase.database().ref('drivers/'+driverKey).updatePassword(this.state.password).then(() => {
          navigation.navigate('login')
         }, (error) => {
           // An error happened.
         });
       }*/


    }//end edit driver

     static navigationOptions = function(props) {


     return {
        title: 'تعديل بيانات القائد',
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
      let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]

        return (
<KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>
                <ScrollView style={{flex: 1, marginBottom:20}}>
                  <View style={styles.smallContainer}>

                        <Text style={styles.Main}> • تعديل البيانات الشخصية • </Text>
                        <View style={styles.inputContainer}>

                        <TextInput style={styles.email, styles.input}
                        placeholder="رقم الهوية"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={workerId => this.setState({ workerId })}
                        value={this.state.workerId}
                        />
                        </View>
                        <View style={styles.inputContainer}>

                        <TextInput style={styles.email, styles.input}
                        placeholder="اسم القائد"
                        keyboardType="TextInput"
                        underlineColorAndroid='transparent'
                        onChangeText={ driverName => this.setState({ driverName })}
                        value={this.state.driverName}
                        />

                        </View>
                    <View style={[styles.phoneContainer, {borderColor: this.state.currentColor}]}
                        >

                        <TextInput style={styles.keyText}
                        value="+966"
                        editable={false}
                        />

                        <TextInput style={styles.phoneInput}
                        placeholder="رقم الجوال"
                        keyboardType="numeric"
                        ref="phoneNumber"
                        underlineColorAndroid='transparent'
                        onChangeText={(phoneNo) => {
                          this.setState({phoneNo})
                          this.setState({currentColor: '#EAEAEA'})
                        } }
                        onEndEditing={(phoneNo) => this.validateNumber(phoneNo)}
                        value={this.state.phoneNo}
                        />
                        </View>



                      <Text style={styles.Main}> • تعديل بيانات الحافلة • </Text>

                     <View style={styles.inputContainer}>

                     <TextInput style={styles.email, styles.input}
                     placeholder="رقم الحافلة"
                     keyboardType="numeric"
                     underlineColorAndroid='transparent'
                     onChangeText={busNo => this.setState({ busNo })}
                     //line below is added new by lama:
                     value={this.state.busNo}
                     />
                     </View>

                     <View style={styles.inputContainer}>

                     <TextInput style={styles.email, styles.input}
                     placeholder="رقم اللوحة"
                     keyboardType="numeric"
                     underlineColorAndroid='transparent'
                     onChangeText={busPlate => this.setState({ busPlate })}
                     //line below is added new by lama:
                     value={this.state.busPlate}
                     />
                     </View>



                     <View>

                        <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                                   </View>
<View style={styles.typeContainer}>
<TouchableHighlight style={[styles.buttonContainer, styles.delete]}
onPress={this.showAlertDialog}>

<Text style={styles.saveText}>حذف الحافلة </Text>


</TouchableHighlight>
                                   <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                                   onPress={this.editProfile}>

                                   <Text style={styles.saveText}>حفظ</Text>


                                   </TouchableHighlight>




</View>
</View>
                </ScrollView>
                </KeyboardAwareScrollView>

                );
    }
}

                    const styles = StyleSheet.create({
                                 Main:{
                                   marginTop:100,
                                 color:'#4C73CC',
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 bottom:50,
                                 },
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 },
                                 smallContainer:{
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
                                     width: 0}


                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:35,
                                   marginBottom:15,
                                   bottom:20,
                                   paddingHorizontal:10,
                                  flexDirection: 'row',


                                 },
                                 container: {
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 flex: 1,
                                 backgroundColor: '#F7FAFF',
                                 },

                                                                Main:{
                                                                color:'#4C73CC',
                                                                marginTop:30,
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
                                                                   marginTop:40,
                                                                   justifyContent: 'center',
                                                                  alignItems: 'center',
                                                                  backgroundColor: 'white',
                                                                  borderRadius:10,
                                                                    width:300,
                                                                    height:600
                                                                },
                                                                header: {
                                                                  color: "#8197C6",
                                                                  fontSize: 20, //problema
                                                                  //fontWeight:900,
                                                                  marginTop: 30,
                                                                  bottom: 20,
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
                                                                input:{
                                                                  flex:1,
                                                                  height:40,
                                                                  //flexDirection:'row-reverse',
                                                                  //justifyContent:'flex-end',
                                                                  //marginright:16,
                                                                 textAlign:'right',
                                                                  borderColor: '#EAEAEA',
                                                                  marginLeft:10,
                                                                  marginRight:10,

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

                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                top: 20,
                                                                width:250,
                                                                borderRadius:30,
                                                                },


                                                                loginButton: {
                                                                backgroundColor: "#4C73CC",
                                                                },
                                                                loginText: {
                                                                color: 'white',
                                                                },



  save: {
    //backgroundColor: "#FF4DFF",
    width: 70,
    height:30,
    //top: 120,

    backgroundColor:"#3C68BF",
    //marginBottom: 300,
  },
  delete:{
marginRight:10,
    width: 140,
    height:30,
    //top: 120,

    backgroundColor:"#DC143C",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  cancel:{
    width: 60,
    height: 30,
    bottom: -10,
    left:-110,
    backgroundColor:"#EDC51B",
  },
  saveText: {
    color: 'white',
    fontSize: 15
  },
  phoneContainer:{
  backgroundColor: '#FFFFFF',
  borderRadius:25,
  borderWidth: 1,
  width:250,
  marginBottom:20,
  flexDirection: 'row',
  //justifyContent:'flex-end',
  justifyContent:'space-around',
  },
  phoneInput:{


  width:200,

  borderColor: '#EAEAEA',

  },
  keyNo:{
    backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderWidth: 1,
      width:60,
      height:35,
      marginBottom:25,
     // marginLeft: 250,
     left:205,
      flexDirection: 'row-reverse',
       //justifyContent:'flex-end',
      //alignItems:'flex-end',
      borderColor: '#EAEAEA'
  },
  keyText:{
  flex:1,
  height:40,
  textAlign:'center',
  //marginRight: 30,
  //justifyContent:'flex-end',
  //marginright:16,
  borderColor: '#EAEAEA',
  color:'#646464' ,
  },
  typeContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
   warning:{
                                 color: 'red',
                                 fontSize:12,
                                 marginBottom:10,
                                 textAlign:'center'
                               }
});
