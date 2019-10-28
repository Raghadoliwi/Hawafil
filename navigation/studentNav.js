import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

/* Import all pages that a student can access
import parentDashboard from '../screens/parentDashboard'
import addChild from '../screens/addChild'
import editChild from '../screens/editChild'
import editParent from '../screens/editParent'
*/
import logout from '../screens/logout'

const studentNavigation = createStackNavigator(
  {
    /*all pages that a student can access from her home page not the drawer
    parentDashboard: { screen: parentDashboard },
      addChild: { screen: addChild },
      editChild: { screen: editChild },
      editParent: {screen: editParent}*/

  },
  {
    initialRouteName: ''
  }
)

/*Each page in the drawer shall have a separate stack
const addChildNavigation = createStackNavigator(
  {
    addChild: { screen: addChild }
  },
  {
    initialRouteName: 'addBusDriver'
  }
)
*/


const parentDrawer = createDrawerNavigator({
    'الرئيسية': {
      screen: studentNavigation,
    },

    'تسجيل الخروج': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'studentNavigation',
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

export default parentDrawer
