import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,

} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class editBusForm extends Component {


    state = {
      busNo: '',
      carPlate   : '',
      driverName: '',
    neighborhood : '',

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
    {text: 'نعم', onPress: () => console.log('OK Pressed')},
  ],
  {cancelable: false},
);}

  render() {
    let riyadhDistricts = [{value:'النخيل'},{value:'الصحافة'},{value:'النخيل'},{value:'الياسمين'},{value:'النفل'},{value:'الازدهار'},{value:'الملقا'},{value:'المغرزات'},{value:'الواحه'},{value:'الورود'},{value:'الرائد'},{value:'الغدير'},{value:'المروج'},{value:'العقيق'},{value:'المرسلات'},{value:'الغدير'},{value:'الربيع'},{value:'الربوة'}]
    return (
<KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
        scrollEnabled={false}>
              <View style={styles.smallContainer}>
      <Text style={styles.header}>• تعديل بيانات الحافلة #٩ •</Text>


        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="رقم لوحة الحافلة"
              keyboardType="acii-capable"
              underlineColorAndroid='transparent'
              onChangeText={(carPlate) => this.setState({carPlate})}/>
        </View>

      <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="اسم السائق"
              keyboardType="acii-capable"
              underlineColorAndroid='transparent'
              onChangeText={(driverName) => this.setState({driverName})}/>
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



          <View>
          <TouchableHighlight style={[styles.buttonContainer, styles.save]} onPress={() => this.onClickListener('save')}>
          <Text style={styles.saveText}>حفظ </Text>
        </TouchableHighlight>
          </View>
            <View>
           <TouchableHighlight style={[styles.buttonContainer, styles.delete]} onPress=  {this.showAlertDialog}>

          <Text style={styles.saveText}>حذف الحافلة </Text>
        </TouchableHighlight>
        </View>
          <View>
           <TouchableHighlight style={[styles.buttonContainer, styles.cancel]} onPress={() => this.onClickListener('cancel')}>
          <Text style={styles.saveText}>إلغاء </Text>
        </TouchableHighlight>
        </View>

        </View>
  </KeyboardAwareScrollView>    );
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
     top: 40,
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
      height:350
  },
  header:{
    color: "#8197C6",
    fontSize: 15 ,//problema
    fontWeight:900,
    bottom:-1,
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


  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:20,
    width:250,
    borderRadius:30,
    //top: -10
  },
    neighborhoodList: {
   borderColor: '#EAEAEA',
    backgroundColor: 'white',
     width:250,
    height:100,
     top:40
   },
  save: {
    //backgroundColor: "#FF4DFF",
    width: 60,
    height:30,
    top: 30,
    left:110,
    backgroundColor:"#3C68BF",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  delete:{
      width: 100,
    height:30,
    top: 1,
    left:25,
    backgroundColor:"#DC143C",
   //alignSelf:'flex-end'
    //marginBottom: 300,
  },
  cancel:{
    width: 60,
    height: 30,
    bottom: 27,
    left:-110,
    backgroundColor:"#EDC51B",
  },
  saveText: {
    color: 'white',
    fontSize: 15
  }
});
