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
    PermissionsAndroid

} from 'react-native';

import { LongPressGestureHandler } from 'react-native-gesture-handler';
import {useHttpPost} from '../../hooks/useHttp';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import Constants from 'expo-constants';




const Panic = ({ navigation }) => {


    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const panicRadius = (screenWidth / 2) + 20;
    const [animated,setAnimated] = useState(new Animated.Value(0));
    const [opacityA,setOpacityA] = useState(new Animated.Value(1));
    const [panic, setPanic] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [triggerId, setTriggerId] = useState(null);
    const BASE_URL = "https://hera-dev.herokuapp.com";




    // console.log( Constants.manifest.server_url  );



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


        let user_data = await AsyncStorage.getItem('userdata_key' );
        triggerPanicAnimation();
        ToastAndroid.show("Panic Mode Triggered. You can take your finger off to activate panic mode. ", ToastAndroid.SHORT);


        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});

        // alert(location);

        if( location === null  ) return;


        user_data = JSON.parse(user_data);
        const payload = { email:user_data.email,location:JSON.stringify(location) };
        const response = await useHttpPost(`${BASE_URL}/user/trigger_panic`,payload);


        const { status,message,trigger_id } = response.data;

        if( response.data.status === "sent" ) {
            setPanic(true);
            setTriggerId(trigger_id);
        }

        setErrorMsg( message );


    }
    const dePanic = () => {

        // we would use the state to manage if the sms was sent on the backend...

        endPanicAnimation();
        if( panic ) {

            ToastAndroid.show("Panic Mode Activated. ", ToastAndroid.SHORT);
            navigation.navigate("PanicActivate", {
                screenWidth: screenWidth,
                screenHeight: screenHeight,
                triggerId:triggerId
            })
        }
        else{
            Alert.alert(
                "Panic Response Messgae",
                `We couldn't send the response trigger. ${ errorMsg } `
                );
        }

    }

    return (

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

            {/*<Text style={styles.triggerCircle}>This is a test component. </Text>*/}

            <Animated.View

                style={[{
                    width: 100,
                    height: 100,
                    backgroundColor: '#9DE2F8',
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
        borderColor:"#00A6FF",
        borderStyle:"solid",
        borderWidth:15
    },
    panicText: {
        fontSize: 20,
        textAlign: 'center',
        color: "#00A6FF",
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
    }



})


export default Panic;