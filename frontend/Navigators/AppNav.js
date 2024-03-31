import React,{ useContext } from 'react';
import { DrawerNavigator } from './drawer';
import { AuthContext } from './AuthContext';
// import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export const AppNav = () => {
  // const nav = useNavigation();
  const {isLoading, userToken} =  useContext(AuthContext);
  
  if (isLoading){
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size = {'large'}/>
    </View>
  }
  return (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
  )
}
