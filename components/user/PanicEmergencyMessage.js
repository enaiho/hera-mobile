
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
import { useHttpPut } from '../../hooks/useHttp';
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

    const registerEmergencyMessage = () => {




        let tag;
        const foundIncident = incidents.filter( ( item ) => item._id.toString() === incidentId );
        if( foundIncident ) tag = foundIncident[0].tag.toLowerCase().trim();


        if(  incidentId === "" ) {ToastAndroid.show("Please select an option. ", ToastAndroid.LONG); return; }
        else if( tag === "other" && incidentMessage === "" ) {ToastAndroid.show("Pleae type in the message to help us understand the incident. ", ToastAndroid.LONG); return; }
        else if( incidentMessage != "" && tag === "" ){ ToastAndroid.show(`Please select the "Other Incident option" when typing the message. `,ToastAndroid.LONG ); return; }


        customNavigate( { incidentId:incidentId, incidentMessage:incidentMessage } );



    }
    const skipEmergencyMessage = () => customNavigate( { incidentId:"", incidentMessage:"" } );

    const radioList = () => {

    	return (

			 incidents.map( (item,index) => {

			 	const { _id,label } = item;
		    	return(
		    			
		   			<RadioButtonItem key={_id} style={styles.radioButton} value={_id.toString()} label={
            			<Text style={styles.radioText}>{label}</Text>
          			}/>

		   		)

		    })

	    )
    }


    !incidents && skipEmergencyMessage();



    return (


    	<View style={styles.container}>
   
        	<View style={styles.txtHeader}>

        		<Text style={styles.txtReportIncident}>Report Incident</Text>
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
	                    multiline={true}
	                    style={ styles.txtOtherIncident }
	                    placeholder="Other Incident"
	                    />
            	</View>

        	</View>

    	    <View style={styles.btnGrp}>

                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={registerEmergencyMessage}>
                    <Text style={ styles.btnText }>Done</Text>

                </TouchableOpacity>

                 <TouchableOpacity 
                    style={ styles.btnSkip }
                    onPress={skipEmergencyMessage}>
                    <Text style={ styles.btnSkipText }>Skip</Text>

                </TouchableOpacity>

            </View>

        </View>
    )
}

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        flexDirection:"column"
    },
    txtHeader:{
    	flex:1,
    	marginTop:45,

    },
    txtReportIncident:{
    	textAlign: "center",
    	fontFamily:"EuclidCircularBold",
    	color:"#191414",
    	fontSize:20,
    	lineHeight:28
    },
    safetyOptions:{
    	top:15
    },
    btnGrp:{
    	position:"absolute",
    	bottom:0
    },
    btnText:{
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        textTransform:"uppercase",
        fontWeight:"bold"
    },
    btn:{
        backgroundColor:"#03C108",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:60,
        width:props.screenWidth-50,
    },
    btnSkip:{
        backgroundColor:"#F0F2F4",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:60,
        width:props.screenWidth-50,
       
    },
    btnSkipText:{
        color:"#90979E",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        textTransform:"uppercase",
        fontWeight:"bold"
    },
    txtOtherIncident:{
    	borderWidth:1,
    	borderColor:"#DFE4E8",
    	borderRadius:8,
    	height:90,
    	width:341,
    	fontFamily:"EuclidCircularLight"
    },
    radioButton:{
    	position:"absolute",
    	right:0,
    	justifyContent:"space-between"
    },
    radioText:{
    	fontFamily:"EuclidCircularLight",
    	color:"#000000",
    	justifyContent:"space-between",
    	height:30
    }


  })