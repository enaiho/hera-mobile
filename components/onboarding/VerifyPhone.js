import React,{useState} from "react";
import { StyleSheet,View,Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";


const VerifyPhone = ({ route,navigation }) => {

    const [code, verifyCode] = useState(null);
    const [isDisabled, toggleButton] = useState(false);
    const {screenWidth,screenHeight,otp_code,user} = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = "http://192.168.1.131:5000";

    const verifyToken = () => {

        if( code != otp_code  ) return alert("Incorrect token. ");
        navigation.navigate("CreatePIN",{ screenWidth:screenWidth,screenHeight:screenHeight,user:user });
    }


    return (

        <View style={styles.container}>

            <Text style={styles.txtNumber}>Verify your number </Text>
            <View style={styles.semiContainer}>
                <TextInput 
                    style={styles.txtPhone}
                    onChangeText={verifyCode}
                    keyboardType="numeric"
                    
                    />

                <Text>We 'll send a text to verify your account</Text>

                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={ verifyToken }
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

export default VerifyPhone