import React, { useState,useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator

} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useHttpPut} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";


export default function PanicActivate({ route, navigation}){



    useEffect( ()=>{
    })

    const { screenWidth,screenHeight,triggerId } = route.params;
    const pinCircleRadius = (screenWidth/2)-80;
    const keyCircleRadius = (screenWidth/2)-110;
    const [pin,updatePin] = useState("");
    const [textPin,updateTextPin] = useState("");
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;
    const [animating,setAnimating] = useState(false);


    const confirmSafety = async () => {

        
        setAnimating(true);
        if( !triggerId ) {  Alert.alert( `Error Message`, `Couldn't find the trigger id for this user. ` ); return;  }


        const payload = { safety_status:1 };
        const response = await useHttpPut(`${BASE_URL}/trigger/update_safety/${triggerId}`, payload);

        setAnimating(false);

        const { message,safe } = response.data;

        if( !safe ) {Alert.alert("Error Message. ",message); return; }

        navigation.navigate( "Safety", {
         screenWidth:screenWidth,
         screenHeight:screenHeight,
         triggerId:triggerId
        })




    }

    return (

        <View style={styles.container}>

            <View style={styles.panicGrpTxt}>

                <Svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M80.1797 14.3842L47.1797 0.6325C46.3375 0.284625 44.9109 0 44.0172 0C43.1063 0 41.6797 0.284625 40.8375 0.633875L7.8375 14.3856C4.75922 15.6544 2.75 18.6656 2.75 21.8453C2.75 66.2063 35.2687 88 43.8453 88C52.7828 88 85.25 65.9656 85.25 21.8453C85.25 18.6656 83.2391 15.6544 80.1797 14.3842ZM39.875 26.125C39.875 23.8563 41.7313 22 44 22C46.2687 22 48.125 23.8477 48.125 26.125V45.375C48.125 47.6609 46.2859 49.5 44 49.5C41.7141 49.5 39.875 47.6609 39.875 45.375V26.125ZM38.5 60.5C38.5 63.537 40.963 66 44 66C47.0422 66 49.5 63.537 49.5 60.5C49.5 57.463 47.037 55 44 55C40.963 55 38.5 57.463 38.5 60.5Z" fill="white"/>
                </Svg>

                <Text></Text>
                <Text></Text>

                <Text style={styles.panicText}>Panic mode activated</Text>
                <Text style={styles.panicSubText}>Your emergency contact has been notified of your danger</Text>

            </View>

            <View style={styles.btnSafetyGrp}>

                <TouchableOpacity
                    style={ styles.btnSafety }
                    onPress = { confirmSafety }>

                    <View style={styles.safeBtn}>
                        <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.2227 0.144893L17.7227 3.26989C18.418 3.55856 18.875 4.24216 18.875 4.96481C18.875 14.9922 11.4961 20 9.49609 20C7.51562 20 0.125 15.0468 0.125 4.96481C0.125 4.24216 0.582031 3.55856 1.28164 3.26989L8.78125 0.144893C8.97305 0.0655566 9.29484 0.000244141 9.50234 0.000244141C9.70859 0.000244141 10.0322 0.0655566 10.2227 0.144893ZM13.0242 8.42263C13.1757 8.24567 13.25 8.02853 13.25 7.81247C13.25 7.52341 13.0312 6.87497 12.3137 6.84056C12.0496 6.84056 11.7871 6.9511 11.6012 7.1672L8.51016 10.7742L7.35039 9.61446C7.16719 9.43138 6.92738 9.33982 6.6875 9.33982C6.15234 9.33982 5.75 9.77771 5.75 10.2773C5.75 10.5508 5.83984 10.7929 6.02461 10.9402L7.89961 12.8152C8.07539 12.9909 8.31469 13.0898 8.5625 13.0898C8.56677 13.0898 8.57148 13.0898 8.5766 13.0899C8.69316 13.0906 9.02276 13.0925 9.27418 12.7976L13.0242 8.42263Z" fill="#3CC13B"/>
                        </Svg>
                        <Text style={ styles.btnText }>I 'm safe now</Text>

                        <ActivityIndicator 
                            style={styles.indicator}
                            size="small" 
                            color="#0000ff"
                            animating={animating} />

                    </View>

                </TouchableOpacity>

            </View>

        </View>
    )
}

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#000000",
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

        backgroundColor: "#FFFFFF",
        borderRadius:60,
        width:props.screenWidth-90,
        height:47,
        justifyContent:"center",
        alignItems:"center"

    },
    panicGrpTxt:{
        flex:3,
        justifyContent:"center",
        alignItems:"center"
    },
    btnSafetyGrp:{

        flex:1,
        justifyContent:'flex-end',
        bottom:props.screenHeight-720
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
        color:"#3CC13B",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        flexGrow:0,
        display:"flex"
    },
    indicator:{
        left:20
    }


  })