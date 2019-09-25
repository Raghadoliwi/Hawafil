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

import * as Font from 'expo-font';

import manageBuses from './screens/manageBuses'
import manageDrivers from './screens/manageDrivers'
import addBusDriver from './screens/addBusDriver'

//import addBus from './screens/addBus'

const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;

/*class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./assets/logo.png')}
        style={{ width: 60, height: 30 }}
      />
    );
  }
}*/

class login extends React.Component {


	UNSAFE_componentWillMount(){
    var config = {
      apiKey: "AIzaSyAtpvd_8Vhp9mLX8zOKmQrrQflrzURbEgk",
      authDomain: "hawafil-6face.firebaseapp.com",
      databaseURL: "https://hawafil-6face.firebaseio.com",
      projectId: "hawafil-6face",
      storageBucket: "hawafil-6face.appspot.com",
      messagingSenderId: "165149934110"
    };
      //firebase.initializeApp(config);

  state = {
            email: '' ,
            password: '',
            errorMessage: null
          }

    handleLogin = () => {
      const {email, password} = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage:
        error.message}))
      console.log('handleLogin')
    }
  }
	static navigationOptions = function(props) {
  return {
		drawerLabel:'الدخول',
    title: 'الدخول',
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<StatusBar
		         barStyle = "light-content"
		         hidden = {false}
		         backgroundColor = "#00BCD4"
		         translucent = {true}
		         networkActivityIndicatorVisible = {true}
		         />
						 <SafeAreaView style={styles.scrollArea}>
						 <ScrollView style={styles.scrollView}>
						 <View style={styles.container}>
						 <Image source={require('./assets/logo-white-borders.png')}
						style={{resizeMode: 'cover',width: 200, height: 144, marginTop:10}}/>
				 		<View style={styles.smallContainer}>

				 			<View style={styles.inputContainer}>


				 				<TextInput style={styles.email}
				 						placeholder="اسم المستخدم"
				 						keyboardType="ascii-capable"
				 						underlineColorAndroid='transparent'
				 						onChangeText={(email) => this.setState({email})}/>
				 			</View>

				 			<View style={styles.inputContainer}>

				 				<TextInput style={styles.pass}
				 						placeholder="كلمة المرور"
				 						secureTextEntry={true}
				 						underlineColorAndroid='transparent'
				 						onChangeText={(password) => this.setState({password})}/>
				 			</View>

							<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>

			        <Text style={styles.loginText}>تسجيل الدخول</Text>


			        </TouchableHighlight>

				 			<TouchableHighlight style={styles.forgetPass} onPress={() => this.onClickListener('restore_password')}>
				 					<Text style={styles.forgetPassText}> نسيت كلمة المرور؟</Text>
				 			</TouchableHighlight>

				 <View style={{flexDirection: 'row'}}>
    <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
    <Text style={{ color: 'grey', alignSelf:'center', paddingHorizontal:5}}>أو</Text>
    <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
</View>
				 			<TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.onClickListener('register')}>
				 					<Text style={styles.registerText}>التسجيل كمستخدم جديد</Text>
				 			</TouchableHighlight>
				 			</View>
				 		</View>
						</ScrollView>
						 </SafeAreaView>
        </View>

    );
  }
}


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
	container: {
	flex: 1,
	alignSelf: 'stretch',
	justifyContent: 'center',
	alignItems: 'center',
},
scrollArea: {
	flex: 1,
	alignSelf: 'stretch',
	backgroundColor: '#F7FAFF',
},
smallContainer:{
	marginTop:10,
	 justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'white',
	borderRadius:10,
		width:300,
		height:300
},
inputContainer: {
		borderColor: '#EAEAEA',
		backgroundColor: '#FFFFFF',
		borderRadius:45,
		borderWidth: 1,
		width:250,
		height:45,
		marginBottom:10,
		flexDirection: 'row',
		//alignItems:'center'
},
email:{
		height:45,
		textAlign:'right',
		marginRight:20,
		borderColor: '#EAEAEA',
		flex:1

},
pass:{
		height:45,
		textAlign:'right',
		marginRight:20,
		borderBottomColor: '#FFFFFF',
		flex:1,
},

buttonContainer: {
	height:45,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom:10,
	width:250,
	borderRadius:30,
},
forgetPass: {
	flexDirection: 'row-reverse',
	//justifyContent: 'flex',
	//alignItems: 'center',
	width:250
},
forgetPassText: {

color:'#8BC8E4',
fontSize:12,
fontWeight:'bold',
//marginLeft:'20'
},
loginButton: {
	backgroundColor: "#4C73CC",
},
loginText: {
	color: 'white'
},
registerButton: {
	backgroundColor: "white",
	borderColor:'#EDC51B',
	borderRadius:25,
	borderWidth :1
},
registerText:{
	 color: '#EDC51B'
}
});



const loginStack = createStackNavigator({
  login: { screen: login },
  manageBuses: { screen: manageBuses },
  manageDrivers: { screen: manageDrivers },
});

const manageBusesStack = createStackNavigator({
  manageBuses: { screen: manageBuses },
});
const manageDriversStack = createStackNavigator({
  manageBuses: { screen: manageDrivers },
});

const MyDrawerNavigator = createDrawerNavigator({
  'الدخول': {
    screen: loginStack,
  },
  'إدارة الحافلات': {
    screen: manageBusesStack,
  },
  'إدارة السائقين': {
    screen: manageDriversStack,
  },
  'إضافة سائق': {
    screen: addBusDriver,
  },
},
{
  initialRouteParams: 'loginStack',
  defaultNavigationOptions: {
    headerStyle: {
    backgroundColor: '#4C73CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}

);


const MyApp = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
  render() {
		return <MyApp />;

  }
}
