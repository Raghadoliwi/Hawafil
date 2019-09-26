import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert} from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {
constructor(props){
    super(props)
    this.state={typeOf:'university',
                name: '',
                email: '',
                password: '',
                phoneNo:'',
                nationalId : '',
                instName: '',}
    
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
  
    firebase.initializeApp(firebaseConfig);
  }
    
    addInstit = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( (data) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) { 
              this.userId = user.uid 
              firebase.database().ref('managers/'+this.userId).set(
                {
                  name: this.state.name,
                  phoneNo: this.state.phoneNo,
                  nationalId: this.state.nationalId,
                  instName:this.state.instName,
                })
            }
          });
    }).then(() => this.props.navigation.navigate('manageBuses'))
    //raghad plz edit the above line to the page you wanna navigate to after insertion

    .catch(error => this.setState({ errorMessage: error.message }))
}//end adding a parent
    
    render() {
        return (
                <View style={styles.container}>
                
                <View style={styles.smallContainer}>
                
                <Text style={styles.Main}> كـ مؤسسة تعليمية</Text>
            
                <Text style={styles.Sub}>معلومات ممثل المنشأة</Text>
                
                
                <View style={styles.inputContainer}>
                
                <TextInput style={styles.email}
                placeholder="الاسم"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                />

                </View>
                
                
                <View style={styles.inputContainer}>
                
                <TextInput style={styles.email}
                placeholder="البريد الإلكتروني"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                />
                
                </View>

                <View style={styles.inputContainer}>
                
                <TextInput style={styles.email}
                placeholder="رقم الهاتف"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={phoneNo => this.setState({ phoneNo })}
                value={this.state.phoneNo}
                />
                </View>
                
                <View style={styles.inputContainer}>
                
                <TextInput style={styles.email}
                placeholder="الهوية/الإقامة"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={nationalId => this.setState({ nationalId })}
                value={this.state.nationalId}
                />
                </View>
                
                <View style={styles.inputContainer}>
                
                <TextInput style={styles.pass}
                placeholder="كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                />
                </View>

                <Text style={styles.Sub}>معلومات المنشأة</Text>

                <View style={styles.typeContainer}>
                <TouchableHighlight style={[styles.typeButtonContainer, this.state.typeOf === 'school'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'school'})} >
                
                <Text style={styles.typeText}>مدرسة</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.typeButtonContainer, this.state.typeOf === 'university'?styles.pressedButton:styles.typeButton]} onPress ={()=> this.setState({typeOf:'university'})}>
                
                <Text style={styles.typeText}>جامعة</Text>
                </TouchableHighlight>
                </View>
 

                
                <View style={styles.inputContainertwo}>
        
                <TextInput style={styles.email}
                placeholder="اسم المنشأة"
                keyboardType="ascii-capable"
                underlineColorAndroid='transparent'
                onChangeText={instName => this.setState({ instName })}
                value={this.state.instName}
                />

                </View>

                <TouchableHighlight style={[styles.attachButtonContainer, styles.attachButton]} onPress={this.handleLogin}>
                
                <Text style={styles.signupText}>إرفاق الإثبات</Text>
                                
                </TouchableHighlight>
                <Text style={styles.SubSub}>*يسمح بملفات (PNG , PDF , JPG)</Text>
                
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addInstit}>
                
                <Text style={styles.signupText}>تسجيل جديد</Text>
                                
                </TouchableHighlight>
                
                </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 Main:{
                                 color:'#4C73CC',
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:20,
                                 marginTop:15,
                                fontSize:25,
                                 },
                                Sub:{
                                 color:'#9F9F9F',
                                 fontSize:15,
                                 marginBottom:10,
                                    
                                },
                                SubSub:{
                                 color:'#9F9F9F',
                                 fontSize:10,
                                 marginBottom:30,
                                },
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 flexDirection: 'row',   
                                 },
                                 smallContainer:{
                                 marginTop:70,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:650,
                                 },
                                    
                                 typeContainer:{
                                 justifyContent: 'center',
                                 
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 
                                 flex: 1,
                                 flexDirection: 'row',
                                 },
                                 
                                 inputContainer: {
                                 borderColor: '#EAEAEA',
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:45,
                                 borderWidth: 2,
                                 width:250,
                                 height:40,
                                 marginBottom:15,
                                textAlign:'right',
                                 
                                 },
    
                                inputContainertwo: {
                                 borderColor: '#EAEAEA',
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:45,
                                 borderWidth: 2,
                                 width:250,
                                 height:40,
                                 marginBottom:15,
                                
                                 
                                 },
                                 
                                 pass:{
                                 
                                 borderBottomColor: '#FFFFFF',
                                 flex:1,  
                                 alignSelf:'flex-end'
                                 },
                                 email:{
                                  borderBottomColor: '#FFFFFF',
                                   flex:1,  
                                 alignSelf:'flex-end'
                                 },
                                 
                                 buttonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'40%',
                                 borderRadius:30,
                            
                                 },
                                 typeButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:5,
                                 width:'38%',
                                 borderRadius:30,
                                 },
    
                                 attachButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 
                                 width:'30%',
                                 borderRadius:30,
                                     
                            
                                 },
    
                                 
                                 signupButton: {
                                 backgroundColor: "#4C73CC",
                                 },
    
                                typeButton: {
                                 backgroundColor: "#DFE8FB",
                                    marginLeft:10,
                                    marginRight:10,
                                    
                                 },
    
                                pressedButton: {
                                 backgroundColor: "#7597DB",
                                    marginLeft:10,
                                    marginRight:10,
                                    
                                 },
                                 attachButton: {
                                 backgroundColor: "#8BC8E4",
                                    
                                    
                                 },
                                signupText: {
                                 color: 'white',
                                 },
    
                                typeText: {
                                 color: 'white',
                                 },

                                 
                                 });