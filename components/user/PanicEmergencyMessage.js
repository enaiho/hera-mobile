
import React, { useState,useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Alert,
    ActivityIndicator,
    ToastAndroid

} from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Svg, {Path} from 'react-native-svg';
import {useHttpPut} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";


export default function PanicEmergencyMessage({ route, navigation}){



    const { screenWidth,screenHeight,triggerId,incidents } = route.params;
    const pinCircleRadius = (screenWidth/2)-80;
    const keyCircleRadius = (screenWidth/2)-110;
    const [pin,updatePin] = useState("");
    const [textPin,updateTextPin] = useState("");
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;
    const [animating,setAnimating] = useState(false);
    const [incidentId, setIncidentId] = useState("");
    const [incidentMessage, setIncidentMessage] = useState("");


    const customNavigate = (navigateParams) => {


    	const { incidentId,incidentMessage } = navigateParams;



    	return navigation.navigate( "PanicActivate", {
	         screenWidth:screenWidth,
	         screenHeight:screenHeight,
	         triggerId:triggerId,
	         incidentId:incidentId,
	         incidentMessage:incidentMessage
        })

    }

    const registerEmergencyMessage = async () => {


        if(  incidentId === "" ) {ToastAndroid.show("Please select an option. ", ToastAndroid.LONG); return; }
        customNavigate( { incidentId:incidentId, incidentMessage:incidentMessage } );

    }
    const skipEmergencyMessage = async() => customNavigate( { incidentId:"", incidentMessage:"" } );

    const radioList = () => {


    	return (

			 incidents.map( (item,index) => {

			 	const { _id,label } = item;
		    	return(
		   			<RadioButtonItem key={_id} value={_id.toString()} label={
            			<Text style={{ color: "#000000" }}>{label}</Text>
          			}/>
	
		   		)

		    })

	    )
    }



    return (


        <View style={styles.container}>


        	<View style={styles.txtHeader}>
        		<Text>Report Incident</Text>
        	</View>


        	<View style={styles.safetyOptions}>

        		


        		<RadioButtonGroup
			        containerStyle={{ marginBottom: 10 }}
			        selected={incidentId}
			        onSelected={(value) => setIncidentId(value)}
			        radioBackground="green">

        			{ radioList()  }


        		</RadioButtonGroup>



        		<TextInput
        			onChangeText={setIncidentMessage}
        			style={{ height:200, textAlignVertical: 'top', 
				      }}/>
			    

        	</View>



    	    <View>

                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={registerEmergencyMessage}>
                    <Text style={ styles.btnText }>Done</Text>

                </TouchableOpacity>

            </View>


            <View>

                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={skipEmergencyMessage}>
                    <Text style={ styles.btnText }>Skip</Text>

                </TouchableOpacity>

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
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        fontSize:14
    },
    indicator:{
        left:20
    },
    btn:{
        textTransform:"lowercase",
        backgroundColor:"#03C108",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"5.1%",
        borderRadius:60,
        width:props.screenWidth-50
    }


  })