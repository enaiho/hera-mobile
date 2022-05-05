import React,{useState,useRef} from "react";
import { StyleSheet,View,Text,Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Constants from 'expo-constants';


const ConfirmPIN = ({ route,navigation }) => {

    const [isDisabled, toggleButton] = useState(false);
    const {screenWidth,screenHeight,pin_code,user} = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = "https://hera-dev.herokuapp.com"
    const contents = ["1_","2_","3_","4_"];

    const pin = [];
    const mapRef = [];
    let length = 4;


    for (let index = 0; index < length; index++) {
        mapRef.push(useRef())
    }

    const completeRegistration = () => {


        if( pin.length < 4 ) {Alert.alert("Error Message","PIN characters not complete. "); return; }
        if( pin_code !== pin.join('') ){ Alert.alert("Error Message", "PIN does not match. "); return; }

        
        navigation.navigate("ManageCircle",{
            screenWidth:screenWidth,
            screenHeight:screenHeight,
            pin:pin.join(''),
            user:user

        });


    }

    return (

        <View style={styles.container}>

            <Text style={styles.txtNumber}>Confirm 4 digit PIN </Text>
            <Text></Text>
            <View style={styles.semiContainer}>

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
                                secureTextEntry
                                maxLength={1}
                                returnKeyType={length - 1 ? 'done' : 'next'}
                                onSubmitEditing={completeRegistration}
                                ref={mapRef[i]}
                                autoFocus={i === 0}

                            />

                        ))
                    }

                </View>

                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={ completeRegistration }
                    disabled={ isDisabled }>
                    <Text style={ styles.btnText }>Finish</Text>

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
    txtPinInput:{
        borderColor:"#000000",
        width:50,
        height:50,
        borderWidth:1,
        margin:15,
        fontSize:45,
        textAlign:"center"
    },
    btn:{
        textTransform:"lowercase",
        backgroundColor:"#00A6FF",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        width:props.screenWidth-50,
        margin:20

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
        justifyContent:"center"
    },

    txtPins:{
        flexDirection: "row",
        justifyContent:"center",
        flexWrap:"wrap"
    }

});

export default ConfirmPIN;