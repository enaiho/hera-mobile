'use strict'

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    Button,
    Dimensions,
    Animated,
    Alert,
    PermissionsAndroid,
    Image

} from 'react-native';


import Svg, {
    Path,
} from 'react-native-svg';

import { LongPressGestureHandler } from 'react-native-gesture-handler';
import {useHttpPost} from '../../hooks/useHttp';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Battery from 'expo-battery';
import * as Notifications from 'expo-notifications';
import SolaceConfig from "../../solace_config";


const Panic = ({ route,navigation }) => {


    const { screenWidth,screenHeight,user } = route.params;

    const panicRadius = (screenWidth / 2) + 20;
    const [animated,setAnimated] = useState(new Animated.Value(0));
    const [opacityA,setOpacityA] = useState(new Animated.Value(1));
    const [panic, setPanic] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [triggerId, setTriggerId] = useState(null);
    const BASE_URL = SolaceConfig.SERVER_URL;


    useEffect(() => {



        (async () => {


              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
              }

        })();



    },[])




    const triggerPanicAnimation = () => {

        Animated.loop(
            Animated.timing(animated,{
                toValue: 3,
                duration: 1000,
                useNativeDriver: true
            })
        ).start();
    }

    const endPanicAnimation = () => {
       setAnimated( new Animated.Value(0) );
    }

    const initiatePanic = () => {
        ToastAndroid.show("Initiating Panic Mode.. ", ToastAndroid.SHORT);


    }
    const activatePanic = async() => {


        triggerPanicAnimation();
        ToastAndroid.show("Panic Mode Triggered. You can take your finger off to activate panic mode. ", ToastAndroid.SHORT);


        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        setLocation(location);
        


    }
    const dePanic = async() => {

        // we would use the state to manage if the sms was sent on the backend...

        let user_data = await AsyncStorage.getItem('userdata_key' );
        user_data = JSON.parse(user_data);

        if( location === null  ) throw new Error("Location not resolved. ");

        ToastAndroid.show("Panic Mode Activated. Pushing data to server. ", ToastAndroid.SHORT);
        
        try{


            // in the payload, I would also want to send in the battery info


            let batteryDetails = {};
            try{
                batteryDetails = await Battery.getPowerStateAsync();
            }
            catch(e){ batteryDetails = {};  }


            const payload = { email:user_data.email,location:JSON.stringify(location), batteryDetails:JSON.stringify(batteryDetails) };
            const response = await useHttpPost(`${BASE_URL}/trigger/panic`,payload);
            const { status,message,trigger_id,incidents } = response.data;


            if( response.data.status === "sent" ) {

                endPanicAnimation();
                return navigation.navigate("PanicEmergencyMessage", {
                    screenWidth: screenWidth,
                    screenHeight: screenHeight,
                    triggerId:trigger_id,
                    incidents:incidents
                });
                
            }
            else{
                ToastAndroid.show(`Error: We couldn't send the response trigger ${message.toUpperCase()}`, ToastAndroid.LONG );
            }

        }
        catch(e){
            ToastAndroid.show( `Exception Error: ${e.message.toString().toUpperCase()}`,ToastAndroid.LONG );
            endPanicAnimation();
        }

        endPanicAnimation();


    }

    return (


        <View style={styles.mainContainer}>


            <View style={styles.header}>

                <View style={styles.profile}>
                    
                    <TouchableOpacity
                    onPress={ () => navigation.navigate("Settings",{ screenWidth:screenWidth, screenHeight:screenHeight,user:user })  }>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            width:35,
                            height:35,                        
                            borderRadius:100
                          }}
                          source={require('../../assets/images/avatar.jpeg')}
                        />
                    </TouchableOpacity>

                </View>


                <View style={styles.notification}>

                    <View style={styles.contactNotification}>
<Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0 20C0 8.95431 8.95431 0 20 0V0C31.0457 0 40 8.95431 40 20V20C40 31.0457 31.0457 40 20 40V40C8.95431 40 0 31.0457 0 20V20Z" fill="#F0F2F4"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M21.2501 14.5835C21.2501 17.3448 19.0118 19.5835 16.25 19.5835C13.4883 19.5835 11.25 17.3448 11.25 14.5835C11.25 11.8221 13.4883 9.58344 16.25 9.58344C19.0118 9.58344 21.2501 11.8221 21.2501 14.5835ZM7.5 28.2287C7.5 24.4904 10.5301 21.4591 14.2696 21.4591H18.2305C21.9688 21.4591 25.0001 24.4904 25.0001 28.2287C25.0001 28.9787 24.3946 29.5841 23.6446 29.5841H8.85391C8.10625 29.5841 7.5 28.9787 7.5 28.2287ZM26.2149 22.0835H23.3301C25.1251 23.5561 26.2501 25.7593 26.2501 28.228C26.2501 28.728 26.1016 29.189 25.8594 29.5835H31.2501C31.9415 29.5835 32.5001 29.021 32.5001 28.2984C32.5001 24.8804 29.7032 22.0835 26.2149 22.0835ZM28.7499 15.2085C28.7499 17.6264 26.7929 19.5835 24.3749 19.5835C23.1562 19.5835 22.0585 19.0835 21.2659 18.2831C22.0339 17.2452 22.4999 15.971 22.4999 14.5835C22.4999 13.5444 22.2187 12.5768 21.7687 11.7127C22.4984 11.1676 23.3941 10.8334 24.3749 10.8334C26.7929 10.8334 28.7499 12.7905 28.7499 15.2085Z" fill="#191414"/>
</Svg>


                    </View>

                    
                    <View style={styles.bell}>

      
                      <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M0 30C0 18.9543 8.95431 10 20 10V10C31.0457 10 40 18.9543 40 30V30C40 41.0457 31.0457 50 20 50V50C8.95431 50 0 41.0457 0 30V30Z" fill="#F0F2F4"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M30.3047 34.9904C30.3704 35.0597 30.4335 35.1261 30.4932 35.1904C30.7861 35.5078 30.9131 35.8838 30.916 36.25C30.9097 37.0498 30.2808 37.8125 29.3472 37.8125H10.6069C9.67285 37.8125 9.04419 37.0498 9.03809 36.25C9.03809 35.8838 9.16626 35.5078 9.45947 35.1904C9.5201 35.1249 9.58418 35.0573 9.65101 34.9868C10.6204 33.9638 12.1694 32.3292 12.1694 27.6562C12.1694 23.8623 14.8242 20.8267 18.4131 20.082V19.0625C18.4131 18.2021 19.1152 17.5 19.9756 17.5C20.8359 17.5 21.5381 18.2021 21.5381 19.0625V20.083C25.1279 20.8252 27.7832 23.8599 27.7832 27.6562C27.7832 32.3341 29.3355 33.9694 30.3047 34.9904ZM23.1006 39.375C23.1006 41.1035 21.7041 42.5 19.9316 42.5C18.2471 42.5 16.8506 41.1035 16.8506 39.375H23.1006Z" fill="#191414"/>
                    </Svg>


                    </View>


                </View>


            </View>


            <View style={styles.container}>


                <TouchableOpacity style={[styles.panicBtn]}>
                
                    <LongPressGestureHandler
                        onBegan={initiatePanic}
                        onActivated={activatePanic}
                        onEnded={dePanic}
                        minDurationMs={1000}
                        maxDist={100}>


                        <View style={[styles.panicHold,{width:panicRadius,height:panicRadius, borderRadius:panicRadius}]}>

                            <Text style={styles.panicText}>
                                Press and hold for emergency
                            </Text>

                        </View>

                    </LongPressGestureHandler>

                </TouchableOpacity>


                <Animated.View

                    style={[{
                        width: 100,
                        height: 100,
                        backgroundColor: '#03C108',
                        borderRadius: panicRadius,
                        opacity: opacityA,
                        transform: [
                            {
                                scale: animated
                            }
                        ]
                    },styles.triggerCircle]}>

                </Animated.View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    panicHold: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderColor:"#03C108",
        borderStyle:"solid",
        borderWidth:15
    },
    panicText: {
        fontSize: 20,
        textAlign: 'center',
        color: "#03C108",
        fontFamily: "EuclidCircularBold",
        lineHeight: 28
    },
    triggerCircle:{
        flex:1,
        position:"absolute",
        marginTop:10
    },
    panicBtn:{
        zIndex:5
    },
    header:{
        flexDirection: "row",
        top:40
    },
    profile:{
        alignItems:"center",
        justifyContent:"center",
        left:30
    },
    mainContainer:{
        flex: 1,
        justifyContent: "space-between"
    },
    notification:{
        position:"absolute",
        right:50,
        flexDirection:"row"
    },
    bell:{
        left:5,
        bottom:10
    },
    contactNotification:{
        top:0
    }

})


export default Panic;