
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Share, ToastAndroid } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useHttpPut} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";

export default function About({ route, navigation}){


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


    return (



        <View style={styles.container}>

            <View style={styles.aboutGrpTxt}>


				<Svg width="279" height="89" viewBox="0 0 89 90 " fill="none" xmlns="http://www.w3.org/2000/svg">
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M44.5 89C69.0767 89 89 69.0767 89 44.5C89 19.9233 69.0767 0 44.5 0C19.9233 0 0 19.9233 0 44.5C0 69.0767 19.9233 89 44.5 89ZM6.23065 45.39C6.23065 24.2541 23.3647 7.11999 44.5006 7.11999C65.6366 7.11999 82.7706 24.2541 82.7706 45.39H6.23065Z" fill="#3CC13B"/>
				</Svg>


                <Text></Text>
                <Text></Text>

                <Text style={styles.txtAboutHeader}>About Solace</Text>
                <Text style={styles.txtAboutText}>
	                Lorem ipsum dolor sit amet, 
	                consectetur adipiscing elit. Morbi pretium, nibh a tempus bibendum, 
	                felis ligula mollis turpis, et imperdiet lectus lorem sed odio. Mauris sit amet sodales augue. Phasellus ac metus at metus accumsan lobortis. Donec lobortis, risus eget pellentesque lobortis, erat ipsum pellentesque nisi, sed dignissim nulla erat varius risus. Nulla mi lacus, tempor ut semper a, euismod in odio. In feugiat dapibus efficitur. 
	                Mauris vitae justo pellentesque, gravida purus quis, lacinia erat. Etiam eget feugiat nisi, et malesuada dui.
                </Text>

                <Text></Text>
                <Text></Text>
                <Text style={ styles.txtVersion }>Solace v1.0</Text>

            </View>

        </View>


    )
}

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
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
    aboutGrpTxt:{
        flex:3,
        justifyContent:"center",
        alignItems:"center"
    },
    txtAboutHeader:{
        fontFamily:"EuclidCircularBold",
        color:"#191414",
        fontSize: 20,
        fontStyle:"normal",
        lineHeight:28
    },
    txtAboutText:{

        fontFamily:"EuclidCircularLight",
        color:"#191414",
        fontSize: 14,
        fontStyle:"normal",
        top:10
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
    txtVersion:{
    	fontFamily:"EuclidCircularBold",
    	fontSize:11	
    }


  })