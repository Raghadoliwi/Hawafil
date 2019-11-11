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

const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;



export default class studentsList extends React.Component {
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
        firebase.database().ref('buses/').on('value', (snap) => {
            let items = [];
            snap.forEach((child) => {
                items.push({
                    studentName: child.val().studentName ,// will chick the database attribute
                    busNo: child.val().busNo ,//will chick the database attribute
                    neighborhood: child.val().neighborhood ,//will chick the database attribute
                    depTime: child.val().depTime ,//will chick the database attribute
                })
            })//end snap for each
            itm = items;
            this.setState({items: items});
            console.log(itm);
            console.log("lama-------");
            console.log(this.state.items); //This is wrong
            itm.forEach((itms) => {
                console.log(itms.driverName);
            })
        })//end on


    }
	static navigationOptions = function(props) {
  return {
		drawerLabel:'قائمة الطلاب',
    title: 'الطلاب',
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

        {
        this.state.items.map((u, i ) => {
            return (
                <Card containerStyle={styles.cards} title={'رقم الحافلة:'+ u.busNo}>
                <Text style={styles.paragraph} key={u.studentName}>اسم الطالب: {u.studentName}</Text>
                    <Text style={styles.paragraph} key={u.neighborhood}>الحي: {u.neighborhood}</Text>
                    <Text style={styles.paragraph} key={u.depTime}>وقت المغادرة : {u.depTime}</Text>

                    <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton]}
                     onPress={null}> //() => this.props.navigation.navigate('studentsList')}>
                        <Text style={[styles.fontStyle,styles.registerText]}>محادثة </Text>
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

  },
  viewStudentsButtonContainer: {
    height:45,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  	marginBottom:10,
  	width:250,
  	borderRadius:30
  },
  viewStudentsText:{
     color: '#EDC51B',

  },

viewStudentsButton:{
  backgroundColor: "white",
  borderColor:'#EDC51B',
  borderRadius:25,
  borderWidth :1
},

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
