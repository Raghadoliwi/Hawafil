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
pro

   state = {

     sName: '',
     level   : '',
     school: '',
   neighborhood: '',
   busNo: '',
 neighborhoodBorder:'#EAEAEA',


   }


 onClickListener = (viewId) => {
   Alert.alert("Alert", "Button pressed "+viewId);
 }


      static navigationOptions = function(props) {
      return {
        title: 'تعديل البيانات الشخصية',
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
   let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'النخيل'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]

   return (
     <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
     contentContainerStyle={styles.container}
       scrollEnabled={false}>

     <View style={styles.smallContainer}>
     <Text style={styles.header}>• إضافة تابع جديد •</Text>
     <View style={styles.inputContainer}>

         <TextInput style={styles.inputs}
             placeholder="اسم الطالب "
             keyboardType="acii-capable"
             underlineColorAndroid='transparent'
             onChangeText={(busNo) => this.setState({sName})}/>
       </View>

       <View style={styles.inputContainer}>

         <TextInput style={styles.inputs}
             placeholder="المدرسة"
             keyboardType="acii-capable"
             underlineColorAndroid='transparent'
             onChangeText={(carPlate) => this.setState({school})}/>
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

                 onChangeText={(value) => {
                   this.setState({neighborhood:value})
                   this.setState({neighborhoodBorder: '#EAEAEA'})
                 } }
               />
             </View>

  <View style={styles.busInput}>

         <TextInput style={styles.inputs}
             placeholder="رقم الحافلة "
             keyboardType="numeric"
             underlineColorAndroid='transparent'
             onChangeText={(neighborhood) => this.setState({busNo})}/>
       </View>

              <View >

                 <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
               </View>

           <View>
         <TouchableHighlight style={[styles.buttonContainer, styles.save]} onPress={() => this.onClickListener('save')}>
         <Text style={styles.saveText}>حفظ </Text>
       </TouchableHighlight>
         </View>

         <View>
          <TouchableHighlight style={[styles.buttonContainer, styles.cancel]} onPress={() => this.onClickListener('cancel')}>
         <Text style={styles.saveText}>إلغاء </Text>
       </TouchableHighlight>
       </View>

       </View>
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
   borderRadius:'10',
     width:300,
     height:500
 },

 header:{
   color: "#8197C6",
   fontSize: 15 ,//problema
   fontWeight:900,
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
