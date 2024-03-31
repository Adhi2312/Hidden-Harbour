import { View,Text,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React,{useContext,useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from "../Navigators/AuthContext";

export const Login=()=>{
    const {login, logout} = useContext(AuthContext);

    // const [pas,setPas]=useState(true);

    const [showPassword, setShowPassword] = useState(false); 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
    
    const nav=useNavigation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    return(
        <View style={styles.wr} >
            <View style={styles.input}>
              
            <Text style={{textAlign:'center',marginVertical:20,fontSize:20}}>LOGIN</Text>
            <TextInput style={styles.inputfield} placeholder="Enter your username" onChangeText={text=>{setUsername(text)}}/>
            <TextInput secureTextEntry={!showPassword} style={styles.inputfield} placeholder="Enter your password" onChangeText={text=>{setPassword(text)}}/>
            <TouchableOpacity onPress={()=>toggleShowPassword()} style={{height:20}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Ionicons name={(!showPassword)?"eye-outline":"eye-off-outline"} style={{paddingRight:7}} size={24} color="black" />
                    <Text>{(!showPassword)?"Show password.":"Hide Password"}</Text>
                </View>
            </TouchableOpacity>
                
            <View style = {{alignItems : 'center', justifyContent : 'center'}}>           
            <TouchableOpacity style={styles.button} onPress={()=>{console.log("hii"+username) ;login(username,password);nav.navigate("Public questions",{screen:"Public Questions"})}}><Text style={{color:'white'}} >Login</Text></TouchableOpacity>
            </View>
            <View style={{alignItems:"center", justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>nav.navigate("Sign Up")}>
                    <Text>Don't have an account? signIn</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
        
    );
}
const styles = StyleSheet.create({

    input:{
        
        
        padding:"10%",
        height:'auto',
        
        
        borderRadius:20,

        // marginHorizontal:10,
        // marginVertical:50,
     
        elevation:10,
        shadowColor:"black",
        backgroundColor:'white'
    },
    wr:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    inputfield:{paddingVertical:12,paddingLeft:15,marginVertical:20,width:280,borderWidth:1,borderColor:'grey',borderRadius:10},
    button:{justifyContent:"center",alignItems:'center',paddingVertical:12,elevation:1,paddingLeft:15,marginVertical:20,width:200,alignItems:'center',backgroundColor:'#2AA18B', borderRadius:10}
})