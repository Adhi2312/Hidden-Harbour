import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import {Answers, getData}  from "./AnswersList";
import { url } from "./dummy";
import {useNavigation, useScrollToTop} from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

export const Question = (pro) =>{
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
    return (
        <TouchableOpacity onLongPress={()=>console.log("Long Press...")} onPress={()=>nav.navigate("Answers",{id:item.id, qust:item.question, created:item.created, answers:item.responses, user:item.user})} style={{borderBottomWidth:0.3,borderBottomColor:'grey',}}>
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



        // <TouchableOpacity onPress={()=>{
        // nav.navigate("Answers", {qust : question, id:questId, user : props.user})
        // }} onLongPress={()=>console.log("Long press...")}>
        //     <View style={{width:"100%"}}>
        //         <View style={styles.parent}>
        //             <View style={{width:"70%"}}>
        //                 <Text style={{fontSize:18,fontWeight:'500'}}>{props.question}</Text>
        //                 <View style={{flex:1, flexDirection:'row'}}>
        //                 <Text>by </Text>
        //                 <Text style={{color:'blue'}}>@{props.user.username}</Text>   
        //                 </View>                     
        //             </View>
        //             <View style={{paddingLeft:15, width:"30%"}}>
        //                 <Text style={{fontSize:13, color:'green', fontWeight:500}}>{props.created.slice(0,10)}</Text>
        //                 <Text style={{fontSize:12, color:'red', fontWeight:500}}>{props.answers} answers</Text>
        //             </View>
        //         </View>
        //     </View>  
        // </TouchableOpacity>


const styles= StyleSheet.create({
    parent:{
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        width:"90%", 
        borderBottomWidth:1, 
        // fontSize:18,
        paddingVertical:20, 
        marginHorizontal:"4%",
    }
})