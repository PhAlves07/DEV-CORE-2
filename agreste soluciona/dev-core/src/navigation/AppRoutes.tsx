// Tipos e recursos de navegacao entre telas do aplicativo.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import traz dependencias usadas por este arquivo.
import SplashScreen from '../screen/Splash';
// Import traz dependencias usadas por este arquivo.
import HomeScreen from '../screen/Home';
// Import traz dependencias usadas por este arquivo.
import RegisterScreen from '../screen/Register';
// Import traz dependencias usadas por este arquivo.
import LoginScreen from '../screen/Login';
// Import traz dependencias usadas por este arquivo.
import ProfileScreen from '../screen/Profile';
// Import traz dependencias usadas por este arquivo.
import ProviderScreen from '../screen/Provider';
// Import traz dependencias usadas por este arquivo.
import ProvidersFeed from '../screen/ProvidersFeed';
// Import traz dependencias usadas por este arquivo.
import ProviderDetailsScreen from '../screen/ProviderDetails';
// Import traz dependencias usadas por este arquivo.
import RequestServiceScreen from '../screen/RequestService';
// Import traz dependencias usadas por este arquivo.
import MyRequestsScreen from '../screen/MyRequests';
// Import traz dependencias usadas por este arquivo.
import ProviderDashboardScreen from '../screen/ProviderDashboard';
// Import traz dependencias usadas por este arquivo.
import ReviewProviderScreen from '../screen/ReviewProvider';
// Import traz dependencias usadas por este arquivo.
import ProviderReviewsScreen from '../screen/ProviderReviews';
// Import traz dependencias usadas por este arquivo.
import ChatScreen from '../screen/Chat';
// Import traz dependencias usadas por este arquivo.
import AdminDashboardScreen from '../screen/AdminDashboard';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Profile: { user?: unknown } | undefined;
  Provider: undefined;
  ProvidersFeed: {
    search?: string;
    profession?: string;
  } | undefined;
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
  ReviewProvider: {
    serviceRequestId: number;
    providerId: number;
    providerName: string;
  };
  ProviderReviews: {
    providerId: number;
    providerName: string;
  };
  Chat: {
    serviceRequestId: number;
  };
  AdminDashboard: undefined;
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

      <Stack.Screen
        name="ReviewProvider"
        component={ReviewProviderScreen}
      />

      <Stack.Screen
        name="ProviderReviews"
        component={ProviderReviewsScreen}
      />

      <Stack.Screen
        name="Chat"
        component={ChatScreen}
      />

      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
      />
    </Stack.Navigator>
  );
}
