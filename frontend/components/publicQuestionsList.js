import React, { useState,useEffect} from 'react';
import { useContext } from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';
import { url } from './dummy';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useKeyboardVisible } from './keyboardVisible';
// import { Question } from './PublicQuestion';
import { AuthContext } from "../Navigators/AuthContext";


export const Public_Questions = () =>{
    const {userId} = useContext(AuthContext);
    const nav = useNavigation();
    const keyboard = useKeyboardVisible();
    const [data,setData]=useState(null);
    const [recent,setRecent] = useState(false);
    const [rep,setRep] = useState(null);
    const [repUs,setUsRep] = useState(null);
    const [ser,setSer] =useState("");
    const fet=async()=>{
        if(userId==null) return ;
        try {
            const x = (recent)?0:1;
            const response = await fetch(url+x+"/"+userId);
            const dat=await response.json();
            setData(dat);
        } catch (error) {
            console.log("Qus Fetch error.")
            nav.navigate("AuthStack",{screen:"login"})
        }
    };
    const [report,setReport] = useState(false);
    useEffect(()=>{fet();return ()=>{};},[recent,rep,report,keyboard]);

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

        try {
            const res = await fetch(url+"searchQus/"+ser+"/"+userId+"/0");
            const dat = await res.json();
            setData(dat);
        } catch (error) {
            console.log("pub qus search err")
        }

    }

    const report2 = async()=>{
        console.log(rep);
        
        if(userId==repUs){
            const res = await fetch(url+"deleteQus/"+rep);
            setRep(null);
            setUsRep(null);
        }else{
            const res = await fetch(url+"qus-report/"+rep+"/"+userId);
            setRep(null);
            setUsRep(null);
        }
    }

    const Question = (pro) =>{
        const item = pro.props;
        const userId = pro.userId;
        const nav= useNavigation();
        const [like,setLike] = useState(item.like);
        const [lkcnt,setLkcnt] = useState(item.LikeCount)
        const fetLik = async()=>{
            if(like==false){
                const response = await fetch(url+"createQus-like/"+item.id+"/"+userId)
                setLkcnt(lkcnt+1)
            }
            else{
                const response = await fetch(url+"deleteQus-like/"+item.id+"/"+userId)
                setLkcnt(lkcnt-1)
            }
        }
        // console.log(item)
        return (
            <TouchableOpacity onLongPress={()=>{setRep(item.id);setReport(!report);setUsRep(item.user.id)}} onPress={()=>nav.navigate("Answers",{id:item.id, qust:item.question, privateMes:item.allowPrivateMessages, created:item.created, answers:item.responses, user:item.user})} style={{borderBottomWidth:0.3,borderBottomColor:'grey',}}>
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
                    <TouchableOpacity width={30} height={30} onPress={()=>{setLike(!like);fetLik()}}>
                        <AntDesign name="heart" size={18} color={(like)?"#EF6262":'white'} />                            
                        <Text style={{fontSize:12,color:'grey', paddingLeft:5}}>{lkcnt}</Text>
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
            {(!report)
            ?<View style={{height:(keyboard)?0:"10%",padding:10,display:'flex',flexDirection:'row',marginBottom:10}} >

                <TouchableOpacity onPress={()=>setRecent(false)} style={styles.buttonR} ><Text style={{color:(!recent)?'white':'black'}}>Recent</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>setRecent(true)} style={styles.buttonP} ><Text style={{color:(recent)?'white':'black'}}>Popular</Text></TouchableOpacity>

            </View>:
            <View style={{height:(keyboard)?0:"15%",padding:10,display:'flex',flexDirection:'row',marginBottom:10}} >
                <View style={{flex:1, flexDirection:'row', height:(keyboard)?0:40, alignItems:'center', justifyContent:'space-between'}}>
                    <Text>{(userId!=repUs)?"Report question?":"Delete Your Question?"}</Text>
                    <TouchableOpacity onPress={()=>{setReport(false);report2();}} style={{borderWidth:1,borderBlockColor:'silver', width:(keyboard)?0:40, elevation:(keyboard)?0:2}}><Text style={{textAlign:'center'}}>Yes</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>setReport(false)} style={{borderWidth:1,borderBlockColor:'silver', width:(keyboard)?0:40, elevation:(keyboard)?0:2}}><Text style={{textAlign:'center'}}>No</Text></TouchableOpacity>
                </View>
            </View>}
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




//     const nav = useNavigation();   #E24177
//     const [ref,setRef] = useState(true);
//     const fetchData= async() =>{
//         const response = await fetch(url);
//         const data = await response.json();
//         // console.log(data)
//         setData(data);
//     }

//     const [data,setData]=useState();
//     // fetchData();
//     useEffect(()=>{fetchData();return () => {}},[ref]);
//     // console.log('hello'+data)
//     return (
//         <>
//             <View height={'100%'}>
//                 <View style={{margin:15,height:"8%"}}>
//                     <View style={{flex:1, flexDirection:'row', marginHorizontal:20, borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:50, padding:10}}>
//                         <View style={{width:'10%'}}>
//                             <AntDesign name="search1" size={24} color="black" />
//                         </View>
//                         <View style={{width:'90%'}}>
//                             <TextInput
//                                 placeholder="Search..."
//                                 style={{paddingLeft:10}}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{backgroundColor:'#f5f6f9'}}>
//                     <FlatList
//                         data={data}
//                         keyExtractor={item => item['id']}
//                         renderItem={({item})=>{
//                             // console.log('item'+item.question)
//                             return(
//                                 <Question questId={item.id} question={item.question} created={item.created} answers={item.responses} user={item.user} ref={setRef}/>
//                             )
//                         }}
//                     />
//                 </View>
//                 <TouchableOpacity style={style.box2} onPress={()=>nav.navigate('Create',{params:{"fetch":fetchData}})}>
//                     <Text style={{textAlign:'center', fontSize:35, color:'white'}}>+</Text>
//                 </TouchableOpacity>
//             </View>
//         </>
        
        
//     )
// }

// const style=StyleSheet.create({
//     input:{
//         height:600,
//         width:1000,
//     },
//     box2:{
//       height:50,
//       width:50,
//       backgroundColor:'green',
//       position: 'absolute',
//       borderRadius:50,
//       right:10,
//       bottom:30
//     }
// })

// export default fetchData;