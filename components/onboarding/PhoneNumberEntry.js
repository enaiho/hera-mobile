import React,{useState,useRef,useContext} from "react";
import { StyleSheet,View,Text, ActivityIndicator,Alert,ToastAndroid } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import {useHttpGet,useHttpPost} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import PhoneInput from "react-native-phone-number-input";
import SolaceConfig from "../../solace_config";
import { EmergencyContactContext,EmergencyContactContextUpdate } from '../../context/EmergencyContactContext';




const PhoneNumberEntry = ({ route,navigation }) => {



    const [phone, onChangeNumber] = useState(null);
    const [phoneFormatted, onChangePhoneFormatted] = useState(null);
    const [isDisabled, toggleButton] = useState(false);
    const {screenWidth,screenHeight} = route.params;
    const [animating,setAnimating] = useState(false);

    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;

    const phoneInput = useRef(null);
    const [value, setValue] = useState("");
    const [errMsg,setErrMsg] = useState("");




    const verifyPhone = async () => {


       
        try{



            if( phone === "" || phone === null )return ToastAndroid.show("The number You have typed in is incorrect. ",  ToastAndroid.SHORT);
            if(  phone.length < 10  ) return ToastAndroid.show("The number You have typed in is incorrect. ",  ToastAndroid.SHORT);

       
            let phone_value = phoneFormatted.substring(1);
            if( phone_value[3] === "0" )  phone_value = `${phone_value.substring(0,3)}${phone_value.substring(4)}`;


            setAnimating(true);
            const response =  await useHttpPost(`${BASE_URL}/verify_phone`, {phone:phone_value });
            setAnimating(false);
            const data = response.data;
            const status = response.status;
            const { message,exist,otp_sent,otp_code } = data;



            setAnimating(false);



            if( otp_sent ){


                return navigation.navigate("VerifyPhone", {
                    screenWidth: screenWidth,
                    screenHeight: screenHeight,
                    phone: phone_value,
                    exist:exist,
                    message:message,
                    otp_code:otp_code

                });

            }

            return ToastAndroid.show(`Server Error: ${message} `,  ToastAndroid.SHORT);

        }
        catch(e){
            setAnimating(false);
            ToastAndroid.show(`Exception Error: ${e.message} `,  ToastAndroid.SHORT);
        }

    }


    return (

        <>

            <View style={styles.container}>

                
                <View style={styles.grpNumber}>

                
                    
                    <Text style={styles.txtNumber}>What's your number? </Text>
                    <Text style={styles.txtSub}>We’ll text a code to verify your phone</Text>
                    <Text></Text>
                    <Text></Text>


                     <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="NG"
                        layout="first"
                        containerStyle={styles.phoneInput}
                        textInputStyle={styles.txtPhoneInput}
                        codeTextStyle={styles.txtPhoneInput}
                        onChangeText={onChangeNumber}
                        onChangeFormattedText={onChangePhoneFormatted}
                        withDarkTheme
                        autoFocus
                        textInputProps={{ maxLength:10 }} 
                      />


                      <Text style={styles.errorMessage}>{errMsg}</Text>


                </View>
                

                <View style={styles.semiContainer}>
                    


                    <TouchableOpacity 
                        style={ styles.btn }
                        onPress={ verifyPhone }
                        disabled={ isDisabled }>
                        <Text style={ styles.btnText }>Next</Text>

                    </TouchableOpacity>


                    <ActivityIndicator 
                        size="small" 
                        color="#0000ff"
                        animating={animating} 

                    />


                </View>
            </View>


        </>
    )
};

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center"
    },
    phoneInput:{
        borderWidth:1,
        borderRadius:8
    },
    txtPhoneInput:{
        fontFamily:"EuclidCircularLight",
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
        height:32,
    },
    semiContainer:{

        margin:40

    },
    grpNumber:{
        top:90
    },
    txtSub:{
        top:10,
        fontFamily:"EuclidCircularLight",
        fontSize:12
    },
    errorMessage:{
        top:10,
        fontFamily:"EuclidCircularLight",
        fontSize:12,
        color:"#F03738"
    }

});

export default PhoneNumberEntry