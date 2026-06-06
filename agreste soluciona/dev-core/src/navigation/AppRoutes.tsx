import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screen/Splash';
import HomeScreen from '../screen/Home';
import RegisterScreen from '../screen/Register';
import LoginScreen from '../screen/Login';
import ProfileScreen from '../screen/Profile';
import ProviderScreen from '../screen/Provider';
import ProvidersFeed from '../screen/ProvidersFeed';

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
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
            <Stack.Screen
        name="Provider"
        component={ProviderScreen}
      />
                  <Stack.Screen
        name="ProvidersFeed"
        component={ProvidersFeed}
      />
    </Stack.Navigator>
  );
}