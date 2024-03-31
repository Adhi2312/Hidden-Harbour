import React from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { url } from './dummy';
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';
import { AuthContext } from "../Navigators/AuthContext";
import { useKeyboardVisible } from './keyboardVisible';


const image = {uri : 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}

export const AnswersList = ({route})=>{

    const {userId} = useContext(AuthContext);
    const keyboard = useKeyboardVisible();
    const {qust, id, user,privateMes}= route.params;
    // console.log("------------------",user,privateMes);
    const [answer,setAnswer] = useState();
    const [lock,setLock] = useState(false);
    const [reload,setReload]= useState(true);
    // const [LikeUser, setLikeUser] = useState([]);
    const [data,setData] = useState();
    // const [reportStack, setReportStack] = useState(true);
    let rp = true;

    const create_answer = async() =>{
        // console.log(answer)
        if(answer=="") {console.log("Empty answer");return;}
        const response = await fetch(url+'create-answer/'+id+"/"+userId,
            {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({'answer':answer,'private':lock}),
            }
        );
            const t = await response.json();
            setData(t);
            setReload(!reload);
            // console.log(t);s
            setAnswer('');
    }

    const setRp = (r)=>{rp=r}

    const fetchAns = async() =>{
        const response = await fetch(url+'answers/'+id,
        {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user':userId}),
        }
        );
        const t = await response.json();
        setData(t['answer']);
        // console.log(t['like'][0]);
    }
    useEffect(()=>{fetchAns();return () => {}}, [reload] );

    const Answer = (pro) =>{
        const item = pro.props
        // console.log(item)
        const [lk,setLk] = useState(item.like);
        const [like,setLike]=useState(item.LikeCount);
        const [report,setRepor] = useState(true);
        const ctrLke = async()=>{
            if(lk){
                const res = await fetch(url+"deleteans-like/"+item.id+"/"+userId+"/"+item.question);
                setLike(like-1);
            }
            else{
                const res = await fetch(url+"createans-like/"+item.id+"/"+userId+"/"+item.question);
                setLike(like+1);
            }
        }
        const report2 = async()=>{
            if(userId!=item.user){
                const res = await fetch(url+"ans-report/"+item.id+"/"+userId);
                rp=true;
                setReload(!reload);
            }else{
                const res = await fetch(url+"deleteAns/"+item.id+"/"+item.question);
                rp=true;
                setReload(!reload);
                console.log("del============================")
            }
        }
        return (
            <View style={{marginHorizontal:15,}}>
            {(report == false)?
                // <View style={{height:"10%",padding:10,display:'flex',flexDirection:'row',marginBottom:10}} >
                <View style={styles.reportwrap}>
                    <View style={{flex:1, flexDirection:'row',padding:10, height:40, alignItems:'center', justifyContent:'space-between'}}>
                        <Text>{(userId!=item.user)?"Report answer?":"Delete your Answer?"}</Text>
                        <TouchableOpacity onPress={()=>{setRepor(true);report2();}} style={{borderWidth:1,borderBlockColor:'silver', width:40, elevation:2}}><Text style={{textAlign:'center'}}>Yes</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRepor(true);rp=true}} style={{borderWidth:1,borderBlockColor:'silver', width:40, elevation:2}}><Text style={{textAlign:'center'}}>No</Text></TouchableOpacity>
                    </View>
                </View>
            
            :<TouchableOpacity onLongPress={()=>{
                if(rp==true){
                    setRepor(!report);
                    // window.rp=false;
                    setRp(false)
                    console.log(rp)
                }
            }}  style={styles.Commentwrap}>
                <View style={{display:'flex',width:'92%'}}>
                    <View style={{display:'flex',flexDirection:'row' ,marginLeft:10}}>
                        <Text style={{marginRight:5, fontSize:12,color:'white'}}>{item.username}</Text>
                        <Text style={{fontSize:12,color:'white',paddingLeft:10}}>{item.created}</Text>
    
                    </View>
                                    
                    <View style={{marginLeft:20,marginVertical:5}}>
                        <Text style={{fontSize:15}}>{item.answer}</Text>
    
                    </View>
                                
                </View>
                <View style={{marginLeft:3}}>
                    <TouchableOpacity onPress={()=>{setLk(!lk);ctrLke()}}>
                        {(!lk)?<FontAwesome name="heart" size={18} color="white" />:<FontAwesome name="heart" size={18} color="#EF6262" />}
                    </TouchableOpacity>
                               
                    <Text style={{fontSize:12,color:"white", paddingLeft:5}}>{like}</Text>
    
                </View>
            </TouchableOpacity>}
            </View>
        )
    }
    
    styles=StyleSheet.create({
        question:{
            marginHorizontal:27,
            marginVertical:20,
        },
        input:{
            borderWidth:0.2,
            borderColor:'black',
            padding:13,
            margin:15,
            borderRadius:20,
            margin:20,
            color:'gray',
        },
        Comment:{
            marginVertical:10,
            height:'90%'
    
        },
        // inputwrap:{
        //     backgroundColor:'white',
        //     marginBottom:1,
        //     display:'flex',
        //     flexDirection:'row',
        //     paddingVertical:0
    
        // },
        Commentwrap:{
            display:'flex',
            flexDirection:'row',
            minWidth:100,
            minHeight:68,
            backgroundColor:'#2AA18B',
            padding:7,
            
    
            marginBottom:13,
            borderRadius:20
        },
        reportwrap:{
            minWidth:100,
            minHeight:68,
            backgroundColor:'#DFE0E2',
            padding:7,
            marginBottom:13,
            borderRadius:20
        },
        inputwrap:{
            height:"10%",
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical:9,
            paddingHorizontal:0,
            // (keyboard)?0:15,
            // backgroundColor:'white',
           
        }
    
    
    })

    
  return (
        
    <View style={{display:'flex'}}>
        <View style={{height:'90%'}}>
            <View style={styles.question}>
            <Text style={{fontSize:27,fontWeight:'bold'}}>{qust}</Text>
            </View>

            
            <View style={styles.Comment}>
                <FlatList
                data={data}
                keyExtractor={item=> item['id']}
                renderItem={({item})=>{
                    // console.log(item.id);
                    return(
                        <Answer props={item}/>
                    )  
                }}
                />
                </View>

            </View>

            {(privateMes==true)?
                <View style={styles.inputwrap}>
                    
                    <View style={{display:'flex',flexDirection:'row',borderTopWidth:0.6, borderTopColor:"#D4D6D8",marginHorizontal:30,height:57,alignContent:'center',width:'100%',padding:15,backgroundColor:'#f0f0f0',marginBottom:0}}>
                        <View style={{marginHorizontal:5,marginRight:15}}>
                        <TouchableOpacity onPress={()=>{setLock(!lock)}}>
                        {!lock?<Entypo name="lock-open" size={24} color="#2AA18B"/>:<Entypo name="lock" size={24} color="#2AA18B" />}
                        </TouchableOpacity>
                        
                        </View>
                        <View style={{width:280}}>
                            <TextInput onChangeText={text => setAnswer(text)} placeholder={!(lock)?'Click lock icon to make answer private':"Only author can see your answer now"} value = {answer}></TextInput>

                        </View>
                        <View style={{marginLeft:15}}>

                        <TouchableOpacity onPress={()=>create_answer()}><Ionicons name="send-sharp" size={24} color="#2AA18B" /></TouchableOpacity>

                        </View>
                    </View> 
                </View>:

                <View style={styles.inputwrap}>
                    
                    <View style={{display:'flex',flexDirection:'row',borderTopWidth:0.6, borderTopColor:"#D4D6D8",marginHorizontal:30,height:57,alignContent:'center',width:'100%',padding:15,backgroundColor:'#f0f0f0',marginBottom:0}}>
                        <View style={{marginHorizontal:5,marginRight:15}}>
                        <View onPress={()=>{setLock(!lock)}}>
                        <Entypo name="lock-open" size={24} color="#2AA18B"/>
                        </View>
                        
                        </View>
                        <View style={{width:280}}>
                            <TextInput onChangeText={text => setAnswer(text)} placeholder="Type your message here" value = {answer}></TextInput>

                        </View>
                        <View style={{marginLeft:15}}>

                        <TouchableOpacity onPress={()=>create_answer()}><Ionicons name="send-sharp" size={24} color="#2AA18B" /></TouchableOpacity>

                        </View>
                    </View> 
                </View>
            }
    </View>
        
        
  )
}





