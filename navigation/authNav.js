//AuthNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import login from '../screens/login'
import registration from '../screens/registration'
import asParent from '../screens/asParent'
import asStudent from '../screens/asStudent'
import asManager from '../screens/asManager'
import forgetPassword from '../screens/forgetPassword'
const AuthNavigation = createStackNavigator(
  {
    login: { screen: login },
    registration: { screen: registration },
    asParent: { screen: asParent },
    asStudent: { screen: asStudent },
    asManager: { screen: asManager },
      forgetPassword: { screen: forgetPassword },
  },
  {
    initialRouteName: 'login'
  }
)
export default AuthNavigation
