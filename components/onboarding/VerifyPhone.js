import React,{useState,useRef,useEffect} from "react";
import { StyleSheet,View,Text,ToastAndroid } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";
import {useHttpPost} from '../../hooks/useHttp';



const VerifyPhone = ({ route,navigation }) => {

    

    const [code, verifyCode] = useState(null);
    const [isDisabled, toggleButton] = useState(false);
    const [errMessage,setErrorMessage] = useState(null);
    const {screenWidth,screenHeight,phone,exist,message,otp_code} = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;
    const contents = ["1_","2_","3_","4_"];


    useEffect(() => {
       // console.log("changed new");
    });


    const pin = [];
    const mapRef = [];
    let length = 4;



    for (let index = 0; index < length; index++) {
        mapRef.push(useRef())
    }


    const verifyOTP = async() => {


        const pin_val = pin.join("");


        if( pin_val === "" || pin_val == undefined || pin.length < 4 ) { 
            ToastAndroid.show("OTP value not complete. Ensure you type in all characters. ", ToastAndroid.SHORT);      
            return;

        }
        else if( otp_code != pin_val  ){ 

            ToastAndroid.show("Incorrect Token. Ensure you type in the correct token.", ToastAndroid.SHORT);
            return;

        }


        if( exist === true ){


            // set the session for the user to login successfully.
            // navigate to the panic button side


            const payload = {"phone":phone};
            const response = await useHttpPost(`${BASE_URL}/user/get_rec_phone`,payload);
            const { message,authenticated,user } = response.data;


            if( authenticated === false ) return navigation.navigate("SignUp",{ screenWidth:screenWidth,screenHeight:screenHeight,phone:phone,otp_code:otp_code });
            
            try {

                await AsyncStorage.setItem('userdata_key',JSON.stringify(user) ); // the user object coming has already been stringified.
                return navigation.navigate("Panic",{
                    screenWidth:screenWidth,
                    screenHeight:screenHeight,
                    user:JSON.stringify(user)
                });

            } catch (e) {
                console.log("error in storing async storage. ");
                console.log(e);
            }

        }

    }


    return (

        <View style={styles.container}>


            <View style={styles.grpCode}>
                <Text style={styles.txtNumber}>What's the code? </Text>
                <Text style={styles.txtSub}>Enter the code sent to <Text style={styles.txtMainPhone}>{phone}</Text></Text>
                
                <View style={[styles.txtPins]}>

                    {

                        contents.map((content, i) => (

                            <TextInput
                                style={styles.txtPinInput}
                                keyboardType="numeric"
                                key={i}
                                onChangeText={text => {
                                    text.length === 1 ? pin.splice(i, 0, text) : pin.splice(i, 1)
                                    i < length - 1 && text.length > 0 && mapRef[i + 1].current.focus()
                                    text.length === 0 && i > 0 && mapRef[i].current.focus()
                                }}
                                value={pin[i]}
                                onKeyPress={({ nativeEvent }) => {
                                    nativeEvent.key === 'Backspace' &&
                                    i > 0 && mapRef[i - 1].current.focus()
                                }}
                                maxLength={1}
                                returnKeyType={length - 1 ? 'done' : 'next'}
                                onSubmitEditing={verifyOTP}
                                ref={mapRef[i]}
                                autoFocus={i === 0}

                            />

                        ))
                    }


                </View>

                <Text></Text>

                <Text style={styles.errorMessage}> {errMessage} </Text>

            </View>


            <View style={styles.semiContainer}>
        

                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={ verifyOTP }
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
        justifyContent:"space-between",
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
        color:"#0A1F44"
    },
    semiContainer:{
        margin:40
    },
    grpCode:{
        top:90
    },
    txtPins:{
        flexDirection: "row",
        justifyContent:"center",
        flexWrap:"wrap",
        right:15,
        top:20
    },
    txtPinInput:{
        borderColor:"#000000",
        width:50,
        height:50,
        borderWidth:1,
        margin:15,
        fontSize:45,
        textAlign:"center",
        borderRadius:8
    },
    txtSub:{
        top:10,
        fontFamily:"EuclidCircularLight",
        fontSize:12
    },
    txtMainPhone:{
        fontFamily:"EuclidCircularBold"
    },
    errorMessage:{
        top:10,
        fontFamily:"EuclidCircularLight",
        fontSize:12,
        color:"#F03738"
    }


});

export default VerifyPhone