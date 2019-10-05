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

  //import * as Font from 'expo-font';
  import registration from './screens/registration'
  import renderManageBuses from './screens/renderManageBuses'
  import renderManageDrivers from './screens/renderManageDrivers'
  import addBusDriver from './screens/addBusDriver'
  import addBus from './screens/addBus'
  import asParent from './screens/asParent'
  import asStudent from './screens/asStudent'
  import asManager from './screens/asManager'
  import logout from './screens/logout'
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



  }
  state = {
  fullName: '',
  email   : '',
  password: '',
  university:'',
  busNo:'',
  neighborhood:'',
  phoneNo : '',
  currentColor: '#EAEAEA'
  }

  validateNumber = (phoneNo) => {
    //Regex
    const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    if (!numRegex.test('0'+this.state.phoneNo)) {
      console.log('number bad');
      console.log('0'+this.state.phoneNo);


      }
      else {
      this.setState({currentColor: '#91b804'})
      }
}//end inserting a bus

  addStudent = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( (data) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
              this.userId = user.uid
              firebase.database().ref('students/'+this.userId).set(
                {
                  name: this.state.fullName,
                  phoneNo: this.state.phoneNo,
                  busNo: this.state.busNo,
                  neighborhood: this.state.neighborhood,
                  university:this.state.university,
                })
            }
          });
    }).then(() => this.props.navigation.navigate('login'))
    //raghad plz edit the above line to the page you wanna navigate to after insertion
    .catch(error => console.log(error.message))
}//end adding a parent





      forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)


      }

  	static navigationOptions = function(props) {
    return {
      title: 'التسجيل',
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

  				 			<View style={[styles.inputContainer, {borderColor:this.state.emailBorders}]}>


  				 				<TextInput style={styles.email}
  				 						placeholder="البريد الإلكتروني"
  				 						keyboardType="email-address"
  				 						underlineColorAndroid='transparent'
  				 						onChangeText={(email) => {
                        this.setState({email})
                        this.setState({visibilty: 'none'})
                        this.setState({emailBorders: '#EAEAEA'})
                        this.setState({passBorders: '#EAEAEA'})
                      } }/>
  				 			</View>

  				 			<View style={[styles.inputContainer, {borderColor:this.state.passBorders}]}>

  				 				<TextInput style={styles.pass}
  				 						placeholder="كلمة المرور"
  				 						secureTextEntry={true}
  				 						underlineColorAndroid='transparent'
  				 						onChangeText={(password) => {
                        this.setState({password})
                      this.setState({visibilty: 'none'})
                      this.setState({emailBorders: '#EAEAEA'})
                      this.setState({passBorders: '#EAEAEA'})
                    }
                    }/>
  				 			</View>

                <View >

  				 				<Text style={[styles.warning, {display: this.state.visibilty}]}> البريد الإلكتروني أو كلمة المرور غير صحيحة </Text>
  				 			</View>

  							<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                onPress={this.handleLogin}>

  			        <Text style={styles.loginText}>تسجيل الدخول</Text>


  			        </TouchableHighlight>

  				 			<TouchableHighlight style={styles.forgetPass} onPress={this.forgetPassword}>
  				 					<Text style={styles.forgetPassText}> نسيت كلمة المرور؟</Text>
  				 			</TouchableHighlight>

  				 <View style={{flexDirection: 'row'}}>
      <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
      <Text style={{ color: 'grey', alignSelf:'center', paddingHorizontal:5}}>أو</Text>
      <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
  </View>
  				 			<TouchableHighlight style={[styles.buttonContainer, styles.registerButton]}
                 onPress={() => this.props.navigation.push('registration')}>
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
    backgroundColor: '#FFFFFF',
    borderRadius:25,
    borderWidth: 1,
    width:250,
    height:40,
    marginBottom:15,
    paddingHorizontal:10,
  },
  email:{
  		height:45,
  		textAlign:'right',
  		marginRight:20,
  		flex:1

  },
  pass:{
  		height:45,
  		textAlign:'right',
  		marginRight:20,

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
  },
  warning:{
    color: 'red',
    fontSize:10,
    textAlign:'right',
    marginBottom:10,
  }
  });



  const loginStack = createStackNavigator({
    login: { screen: login },
    registration: { screen: registration },
    renderManageBuses: { screen: renderManageBuses },
    renderManageDrivers: { screen: renderManageDrivers },
    asParent: { screen: asParent },
    asStudent: { screen: asStudent },
    asManager: { screen: asManager },

  });

  const registrationStack = createStackNavigator({
    registration: { screen: registration },
  //  asOrganisation: { screen: RegisterOrganisation },
      asParent: { screen: asParent },
      asStudent: { screen: asStudent },
      asManager: { screen: asManager },
  //    asStudent: { screen: RegisterStudent }
  });

  const manageBusesStack = createStackNavigator({
    renderManageBuses: { screen: renderManageBuses },
    addBus: { screen: addBus }

  });
  const manageDriversStack = createStackNavigator({
    renderManageBuses: { screen: renderManageDrivers },
      addBusDriver: { screen: addBusDriver }
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
    'تسجيل الخروج': {
      screen: logout,
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
        return (
                <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
                <View style={styles.smallContainer}>
                <Text style={styles.header}>• ﻛ طالب •</Text>
                <Text style={styles.perInfo}>──── المعلومات الشخصية ────</Text>
                <View style={styles.inputContainer}>



                <TextInput style={styles.inputs}
                placeholder="الاسم"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(fullName) => this.setState({fullName})}
                value={this.state.fullName}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.inputs}
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.inputs}
                placeholder="كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                />
                </View>
                <View style={[styles.phoneContainer, {borderColor: this.state.currentColor}]}
                >

                <TextInput style={styles.keyText}
                value="+966"
                editable={false}
                />

                <TextInput style={[styles.phoneInput]}
                placeholder="رقم الجوال"
                keyboardType="numeric"
                ref="phoneNumber"
                underlineColorAndroid='transparent'
                onChangeText={(phoneNo) => this.setState({phoneNo})}
                onEndEditing={(phoneNo) => this.validateNumber(phoneNo)}
                value={this.state.phoneNo}
                />
                </View>


                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder="اسم الجامعة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(university) => this.setState({university})}
                value={this.state.university}
                />
                </View>


                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={(busNo) => this.setState({busNo})}
                value={this.state.busNo}

                />

                </View>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder=" الحي السكني"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(neighborhood) => this.setState({neighborhood})}
                  value={this.state.neighborhood}
                />

                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addStudent}>
                <Text style={styles.signUpText}>تسجيل</Text>
                </TouchableHighlight>

                </View>

                </KeyboardAwareScrollView>
                );
    }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',


                                 backgroundColor: '#F7FAFF',
                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:40,
                                   marginBottom:15,
                                   paddingHorizontal:10,

                                 },

                                 smallContainer:{

                                   justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                  borderRadius:10,
                                    width:300,
                                    height:600
                                 },

                                 header:{
                                 color: "#8197C6",
                                 fontSize: 20 ,//problema
                                 //fontWeight:900,
                                 bottom: 20,
                                 },

                                 perInfo:{
                                 color: "#9F9F9F",
                                 fontSize: 12 ,
                                 //fontWeight:100,
                                 bottom: 30,
                                 marginTop: 20,
                                 marginBottom:20,
                                 },
                                 inputs:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                textAlign:'right',
                                 borderColor: '#EAEAEA',
                                 marginLeft:10,

                                 },
                                 phoneContainer:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:25,
                                 borderWidth: 1,
                                 width:250,
                                 marginBottom:20,
                                 flexDirection: 'row',
                                 //justifyContent:'flex-end',
                                 justifyContent:'space-around',
                                 },

                                 phoneInput:{

                                 height:35,
                                 width:200,

                                 borderColor: '#EAEAEA',

                                 },

                                 keyNo:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:30,
                                 borderWidth: 1,
                                 width:30,
                                 height:35,
                                 alignItems:'right',
                                 // marginLeft: 250,


                                 //justifyContent:'flex-end',
                                 //alignItems:'flex-end',
                                 borderColor: '#EAEAEA'
                                 },

                                 keyText:{
                                 flex:1,
                                 height:40,
                                 textAlign:'center',
                                 //marginRight: 30,
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 borderColor: '#EAEAEA',
                                 color:'#646464' ,
                                 },

                                 /*inputIcon:{
                                  width:30,
                                  height:30,
                                  marginLeft:15,
                                  justifyContent: 'center'
                                  },*/


                                 inputDown:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,

                                 borderColor: '#EAEAEA',

                                 },
                                 MainContainer: {
                                    flex: 1,
                                    justifyContent: 'center',
                                    margin: 20

                                  },
                                 buttonContainer: {
                                 height:45,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 top: 20,
                                 width:250,
                                 borderRadius:30,
                                 },

                                 signupButton: {
                                 //backgroundColor: "#FF4DFF",
                                 width: 70,
                                 height:30,
                                 //top: 120,
                                 backgroundColor:"#3C68BF",
                                 //marginBottom: 300,
                                 },

                                 signUpText: {
                                 color: 'white',
                                 }

                                 });
