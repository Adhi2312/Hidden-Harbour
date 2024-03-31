import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import { HomeStack } from './Navigators/stack';
import { AuthContext, AuthProvider } from './Navigators/AuthContext';
import { AppNav } from './Navigators/AppNav';

export default function App() {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}

