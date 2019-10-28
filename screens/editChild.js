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
import { Dropdown } from 'react-native-material-dropdown';

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
    parentPhoneNo:'',
     sName: '' ,
     inst: '',
     level: '',
     busNo: '',
     school:'',
     district: '',
     errorMessage: null,
     universities:[],

    neighborhoodBorder:'#EAEAEA',
     }

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
    {text: 'نعم', onPress: () => {
      var phoneNo = this.props.navigation.getParam('parentNo', 'NO-NUM');
        firebase.database().ref('children/'+phoneNo).remove()
        this.props.navigation.push('parentDashboard');
    }},
  ],
  {cancelable: false},
);}

componentDidMount(){
  firebase.database().ref('managers/').once('value', (snap) => {

      snap.forEach((child) => {
        if (child.val().instType=='school')
        this.setState({ universities: this.state.universities.concat({value:child.val().instName} ) })


      })
  })//end on



  firebase.auth().onAuthStateChanged((user) => {
    if (user){
      var userId = firebase.auth().currentUser.uid;
      var phoneNo;
      return firebase.database().ref('parents/'+uid).once('value')
      .then(function(snapshot) {
        this.state.parentPhoneNo = snapshot.val().phoneNo;
        return firebase.database().ref('children/'+this.state.parentPhoneNo).once('value')
        .then(function(snapshot) {
          this.setState({
            sName: snapshot.val().name,
            inst: snapshot.val().inst,
            busNo: snapshot.val().busNo,
            level: snapshot.val().level,
            school: child.val().school,
            district: snapshot.val().district,
          })
        })
       });

    }//end if
  })



  const { navigation } = this.props;
        var parentNo = navigation.getParam('parentNo', 'NO-NUM');
        console.log(parentNo);
  if (parentNo !== 'NO-NUM'){

    firebase.database().ref('children/').on('value', (snap) => {

  snap.forEach((child) => {

    if (child.key === parentNo){
    this.setState({

        sName: child.val().name,
        level: child.val().level,
        inst: child.val().inst,
        busNo: child.val().busNo,
        school: child.val().school,
        district: child.val().district,


      });
  }


  })//end snap for each


    });





  }


}

     editChild = () => {
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

       console.log(phoneNo);
         var phoneNo = this.props.navigation.getParam('parentNo', 'NO-NUM');
       console.log(phoneNo);
       if (phoneNo != null){
          firebase.database().ref('children/'+phoneNo).update({
           name: this.state.sName,
           inst: this.state.inst,
           busNo: this.state.busNo,
           level: this.state.level,
           district: this.state.district,
         })
         Alert.alert('تم تحديث البيانات بنجاح');
         this.props.navigation.navigate('parentDashboard');
       }
    }//end edit child.

     static navigationOptions = function(props) {
     return {
       title: 'تعديل بيانات الطفل',
       headerLeft: <View style={{paddingLeft:16, }}>
       <Icon
           name="chevron-left"
           size={30}
           color='white'
           onPress={() => {
             Alert.alert(
  '',
  'هل أنت متأكد؟',
  [{text: 'نعم', onPress: () => props.navigation.goBack()},
    {
      text: 'لا',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },

  ],
  {cancelable: false},
);

           }} />
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
                <Text style={styles.header}>•  تعديل البيانات • </Text>

                <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                placeholder="اسم الطالب "
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={sName => this.setState({ sName })}
                value={this.state.sName}
                />
                </View>


                <View style={styles.inputContainer}>

                <TextInput style={styles.input}
                placeholder="المدرسة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={ inst => this.setState({ inst })}
                value={this.state.inst}
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

                        onChangeText={(district) => {
                          this.setState({district})
                          this.setState({neighborhoodBorder: '#EAEAEA'})
                        } }
                        value={this.state.district}
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
                         value={this.state.school}
                    />
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


                              <View >

                                 <Text style={[styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                               </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.save]}
                onPress={this.editChild}>
                <Text style={styles.saveText}>حفظ</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer, styles.delete]}
                onPress={this.showAlertDialog}>
                <Text style={styles.saveText}>حذف الطالب</Text>
                </TouchableHighlight>




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
flexDirection: 'row-reverse',

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
neighborhoodList: {
 borderColor: '#EAEAEA',
  backgroundColor: 'white',
   width:250,
  height:100,
top:40 },

warning:{
   color: 'red',
   fontSize:12,
   marginBottom:10,
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
