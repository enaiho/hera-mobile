import React,{useState} from "react";
import { StyleSheet,View,Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {useHttpPost} from '../../hooks/useHttp';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ route,navigation }) => {

    const [email, setEmail] = useState(null);
    const [pword, setPword] = useState(null);

    const {screenWidth,screenHeight,token,user} = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = "https://hera-dev.herokuapp.com";

    const authenticate = async() => {

        const payload = {"email":email, "password":pword};
        const response = await useHttpPost(`${BASE_URL}/user/authenticate`,payload);
        const { message,authenticated,user } = response.data;

        if( authenticated === false ) { alert(message); return; }

        try {

            await AsyncStorage.setItem('userdata_key',JSON.stringify(user) ); // the user object coming has already been stringified.
            navigation.navigate("Panic",{
                screenWidth:screenWidth,
                screenHeight:screenHeight,
                user:JSON.stringify(user)
            });

        } catch (e) {
            console.log("error in storing async storage. ");
            console.log(e);
        }

    }

    return (

        <View style={styles.container}>

            <Text style={styles.txtNumber}>Sign In To Hera </Text>
            <View style={styles.semiContainer}>


                <TextInput
                    style={styles.txtInput}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Email Address"

                />

                <Text></Text>

                <TextInput
                    style={styles.txtInput}
                    onChangeText={setPword}
                    secureTextEntry={true}
                    placeholder="Password"

                />

                <Text></Text>

                <TouchableOpacity
                    style={ styles.btn }
                    onPress={ authenticate }>
                    <Text style={ styles.btnText }>Submit</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={ styles.btnBack }
                    onPress={ () =>  navigation.navigate("Registration", {
                        screenWidth:screenWidth,
                        screenHeight:screenHeight

                    })}>
                    <Text style={ styles.btnBackText }>Back to SignUp</Text>

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
    txtInput:{
        borderColor:"#DFE4E8",
        width:343,
        height:48,
        borderWidth:1,
        textAlign:"center"
    },
    btn:{
        textTransform:"lowercase",
        backgroundColor:"#00A6FF",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"5.1%",
        borderRadius:5,
        width:props.screenWidth-65
    },
    btnBack:{
        textTransform:"lowercase",
        backgroundColor:"#FFFFFF",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        width:props.screenWidth-65
    },
    btnBackText:{
        color:"#00A6FF",
        fontFamily:"EuclidCircularLight",
        fontSize:14
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

export default SignIn