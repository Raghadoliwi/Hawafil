import React from 'react';
import { Text, View, StyleSheet,StatusBar, ScrollView, SafeAreaView,TouchableHighlight, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Linking } from 'expo';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;

export default class viewMap extends React.Component {
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

      }
    }

    componentDidMount(){ //to fetch data
      const { navigation } = this.props;
      var varOnMap = navigation.getParam('onMap', 'NO-NUM');
      console.log("On Map = " + varOnMap);
      this.setState({onMap: varOnMap})
}//end componentDidMount
//rendering code

static navigationOptions = function(props) {
return {

  headerLeft: <View style={{marginRight:16, paddingLeft:16,paddingTop:16,paddingBottom:16,paddingRight:16,flexDirection:'row-reverse',backgroundColor:'white',borderRadius:25,  shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },}}>
 <Text style={{color:'rgba(76, 115, 204, 1)', fontSize:16}}>عودة</Text>
 <Icon
     name="chevron-left"
     size={30}
     color='rgba(76, 115, 204, 1)'
     onPress={() => {
 props.navigation.goBack()

}} />
 </View>,

 headerTintColor: 'black',
       headerStyle: {
          backgroundColor: 'rgba(76, 115, 204, 0)',
          height:30,

       },
       headerTransparent: {
     position: 'absolute',
     backgroundColor: 'transparent',
     zIndex: 100,
     top: 0,
     left: 0,
     right: 0
   }
}
};


  render() {

    return (

      <View style={styles.container}>
<StatusBar barStyle='dark-content'/>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 24.7136,
          longitude: 46.6753,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >


        {this.state.onMap ?
           (
        this.state.onMap.map((u, i ) => {
        return (
          <Marker
          coordinate={{longitude: u.long, latitude: u.lat}}
          title={u.name}
          onCalloutPress={()=>{Linking.openURL('comgooglemaps://?q='+u.lat+','+u.long+'&center='+u.lat+','+u.long+'&zoom=14&views=traffic');}}
          />
        )


        }) )
        :null}


      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  mapStyle: {
    alignSelf: 'stretch',
    flex:1
  },
});
