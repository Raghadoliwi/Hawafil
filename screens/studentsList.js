import React from 'react';
//import react in our code.

import { Text, View, StyleSheet,StatusBar, ScrollView, SafeAreaView,TouchableHighlight, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';
import editParent from './editParent';
import editChild from './editChild';
import addChild from './addChild';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

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

        }
      }
      componentDidMount(){ //to fetch data
        const { navigation } = this.props;
              var rideTime = navigation.getParam('rideTime', 'NO-NUM');
              var busNo = navigation.getParam('busNo', 'NO-NUM');

              if (rideTime==='morning'){
              var mornStudents = navigation.getParam('mornStudents', '');
              this.setState({
                rideTime:rideTime,
                busNo:busNo,
                mornStudents:mornStudents
              });
            }
              else if (rideTime==='noon'){
              var noonStudents = navigation.getParam('noonStudents', '');
              this.setState({
                rideTime:rideTime,
                busNo:busNo,
                noonStudents:noonStudents
              });
            }
              else if (rideTime==='afternoon'){
              var afternoonStudents = navigation.getParam('afternoonStudents', '');
              this.setState({
                rideTime:rideTime,
                busNo:busNo,
                afternoonStudents:afternoonStudents
              });
            }
            else if (rideTime==='attendees'){
            var attendees = navigation.getParam('attendees', '');
            this.setState({
              rideTime:rideTime,
              busNo:busNo,
              attendees:attendees
            });
          }





}

static navigationOptions = function(props) {
return {
  title: 'تعديل البيانات الشخصية',
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
    const enrolledStudents = () => {
      let enrolledStudents='';
      console.log(this.state.rideTime);
      console.log(this.state.mornStudents);
              const options = [];
        switch(this.state.rideTime) {

          case 'morning':

    options.push(<View style={{flexDirection: 'row',marginTop:20}}>
 <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
 <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.titles]}>ركاب رحلة 6:00 صباحًا</Text>
 <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
</View>);
        for (let i = 0; i < this.state.mornStudents.length; i++) {
          options.push(<Card containerStyle={styles.cards} key={this.state.mornStudents[i].studentKey}>
            <View style={{flexDirection:'row-reverse'}}>
            <Text style={styles.paragraph} >{this.state.mornStudents[i].name}</Text>
            </View>

            <View style={{flexDirection:'row-reverse'}}>
            <Text style={styles.paragraph} >الحي: </Text>
            <Text style={styles.info}>{this.state.mornStudents[i].neighborhood}</Text>
            </View>

            <View style={{flexDirection:'row-reverse'}}>
            <Text style={styles.paragraph} >رقم الجوال: </Text>
            <Text style={styles.info}>{this.state.mornStudents[i].phoneNo}</Text>
            </View>
<View style={{flexDirection:'row-reverse',justifyContent:'flex-end',marginTop:10,alignItems:'center',marginBottom:10}}>
              <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{  backgroundColor: "#EDC51B"}]}
               onPress={null}>
 <View>
                  <FontAwesomeIcon icon={ faComment } size={ 20 } style={{color:'white'}}/>

                  </View>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton, {  backgroundColor: "#3C68BF",}]}
               onPress={null}>
              <View>
              <FontAwesomeIcon icon={ faMapMarkerAlt } size={ 20 } style={{color:'white'}}/>

                  </View>
              </TouchableHighlight>
