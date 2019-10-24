import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import renderManageDrivers from '../screens/renderManageDrivers'
import addBusDriver from '../screens/addBusDriver'
import editDriverForm from '../screens/editDriverForm'
import logout from '../screens/logout'

const managerNavigation = createStackNavigator(
  {
    renderManageDrivers: { screen: renderManageDrivers },
    addBusDriver: { screen: addBusDriver },
      editDriverForm: { screen: editDriverForm }

  },
  {
    initialRouteName: 'renderManageDrivers'
  }
)

const addDriverNavigation = createStackNavigator(
  {
    addBusDriver: { screen: addBusDriver }
  },
  {
    initialRouteName: 'addBusDriver'
  }
)

const editDriverNavigation = createStackNavigator(
  {
    editDriverForm: { screen: editDriverForm }
  },
  {
    initialRouteName: 'editDriverForm'
  }
)


const managerDrawer = createDrawerNavigator({
    'السائقين': {
      screen: managerNavigation,
    },
    'إضافة قائد مركبة': {
      screen: addDriverNavigation,
    },
    'تسجيل الخروج': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'managerNavigation',
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

export default managerDrawer
