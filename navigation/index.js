import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigation from './authNav'
import managerDrawer from './managerNav'
import parentDrawer from './parentNav'


const SwitchNavigator = createSwitchNavigator(
  {
    AuthNavigation: AuthNavigation,
    managerDrawer: managerDrawer,
    parentDrawer: parentDrawer,

  },
  {
    initialRouteName: 'AuthNavigation'
  }
)
const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer
