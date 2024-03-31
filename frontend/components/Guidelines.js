import { useNavigation } from "@react-navigation/native"
import { useState,useEffect } from "react"
import { View,Text,Image, SafeAreaView, ScrollView,StyleSheet, TouchableOpacity } from "react-native"

export const Guidelines = () => {
    // const [isChecked, setIsChecked] = useState(false);
    const nav = useNavigation()

    return (
        <SafeAreaView style={{height:'100%',width:'100%',backgroundColor:'silver'}}>

            <ScrollView style = {{backgroundColor:'#EEEDED',marginTop:60,marginRight:20,marginLeft:20,marginBottom:50,borderRadius:20}}>
               
                <View style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                <Text style = {{fontSize:25,fontWeight:'bold'}}>
                    GuideLines
                </Text>
                </View>
               
                <Text style={{fontSize:18,paddingTop:13,paddingLeft:18,paddingRight:15,paddingBottom:50}}>
                By using Hidden Harbour, users agree to its terms and conditions. 
                The app facilitates anonymous messaging, allowing users to post questions
                and receive answers without revealing their identities. Users must refrain
                from posting unlawful, harmful, or defamatory content, ensuring messages
                don't disclose personally identifiable information. We prioritize user privacy,
                    ensuring messages remain anonymous, and no personal data is stored that could 
                    identify users. Prohibited activities include spamming, hacking, and disseminating 
                    false information. While we strive for a safe environment, we don't guarantee the
                    accuracy or reliability of user-generated content. All app content, including logos 
                    and trademarks, belongs to Hidden Harbour and is protected by copyright laws. Users 
                    must not reproduce or modify this content without consent. Hidden Harbour isn't liable
                    for damages arising from app usage and reserves the right to suspend accounts violating 
                    terms. These terms are governed by the laws of India. For inquiries, contact Hidden Harbour's 
                    support.

                </Text>
                <View style = {{paddingBottom:15,paddingLeft:'75%'}}>
                <TouchableOpacity onPress={()=>{nav.navigate("Home")}} style = {{borderWidth:1,width:70,height:30,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                    <Text style={{fontWeight:'bold',fontSize:15,color:'#005B41'}}>
                    Submit</Text></TouchableOpacity>
                </View>

                
            </ScrollView>

        </SafeAreaView>
        )
}