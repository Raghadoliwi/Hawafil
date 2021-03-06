import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import renderManageDrivers from '../screens/renderManageDrivers';
//import addBusDriver from '../screens/addBusDriver';
import editDriverManagerSide from '../screens/editDriverManagerSide';
import approveStudent from '../screens/approveStudent';
import editManagerForm from '../screens/editManagerForm';
import mngCustomDrawer from './mngCustomDrawer';
import addBusDriver from '../screens/addBusDriver';

//import managerDashboard from '../screens/managerDashboard';
import logout from '../screens/logout';

const managerNavigation = createStackNavigator(
  {
    renderManageDrivers: { screen: renderManageDrivers },
    editDriverManagerSide: { screen: editDriverManagerSide },
    editManagerForm: {screen: editManagerForm},
    addBusDriver: {screen: addBusDriver},
  //  addBusDriver: { screen: addBusDriver },
    //  editDriverForm: { screen: editDriverForm },
      approveStudent: { screen: approveStudent }

  },
  {
    initialRoutseName: 'renderManageDrivers'
  }
)

const editManagerNavigation = createStackNavigator(
  {
    editManagerForm: { screen: editManagerForm }
  },
  {
    initialRouteName: 'editManagerForm'
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
    editDriverManagerSide: { screen: editDriverManagerSide }
  },
  {
    initialRouteName: 'editDriverManagerSide'
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
