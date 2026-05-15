import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screen/Splash';
import HomeScreen from '../screen/Home';
import RegisterScreen from '../screen/Register';
import LoginScreen from '../screen/Login';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}