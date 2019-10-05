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
  Dropdown,
} from 'react-native';
import firebase from 'firebase'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class addBus extends Component {

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
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
    busNo: '',
    carPlate   : '',
    driverName: '',
  neighborhood : '',
  }

  insertBus = () => {
    // Get a key for a new Bus.
  var newBusKey = firebase.database().ref().child('buses').push().key;
              firebase.database().ref('buses/'+newBusKey).set(
                {
                  busNo: this.state.busNo,
                  carPlate: this.state.carPlate,
                  driverName: this.state.driverName,
                  neighborhood: this.state.neighborhood,
                }).then(() => this.props.navigation.navigate('renderManageBuses'))
    //raghad plz make sure of the above line (the page)
    .catch(error => this.setState(console.log(error.message)))
}//end inserting a bus

/*
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
*/
  render() {

    return (
      <View style={styles.container}>
      <View style={styles.smallContainer}>
      <Text style={styles.header}>• إضافة بيانات حافلة جديدة •</Text>
      <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="رقم الحافلة"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(busNo) => this.setState({busNo})}
              value={this.state.busNo}
              />
        </View>

        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="رقم لوحة الحافلة"
              keyboardType="TextInput"
              underlineColorAndroid='transparent'
              onChangeText={(carPlate) => this.setState({carPlate})}
              value={this.state.carPlate}
              />
        </View>

      <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="اسم السائق"
              keyboardType="TextInput"
              underlineColorAndroid='transparent'
              onChangeText={(driverName) => this.setState({driverName})}
              value={this.state.driverName}
              />
        </View>
          <View style={styles.inputContainer}>



        </View>
<View style={styles.inputContainer}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>الحي السكني</Text>}
        >
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
</View>


        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
        onPress={this.insertBus}>
          <Text style={styles.signUpText}>إضافة الحافلة</Text>
        </TouchableHighlight>
        </View>
      </View>
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
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    borderRadius:25,
    borderWidth: 1,
    width:250,
    height:40,
    marginBottom:15,
    paddingHorizontal:10,

  },
  smallContainer:{
     marginTop:40,
     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:10,
      width:300,
      height:400
  },
  header:{
    color: "#8197C6",
    fontSize: 15 ,//problema
    fontWeight:'900',
    bottom: 30,
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
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    //backgroundColor: "#FF4DFF",
    width: 110,
    height:30,
    top: 40,
    backgroundColor:"#3C68BF",
    //marginBottom: 300,
  },
  signUpText: {
    color: 'white',
  }
});
