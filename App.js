import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
	StatusBar,
  TouchableHighlight,
  Image,
  Alert} from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';

import addBus from './screens/addBus'
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
						 <View style={styles.container}>
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

				 			<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
				 				<Text style={styles.loginText}>تسجيل الدخول</Text>
				 			</TouchableHighlight>

				 			<TouchableHighlight style={styles.forgetPass} onPress={() => this.onClickListener('restore_password')}>
				 					<Text style={styles.forgetPassText}> نسيت كلمة المرور؟</Text>
				 			</TouchableHighlight>
				 <View
				 style={{
				 	borderBottomColor: 'black',
				 	borderBottomWidth: 3,
				 }}
				 />
				 			<TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.onClickListener('register')}>
				 					<Text style={styles.registerText}>الجيل كمستخدم جديد</Text>
				 			</TouchableHighlight>
				 			</View>
				 		</View>
        </View>
    );
  }
}

class manageBuses extends React.Component {
	static navigationOptions = function(props) {
  return {
		drawerLabel:'إضافة حافلة',
    title: 'إضافة حافلة',
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
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F7FAFF',
},
smallContainer:{
	marginTop:100,
	 justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'white',
	borderRadius:10,
		width:300,
		height:400
},
inputContainer: {
		borderColor: '#EAEAEA',
		backgroundColor: '#FFFFFF',
		borderRadius:45,
		borderWidth: 2,
		width:250,
		height:45,
		marginBottom:20,
		flexDirection: 'row',
		//alignItems:'center'
},
email:{
		height:45,

		marginLeft:145,
		borderColor: '#EAEAEA',
		flex:1

},
pass:{
		height:45,
		marginLeft:170,
		borderBottomColor: '#FFFFFF',
		flex:1,
},

buttonContainer: {
	height:45,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom:20,
	width:250,
	borderRadius:30,
},
forgetPass: {
	height:45,
	flexDirection: 'row-reverse',
	//justifyContent: 'flex',
	//alignItems: 'center',
	marginBottom:20,
	width:250,
	borderRadius:30,
},
forgetPassText: {
color:'#8BC8E4',
fontSize:12,
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
  manageBuses: { screen: addBus },
});

const addBusesStack = createStackNavigator({
  manageBuses: { screen: addBus },
});

const MyDrawerNavigator = createDrawerNavigator({
  'الدخول': {
    screen: loginStack,
  },
  'إضافة حافلة': {
    screen: addBusesStack,
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
