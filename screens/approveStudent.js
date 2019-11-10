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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';

const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;


export default class approveStudent extends React.Component {
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

        firebase.auth().onAuthStateChanged((user) => {
    if (user) {

  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('managers/'+userId).on('value', snapshot => {

this.setState({inst: snapshot.val().instName})

})

firebase.database().ref('students/').on('value', (snap) => {
    let items = [];
    snap.forEach((child) => {
      if (child.val().inst === this.state.inst)
        items.push({
            name: child.val().name ,
            busNo: child.val().busNo ,
            neighborhood: child.val().neighborhood ,
            stdID: child.key
            //phoneNo: child.val().phoneNo ,


        })

    })//end snap for each
    itm = items;
    this.setState({items: items});


})//end on

    }
  });
      }


static navigationOptions = function(props) {
return {
  drawerLabel:'عرض الطلاب الجدد',
  title: 'عرض الطلاب الجدد',
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
//<TouchableHighlight onPress={() => { this.functionOne(); this.functionTwo(); }/>

removeCard(stdID){
  this.setState({ items:this.state.items.filter(items => items.stdID !== stdID)});
}
	render() {
    return (

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>


        {
        this.state.items.map((u, i ) => {

            return (
                <Card  containerStyle={styles.cards} title={u.name}>
                <View style={styles.typeContainer}>
                <Text style={styles.paragraph} key={u.name}>اسم الطالب: </Text>
                <Text style={styles.info}>{u.name}</Text>
                </View>
                <View style={styles.typeContainer}>
                <Text style={styles.paragraph} key={u.busNo}>رقم الحافلة: </Text>
                <Text style={styles.info}>{u.busNo}</Text>
                </View>
                <View style={styles.typeContainer}>
                    <Text style={styles.paragraph} key={u.neighborhood}>الحي: </Text>
                    <Text style={styles.info}>{u.neighborhood}</Text>
                    </View>
                    <View style={styles.typeContainer}>
                     <Text style={styles.paragraph} key={u.phoneNo}>رقم الجوال: </Text>
                     <Text style={styles.info}>{u.phoneNo}</Text>
                     </View>




                                  <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
                                  onPress={() =>  removeCard(stdID)}>
                                 <Text style={styles.editText}>قبول</Text>
                               </TouchableHighlight>
                               <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
                               onPress={() =>  removeCard(stdID)}>
                              <Text style={styles.editText}>رفض</Text>
                            </TouchableHighlight>
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

    fontSize: 14,
    textAlign: 'right',
    color: '#3C68BF',
    borderRadius: 550,
  },
  info: {

    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    color: '#c8c8c8',

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
  typeContainer: {
  //  justifyContent: 'right',

    flex: 1,
    marginTop:10,
    flexDirection: 'row-reverse',
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
    fontWeight: '500',
  },
  addText: {
    color: 'white',
    fontSize: 18 ,
    fontWeight: '500',
  }
});
