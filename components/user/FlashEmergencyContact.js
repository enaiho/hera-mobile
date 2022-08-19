
import React, { useState,useContext } from "react";
import {
 StyleSheet, View, Text, TouchableOpacity
} from "react-native";
import {EmergencyContactContext} from "../../context/EmergencyContactContext";


const navigateToEmergencyContact = (navigation,screenWidth,screenHeight,user) => {
	navigation.navigate("EmergencyContacts",{
	     screenWidth: screenWidth,
	     screenHeight: screenHeight,
	  	  user:user
	});
}

export const FlashEmergencyContact = ( { navigation,screenWidth,screenHeight,user } ) => {

	const isValid = useContext(EmergencyContactContext);
	return (
		<>
			{
				!isValid && <TouchableOpacity
					onPress = { () =>  navigateToEmergencyContact(navigation,screenWidth,screenHeight,user ) }>
					<View style={styles.bottomContainer}>
			            <Text style={styles.bottomContainerText}>You currently do not have any emergency contact. Click on the banner to add emergency contact.</Text>
			        </View>
		        </TouchableOpacity> 
	    	}

        </>  	
	) 
}

const styles = StyleSheet.create({

	bottomContainer:{
        justifyContent: 'flex-end',
        width: 334,
        height: 46,
        borderStyle:"solid",
        alignSelf:"center",
        alignItems: "center",
        bottom:5,
        borderRadius:10,
        backgroundColor:"#F03738",
        elevation: 5,
        shadowColor: "#52006A"
    },
    bottomContainerText:{

        fontSize: 12,
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: "EuclidCircularLight",
        lineHeight: 16,
        justifyContent: "center"
    }

})