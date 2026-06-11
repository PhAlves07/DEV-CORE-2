import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screen/Splash';
import HomeScreen from '../screen/Home';
import RegisterScreen from '../screen/Register';
import LoginScreen from '../screen/Login';
import ProfileScreen from '../screen/Profile';
import ProviderScreen from '../screen/Provider';
import ProvidersFeed from '../screen/ProvidersFeed';
import ProviderDetailsScreen from '../screen/ProviderDetails';
import RequestServiceScreen from '../screen/RequestService';
import MyRequestsScreen from '../screen/MyRequests';
import ProviderDashboardScreen from '../screen/ProviderDashboard';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Profile: { user?: unknown } | undefined;
  Provider: undefined;
  ProvidersFeed: undefined;
  ProviderDetails: {
    providerId: number;
  };
  RequestService: {
    providerId: number;
    providerName: string;
  };
  MyRequests: undefined;
  ProviderDashboard: {
    providerId: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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

      <Stack.Screen
        name="ProviderDetails"
        component={ProviderDetailsScreen}
      />

      <Stack.Screen
        name="RequestService"
        component={RequestServiceScreen}
      />

      <Stack.Screen
        name="MyRequests"
        component={MyRequestsScreen}
      />

      <Stack.Screen
        name="ProviderDashboard"
        component={ProviderDashboardScreen}
      />
    </Stack.Navigator>
  );
}
