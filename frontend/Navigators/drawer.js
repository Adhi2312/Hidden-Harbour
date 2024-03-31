import React,{useContext, useState} from "react";
import { AuthContext } from "./AuthContext";
import { DrawerItemList, DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack, PublicQuestionsStack, AuthStack, YourQuestionsStack } from "./stack";
import { Image, View, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Public_Questions } from "../components/publicQuestionsList";
import { Profile } from "../components/Profile";
// import {Answers } from "../components/Answers";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    const nav = useNavigation();
    const {login, logout, userToken} = useContext(AuthContext);
    const [yrq,setYrq] = useState((userToken==null)?0:'auto')
    return(
        <>
            <Drawer.Navigator 
                drawerContent={(props)=>{
                    return (
                      <View style={{flex:1, paddingTop:50, paddingBottom:10, backgroundColor:'white'}}>
                        <View style={{ justifyContent:'flex-start', alignItems:'center'}}>
                          <Image
                            style={{width:300, height:150, resizeMode:'contain'}}
                            source={require('../assets/logo-removebg-preview.png')}
                          />
                        </View>
                        <DrawerItemList {...props} />
                        {/* <DrawerItem label='Dev Info' 
                          onPress={()=>{Linking.openURL('https://dharun-the-deveoper.netlify.app/')}}  
                        /> */}
                        {(userToken==null)?
                          <DrawerItem label="login" onPress={()=>{nav.navigate('AuthStack', {Screen:'login'})}}/>
                          :<><DrawerItem label="logout" onPress={()=>{logout();nav.navigate("AuthStack",{screen:"login"})}}/></>
                        }
                        
                      </View>
                    )
                  }}
                  screenOptions={{headerShown:false}}
                  >
                <Drawer.Screen name='HomeStack' component={HomeStack} options={{title : "Home"}} />
                <Drawer.Screen name='AuthStack' component={AuthStack} options={{title : "Authentication", drawerItemStyle: { height: 0 }}} />
                <Drawer.Screen name='Public questions' component={PublicQuestionsStack} options={{title : "Public Questions"}}/>
                <Drawer.Screen name='YourQuestionStack' component={YourQuestionsStack} options={{title : "Your Questions"}}/>
                {/* <Drawer.Screen name = "pro" component={Profile} /> */}
            </Drawer.Navigator>
        </>
    )
}