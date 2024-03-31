import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground } from "react-native";
import { colors } from "../assets/colors";
import { AuthContext } from "../Navigators/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigation, NavigationAction } from "@react-navigation/native";

const image = "https://images.pexels.com/photos/5997863/pexels-photo-5997863.jpeg?cs=srgb&dl=pexels-marek-piwnicki-5997863.jpg&fm=jpg";

const HomeScreen=()=>{
    const nav=useNavigation();
    const {userToken, userId} = useContext(AuthContext);
    
    useEffect(()=>{
        if(userToken!=null && userId!=null) nav.navigate('Public questions', {screen:'Public Questions',params:{id:0}});
    },[]);

    return(

        <SafeAreaView style = {{backgroundColor:'#FFF' , height : '100%'}}>
            
            

            <View style = {{justifyContent: 'center',alignItems : 'center',marginTop : 41}}>
                <Image source={require('../assets/logo-removebg-preview.png')} style = {{width : 270,height : 148}} />
            </View>

            <View style = {{marginTop : 35, alignItems : 'center',justifyContent : 'center'}}> 
                <Image source = {require('../assets/hacker.jpg')}  style = {{ width : 270, height : 236}} />
            </View>

            <View style = {{justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize:20, padding : 10}}>Don't let yesterday take too much of Today.</Text>
            </View>

            <View style = {{marginTop : 52, alignItems : 'center',justifyContent : 'center'}}>
                <TouchableOpacity style={{width : 269,height : 48, backgroundColor: '#2AA18B',
                alignItems : 'center',justifyContent : 'center',borderRadius:25}} onLongPress={()=>console.log("lomg press...")} 
                    onPress={()=>{
                        console.log("user Token da : "+userToken)
                        if(userToken==null || userId==null){
                            nav.navigate('AuthStack',{screen:"Login"});
                        }
                        else nav.navigate("Public questions",{screen:"Public Questions",params:{id:0}})
                        }} >
                    <Text style={{color : 'white',textAlign:'center'}}>Press Here</Text>
                </TouchableOpacity>
            </View>
            <View style = {{justifyContent : 'center',alignItems : 'center',marginTop : 52}}>
                <Text style={{fontSize :20}}> "Respect others privacy" </Text>
            </View>

        </SafeAreaView>
    )


//     return (
//         <View style={{height:'100%'}}>
//             <ImageBackground source={{uri: image}} resizeMode="stretch" style={{flex:1}}>
//                 <Image source={require('../assets/logo-removebg-preview.png')} style={{ height:230, width:'auto'}}/>
//                 <View style={{justifyContent:'center', alignItems:'center', height:'50%'}}>    
//                     <TouchableOpacity onPress={() => {
//                         nav.navigate('AuthStack', {screen:'login'})}}>
//                         <View style={styles.mainBtn}>
//                             <Text style={{color:colors.three, padding:15, textAlign:'center'}}>Ask your annonymus questions here...</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//       </View>
//     )
}

const styles=StyleSheet.create(
    {
        mainBtn:{
            borderColor:colors.secondary,
            borderWidth:2,
            borderRadius:20,
            backgroundColor:colors.primary,
        }
    }
)

export default HomeScreen