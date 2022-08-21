import Svg, {
    Path,
} from 'react-native-svg';
import React,{useState,useRef} from "react";
import { StyleSheet,View,Text, Dimensions,Alert,ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-auth-session/providers/google";
import {useHttpGet,useHttpPost} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox';


export default function Registration({navigation}){





    const [screenWidth,screenHeight] = [Dimensions.get("window").width,Dimensions.get("window").height]
    const [errMsg,setErrMsg] = useState("");
 

    const accessToken = useRef();
    const styleProps = {
        "screenWidth":screenWidth,
        "screenHeight":screenHeight
    }


    return(

        <View>
            { navigation.navigate( "Notifications", { screenWidth,screenHeight } ) }
        </View>

    )


    const BASE_URL = "https://hera-dev.herokuapp.com";
    const [request, response, promptAsync] = Google.useAuthRequest({

        expoClientId: '1001949980463-bgruvtmt3211vir0bv0qrbq0idb9rna6.apps.googleusercontent.com',
        //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: '1001949980463-l6cfmo6n10aij45hms0gr5f3p61of6ic.apps.googleusercontent.com',
        //webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    React.useEffect(() => {

        if (response?.type === 'success') {

            const {authentication} = response;
            accessToken.current = authentication.accessToken;

        }

    }, [response]);



    const validateAndCheckUserExists = async(token) => {

        const response = await useHttpGet(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        if( response.data !== null ){

            const {email,email_verified}  = response.data;
            if(email_verified === false ) return "This email is not verified from Google. ";
            const payload = { email:email };
            const response_ = await useHttpPost(`${BASE_URL}/user/verify_account`,payload);

            const { exist,message } = response_.data;

            if( exist === true ) return message;

            // proceed to navigate to the next page


            navigation.navigate("PhoneNumberEntry",{
                screenWidth:screenWidth,
                screenHeight:screenHeight,
                data:JSON.stringify(response.data)

            });
        }
    }


    if( accessToken.current !== undefined ){


        validateAndCheckUserExists(accessToken.current).then(data=>{
            if(data !== undefined ) setErrMsg(data);

        });
    }


    return (

        <View style={styles(styleProps).container}>


            <View style={styles(styleProps).welcomeGrp}>

                <Text style={styles(styleProps).txtWelcome}>Welcome To Solace</Text>
                <Text style={styles(styleProps).txtSlogan}>Your personal safety community </Text>
            
            </View>


            <View style={styles(styleProps).registerBtn}>

                <TouchableOpacity 
                style={[styles({}).appleBtn,styles(styleProps).btn]}
                onPress ={() => navigation.navigate("PhoneNumberEntry", {screenWidth:screenWidth,screenHeight:screenHeight} )}>


                    <View style= {[styles({}).btnIcons]}>
                        <Text style={ [styles(styleProps).btnText] }>Get Started</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )

}

export const styles = (props) => StyleSheet.create({

    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#03C108",
        justifyContent:"space-between"
    },
    txtWelcome:{
        fontFamily:"EuclidCircularBold",
        fontSize:36,
        color:"#FFFFFF"
    },
    txtSlogan:{
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        top:10,

    },
    welcomeGrp:{
        top:90
    },
    registerBtn:{

       textTransform:"lowercase",
       alignItems:"center",
       bottom:20
       
    },
    btn:{
        height:48,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:60,
        width:164
    },
    btnText:{
        fontFamily:"EuclidCircularBold",
        fontSize:14,
        color:"#FFFFFF",
        textTransform:"uppercase"
    },
    appleBtn:{
        backgroundColor:"#000000"
    },
    mobileText:{
        color:"#00A6FF",
    },
    mobileBtn:{
        backgroundColor:"#FFFFFF"
    },
    btnIcons:{
        flexDirection:"row"
    },
    errMsg:{
        color:"red",
        fontFamily:"EuclidCircularBold",
    }
});


