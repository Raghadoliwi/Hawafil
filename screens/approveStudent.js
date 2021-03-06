
import React from 'react';
//import react in our code.

import { Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight,Alert } from 'react-native';
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
      state={
        name: '',
        busNo: '',
        neighborhood: '',
        phoneNo: '' ,
        stdID: '',
        approved: ''
      }
      showAlertDialog = (stdID,i) =>{
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
         firebase.database().ref('students/'+stdID).remove()
         this.state.studentsList.splice(i,1)
         //this.props.navigation.push('parentDashboard');
     }
   },
   ],
   {cancelable: false},
   );
 }
      constructor(props){
        super(props)
        this.state = {
          items : []
        }
      }

      editApprove= (approved,index,key) => {
        this.state.studentsList[index].approved=approved;
        this.forceUpdate()

        console.log(this.state.studentsList);
  console.log(this.state.studentsList.length);
        if (key != null){
          firebase.database().ref('students/'+key).update({
             approved:approved
           })
          Alert.alert('تم قبول الطالب');
        }

        console.log(this.state.studentsList);
     }//end edit child.

      componentDidMount(){ //to fetch data

console.log('from approve');
        firebase.auth().onAuthStateChanged((user) => {
    if (user) {

  var userId = firebase.auth().currentUser.uid;
  email= firebase.auth().currentUser.email;
  firebase.database().ref('managers/'+userId).on('value', snapshot => {

this.setState({inst: snapshot.val().instName})

})

this.setState({
  studentsList: []
});

firebase.database().ref('students/').on('value', (snap) => {
    let studentsList = [];
    snap.forEach((child) => {
      if (child.val().university === this.state.inst && child.val().approved == 0)
        studentsList.push({
            name: child.val().name ,
            busNo: child.val().busNo ,
            neighborhood: child.val().neighborhood ,
            phoneNo: child.val().phoneNo ,
            stdID: child.key,
            approved: child.val().approved
            //phoneNo: child.val().phoneNo ,


        })

    })//end snap for each
    this.setState({
      studentsList: studentsList
    });

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

/*removeCard(stdID){
  this.setState({ items:this.state.items.filter(items => u.stdID !== stdID)});
}*/
	render() {
    return (

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>


        { this.state.studentsList ?
           (
        this.state.studentsList.map((u,i) => {
console.log(this.state.studentsList);
            return (
                <Card  title={this.state.studentsList[i].name}  containerStyle={styles.cards} >

                <View style={styles.typeContainer}>
                <Text style={styles.paragraph} key={u.busNo}>رقم الحافلة: </Text>
                <Text style={styles.info}>{this.state.studentsList[i].busNo}</Text>
                </View>
                <View style={styles.typeContainer}>
                    <Text style={styles.paragraph} key={u.neighborhood}>الحي: </Text>
                    <Text style={styles.info}>{this.state.studentsList[i].neighborhood}</Text>
                    </View>
                    <View style={styles.typeContainer}>
                     <Text style={styles.paragraph} key={u.phoneNo}>رقم الجوال: </Text>
                     <Text style={styles.info}>{this.state.studentsList[i].phoneNo}</Text>
                     </View>



<View style={{flexDirection:'row-reverse'}}>
                                  <TouchableHighlight style={[styles.buttonContainer, styles.editButton,{ backgroundColor:'#F4D65B'}]}
                                  onPress ={() => this.editApprove('1',i,this.state.studentsList[i].stdID)}>
                                 <Text style={styles.editText}>قبول</Text>
                               </TouchableHighlight>
                               <TouchableHighlight style={[styles.buttonContainer, styles.editButton,{backgroundColor:'#DC143C'}]}
                               onPress={() => this.showAlertDialog(this.state.studentsList[i].stdID,i)}>
                              <Text style={styles.editText}>رفض</Text>
                            </TouchableHighlight>
                            </View>
                </Card>
            );
        })
      )
        :null}


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
    width: 75,
    height:30,
    bottom: 5,
    marginRight:7.5,
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
