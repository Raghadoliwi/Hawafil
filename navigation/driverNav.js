import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

/* Import all pages that a driver can access
import parentDashboard from '../screens/parentDashboard'
import addChild from '../screens/addChild'
import editChild from '../screens/editChild'
import editParent from '../screens/editParent'
*/
import driverDashboard from '../screens/driverDashboard'
import studentsList from '../screens/studentsList'
import logout from '../screens/logout'

const driverNavigation = createStackNavigator(
  {

    driverDashboard: { screen: driverDashboard },
    studentsList: { screen: studentsList },
        /*all pages that a driver can access from his home page not the drawer
      addChild: { screen: addChild },
      editChild: { screen: editChild },
      editParent: {screen: editParent}*/

  },
  {
    initialRouteName: 'driverDashboard'
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


const driverDrawer = createDrawerNavigator({
    'الرئيسية': {
      screen: driverNavigation,
    },

    'تسجيل الخروج': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'driverNavigation',
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

export default driverDrawer