//     const [answer,setAnswer] = useState();
//     const {qust, id, user}= route.params;
//     const ht = useKeyboardVisible()? "63%" :"75%";
//     const [ans, setAns] =useState(); 
//     const [reload,setReload]= useState(true);

//     const create_answer = async(id) =>{
//         const response = await fetch(url+'create-answer/'+id,
//             {
//                 method: 'POST',
//                 headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({'answer':answer}),
//             }
//         );
//             const t = await response.json();
//             setAns(t);
//             setReload(!reload);
//             console.log(t);
//             setAnswer('');
//     }

//     const fetchAns = async() =>{
//         const response = await fetch(url+'answers/'+id);
//         const t = await response.json();
//         setAns(t);
//     }
//     useEffect(()=>{fetchAns();return () => {}}, [reload] );

//     return (
//         <>
//         <View style={{flex:1, flexDirection:'column', backgroundColor:'#f5f6f9',}}>
//             <View behavior="padding" style={{height:110, backgroundColor:'#F0F0F0'}}>
//                     <View style={{flex:1, flexDirection:"row", paddingHorizontal:18, paddingVertical:15}}>
//                         <Image source={image} style={{width:45, height:45, borderRadius:100}}></Image>
//                         <View style={{justifyContent:"center",alignItems:"center",paddingLeft:10}}>
//                             <Text style={styles.userName}>Dharun AP</Text>
//                         </View>
//                     </View>
//                     <View style={{flex:1}}>
//                         <View style={{justifyContent:'center', alignItems:'center', borderBottomWidth:1, marginHorizontal:25}}>
//                             <Text style={styles.question}>{qust}</Text>
//                         </View>
//                     </View>
//             </View>
//             <View style={{paddingHorizontal:10,  height:ht}}>
//                 <FlatList
//                     data={ans}
//                     keyExtractor={item => item.id}
//                     renderItem={({item})=>{
//                         // console.log(item);
//                         return(
//                             <Answer answer={item.answer} created={item.created} id={item.id} />
//                         )
//                     }}
//                 />
//             </View>

//             <View style={styles.postAns}>
//                 <View style={{flex:1, flexDirection:'row'}}>
//                     <TextInput
//                         onChangeText={text => setAnswer(text)}
//                         value = {answer}
//                         placeholder="Post your thoughts here..."
//                         style={{paddingLeft:10, width:"90%"}}
//                     />
//                     <TouchableOpacity onPress={()=>create_answer(id)}>
//                         <MaterialCommunityIcons name="send-lock" size={24} color="black" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
       
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     question:{
//         textAlign:'left',
//         fontSize: 18,
//         // marginTop : 15,
//         fontWeight: '600',
//         marginHorizontal : 10
//     },
//     userName : {
//         fontSize:15,fontWeight:"600"  
//     },
//     postAns:{
//         justifyContent:"flex-end",
//         alignItems:"flex-end",
//         marginHorizontal:10,
//         height:55,
//         padding:10,
//         borderWidth:1,
//         borderColor:'silver',
//         backgroundColor:'#F0F0F0',
//         borderRadius:15,
//     }
// })
