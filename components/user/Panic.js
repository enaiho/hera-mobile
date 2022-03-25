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
    Animated

} from 'react-native';

import { LongPressGestureHandler } from 'react-native-gesture-handler';
import {useHttpPost} from '../../hooks/useHttp';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Panic = ({ navigation }) => {


    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const panicRadius = (screenWidth / 2) + 20;
    const [animated,setAnimated] = useState(new Animated.Value(0));
    const [opacityA,setOpacityA] = useState(new Animated.Value(1));
    const [panic, setPanic] = useState(false);
    const BASE_URL = "http://192.168.0.103:5000";


    useEffect(() => {
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

    }
    const activatePanic = async() => {

        triggerPanicAnimation();
        ToastAndroid.show("Panic Mode Triggered. You can take your finger off to activate panic mode. ", ToastAndroid.SHORT);


        // send the panic message to the user

        let user_data = await AsyncStorage.getItem('userdata_key' );
        user_data = JSON.parse(user_data);

        const payload = { email:user_data.email };
        const response = await useHttpPost(`${BASE_URL}/user/trigger_panic`,payload);

        if( response.data.status === "sent" ){

            setPanic(true);


        }
        else{

            alert(response.data);
        }




    }
    const dePanic = () => {

        // we would use the state to manage if the sms was sent on the backend...

        if( panic ) {

            ToastAndroid.show("Panic Mode Activated. ", ToastAndroid.SHORT);
            endPanicAnimation();
            navigation.navigate("PanicActivate", {
                screenWidth: screenWidth,
                screenHeight: screenHeight
            })
        }
        else{
            console.log("We couldn't trigger the panic button. ");
        }

        //clearInterval(op);
        //resetTimer();

        // next is to navigate to the PIN screen so we can confirm that the user is safe

        /*
        navigation.navigate("PanicActivate", {
            screenWidth: screenWidth,
            screenHeight: screenHeight
        })
        */
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