import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Share, ToastAndroid } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useHttpPut} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";

export default function ShareFriends({ route, navigation}){


    useEffect( ()=>{
    })

    const { screenWidth,screenHeight,triggerId,incidentId,incidentMessage } = route.params;
    const pinCircleRadius = (screenWidth/2)-80;
    const keyCircleRadius = (screenWidth/2)-110;
    const [textPin,updateTextPin] = useState("");
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;
    const [animating,setAnimating] = useState(false);

    
    const share = async () => {

        try {
          const result = await Share.share({
            message: 'Hi! Welcome to Solace ..',
          });

          if (result.action === Share.sharedAction) {

            if (result.activityType) {
              // shared with activity type of result.activityType
              // console.log( "activityType" );
              // console.log( result.activityType );
            } else {
              // shared
              // console.log( "shared it" );
              // ToastAndroid.show("Shared ", ToastAndroid.SHORT);
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            // console.log( "dismissed action" );

          }
        } catch (error) {
          console.log( error.message );
        }

    }

    return (

        <View style={styles.container}>

            <View style={styles.panicGrpTxt}>


                <Svg width="89" height="70" viewBox="0 0 89 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M60.2393 1.87419L87.0816 24.9189C88.7745 26.3678 88.7745 28.991 87.0816 30.5954L60.2393 53.6402C57.8937 55.667 54.1861 54.0275 54.1861 50.8705V48.4562L78.2374 27.684L54.1861 6.9117V4.64383C54.1861 1.49154 57.8891 -0.154232 60.2393 1.87419ZM40.7177 1.87419L67.56 24.9189C69.2529 26.3678 69.2529 28.991 67.5584 30.5741L40.7161 53.6188C38.3705 55.6457 34.6629 54.0062 34.6629 50.8492V38.032C18.1156 39.9536 11.6212 46.9997 17.4899 65.7741C18.2571 68.2279 15.2938 70.1296 13.2104 68.6139C6.53799 63.764 0.5 54.482 0.5 45.1116C0.5 25.0867 14.9674 18.6964 34.6644 17.278V4.64383C34.6644 1.49154 38.3675 -0.154232 40.7177 1.87419Z" fill="white"/>
                </Svg>


                <Text></Text>
                <Text></Text>

                <Text style={styles.panicText}>Share solace with friends</Text>
                <Text style={styles.panicSubText}>Keep your friends safe by sharing Solace with them. </Text>

                <View style={styles.shareBtnGrp}>

                    <TouchableOpacity
                        style={ styles.btnSafety }
                        onPress = {share}>

                        <View style={styles.safeBtn}>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M17.0045 3.36148C15.1339 1.56148 12.6429 0.571484 9.99554 0.571484C4.53125 0.571484 0.0848214 4.84005 0.0848214 10.0858C0.0848214 11.7615 0.540179 13.3986 1.40625 14.8429L0 19.7715L5.25446 18.4472C6.70089 19.2058 8.33036 19.6043 9.99107 19.6043H9.99554C15.4554 19.6043 20 15.3358 20 10.0901C20 7.54863 18.875 5.16148 17.0045 3.36148ZM9.99554 18.0015C8.51339 18.0015 7.0625 17.6201 5.79911 16.9001L5.5 16.7286L2.38393 17.5129L3.21429 14.5943L3.01786 14.2943C2.19196 13.0343 1.75893 11.5815 1.75893 10.0858C1.75893 5.7272 5.45536 2.17863 10 2.17863C12.2009 2.17863 14.2679 3.00148 15.8214 4.4972C17.375 5.99291 18.3304 7.9772 18.3259 10.0901C18.3259 14.4529 14.5357 18.0015 9.99554 18.0015ZM14.5134 12.0786C14.2679 11.9586 13.0491 11.3843 12.8214 11.3072C12.5938 11.2258 12.4286 11.1872 12.2634 11.4272C12.0982 11.6672 11.625 12.1986 11.4777 12.3615C11.3348 12.5201 11.1875 12.5415 10.942 12.4215C9.48661 11.7229 8.53125 11.1743 7.57143 9.59291C7.31696 9.17291 7.82589 9.20291 8.29911 8.29434C8.37946 8.13577 8.33929 7.99863 8.27679 7.87863C8.21429 7.75863 7.71875 6.58863 7.51339 6.11291C7.3125 5.65006 7.10714 5.71434 6.95536 5.70577C6.8125 5.6972 6.64732 5.6972 6.48214 5.6972C6.31696 5.6972 6.04911 5.7572 5.82143 5.99291C5.59375 6.23291 4.95536 6.8072 4.95536 7.9772C4.95536 9.1472 5.84375 10.2786 5.96429 10.4372C6.08929 10.5958 7.70982 12.9958 10.1964 14.0286C11.7679 14.6801 12.3839 14.7358 13.1696 14.6243C13.6473 14.5558 14.6339 14.0501 14.8393 13.4929C15.0446 12.9358 15.0446 12.4601 14.9821 12.3615C14.9241 12.2543 14.7589 12.1943 14.5134 12.0786Z" fill="white"/>
                            </Svg>

                            <Text style={ styles.btnText }>WHATSAPP</Text>

                        </View>
                    </TouchableOpacity>

                    <Text></Text>

                    <TouchableOpacity
                        style={ [styles.btnSafety,styles.btnTextMessage ] }
                        onPress = { share }>

                        <View style={styles.safeBtn}>
                            
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M19.9647 2.47953V13.6725C19.9647 15.0468 18.8439 16.1326 17.4696 16.1326H11.8556L6.98617 19.7848C6.67915 20.009 6.24075 19.7867 6.24075 19.4066V16.1326H2.49806C1.12379 16.1326 0.00292969 15.0117 0.00292969 13.6725V2.47953C0.00292969 1.10526 1.12379 0.0194931 2.49806 0.0194931H17.4688C18.877 0.0194931 19.9647 1.14035 19.9647 2.47953Z" fill="white"/>
                            </Svg>
                            <Text style={ styles.btnText }>TEXT MESSAGE</Text>

                        </View>
                    </TouchableOpacity>

                </View>

            </View>



        </View>
    )
}

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#03C108",
        justifyContent: "center",
        alignItems:"center"
    },
    safeText:{
        fontSize:20,
        textAlign:'center',
        color:"#ffffff",
        fontWeight: "bold",
        letterSpacing: 1
    },
    pinCircle:{
        backgroundColor:"#68D8FF",
        justifyContent: "center",
        alignItems: "center"
    },
    inputPin:{
        textAlign:"center",
        color:"#ffffff",
        fontSize: 20
    },
    btnSafety:{
        backgroundColor: "#3CC13B",
        borderRadius:60,
        width:props.screenWidth-90,
        height:47,
        justifyContent:"center",
        alignItems:"center"

    },
    btnTextMessage:{
        backgroundColor: "#191414"
    },
    panicGrpTxt:{
        flex:3,
        justifyContent:"center",
        alignItems:"center"
    },
    shareBtnGrp:{
        top:20
    },
    panicText:{
        fontFamily:"EuclidCircularBold",
        color:"#FFFFFF",
        fontSize: 20,
        fontStyle:"normal",
        lineHeight:28
    },
    panicSubText:{

        fontFamily:"EuclidCircularLight",
        color:"#FFFFFF",
        fontSize: 14,
        fontStyle:"normal",
        lineHeight:28

    },
    safeBtn:{
        flexDirection:"row",
        right:10
    },
    btnText:{
        left:10,
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        flexGrow:0,
        display:"flex",
        textTransform: "uppercase"
    },
    indicator:{
        left:20
    }

  })