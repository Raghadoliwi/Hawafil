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
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';


export default class addChild extends React.Component {
  state = {
    sName: '',
    level   : '',
    school: '',
  neighborhood: '',
  busNo: '',
 universities:[],

neighborhoodBorder:'#EAEAEA',
nameBorder:'',
schoolBorder:'',
busNoBorder:'',
errorMessage:'',
formErrorMsg:'',
errorMsgVisibilty:'none',
busNoError:'',

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
  }

  componentDidMount(){ //to fetch data
      firebase.database().ref('managers/').once('value', (snap) => {

          snap.forEach((child) => {
            if (child.val().instType=='school')
            this.setState({ universities: this.state.universities.concat({value:child.val().instName} ) })


          })
      })//end on


  }



   addChild = () => {
     const {navigation} = this.props;
     //note: this code is not tested when i added || this.state.level == ''
     //idk how to check this. or get its data.
      if (this.state.sName == '' || this.state.school == '' || this.state.neighborhood == '' || this.state.busNo == '' || this.state.level == '' ) {
       this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
       this.setState({errorMsgVisibilty: 'flex'})
       return;
     }

     if (this.state.neighborhoodBorder == 'red'||this.state.nameBorder == 'red'||this.state.schoolBorder=='red'||this.state.busNoBorder=='red') {
       this.setState({formErrorMsg: 'فضًلا، قم بتصحيح الأخطاء'})
       this.setState({errorMsgVisibilty: 'flex'})
       return;
     }
     var uid = firebase.auth().currentUser.uid;
     var parentPhoneNoDB;
     firebase.database().ref('parents/'+uid).on('value', snapshot => {
       parentPhoneNoDB = snapshot.val().phoneNo;
     });
     //adding child:
     firebase.database().ref('children/'+parentPhoneNoDB).set(
       {
        name: this.state.sName,
        level: this.state.level,
        inst: this.state.school,
        busNo: this.state.busNo,
        district: this.state.neighborhood,
       }
     ).then(function() {
       Alert.alert('تمت الإضافة بنجاح');
       navigation.navigate('parentDashboard');
     })
     .catch(error => this.setState({ errorMessage: error.message }))
     console.log(this.state.errorMessage);
   }//end add child


 onClickListener = (viewId) => {
   Alert.alert("Alert", "Button pressed "+viewId);
 }


      static navigationOptions = function(props) {
      return {
        title: '',
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

     <View style={styles.smallContainer}>
     <Text style={styles.header}>• إضافة تابع جديد •</Text>
     <View style={styles.inputContainer}>

         <TextInput style={styles.inputs, styles.input}
             placeholder="اسم الطالب "
             keyboardType="TextInput"
             underlineColorAndroid='transparent'
             onChangeText={(sName) => {
               this.setState({sName})
               this.setState({nameBorder: '#EAEAEA'})
             } }
             value={this.state.sName}

             />
       </View>



   <Text style={styles.level}> المرحلة:  </Text>
              <View style={styles.typeContainer}>


<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.level === 'التمهيدي'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({level:'التمهيدي'})} >
<Text style={styles.typeText}>تمهيدي</Text>
               </TouchableHighlight>


<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.level === 'الابتدائي'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({level:'الابتدائي'})} >
<Text style={styles.typeText}>ابتدائي</Text>
               </TouchableHighlight>


<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.level === 'المتوسط'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({level:'المتوسط'})} >
<Text style={styles.typeText}>متوسط</Text>
               </TouchableHighlight>

