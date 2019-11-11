
import PropTypes from 'prop-types';
import React, {StyleSheet, Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View,Image} from 'react-native';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCogs } from '@fortawesome/free-solid-svg-icons'


class parentCustomDrawer extends Component {
  state = {
    name:'',
  email   : '',
  instName: '',
  }
  componentDidMount(){ //to fetch data

    firebase.auth().onAuthStateChanged((user) => {
if (user) {

var userId = firebase.auth().currentUser.uid;
email= firebase.auth().currentUser.email;
firebase.database().ref('parents/'+userId).on('value', snapshot => {


this.setState({
    name: snapshot.val().name,
    email: email,
});

});



console.log (userId);
console.log(this.state.name);




}
});



}
  navigateToScreen = (route) => () => {
       const {navigation} = this.props;
    navigation.navigate(route);
    navigation.closeDrawer();
  }

  render () {
    return (


      <View style={styles.container}>
        <ScrollView>
         {this.state.name ? (
        <View style={[styles.infoSection,{alignItems:'flex-end'}]}>
        <Image source={require('../assets/logo-white.png')}
       style={{resizeMode: 'cover',width: 100, height: 55,marginBottom:30}}/>
            <Text style={[styles.infoText,{fontSize: 20,fontWeight:'bold'}]}>
            {this.state.name}
            </Text>
            <Text style={[styles.infoText]}>
            {this.state.email}
            </Text>
          </View>
) : null}
        <View style={{padding: 10,display:'flex',justifyContent:'center',height:60,backgroundColor: '#EDF3FF'}}>
        <View style={{flexDirection:'row-reverse'}}>
      <FontAwesomeIcon icon={ faHome } size={ 20 } style={{color:'#6B82B6'}}/>
            <Text style={[styles.navHeaderStyle,{paddingRight: 10}]} onPress={this.navigateToScreen('parentDashboard')}>
الرئيسية
            </Text>
            </View>
          </View>


          <View style={{padding: 10,display:'flex',justifyContent:'center',height:60,backgroundColor: '#EDF3FF'}}>
          <View style={{flexDirection:'row-reverse'}}>
        <FontAwesomeIcon icon={ faCogs } size={ 20 } style={{color:'#6B82B6'}}/>
              <Text style={[styles.navHeaderStyle,{paddingRight: 10}]} onPress={this.navigateToScreen('editParent')}>
              تعديل البيانات
              </Text>
              </View>
            </View>


        </ScrollView>
        <View style={styles.footerContainer}>
        <View style={{flexDirection:'row-reverse'}}>

            <Text style={[styles.navHeaderStyle,{paddingRight: 10}]} onPress={this.navigateToScreen('logout')}>
            تسجيل الخروج
            </Text>
            </View>
        </View>
      </View>
    );
  }
}

parentCustomDrawer.propTypes = {
  navigation: PropTypes.object
};
const styles = {
  container: {

    flex: 1,
    backgroundColor: '#F9FBFF'
  },
  infoSection:{
    height:240,
    paddingRight:40,
    paddingTop: 60,
    paddingBottom:20,
    backgroundColor:'#4C73CC',
    textAlign: 'right',
  },
  navHeaderStyle: {

    color:'#6B82B6',

    textAlign: 'right',

  },
  navItemStyle: {
    padding: 10,
    textAlign: 'right',
      color:'#6B82B6',
  },
  navSectionStyle: {
    backgroundColor: '#EDF3FF',
    color:'#6B82B6',
    textAlign: 'right',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  infoText: {
    textAlign:'right',
    color:'white'
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#EDF3FF',
    color:'#6B82B6',
    textAlign: 'right',
  }

};
export default parentCustomDrawer;
