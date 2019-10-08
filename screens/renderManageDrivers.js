import React from 'react';
//import react in our code.

import { Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';
import addBusDriver from './addBusDriver'
const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


export default class renderManageDrivers extends React.Component {
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
          items : []
        }
      }

      componentDidMount(){ //to fetch data
          firebase.database().ref('drivers/').on('value', (snap) => {
              let items = [];
              snap.forEach((child) => {
                  items.push({
                      name: child.val().name ,
                      busNo: child.val().busNo ,
                      district: child.val().district ,
                      busPlate: child.val().busPlate ,
                      id: child.val().id ,
                      inst: child.val().inst ,
                      phoneNo: child.val().phoneNo ,
                      id: child.val().id ,

                  })
              })//end snap for each
              itm = items;
              this.setState({items: items});
              console.log(itm);
              console.log("lama-------");
              console.log(this.state.items); //This is wrong
              itm.forEach((itms) => {
                  console.log(itms.name);
              })
          })//end on
      }


static navigationOptions = function(props) {
return {
  drawerLabel:'إدارة السائقين',
  title: 'إدارة السائقين',
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
      <ScrollView style={{flex: 1, marginBottom:20}}>

     <TouchableHighlight style={[styles.buttonContainer, styles.addButton]}
onPress={() => this.props.navigation.push('addBusDriver')}     >
          <Text style={styles.addText}>إضافة قائد حافلة</Text>
        </TouchableHighlight>
        {
        this.state.items.map((u, i ) => {
            return (
                <Card containerStyle={styles.cards} title={'اسم السائق: '+ u.name}>
                <Text style={styles.paragraph} key={u.id}>الرقم الوظيفي: {u.id}</Text>
                <Text style={styles.paragraph} key={u.busNo}>رقم الحافلة: {u.busNo}</Text>
                    <Text style={styles.paragraph} key={u.district}>الحي: {u.district}</Text>
                    <Text style={styles.paragraph} key={u.busPlate}>رقم اللوحة: {u.busPlate}</Text>
                    <Text style={styles.paragraph} key={u.phoneNo}>رقم الجوال: {u.phoneNo}</Text>

                </Card>
            );
        })
        }

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
  buttonContainer: {
    height:45,
    top:25,
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
  }
});
