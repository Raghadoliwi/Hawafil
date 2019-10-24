import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import parentDashboard from '../screens/parentDashboard'
import addChild from '../screens/addChild'
import editChild from '../screens/editChild'
import editParent from '../screens/editParent'
import logout from '../screens/logout'



const parentNavigation = createStackNavigator(
  {
    parentDashboard: { screen: parentDashboard },
      addChild: { screen: addChild },
      editChild: { screen: editChild },
      editParent: {screen: editParent}

  },
  {
    initialRouteName: 'parentDashboard'
  }
)

const addChildNavigation = createStackNavigator(
  {
    addChild: { screen: addChild }
  },
  {
    initialRouteName: 'addBusDriver'
  }
)

const editChildNavigation = createStackNavigator(
  {
    editChild: { screen: editChild }
  },
  {
    initialRouteName: 'editChild'
  }
)

const editParentNavigation = createStackNavigator(
  {
    editParent: { screen: editParent }
  },
  {
    initialRouteName: 'editParent'
  }
)

const parentDrawer = createDrawerNavigator({
    'الرئيسية': {
      screen: parentNavigation,
    },
    'تعديل البيانات': {
      screen: editParentNavigation,
    },

    'تسجيل الخروج': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'parentNavigation',
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
