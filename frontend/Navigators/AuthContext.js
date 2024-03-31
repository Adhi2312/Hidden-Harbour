import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{createContext, useEffect} from "react";
import { useState } from "react";
import { url } from "../components/dummy";
// import jwt from 'jsonwebtoken';
// import {Async}
// import jwt_decode from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [img,setImg]=useState(null);

    const setAsync = (Token, userId, img) =>{
            setUserToken(Token);
            setUserId(userId);
            setImg(img)
            if(Token!=null){
                AsyncStorage.setItem('userToken',data.Token);
                AsyncStorage.setItem('userId',userId+"");
                AsyncStorage.setItem('img',img);
            }
    }

    const login = async(username, password) =>{
        // console.log(username, password)
        setIsLoading(true);
        try{
            const response = await fetch(url+"login-user",
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    // 'authentication':''
                    },
                    body: JSON.stringify({"username":username, "password":password}),
                }
                );
            const data = await response.json();
            // if(response.status==404) alert("Invalid Username or Password.")
            console.log(data.Token, data.user.id, data.img);
            if(data.Token!=null){
                AsyncStorage.setItem('userToken',data.Token);
                AsyncStorage.setItem('userId',data.user.id+"");
                AsyncStorage.setItem('img',data.img);
                setUserToken(data.Token);
                setUserId(data.user.id);
                setImg(data.img)
            }
            setIsLoading(false);
        }
        catch (err){
            console.log("alerting",err);
            alert("Invalid username or password...");
        }
    }

    const logout = () =>{
        console.log("Logging out...");
        setIsLoading(true);
        setUserToken(null);
        setUserId(null);
        setImg(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userId');
        AsyncStorage.removeItem('img');
        setIsLoading(true);
    }

    const isLoggedin = async() =>{
        try{
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            let userI = await AsyncStorage.getItem('userId');
            let im = await AsyncStorage.getItem('img');
            setUserToken(userToken);
            setUserId(userI);
            setImg(im)
            setIsLoading(false);
        }
        catch(e){
            console.log(`logged in error...   ${e}`)
        }
        
    }

    useEffect(()=>{isLoggedin()} , [])
    // console.log(isLoading)
    return (
        <AuthContext.Provider value ={{login, logout, userId, isLoading, img, userToken, setAsync}}>
            {children}
        </AuthContext.Provider>
    )
}