</View>
            </Card>);
        }

        return options;
                  break;

                  case 'noon':
                options.push(<View style={{flexDirection: 'row',marginTop:20}}>
                <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
                <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.titles]}>رحلة 1:00 ظهرًا</Text>
                <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
                </View>);
                for (let i = 0; i < this.state.noonStudents.length; i++) {
                  options.push(<Card containerStyle={styles.cards} key={this.state.noonStudents[i].studentKey}>
                    <View style={{flexDirection:'row-reverse'}}>
                    <Text style={styles.paragraph} >{this.state.noonStudents[i].name}</Text>
                    </View>

                    <View style={{flexDirection:'row-reverse'}}>
                    <Text style={styles.paragraph} >الحي: </Text>
                    <Text style={styles.info}>{this.state.noonStudents[i].neighborhood}</Text>
                    </View>

                    <View style={{flexDirection:'row-reverse'}}>
                    <Text style={styles.paragraph} >رقم الجوال: </Text>
                    <Text style={styles.info}>{this.state.noonStudents[i].phoneNo}</Text>
                    </View>
                <View style={{flexDirection:'row-reverse',justifyContent:'flex-end',marginTop:10,alignItems:'center',marginBottom:10}}>
                      <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{  backgroundColor: "#EDC51B"}]}
                       onPress={null}>
                <View>
                          <FontAwesomeIcon icon={ faComment } size={ 20 } style={{color:'white'}}/>

                          </View>
                      </TouchableHighlight>

                      <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton, {  backgroundColor: "#3C68BF",}]}
                       onPress={null}>
                      <View>
                      <FontAwesomeIcon icon={ faMapMarkerAlt } size={ 20 } style={{color:'white'}}/>

                          </View>
                      </TouchableHighlight>
                </View>
                    </Card>);
                }

                return options;
                          break;

                          case 'afternoon':

                    options.push(<View style={{flexDirection: 'row',marginTop:20}}>
                 <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
                 <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.titles]}>رحلة 3:00 عصرًا</Text>
                 <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
                </View>);
                        for (let i = 0; i < this.state.afternoonStudents.length; i++) {
                          options.push(<Card containerStyle={styles.cards} key={this.state.afternoonStudents[i].studentKey}>
                            <View style={{flexDirection:'row-reverse'}}>
                            <Text style={styles.paragraph} >{this.state.afternoonStudents[i].name}</Text>
                            </View>

                            <View style={{flexDirection:'row-reverse'}}>
                            <Text style={styles.paragraph} >الحي: </Text>
                            <Text style={styles.info}>{this.state.afternoonStudents[i].neighborhood}</Text>
                            </View>

                            <View style={{flexDirection:'row-reverse'}}>
                            <Text style={styles.paragraph} >رقم الجوال: </Text>
                            <Text style={styles.info}>{this.state.afternoonStudents[i].phoneNo}</Text>
                            </View>
                <View style={{flexDirection:'row-reverse',justifyContent:'flex-end',marginTop:10,alignItems:'center',marginBottom:10}}>
                              <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{  backgroundColor: "#EDC51B"}]}
                               onPress={null}>
                 <View>
                                  <FontAwesomeIcon icon={ faComment } size={ 20 } style={{color:'white'}}/>

                                  </View>
                              </TouchableHighlight>

                              <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton, {  backgroundColor: "#3C68BF",}]}
                               onPress={null}>
                              <View>
                              <FontAwesomeIcon icon={ faMapMarkerAlt } size={ 20 } style={{color:'white'}}/>

                                  </View>
                              </TouchableHighlight>
                </View>
                            </Card>);
                        }

                        return options;
                                  break;

                                  case 'attendees':

                                  options.push(<View style={{flexDirection: 'row',marginTop:20}}>
                                  <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
                                  <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.titles]}>ركاب رحلة اليوم</Text>
                                  <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
                                  </View>);
                                  for (let i = 0; i < this.state.attendees.length; i++) {
                                  options.push(<Card containerStyle={styles.cards} key={this.state.attendees[i].studentKey}>
                                    <View style={{flexDirection:'row-reverse'}}>
                                    <Text style={styles.paragraph} >{this.state.attendees[i].name}</Text>
                                    </View>

                                    <View style={{flexDirection:'row-reverse'}}>
                                    <Text style={styles.paragraph} >الحي: </Text>
                                    <Text style={styles.info}>{this.state.attendees[i].neighborhood}</Text>
                                    </View>

                                    <View style={{flexDirection:'row-reverse'}}>
                                    <Text style={styles.paragraph} >رقم الجوال: </Text>
                                    <Text style={styles.info}>{this.state.attendees[i].phoneNo}</Text>
                                    </View>
                                  <View style={{flexDirection:'row-reverse',justifyContent:'flex-end',marginTop:10,alignItems:'center',marginBottom:10}}>
                                      <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton,{  backgroundColor: "#EDC51B"}]}
                                       onPress={null}>
                                  <View>
                                          <FontAwesomeIcon icon={ faComment } size={ 20 } style={{color:'white'}}/>

                                          </View>
                                      </TouchableHighlight>

                                      <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton, {  backgroundColor: "#3C68BF",}]}
                                       onPress={null}>
                                      <View>
                                      <FontAwesomeIcon icon={ faMapMarkerAlt } size={ 20 } style={{color:'white'}}/>

                                          </View>
                                      </TouchableHighlight>
                                  </View>
                                    </Card>);
                                  }

                                  return options;
                                          break;

          default:      return <Text>nothing</Text>
        }
      }

    return (

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>
<View>{enrolledStudents()}</View>

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
title: {
  marginTop: 10,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'right',
    color: '#3C68BF',
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
  color: '#a8a8a8',

},


  cards:{
    borderRadius: 25, width: 325, marginTop: 20, borderWidth: 0.5, shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },


  }
  ,

  buttonContainer: {
    height:45,
    flex: 1,
  alignSelf:'center',
   justifyContent: 'center',
   alignItems: 'center',
    marginBottom:10,
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
  viewStudentsButtonContainer: {
    height:45,
    alignSelf:'flex-start' ,
  	justifyContent: 'center',
    flexDirection:'row-reverse',
  	alignItems: 'center',
    marginRight:5,
  	width:50,
  	borderRadius:30,
    color:'white'
 },
 
  viewStudentsText:{
     color: 'white',

  },


  addText: {
    color: 'white',
    fontSize: 18 ,
		fontWeight:'bold'
  },
  fontStyle:{
    color:'white'
  },
  titles:{
    color:'#3C68BF',
    fontSize:16
  }
});
