import React from 'react';
import { View, Text, Button ,StatusBar, Image} from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import addBus from './screens/addBus'

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

class Login extends React.Component {

	static navigationOptions = {
	title: 'الدخول',
	headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
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
			  <Text>Add a bus</Text>
				<Button
          title="Go to Manage"
          onPress={() => this.props.navigation.navigate('addBus')}
        />
      </View>
    );
  }
}



const RootStack = createStackNavigator(
  {
    Login: Login,
    addBus: addBus,
  },
  {
    initialRouteParams: 'Login',
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

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