<TouchableHighlight style={[styles.typeButtonContainer,styles.buttonContainer, this.state.level === 'الثانوي'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({level:'الثانوي'})} >
<Text style={styles.typeText}>ثانوي</Text>
               </TouchableHighlight>

             </View>

       <View style={[styles.neighborhoodList, {borderColor: this.state.neighborhoodBorder}]}>
                             <Dropdown
                             itemColor='#919191'
                             baseColor='#919191'
                             textColor='#919191'

                             itemTextStyle={{textAlign:'right'}}
                 style={{textAlign:'right'}}
                 dropdownOffset={{ top: 0, left: 0}}
                                  inputContainerStyle={{textAlign:'right', borderBottomColor: 'transparent' }}
                                 containerStyle={{marginBottom:-15,textAlign:'right',paddingHorizontal:10, borderWidth:1, borderColor:this.state.neighborhoodBorder, borderRadius:25}}
                                 pickerStyle={{paddingHorizontal:10,shadowOpacity:'0.1',shadowRadius:'5',textAlign:'right',color:'#EAEAEA',borderBottomColor:'transparent',borderRadius:25,borderWidth: 0}}
                                 itemPadding={10}
                                 shadeOpacity={0}
                                 rippleInsets={{top: 0, bottom: 0}}
                                 dropdownMargins	={{min: 0, max: 0}}
                                 dropdownPosition ={0}
                 label='الحي السكني'

                 data={riyadhDistricts}

                 onChangeText={(neighborhood) => {
                   this.setState({neighborhood})
                   this.setState({neighborhoodBorder: '#EAEAEA'})
                 } }
                 value={this.state.neighborhood}
               />
             </View>

             <View style={[styles.fontStyle,styles.neighborhoodList]}>
                           <Dropdown
                           itemColor='#919191'
                           baseColor='#919191'
                           textColor='#919191'

                           itemTextStyle={{textAlign:'right'}}
               style={{textAlign:'right'}}
               dropdownOffset={{ top: 0, left: 0}}
                                inputContainerStyle={{textAlign:'right', borderBottomColor: 'transparent' }}
                               containerStyle={{marginBottom:-15,textAlign:'right',paddingHorizontal:10, borderWidth:1, borderColor:this.state.neighborhoodBorder, borderRadius:25}}
                               pickerStyle={{paddingHorizontal:10,shadowOpacity:'0.1',shadowRadius:'5',textAlign:'right',color:'#EAEAEA',borderBottomColor:'transparent',borderRadius:25,borderWidth: 0}}
                               itemPadding={10}
                               shadeOpacity={0}
                               rippleInsets={{top: 0, bottom: 0}}
                               dropdownMargins	={{min: 0, max: 0}}
                               dropdownPosition ={0}

               label='المدرسة'

      onChangeText={(value) => {
      console.log(this.state.school);
      this.setState({school:value})
      } }
                  data={this.state.universities}
             />
           </View>

  <View style={styles.busInput}>

         <TextInput style={styles.inputs, styles.input}
             placeholder="رقم الحافلة "
             keyboardType="numeric"
             underlineColorAndroid='transparent'
             onChangeText={(busNo) => {
               this.setState({busNo})
               this.setState({busNoBorder: '#EAEAEA'})
               this.setState({busNoError: 'none'})
             }
             }
             value={this.state.busNo}
             />
       </View>

              <View >

                 <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
               </View>

           <View>
         <TouchableHighlight style={[styles.buttonContainer, styles.save]} onPress={this.addChild}>
         <Text style={styles.saveText}>حفظ </Text>
       </TouchableHighlight>
         </View>

         <View>
          <TouchableHighlight style={[styles.buttonContainer, styles.cancel]} onPress={() => this.props.navigation.goBack()}>
         <Text style={styles.saveText}>إلغاء </Text>
       </TouchableHighlight>
       </View>

       </View>
     </KeyboardAwareScrollView>
   );
 }
}

const styles = StyleSheet.create({
  input:{
    flex:1,
    height:40,
    //flexDirection:'row-reverse',
    //justifyContent:'flex-end',
    //marginright:16,
   textAlign:'right',
    borderColor: '#EAEAEA',
    //marginLeft:10,
    marginRight: 10,
  },

 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F7FAFF',
 },
 inputContainer: {
     backgroundColor: '#FFFFFF',
     borderRadius:30,
     borderWidth: 1,
     width:250,
     height:35,
     marginBottom:15,
    top: 80,
    // flexDirection: 'row-reverse',
     //justifyContent:'flex-end',
    // alignItems:'left',
     borderColor: '#EAEAEA'
 },
 busInput:{
     backgroundColor: '#FFFFFF',
     borderRadius:30,
     borderWidth: 1,
     width:250,
     height:35,
     marginBottom:15,
    top: -15,
    // flexDirection: 'row-reverse',
     //justifyContent:'flex-end',
    // alignItems:'left',
     borderColor: '#EAEAEA'
 },
 smallContainer:{
    marginTop:40,
    justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'white',
   borderRadius:10,
     width:300,
     height:500
 },

 header:{
   color: "#8197C6",
   fontSize: 15 ,//problema
   fontWeight:"900",
   bottom: -40,
 },
 level:{
      flex:1,
                                     width: 70,
                                  alignSelf:'flex-end',
                                    color: '#9F9F9F',
                                    top:90,
                                    right:7
 },
 inputs:{
     flex:1,
     height:40,
     //flexDirection:'row-reverse',
     alignSelf:'flex-end',
     //marginRight:120,
     //justifyContent:'flex-end',
     //marginright:16,
     borderColor: '#EAEAEA',
     marginRight: 10,
 },
 neighborhoodList: {
  borderColor: '#EAEAEA',
   backgroundColor: 'white',
    width:250,
   height:100,
top:30   },
warning:{
   color: 'red',
   fontSize:12,
   marginBottom:10,
       },



 buttonContainer: {
    height:30,
                                  flexDirection: 'row',
                                 justifyContent: 'center',
                                  alignItems: 'center',
   //marginBottom:20,
                                width:60,
                                 borderRadius:30,
 },

 typeContainer:{
justifyContent: 'center',
backgroundColor: 'white',
borderRadius:10,
flex: 1,
bottom: -50,
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
 save: {
   //backgroundColor: "#FF4DFF",
   width: 60,
   height:30,
   top: -15,
   left:40,
   backgroundColor:"#3C68BF",
  //alignSelf:'flex-end'
   //marginBottom: 300,
 },

 cancel:{
   width: 60,
   height: 30,
   top: -45,
   left:-40,
   backgroundColor:"#EDC51B",
 },
 saveText: {
   color: 'white',
   fontSize: 15
 }
});
