import React, { useState,useEffect} from 'react';
import { useContext } from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { url } from './dummy';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useKeyboardVisible } from './keyboardVisible';
// import { Question } from './PublicQuestion';
import { AuthContext } from "../Navigators/AuthContext";

export const YourQuestions = ()=>{
    const {userId} = useContext(AuthContext);
    const nav = useNavigation();
    const keyboard = useKeyboardVisible();
    const [data,setData]=useState(null);
    const [recent,setRecent] = useState(false);
    const [reload,setReload] = useState(false);
    const [ser,setSer] =useState("");
    const fet=async()=>{
        try {
            const x = (recent)?0:1;
            console.log("Your qus user id ",userId)
            if(userId == null) return ;
            const response = await fetch(url+"userQus/"+x+"/"+userId);
            const dat=await response.json();
            console.log(dat)
            setData(dat);
        } catch (error) {
            console.log("Your Qus Fetch error.")
            // nav.navigate("AuthStack",{screen:"login"})
        }
    };
    useEffect(()=>{fet();return ()=>{};},[recent,reload,keyboard]);

    const styles=StyleSheet.create({
        input:{
    
        },
        buttonR:{
            marginRight:10,
            width:(keyboard)?0:106,
            borderWidth:0.3,
            height:(keyboard)?0:40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:(!recent)?'#2AA18B':'white',
            borderRadius:25
    
        },
        buttonP:{
            marginRight:10,
            width:(keyboard)?0:106,
            borderWidth:0.3,
            height:(keyboard)?0:40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:(recent)?'#2AA18B':'white',
            borderRadius:25
    
        },
        box2:{
            height:50,
            width:50,
            backgroundColor:'#2AA18B',
            position: 'absolute',
            borderRadius:50,
            right:30,
            bottom:30
        }
    
    
    })

    const search= async()=>{
        if(ser=="") return;

        const res = await fetch(url+"searchQus/"+ser+"/"+userId+"/1");
        const dat = await res.json();
        setData(dat);

    }

    const Question = (pro) =>{
        const item = pro.props;
        const userId = pro.userId;
        const nav= useNavigation();
        // console.log(item)
        const del=async()=>{
            const res = await fetch(url+"deleteQus/"+item.id);
            setReload(!reload);
        }
        return (
            <TouchableOpacity onPress={()=>nav.navigate("YourqsAns",{id:item.id, qust:item.question, privateMes:item.allowPrivateMessages, created:item.created, answers:item.responses, user:item.user})} style={{borderBottomWidth:0.3,borderBottomColor:'grey',}}>
                <View style={{paddingVertical:10,display:'flex',flexDirection:'row',minHeight:100}}>
                    <View style={{width:'90%'}}>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <Text style={{marginRight:10,fontSize:14,color:'grey'}}>@{item.user.username}</Text>
                            <Text style={{marginRight:10,fontSize:14,color:'grey'}}>{item.created}</Text>
    
                        </View>
                        <View  style={{paddingVertical:8}}>
                            <Text style={{fontSize:17}}>{item.question}</Text>
                        </View>
    
                        <View style={{marginTop:6,marginBottom:0}}>
                            <Text style={{fontSize:12,color:'#2AA18B'}}>{item.responses} answers</Text>            
                        </View>
                                
                    </View>
                    <TouchableOpacity width={30} height={30} onPress={()=>{del()}}>
                        <FontAwesome name="trash-o" size={24} color="red" />
                        {/* <Text style={{fontSize:12,color:'grey', paddingLeft:5}}>{lkcnt}</Text> */}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

  return (
    <View style={{display:'flex',padding:10}}>
        <View height={"20%"} style={{borderBottomWidth:0}}>
            <View style={{alignItems:'center',paddingVertical:10,marginTop:12}}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'white',borderWidth:0.3,height:57,width:'100%',borderRadius:25}}>
                    <View style={{marginLeft:20,width:'80%'}}>
                        <TextInput onChangeText={text=>setSer(text)} placeholder='Search...'/>
                    </View>
                    <TouchableOpacity onPress={()=>{search()}} style={{marginLeft:10}}>
                        <FontAwesome5 name="search" size={24} color="#2AA18B" />
                    </TouchableOpacity>

                </View>
                

            </View>
            <View style={{height:(keyboard)?0:"10%",padding:10,display:'flex',flexDirection:'row',marginBottom:10}} >

                <TouchableOpacity onPress={()=>setRecent(false)} style={styles.buttonR} ><Text style={{color:(!recent)?'white':'black'}}>Recent</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>setRecent(true)} style={styles.buttonP} ><Text style={{color:(recent)?'white':'black'}}>Popular</Text></TouchableOpacity>

            </View>
        </View>
            <FlatList
                data = {data}
                style={{height:"80%"}}
                keyExtractor={item => item['id']}
                renderItem={({item})=>{
                    // console.log(item)
                    return(
                        <Question props={item} userId={userId}/>
                    );
                }}
            />
            <TouchableOpacity style={styles.box2} onPress={()=>nav.navigate('Create')}>
                <Text style={{textAlign:'center', fontSize:35, color:'white'}}>+</Text>
            </TouchableOpacity>
    </View>
  )

}