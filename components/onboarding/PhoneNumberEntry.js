import React,{useState} from "react";
import { StyleSheet,View,Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import {useHttpGet,useHttpPost} from '../../hooks/useHttp';


const PhoneNumberEntry = ({ route,navigation }) => {

    const [phone, onChangeNumber] = useState(null);
    const [isDisabled, toggleButton] = useState(false);
    const {screenWidth,screenHeight} = route.params;

    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = "http://192.168.100.52:5000";
    const data = JSON.parse(route.params.data);
    const { email,family_name,given_name } = data;


    const verifyPhone = async () => {
       
        try{

            const response =  await axios.post(`${BASE_URL}/user/verify_phone`, {phone: phone});
            const data = response.data;

            if( data.exist === false ) {
                return navigation.navigate("SignUp", {
                    family_name:family_name,
                    given_name:given_name,
                    email_address: email,
                    screenWidth: screenWidth,
                    screenHeight: screenHeight,
                    phone: phone,

                });
            }

            return navigation.navigate("VerifyPhone");

        }
        catch(e){
            alert(e);
            alert("couldn't connect to server.  ");
        }

    }

    return (

        <View style={styles.container}>

            <Text style={styles.txtNumber}>What's your number </Text>
            <View style={styles.semiContainer}>
                <TextInput 
                    style={styles.txtPhone}
                    onChangeText={onChangeNumber}
                    keyboardType="numeric"
                    
                    />
                <Text>We 'll send a text to verify your account</Text>


                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={ verifyPhone }
                    disabled={ isDisabled }>
                    <Text style={ styles.btnText }>Next</Text>

                </TouchableOpacity>
            </View>

        </View>
    )
};

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    txtPhone:{
        borderColor:"#000000",
        width:343,
        height:48,
        borderWidth:1
    },
    btn:{
        textTransform:"lowercase",
        backgroundColor:"#00A6FF",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"5.1%",
        borderRadius:5,
        width:props.screenWidth-50
    },
    btnText:{
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        fontSize:14
    },
    txtNumber:{
        fontFamily:"EuclidCircularBold",
        fontSize:24,
        color:"#0A1F44",
        width:343,
        height:32,
        left:16,
    },
    semiContainer:{

        margin:40

    }

});

export default PhoneNumberEntry