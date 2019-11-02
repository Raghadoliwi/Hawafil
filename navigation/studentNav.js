import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import stuCustomDrawer from './stuCustomDrawer';
import addChild from '../screens/addChild';
import studentDashboard from '../screens/studentDashboard'

/* Import all pages that a student can access
*/
import logout from '../screens/logout'

const studentNavigation = createStackNavigator(
  {

    studentDashboard: { screen: studentDashboard },


  },
  {
    initialRouteName: 'studentDashboard'
  }
)

/*Each page in the drawer shall have a separate stack
const editStudentNav = createStackNavigator(
  {
    addChild: { screen: addChild }
  },
  {
    initialRouteName: 'addBusDriver'
  }
)
*/


const studentDrawer = createDrawerNavigator({
    'studentNavigation': {
      screen: studentNavigation,
    },   'addChild': {
        screen: addChild,
      },
    'logout': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'studentNavigation',
    contentComponent: stuCustomDrawer,
  drawerWidth: 300,
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

export default studentDrawer
