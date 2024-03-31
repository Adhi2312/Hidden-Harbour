import { SafeAreaView, StyleSheet,View ,Text, Image, TouchableOpacity, FlatList} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import YourPieChart from "./chart";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { url } from "./dummy";
import { AuthContext } from "../Navigators/AuthContext";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
    const nav = useNavigation()
    const {userId,img} = useContext(AuthContext);
    const[heigh,setHeig] = useState(false);
    const [pad,setPad]=useState(0);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [qus,setQus]=useState("");
    const [hon,setHon]=useState("");
    const [rep,setRep]=useState(0);
    const [lk,setLk] = useState(0);
    // let load=1;
    const [height,setHeight1]=useState(0);
    function setHeight(){
        if(heigh)
    {
       setHeight1(100);
       setPad(10)
    }
    else {setHeight1(0);
       setPad(0)
    }
}
    const stData = (d)=> {
        // console.log("d",d);
        setName(d.user.username);
        setEmail(d.user.email);
        setHon(d.Honour_score);
        // console.log(d.qustions)
        setQus(d.questions)
        setRep(d.reports)
        setLk(d.like)
        let k = hon+0;
        Score(k)
    }

    const fet = async() => {
        // console.log("in fetch...............")
        const res = await fetch(url+"profile/"+userId)
        const val =await res.json()
        // console.log("val",val)
        stData(val);
    }
    if(qus == "")fet();
    const [colour,setColor] = useState('green');
    // let points = 30;
    function Score(points) {
        console.log(typeof points,points)
        if (points >=0 && points <= 30) {setColor('green');console.log("1")}
        else if (points > 30 && points <= 70) {setColor('orange');}
        else setColor('red');
    }


    const handleGot = () => {
        setHeight(0)
        setPad(0)
    }
    
    // console.log("----------------",dat)
    return (
        <SafeAreaView>
            <View>
                <View style={{display:'flex',flexDirection:'col',justifyContent:'center',alignItems:'center'}}>
                    <View style={{marginTop:31}}>
                    <Image source={{uri:img}} style = {{height : 106,width:106,borderRadius:100}}/>
                    </View>
                    <View style = {{marginTop : 24}}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>{name}</Text>
                    </View>
                    <View style = {{marginTop : 13}}>
                        <Text  style={{fontWeight:'bold',fontSize:18}}>{email}</Text>
                    </View>
                </View>

                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:60}}>
                    {/* <View> */}
                        <View style = {{height:80, width : 170,marginRight:20,borderRadius:18,backgroundColor:'#E4E4E4'}}>
                            
                            <View style = {{marginLeft:8,marginTop:4}}>
                                <Text  style = {{fontSize:13,fontStyle:'italic',fontWeight:'300'}}> Questions</Text>
                            </View>
                            <View style = {{display:'flex',flexDirection:'row',alignItems:'center',justifyContent: 'center',marginTop:7}}>
                                <MaterialCommunityIcons name="chat-question" size={24} color="#00A3FF" />
                                <Text style = {{fontSize:19,fontWeight:'bold',marginLeft:8}}>
                                    {qus}
                                </Text>
                            </View>
                        </View>
        
                        <View style = {{height:80, width : 170,borderRadius:18,backgroundColor:'#E4E4E4'}}>
                            <View style = {{display:'flex',flexDirection:'row',marginLeft:8,marginTop:4,alignItems:'space-around'}}>
                                <View style={{width:'88%'}}>
                                    <Text  style = {{fontSize:13,fontStyle:'italic',fontWeight:'300'}}> 
                                        Honour Score
                                    </Text>
                                </View>
                                
                                <View>
                                    <TouchableOpacity onPress={()=>{setHeig(!heigh);setHeight()}}>
                                        <AntDesign name="infocirlceo" size={10} color="black" />
                                    </TouchableOpacity>
                                    
                                </View>
                                
                            </View>

                            <View style = {{display:'flex',flexDirection:'row',alignItems:'center',justifyContent: 'center',marginTop:7}}>
                                <Ionicons name="md-warning" size={24} color={colour} />
                                <Text style = {{fontSize:19,fontWeight:'bold',marginLeft:8}}>
                                    {hon}%
                                </Text>
                            </View>
                        </View>
                </View>

                <View style={{display:'flex',flexDirection:'row',marginTop:40}}>
                    <View  style={{display:'flex',flexDirection:'row',marginLeft:70}}>
                        <FontAwesome name="square" size={24} color="#2ecc71" />
                        <Text style = {{marginLeft:10}}> Likes</Text>
                    </View>
                    <View  style={{display:'flex',flexDirection:'row',marginLeft:70}}>
                        <FontAwesome name="square" size={24} color="#e74c3c" />
                        <Text style = {{marginLeft:10}}> Reports</Text>
                    </View>

                </View>

                    <View style={{alignContent:'center',justifyContent:'center'}}>
                        {YourPieChart(rep,lk)}
                    </View>
                {/* </View> */}

            </View>

            <View style={{display:'flex',flexDirection:'row',height:height,width:'80',right:20,left:20,top:150,position:'absolute',
                        backgroundColor:'#EBEEFF',padding:pad,borderRadius:20}}>
                <View>
                    <Text style = {{fontSize:15,paddingTop:5,marginRight:8,marginLeft:8}}>
                        Honour Score is the score of the person according to which his status will 
                        be decided 
                    </Text>
                    <View style={{marginLeft:270,marginTop:20}}>
                        <TouchableOpacity onPress={handleGot}><Text>Got it</Text></TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )

}