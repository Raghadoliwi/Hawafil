import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigation from './authNav'
import managerDrawer from './managerNav'
import parentDrawer from './parentNav'
import studentDrawer from './studentNav'

const SwitchNavigator = createSwitchNavigator(
  {
    AuthNavigation: AuthNavigation,
    managerDrawer: managerDrawer,
    parentDrawer: parentDrawer,
    studentDrawer: studentDrawer

  },
  {
    initialRouteName: 'AuthNavigation'
  }
)
const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer
