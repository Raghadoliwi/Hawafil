import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import renderManageDrivers from '../screens/renderManageDrivers';
import addBusDriver from '../screens/addBusDriver';
import editDriverForm from '../screens/editDriverForm';
import approveStudent from '../screens/approveStudent';
import mngCustomDrawer from './mngCustomDrawer';
import logout from '../screens/logout';

const managerNavigation = createStackNavigator(
  {
    renderManageDrivers: { screen: renderManageDrivers },
    addBusDriver: { screen: addBusDriver },
      editDriverForm: { screen: editDriverForm },
      approveStudent: { screen: approveStudent }

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
const approveStudentNavigation = createStackNavigator(
  {
    approveStudent: { screen: approveStudent }
  },
  {
    initialRouteName: 'approveStudent'
  }
)


const managerDrawer = createDrawerNavigator({
    'السائقين': {
      screen: managerNavigation,
    },
    'addDriverNavigation': {
      screen: addDriverNavigation,
    },
    'approveStudent': {
      screen: approveStudent,
    },
    'logout': {
      screen: logout,
    },

  },
  {
    initialRouteParams: 'managerNavigation',
    contentComponent: mngCustomDrawer,
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

export default managerDrawer
