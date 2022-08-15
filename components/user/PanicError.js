import React, { useState,useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Alert

} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useHttpPut} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";


export default function PanicError({ route, navigation}){


    useEffect( ()=>{
    })



    const { screenWidth,screenHeight,user,noContact,msg } = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;
    

    const navigateToPanic = () => {

        return navigation.navigate("Panic",{
            screenWidth:screenWidth,
            screenHeight:screenHeight,
            user:user

        });

    }

    const navigateToEmergencyContact = () => {

        return navigation.navigate("EmergencyContacts",{
            screenWidth:screenWidth,
            screenHeight:screenHeight,
            user:user

        });

    }

    return (

        <View style={styles.container}>

            <View style={styles.panicGrpTxt}>

                <Svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M80.1797 14.3842L47.1797 0.6325C46.3375 0.284625 44.9109 0 44.0172 0C43.1063 0 41.6797 0.284625 40.8375 0.633875L7.8375 14.3856C4.75922 15.6544 2.75 18.6656 2.75 21.8453C2.75 66.2063 35.2687 88 43.8453 88C52.7828 88 85.25 65.9656 85.25 21.8453C85.25 18.6656 83.2391 15.6544 80.1797 14.3842ZM39.875 26.125C39.875 23.8563 41.7313 22 44 22C46.2687 22 48.125 23.8477 48.125 26.125V45.375C48.125 47.6609 46.2859 49.5 44 49.5C41.7141 49.5 39.875 47.6609 39.875 45.375V26.125ZM38.5 60.5C38.5 63.537 40.963 66 44 66C47.0422 66 49.5 63.537 49.5 60.5C49.5 57.463 47.037 55 44 55C40.963 55 38.5 57.463 38.5 60.5Z" fill="white"/>
                </Svg>

                <Text></Text>
                <Text></Text>

                <Text style={styles.panicText}>Panic mode error</Text>
                <Text style={styles.panicSubText}>{ msg } </Text>

            </View>

            <View style={styles.btnSafetyGrp}>


                {
                    noContact &&  
                    
                    <TouchableOpacity
                        style={ styles.btnSafety }
                        onPress={navigateToEmergencyContact}>

                        <View style={styles.safeBtn}>
                            <Text style={ styles.btnText }>Add Emergency Contact(s)</Text>
                        </View>

                    </TouchableOpacity>
                }

                 <TouchableOpacity
                    style={ [styles.btnSafety,styles.btnPanicScreen ] }
                    onPress={navigateToPanic}>

                    <View style={styles.safeBtn}>
                        <Text style={ styles.btnText }>Panic Screen</Text>
                    </View>

                </TouchableOpacity>

            </View>

        </View>
    )
}

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#F03738",
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
        color:"#000000",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        flexGrow:0,
        display:"flex"
    },
    indicator:{
        left:20
    },
    btnPanicScreen:{
        top:5
    }

  })