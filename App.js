import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native"
import AuthProvider from './src/contexts/auth';

import Routes from './src/routes';

console.ignoredYellowBox=true

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#131313' style='light'/>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}
