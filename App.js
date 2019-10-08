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
  import * as Font from 'expo-font';

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
  import forgetPassword from './screens/forgetPassword'
  import driverDashboard from './screens/driverDashboard'
  import parentDashboard from './screens/parentDashboard'
  import studentDashboard from './screens/studentDashboard'
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
    state = {
              email: '' ,
              password: '',
              errorMessage: null,
              visibilty: 'none',
              emailBorders:'#EAEAEA',
              passBorders:'#EAEAEA',
              fontLoaded: false


            }
  /*  async componentDidMount() {
    await Font.loadAsync({
      'Tajawal': require('./assets/fonts/Tajawal.ttf'),
      'Tajawal-Medium': require('./assets/fonts/Tajawal-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }*/

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

      firebase.initializeApp(firebaseConfig);

      firebase.auth().onAuthStateChanged( user => {
        if (!user) {//user is not logged in.
          this.textInput.clear();
          this.textInput2.clear();
        }
      });
    }//end component will mount.




      handleLogin = () => {
          if (this.state.email == '') {
            this.setState({emailBorders: 'red'})
            return;
          }
          if (this.state.password == '') {
            this.setState({passBorders: 'red'})
              return;
          }
        const {email, password} = this.state
        const { navigation } = this.props;

        firebase
          .auth()
          .signInWithEmailAndPassword(email,password)
          .then((data) => {
            firebase.auth().onAuthStateChanged( user => {
              if (user) {
                this.userId = user.uid

                //Search in managers
                firebase.database().ref('managers/'+this.userId).once('value').then(function(snapshot) {
                  //raghad plz change the below line to the page you wanna navigate to
                  navigation.navigate('renderManageDrivers')
                })
                //Search in drivers
                firebase.database().ref('drivers/'+this.userId).once('value').then(function(snapshot) {
                  navigation.navigate('driverStack')
                })
                //Search in parents
                firebase.database().ref('parents/'+this.userId).once('value').then(function(snapshot) {

              navigation.push('parentDashboard')


                })
                //Search in students
                firebase.database().ref('students/'+this.userId).once('value').then(function(snapshot) {
                  navigation.navigate('studentStack')
                })
                //done searching
              }
            });


          })
          .catch((error) => {
            console.log(error.message)

            this.setState({visibilty: 'flex'})
          })

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
      headerTitleStyle: {
  //  fontFamily:'Tajawal-Medium'
    },
  		headerTintColor: 'white',
  		      headerStyle: {
  		         backgroundColor: "#4C73CC"
  		      },

  	}
  };



    render() {
      const { fontLoaded } = this.state


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
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


              </View>
  				 			<View style={[styles.inputContainer, {borderColor:this.state.emailBorders}]}>


  				 				<TextInput style={[styles.fontStyle,styles.email]}
                      ref={input => { this.textInput = input }}
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

  				 				<TextInput style={[styles.pass,styles.fontStyle]}
                      ref={input => { this.textInput2 = input }}
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

  				 				<Text style={[styles.fontStyle,styles.warning, {display: this.state.visibilty}]}> البريد الإلكتروني أو كلمة المرور غير صحيحة </Text>
  				 			</View>

  							<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                onPress={this.handleLogin}>

  			        <Text style={[styles.fontStyle,styles.loginText]}>تسجيل الدخول</Text>


  			        </TouchableHighlight>

  				 			<TouchableHighlight style={styles.forgetPass}
                   onPress={() => this.props.navigation.push('forgetPassword')}>
  				 					<Text style={[styles.fontStyle,styles.forgetPassText]}> نسيت كلمة المرور؟</Text>
  				 			</TouchableHighlight>

  				 <View style={{flexDirection: 'row'}}>
      <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
      <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.fontStyle]}>أو</Text>
      <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
  </View>
  				 			<TouchableHighlight style={[styles.buttonContainer, styles.registerButton]}
                 onPress={() => this.props.navigation.push('registration')}>
  				 					<Text style={[styles.fontStyle,styles.registerText]}>التسجيل كمستخدم جديد</Text>
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
  		height:300,
      //fontFamily: 'Yaseer',
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
  		flex:1,


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
  	 color: '#EDC51B',

  },
  warning:{
    color: 'red',
    fontSize:10,
    textAlign:'right',
    marginBottom:10,
  },
  fontStyle:{
   //fontFamily:'Tajawal'
  }
  });



  const loginStack = createStackNavigator({
    login: { screen: login },
    forgetPassword: { screen: forgetPassword },
    registration: { screen: registration },
    renderManageBuses: { screen: renderManageBuses },
    renderManageDrivers: { screen: renderManageDrivers },
    asParent: { screen: asParent },
    asStudent: { screen: asStudent },
    asManager: { screen: asManager },
    driverDashboard: { screen: driverDashboard },
    parentDashboard: { screen: parentDashboard },
    studentDashboard: { screen: studentDashboard },
  });

  const registrationStack = createStackNavigator({
    registration: { screen: registration },
  //  asOrganisation: { screen: RegisterOrganisation },
      asParent: { screen: asParent },
      asStudent: { screen: asStudent },
      asManager: { screen: asManager },
  //    asStudent: { screen: RegisterStudent }
  });

  const managerStack = createStackNavigator({
    renderManageBuses: { screen: renderManageDrivers },
      addBusDriver: { screen: addBusDriver }
  });

  const driverStack = createStackNavigator({
    driverDashboard: { screen: driverDashboard },
  });

  const parentStack = createStackNavigator({
    parentDashboard: { screen: parentDashboard },
  });

  const studentStack = createStackNavigator({
    studentDashboard: { screen: studentDashboard },
  });

  const MyDrawerNavigator = createDrawerNavigator({
    'الدخول': {
      screen: loginStack,
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
  		return <MyApp />;

    }
  }
