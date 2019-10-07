import * as React from 'react';
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
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';

export default class registration extends React.Component {
  static navigationOptions = function(props) {
  return {
    title: '',
    headerLeft: <View style={{paddingLeft:16}}>
       <Icon
           name="chevron-left"
           size={25}
           color='white'
           onPress={() => props.navigation.goBack()} />
   </View>,

   headerTintColor: 'white',
         headerStyle: {
            backgroundColor: "#4C73CC"
         }
 }
};

    render() {
        return (
                <View style={styles.container}>
                <Image source={require('.././assets/logo-white-borders.png')}
   						style={{resizeMode: 'cover',width: 200, height: 144, marginTop:10}}/>
                <View style={styles.smallContainer}>

                <Text style={styles.Main}> التسجيل كـ</Text>



                <TouchableHighlight style={[styles.firstButtonContainer, styles.typeButton]}
                onPress={() => this.props.navigation.push('asManager')}>

                <Text style={styles.firstText}>منشأة تعليمية</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.secondButtonContainer, styles.typeButton]}
                onPress={() => this.props.navigation.push('asParent')}>

                <Text style={styles.secondText}>ولي أمر طالب</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.thirdButtonContainer, styles.typeButton]}
                onPress={() => this.props.navigation.push('asStudent')}>

                <Text style={styles.thirdText}>طالب</Text>
                </TouchableHighlight>


                </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 Main:{
                                 color:'#EDC51B',
                                 flexDirection: 'row',

                                 marginBottom:20,
                                 marginTop:10,
                                fontSize:20,

                                textAlign:'center'
                                 },

                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 },
                                 smallContainer:{
                                 marginTop:20,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:275,
                                 height:300,
                                 shadowOpacity: 0.04,
                                         shadowRadius: 5,
                                         shadowColor: 'black',
                                         shadowOffset: { height: 0, width: 0 }
                                 },


                                 firstButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#5681D5',
                                 borderWidth:1,
                                 },
                                secondButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#8BC8E4',
                                 borderWidth:1,
                                 },
                                thirdButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#BBC3D4',
                                 borderWidth:1,
                                 },


                                typeButton: {
                                 backgroundColor: "#ffffff",
                                    margin:7,

                                },

                                firstText: {
                                 color: '#5681D5',
                                    fontSize:15,
                                 },
                                secondText: {
                                 color: '#8BC8E4',
                                    fontSize:15,
                                 },
                                thirdText: {
                                 color: '#BBC3D4',
                                    fontSize:15,
                                 },

                                 });
