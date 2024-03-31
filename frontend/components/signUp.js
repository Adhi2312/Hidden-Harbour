import { StatusBar } from "expo-status-bar"
import { SafeAreaView, View ,Text, TextInput, FlatList, TouchableOpacity, Image} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useKeyboardVisible } from "./keyboardVisible";
import { url } from "./dummy";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Navigators/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { AvatarData } from "./dummy";
// import { MaterialIcons } from '@expo/vector-icons';
// import { Registerstack } from "./stack"

const SignUp = () => {
    const nav = useNavigation();
    const {setAsync} = useContext(AuthContext)
    const keyBoard = useKeyboardVisible();
    const [username,setUsername]= useState();
    const [pas,setPas]= useState();
    const [conpas,setConpas]= useState();
    const [email,setEmail]= useState();
    const [height,setHeight] = useState(250);
    const [width,setWidth] = useState(350);
    const [Avatar,setAvatar] = useState('https://cdn-icons-png.flaticon.com/128/552/552909.png');
    const [color1,setColor] = useState('grey');
   
    
    

    const sign = async() =>{
        if (pas!=conpas){
            alert("Passwords does not match..");
            return ;
        }
        if(username.includes(" ")==true){
            alert("Username can contain only Alplabets, numerics and underscores")
        }
        try {
            const response = await fetch(url+'signUp',
            {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },  
                body:JSON.stringify({'user':{'username':username, 'email':email, 'password':pas},'img':Avatar})
            }); 
    
            const data = await response.json();
            console.log(data);
            if(data.Sucess==null) {alert(data.username);return ;}
            setAsync(data.Token,data.user.id, Avatar);
            nav.navigate("HomeStack",{screen:"Guidelines"})
        } catch (error) {
            console.log("signupErr")
            nav.navigate("HomeStack",{screen:"Guidelines"})
        }
        // nav.navigate("HomeStack")
    }
    return (

        <SafeAreaView style={{backgroundColor:color1,height:'100%'}}>
        <View style = {{shadowColor:'black',marginTop:(keyBoard)?10:50,marginLeft:20,borderBlockColor:'black'}}>

        <View style = {{alignItems:'center',justifyContent: 'center',marginTop:0, height:(keyBoard)?0:150}}>

            <Image source={{uri : Avatar}}
            style = {{height :(keyBoard)?0:150,width:(keyBoard)?0:150, borderRadius : 200,borderWidth:(keyBoard)?0:5,borderColor:'black'}}/>

        </View>

        <View style = {{display:'flex',flexDirection:'row',borderColor:'red',paddingRight:30,paddingLeft:8,paddingTop:(keyBoard)?0:20,alignItems:'center'}}>
            <Image source={{uri : "https://cdn.iconscout.com/icon/free/png-256/free-profile-3484746-2917913.png"}} style = {{height : 31,width : 35}}/>
            <TextInput onChangeText={text=>{setUsername(text)}} placeholder="Fullname" editable style={{borderBottomWidth:0.3,borderColor:"black" ,height:50,width : '90%'}}/>
        </View>

        <View style = {{display:'flex',flexDirection:'row',borderColor:'red',paddingRight:30,paddingLeft:10,paddingTop:40,alignItems:'center'}}>
            <MaterialIcons name="email" size={20} color="grey" />
            <TextInput onChangeText={text=>{setEmail(text)}} placeholder="Email" editable style = {{borderBottomWidth:0.3,width:'90%',marginLeft:10,borderColor:"black" ,height:50}} />
        </View>
        
        <View style = {{display:'flex',flexDirection:'row',borderColor:'red',paddingRight:30,paddingLeft:10,paddingTop:40,alignItems:'center'}}>
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <TextInput onChangeText={text=>{setPas(text)}} placeholder="Password" editable style = {{borderBottomWidth:0.3,width:'90%',marginLeft:10,borderColor:"black" ,height:50}} />
        </View>

        <View style = {{display:'flex',flexDirection:'row',borderColor:'red',paddingRight:30,paddingTop:40,paddingLeft:10,alignItems:'center'}}>
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <TextInput onChangeText={text=>{setConpas(text)}} placeholder="Confirm Password" editable style = {{borderBottomWidth:0.3,width:'90%',marginLeft:10,borderColor:"black" ,height:50}} />
        </View>

        <View style = {{alignItems:'center',justifyContent:'center',paddingRight:30,paddingTop:50}}>
            <TouchableOpacity onPress={()=>{sign();}} style={{backgroundColor:'#2AA18B',width:'100%',height:50,alignItems:'center',justifyContent:'center',borderRadius:20}}><Text style={{color:'white',alignItems:'center',justifyContent:'center'}}> Register </Text></TouchableOpacity>    
        </View>

        <View style = {{alignItems:'center',justifyContent:'center',paddingRight:30,paddingTop:50}}>
            <TouchableOpacity onPress={()=>nav.navigate('Login')}><Text style = {{fontSize:15,}}>Already have an account?</Text></TouchableOpacity>
        </View>

        </View>



        <View style={{height:height,width:width,position:'absolute',backgroundColor:'white',alignItems:'center',margin:'auto',marginLeft:20,marginVertical:250,display:'flex',borderRadius:15}}>
                <View style={{marginVertical:10}}>
                        <Text style={{fontSize:20}}>Choose your Avatar</Text>
                </View>
                <View style={{display:'flex',maxHeight:150,marginTop:30 }}>
                    <FlatList
                        data={AvatarData}
                        horizontal={true}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=>{
                            return (
                                <View style={{marginHorizontal:5}}>
                                    <TouchableOpacity onPress={()=>{setAvatar(item.img_url);setColor('white');setHeight(0)}}>
                                        <Image source={{uri:item.img_url}}  style={{height:90,width:90,borderRadius:100}} />

                                    </TouchableOpacity>
                                        
                                </View>

                            )

                        }}


                    />

                </View>
                <View style={{}}>
                    <TouchableOpacity onPress={()=>{setColor('white');setHeight(0)}}><Text style={{fontSize:15}}>Skip</Text></TouchableOpacity>
                </View>
               
        </View>
        </SafeAreaView>
    )
}
export default SignUp;