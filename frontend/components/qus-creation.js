import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Switch, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {useKeyboardVisible} from './keyboardVisible'
import { url } from "./dummy";
import { AuthContext } from "../Navigators/AuthContext";

export const CreateQuestions = ({route})=>{
    // const fet = route.params.fetch
    // console.log(fet)
    const nav = useNavigation();
    const {userId} = useContext(AuthContext);
    const create = async() =>{
        try {
            const response = await fetch(url+'create-question',
            {
                method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        // 'authentication':''
                        },
                body:JSON.stringify({
                    'question':question,
                    'user':userId,
                    'showAns':ansVisible,
                    'showAuthor':showAuthor,
                    'privateMessages':privateMessage
                })
            }
            )
            const data = await response.json()
            console.log(data)
            nav.navigate("Public Questions",{id:2});
        } catch (error) {
            console.log("create qus err")
        }

    }


    const [question, setQuestion] = useState('');
    const [ansVisible,setansVisible] = useState(true);
    const [privateMessage, setPrivateMessage] = useState(false);
    const [showAuthor, setShowAuthor] = useState(true);
    let writeAbove = useKeyboardVisible()?22:33;
    let spaceSlider= useKeyboardVisible()?30:47;
    let btnTop = useKeyboardVisible()?70:114;
    let height = useKeyboardVisible()?170:200;


    const styles = StyleSheet.create({
        questionHead:{
            fontSize:27,
            fontWeight:'600',
            paddingTop:writeAbove,
            paddingBottom:27
        },
        textAreaInp:{
            borderBottomWidth:1, 
            height:112, 
            fontSize:16,
            borderColor:'silver',
            textAlignVertical:'top'
        },
        createBtn:{
            height:42,
            width:210,
            borderRadius:15,
            backgroundColor:'#2AA18B'
        }
    })
    return(
        <View style = {{paddingHorizontal:27, backgroundColor:'white', height:"100%"}}>
            <Text style = {styles.questionHead}>
                Write Your question :
            </Text> 
            <TextInput
                placeholder="Type here,"
                onChangeText={text=>setQuestion(text)}
                multiline
                style={styles.textAreaInp}
            />
            <View height={height} style={{paddingTop:31, marginBottom:btnTop}}>
                <View style = {{flex:1, paddingBottom:spaceSlider, flexDirection:'row', justifyContent:'center', alignItems:"center"}}>
                    <View>
                        <Text style={{fontSize:17, width:252}}>
                            Do you want others to know you
                        </Text>
                    </View>
                    <View>
                    <Switch
                        style={{width:46, paddingLeft:10}}
                        trackColor={{false: '#767577', true: '#2AA18BAD'}}
                        thumbColor={showAuthor ? 'white' : '#f4f3f4'}
                        onValueChange={()=>setShowAuthor(!showAuthor)}
                        value={showAuthor}
                    />
                    </View>
                </View>
                <View style = {{flex:1, paddingBottom:spaceSlider, flexDirection:'row', justifyContent:'center', alignItems:"center"}}>
                    <View>
                        <Text style={{fontSize:17, width:252}}>
                            Enable Private Messages
                        </Text>
                    </View>
                    <View>
                    <Switch
                        style={{width:46, paddingLeft:10}}
                        trackColor={{false: '#767577', true: '#2AA18BAD'}}
                        thumbColor={privateMessage ? 'white' : '#f4f3f4'}
                        onValueChange={()=>setPrivateMessage(!privateMessage)}
                        value={privateMessage}
                    />
                    </View>
                </View>
                <View style = {{flex:1, flexDirection:'row', justifyContent:'center', alignItems:"center"}}>
                    <View>
                        <Text style={{fontSize:17, width:252}}>
                            Make answers Visible
                        </Text>
                    </View>
                    <View>
                    <Switch
                        style={{width:46, paddingLeft:10}}
                        trackColor={{false: '#767577', true: '#2AA18BAD'}}
                        thumbColor={ansVisible ? 'white' : '#f4f3f4'}
                        onValueChange={()=>setansVisible(!ansVisible)}
                        value={ansVisible}
                    />
                    </View>
                </View>
            </View>
            <View height={42} style={{flex:1, alignItems:'center',}}>
                <TouchableOpacity style={styles.createBtn} onPress={()=>{create();}}>
                    <Text style={{paddingTop:4, textAlign:'center', fontWeight:'500', fontSize:23, color:'#ffffff'}}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:21}} onPress={()=>{nav.navigate('Public Questions')}}>
                    <Text style={{textDecorationLine:"underline"}}>Discard</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
