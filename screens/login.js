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
  import {createSwitchNavigator, createAppContainer } from 'react-navigation';
  import {createStackNavigator } from 'react-navigation-stack';
  import { createDrawerNavigator } from 'react-navigation-drawer';
  import Icon from 'react-native-vector-icons/Octicons';
  import firebase from 'firebase';
  import * as Font from 'expo-font';
  import {Platform} from 'react-native';
  import * as Permissions from 'expo-permissions';
import {Constants, Notifications} from 'expo';
  //import * as request from 'request';

export default class login extends React.Component {
  state = {
            email: '' ,
            password: '',
            errorMessage: null,
            visibilty: 'none',
            emailBorders:'#EAEAEA',
            passBorders:'#EAEAEA',
            fontLoaded: false,
            token:''
          }

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

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }



    firebase.auth().onAuthStateChanged( user => {
      if (!user) {//user is not logged in.
      //  this.textInput.clear();
        //this.textInput2.clear();
      }
    });
  }//end component will mount.



async componentDidMount(){
  // get expo push token
  console.log("componentDidMount");

  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    console.log("final status = " + finalStatus);
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
}//end if
console.log("final status = " + finalStatus);

if (finalStatus === 'granted'){
  console.log("final status = " + finalStatus);
try {
  let token = await Notifications.getExpoPushTokenAsync();
  this.setState({token: token})
    console.log("METHOD MY NOT" + token);
} catch(e){

  console.log(e.message);
}




}



}//componentDidMount end


    handleLogin = () => {
        if (this.state.email == '') {
          this.setState({emailBorders: 'red'})
          return;
        }
    /*  if (this.state.password == '') {
          this.setState({passBorders: 'red'})
            return;
        }*/






      const {email, password} = this.state
      const { navigation } = this.props;
      //we need to add code to check if user's account is verified or not.
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then((data) => {
          firebase.auth().onAuthStateChanged( user => {
            if (user) {
              this.userId = user.uid
              if (!user.emailVerified){
                Alert.alert("يرجى تفعيل البريد الإلكتروني");
              }
              else{

              firebase.database().ref('parents/'+user.uid).on('value', snapshot => {

                if (snapshot.exists()){
                navigation.navigate('parentDrawer');
                try{
                  const notTime = new Date();
                  notTime.setHours(20,0,0);
                  console.log(notTime)
                                   const localNotification = {
                                             title: 'لا تنس تحديث حالة حضور طفلك',
                                             body: 'ليلة سعيدة',
                                         };

                                         const schedulingOptions = {
                                             time: notTime.getTime(),

                                         }
                                         console.log(schedulingOptions);

                                         // Notifications show only when app is not active.
                                         // (ie. another app being used or device's screen is locked)
                                         Notifications.scheduleLocalNotificationAsync(
                                             localNotification, schedulingOptions
                                         );
                                       } catch(e) {console.log(e.message);}
                  return;}
            //  navigation.navigate('parentDashboard')
              });


              firebase.database().ref('drivers/'+user.uid).on('value', snapshot => {

                if (snapshot.exists()){

                try {navigation.navigate('driverDrawer');}
                catch(e){console.log(e.message);}}
                  return;
            //  navigation.navigate('parentDashboard')
              });


              firebase.database().ref('managers/'+user.uid).on('value', snapshot => {
                if (snapshot.exists()){
                  console.log("success!");
                  navigation.navigate('managerDrawer');

                  return;
                }

              });


              firebase.database().ref('students/'+user.uid).on('value', snapshot => {
                if (snapshot.exists()){
                  if (snapshot.val().approved=='0')
                    Alert.alert('لم يتم قبولك في الحافلة بعد')
                    else{
                      navigation.navigate('studentDrawer');
                      try{
                        const notTime = new Date();
                        notTime.setHours(20,0,0);
                        console.log(notTime)
                                         const localNotification = {
                                                   title: 'لا تنس تحديث أوقات دوامك',
                                                   body: 'ليلة سعيدة',
                                               };

                                               const schedulingOptions = {
                                                   time: notTime.getTime(),

                                               }
                                               console.log(schedulingOptions);

                                               // Notifications show only when app is not active.
                                               // (ie. another app being used or device's screen is locked)
                                               Notifications.scheduleLocalNotificationAsync(
                                                   localNotification, schedulingOptions
                                               );
                                             } catch(e) {console.log(e.message);}
                                           }
              }
                return;
              //navigation.navigate('parentDashboard')
              });



            }//end else
              //done searching
            }//end if the user registered in the db.
          });


        })
        .catch((error) => {
          console.log(error.message)

          this.setState({visibilty: 'flex'})
        })

    }


    validateEmail = (email) => {

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(this.state.email)== false)
      {
      this.setState({emailBorders:'red'})
        }
      else {
        this.setState({emailBorders:'#91b804'})
      }
    }//end validate phone number



  static navigationOptions = function(props) {
  return {
    drawerLabel:'الدخول',
    title: 'الدخول',

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
             <Image source={require('../assets/logo-white-borders.png')}
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
                    } }
                onEndEditing={(email) => this.validateEmail(email)}
                    />
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
              <TouchableHighlight style={styles.forgetPass}
                 onPress={() => this.props.navigation.push('forgetPassword')}>
                  <Text style={[styles.fontStyle,styles.forgetPassText]}> نسيت كلمة المرور؟</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.handleLogin}>

              <Text style={[styles.fontStyle,styles.loginText]}>تسجيل الدخول</Text>


              </TouchableHighlight>



         <View style={{flexDirection: 'row'}}>
    <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginLeft:20}} />
    <Text style={[{ color: 'grey', alignSelf:'center', paddingHorizontal:5},styles.fontStyle]}>أو</Text>
    <View style={{backgroundColor: 'grey', height: 0.5, flex: 1, alignSelf: 'center',marginRight:20}} />
  </View>
              <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]}
               onPress={() => this.props.navigation.navigate('registration')}>
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
  	width:250,
    marginBottom: 15,
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
