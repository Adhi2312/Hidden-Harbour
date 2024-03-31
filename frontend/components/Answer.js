import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { url } from "./dummy";

export const Answer = (pro) =>{
    // console.log("props = "+props.answer)
    item = pro.props
    userId = pro.userId
    console.log(item)
    const [lk,setLk] = useState(item.like);
    console.log(lk);
    const [like,setLike]=useState(item.LikeCount);
    const ctrLke = async()=>{
        console.log("---------------------------err",item.id,userId,item.question)
        if(lk){
            
            const res = await fetch(url+"deleteans-like/"+item.id+"/"+userId+"/"+item.question);
            setLike(like-1);
        }
        else{
            const res = await fetch(url+"createans-like/"+item.id+"/"+userId+"/"+item.question);
            setLike(like+1);
        }
    }
    return (
        <View  style={styles.Commentwrap}>
            <View style={{display:'flex',width:'92%'}}>
                <View style={{display:'flex',flexDirection:'row' ,marginLeft:10}}>
                    <Text style={{marginRight:5, fontSize:12,color:'white'}}>@anonymous</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    Commentwrap:{
        display:'flex',
        flexDirection:'row',
        marginHorizontal:15,
        minWidth:100,
        minHeight:68,
        backgroundColor:'#2AA18B',
        padding:7,
        

        marginBottom:13,
        borderRadius:20
    }
})