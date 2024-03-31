import React, {useContext} from 'react';
import { AuthContext } from './AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from '../components/Home';
import { useNavigation } from '@react-navigation/native';
import { Public_Questions } from '../components/publicQuestionsList';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { AnswersList } from '../components/AnswersList';
import { Login } from '../components/Login';
import SignUp from '../components/signUp';
import { CreateQuestions } from '../components/qus-creation';
import { Profile } from '../components/Profile';
import { YourQuestions } from '../components/YourQuestions';
import { Guidelines } from '../components/Guidelines';

const Headder = ({img, nav})=>{
    // console.log("---------------",img)
    return (
        <View style={{height:"100%", flex:1, flexDirection:'row', alignItems:'center'}}>
            <View style={{padding:38}}>
            <Image 
            style={{height:76, width:184}}
            source={require('../assets/logo-removebg-preview.png')}
            />
            </View>
            <TouchableOpacity onPress={()=>nav.navigate("Profile")} style={{backgroundColor:'silver',borderRadius:50 }}>
            <Image source={{uri : img}}
            resizeMode='stretch' height={40} width={40} style={{borderRadius:40}}/>
            {/* <Text>Profile</Text> */}
            </TouchableOpacity>
        </View>
    )
}

const Stack=createStackNavigator();

export const HomeStack=()=>{
    
    const nav=useNavigation();
    // console.log(userToken);
    return (
        <Stack.Navigator 
            screenOptions={
                {
                    headerStyle:{
                        backgroundColor:'white',
                    },
                    headerRight:()=>{
                        return (
                            <TouchableOpacity onPress={()=>nav.navigate("AuthStack", {screen:"Login"})}>
                                <Text style = {{fontSize : 27,marginRight:30,fontWeight:'bold'}}>Login</Text>
                            </TouchableOpacity> 
                        )
                    },
                    headerLeft:()=>{
                        return (
                        <TouchableOpacity>
                        <AntDesign name="menuunfold" onPress={()=>nav.toggleDrawer()} style={{padding:10}} size={24} color="black" />
                        </TouchableOpacity>
                        )
                    }
                }
        }>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Guidelines" component={Guidelines}/>
        </Stack.Navigator>
    )
}

export const AuthStack = () =>{
    const nav=useNavigation();
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}
                    options={{
                        headerLeft:()=>{
                            return (
                                <TouchableOpacity style={{padding:10}}>
                                <AntDesign name="arrowleft" onPress={()=> nav.goBack()} size={24} color="black" />
                                </TouchableOpacity>
                            )
                        }
                    }}
                />
                <Stack.Screen name="Sign Up" component={SignUp}/>
            </Stack.Navigator>
    )
}

export const YourQuestionsStack = ()=>{
    const nav= useNavigation();
    const {img, logout}= useContext(AuthContext);
    return (
        <Stack.Navigator
        screenOptions={
            {
                headerStyle:{
                    backgroundColor:'white',
                }
            }
        }
        >
            <Stack.Screen name="Your Questions" component={YourQuestions}
                options={{
                    headerStyle:{height:90},
                    headerTitle:()=>{return(<Headder img = {img} nav={nav}/>)},
                    headerLeft:()=>{
                        return (
                        <TouchableOpacity style={{paddingLeft:10}}>
                        <AntDesign name="menuunfold" onPress={()=>nav.toggleDrawer()} style={{padding:10}} size={24} color="black" />
                        </TouchableOpacity>
                        )
                    },
                }}
            />

            <Stack.Screen name="YourqsAns" component={AnswersList}
                options={{
                    headerStyle:{height:90},
                    headerTitle:()=>{return(<Headder img = {img} nav={nav}/>)},
                    headerLeft:()=>{
                        return (
                        <TouchableOpacity style={{paddingLeft:10}}>
                        <AntDesign name="arrowleft" onPress={()=>nav.navigate('Your Questions')} style={{padding:10}} size={24} color="black" />
                        </TouchableOpacity>
                        )
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export const PublicQuestionsStack = () =>{
    const nav= useNavigation();
    const {img, logout}= useContext(AuthContext);
    // console.log(img,"------------------")
    return (
    <Stack.Navigator
        screenOptions={
            {
                headerStyle:{
                    backgroundColor:'white',
                }
            }
        }
    >
        
        <Stack.Screen name="Public Questions" component={Public_Questions}
            options={{
                headerStyle:{height:90},
                headerTitle:()=>{return(<Headder img = {img} nav={nav}/>)},
                headerLeft:()=>{
                    return (
                    <TouchableOpacity style={{paddingLeft:10}}>
                    <AntDesign name="menuunfold" onPress={()=>nav.toggleDrawer()} style={{padding:10}} size={24} color="black" />
                    </TouchableOpacity>
                    )
                },
            }}
        />
        <Stack.Screen name="Answers" component={AnswersList}
            options={{
                headerStyle:{height:90},
                headerTitle:()=>{return(<Headder img = {img}  nav={nav}/>)},
                headerLeft:()=>{
                    return (
                    <TouchableOpacity style={{padding:10}}>
                    <AntDesign name="arrowleft" onPress={()=> nav.navigate('Public Questions')} size={24} color="black" />
                    </TouchableOpacity>
                    )
                }
            }}
        />
        <Stack.Screen name="Create" component={CreateQuestions}
            options={{
                    headerStyle:{height:90, borderBottomWidth:1},
                    headerTitle:()=>{return(<Headder img = {img} nav={nav}/>)},
                    headerLeft:()=>{
                        return (
                            <TouchableOpacity style={{padding:10}}>
                            <AntDesign name="arrowleft" onPress={()=> nav.goBack()} size={24} color="black" />
                            </TouchableOpacity>
                        )
                }
            }}
        />
        <Stack.Screen name="Profile" component={Profile} 
            options={{
                headerStyle:{height:90},
                headerTitle:()=>{return(
                    <View style={{height:"100%", flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{padding:38, paddingLeft:20}}>
                        <Image 
                        style={{height:76, width:184}}
                        source={require('../assets/logo-removebg-preview.png')}
                        />
                        </View>
                        <View style={{backgroundColor:'#EB5160', justifyContent:'center', alignItems:'center', height:30,borderRadius:45, width:70 }}>
                            <TouchableOpacity style={{height:"100%"}} onPress={()=>{logout();nav.navigate("AuthStack",{screen:"login"})}}>
                                <Text style={{textAlign:"center", paddingTop:5, color:'white'}}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )},
                headerLeft:()=>{
                    return (
                    <TouchableOpacity style={{paddingLeft:10}}>
                    <AntDesign name="menuunfold" onPress={()=>nav.toggleDrawer()} style={{padding:10}} size={24} color="black" />
                    </TouchableOpacity>
                    )
                },
            }}
        />
    </Stack.Navigator>    
    )
}