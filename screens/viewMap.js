import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class viewMap extends React.Component {
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
