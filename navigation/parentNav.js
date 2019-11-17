import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import parentDashboard from '../screens/parentDashboard'
import addChild from '../screens/addChild'
import editChild from '../screens/editChild'
import editParent from '../screens/editParent'
import logout from '../screens/logout'
import parentCustomDrawer from './parentCustomDrawer';




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
    'parentNavigation': {
      screen: parentNavigation,
    },
    'editParentNavigation': {
      screen: editParentNavigation,
    },

    'logout': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'parentNavigation',
    contentComponent: parentCustomDrawer,
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
