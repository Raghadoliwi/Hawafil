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
        onMap : []
      }
    }

    componentDidMount(){ //to fetch data
      const { navigation } = this.props;
      var varOnMap = navigation.getParam('onMap', 'NO-NUM');
      console.log("On Map = " + onMap);
      this.setState({onMap: varOnMap})
}//end componentDidMount
//rendering code
  /*
  {this.state.markers.map(marker => (
      <Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
    ))}
*/

static navigationOptions = function(props) {
return {
  title: 'خريطة الطلاب',
  headerLeft: <View style={{paddingLeft:16, }}>
  <Icon
      name="chevron-left"
      size={30}
      color='white'
      onPress={() => {
  props.navigation.goBack()

      }} />
 </View>,

 headerTintColor: 'white',
       headerStyle: {
          backgroundColor: "#4C73CC"
       }
}
};

  render() {
   var markers = [
  {
    latitude: 24.7136,
    longitude: 46.6753,
    title: 'لمى القاسم',
    subtitle: 'سب تايتل'
  }
];
    return (
      <View style={styles.container}>
      <Text style={styles.paragraph}>
      تتبع على الخريطة
      </Text>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 24.7136,
          longitude: 46.6753,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
        //rendering
        /*
        //rendering code
          /*
          {this.state.markers.map(marker => (
              <Marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
        */

        {
        this.state.onMap.map((marker ) => {
          return (
            <Marker
            coordinate={{longitude: marker.long, latitude: marker.lat}}
            title={marker.name}
            />

          );//end return
        }
        )
      }//end rendering
      /*
        <Marker
     coordinate={{latitude: 24.699954,
            longitude: 46.652474}}
     title={'لمى القاسم'}
   />
   <Marker
coordinate={{latitude: 24.703847,
longitude: 46.653756}}
title={'رغد العليوي'}
/>
*/
      </MapView>
      </View>
    );
  }//end render
}//end class

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
    height: 400,
  },
});
