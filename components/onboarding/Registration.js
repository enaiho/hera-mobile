
import Svg, {
    Path,
} from 'react-native-svg';
import React,{useState,useRef} from "react";
import { StyleSheet,View,Text, Dimensions,Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-auth-session/providers/google";
import {useHttpGet,useHttpPost} from '../../hooks/useHttp';


//import * as WebBrowser from 'expo-web-browser';
//WebBrowser.maybeCompleteAuthSession();



export default function Registration({navigation}){

    const [screenWidth,screenHeight] = [Dimensions.get("window").width,Dimensions.get("window").height]
    //const [accessToken,setAccessToken] = useState(null);
    const accessToken = useRef();
    const styleProps = {
        "screenWidth":screenWidth,
        "screenHeight":screenHeight
    }


    const BASE_URL = "http://192.168.100.52:5000";
    const [request, response, promptAsync] = Google.useAuthRequest({

        expoClientId: '1001949980463-bgruvtmt3211vir0bv0qrbq0idb9rna6.apps.googleusercontent.com',
        //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        //androidClientId: '1001949980463-l6cfmo6n10aij45hms0gr5f3p61of6ic.apps.googleusercontent.com',
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

    // alert(accessToken.current);

    if( accessToken.current !== undefined ){


        validateAndCheckUserExists(accessToken.current).then(data=>{
            if(data !== undefined ) console.log(data);

        });

    }
    return (

        <View style={styles(styleProps).container}>

            <Text style={styles(styleProps).txtWelcome}>Welcome To Hera</Text>
            <View style={styles(styleProps).viewBtn}>

                <View style={styles(styleProps).registerBtn}>

                    <TouchableOpacity style={[styles({}).appleBtn,styles(styleProps).btn]}>

                        <View style= {[styles({}).btnIcons]}>

                            <Svg style={styles({}).iconApple} width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M10.5431 10.4C10.2548 11.0383 10.1173 11.3233 9.7456 11.8875C9.2281 12.675 8.49894 13.6567 7.59477 13.665C6.79144 13.6725 6.58477 13.1425 5.49477 13.1483C4.40477 13.1542 4.17644 13.6742 3.3731 13.6667C2.46894 13.6583 1.7781 12.7725 1.25977 11.9842C-0.186897 9.78084 -0.338563 7.19584 0.553937 5.82167C1.1881 4.84417 2.18894 4.27334 3.1306 4.27334C4.08894 4.27334 4.6906 4.79834 5.4831 4.79834C6.25144 4.79834 6.71977 4.2725 7.8281 4.2725C8.6656 4.2725 9.5531 4.72834 10.1848 5.51584C8.11394 6.65167 8.4506 9.60917 10.5431 10.4ZM7.44144 2.5825C6.95394 3.2075 6.1156 3.69167 5.30477 3.66667C5.15727 2.86084 5.53727 2.03167 5.99727 1.4725C6.50477 0.856669 7.3731 0.384169 8.1156 0.333336C8.24144 1.175 7.89644 1.99917 7.44144 2.5825Z" fill="white"/>
                            </Svg>
                            <Text style={ [styles({}).appleText,styles(styleProps).btnText] }>Continue with Apple</Text>

                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles(styleProps).registerBtn}>
                    <TouchableOpacity
                        disabled={!request}
                        onPress={() => {
                            promptAsync();
                        }}
                        style={ [styles({}).googleBtn, styles(styleProps).btn] }>
                        <View style= {[styles({}).btnIcons]}>

                            <Svg style={styles({}).iconGoogle} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M17.9792 10.1875C17.9792 9.63889 17.9306 9.11806 17.8472 8.61111H10V11.7431H14.4931C14.2917 12.7708 13.7014 13.6389 12.8264 14.2292V16.3125H15.507C17.0764 14.8611 17.9792 12.7222 17.9792 10.1875Z" fill="#4285F4"/>
                                <Path d="M10 18.3333C12.25 18.3333 14.132 17.5833 15.507 16.3125L12.8264 14.2292C12.0764 14.7292 11.125 15.0347 10 15.0347C7.82644 15.0347 5.98616 13.5695 5.32644 11.5903H2.56255V13.7361C3.9306 16.4583 6.7431 18.3333 10 18.3333Z" fill="#34A853"/>
                                <Path d="M5.32644 11.5903C5.15283 11.0903 5.06252 10.5555 5.06252 9.99999C5.06252 9.44444 5.15974 8.90972 5.32641 8.40972V6.26389H2.56252C1.99308 7.38889 1.66669 8.65277 1.66669 9.99999C1.66669 11.3472 1.9931 12.6111 2.56255 13.7361L5.32644 11.5903Z" fill="#FBBC05"/>
                                <Path d="M10 4.96528C11.2292 4.96528 12.3264 5.38889 13.1945 6.21528L15.5695 3.84028C14.132 2.49306 12.25 1.66667 10 1.66667C6.7431 1.66667 3.93058 3.54166 2.56252 6.26389L5.32641 8.40972C5.98613 6.43055 7.82644 4.96528 10 4.96528Z" fill="#EA4335"/>
                            </Svg>

                            <Text style={ [styles({}).googleText,styles(styleProps).btnText] }>Continue with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={styles(styleProps).registerBtn}>
                    <TouchableOpacity
                        style={ [styles({}).mobileBtn,styles(styleProps).btn] }
                        onPress = { ()=> navigation.navigate("PhoneNumberEntry", { screenWidth:screenWidth, screenHeight:screenHeight } ) }>
                        <Text style={ [ styles({}).mobileText, styles(styleProps).btnText] }>Use mobile number</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles(styleProps).registerBtn}>
                    <TouchableOpacity
                        style={ [styles({}).mobileBtn,styles(styleProps).btn] }
                        onPress = { ()=> navigation.navigate("SignIn", { screenWidth:screenWidth, screenHeight:screenHeight } ) }>
                        <Text style={ [ styles({}).mobileText, styles(styleProps).btnText] }>Login to Hera</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    )

}


export const styles = (props) => StyleSheet.create({

    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    txtWelcome:{
        fontFamily:"EuclidCircularBold",
        fontSize:48,
        color:"#0A1F44",
        width:343,
        left:16,
    },
    viewBtn:{
        marginTop: "20%",
    },
    registerBtn:{
       marginVertical:"1.1%",
       width:props.screenWidth-50,
       borderRadius:5,
       textTransform:"lowercase",
       
    },
    btn:{
        textTransform:"lowercase",
        height:48,
        justifyContent:"center",
        alignItems:"center"
    },
    btnText:{
        fontFamily:"EuclidCircularLight",
        fontSize:14
    },
    appleBtn:{
        backgroundColor:"#000000"
    },
    googleBtn:{
        backgroundColor:"#FFFFFF"
    },
    googleText:{
        color:"#60646A"
    },
    appleText:{
        color:"#FFFFFF"
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
    iconApple:{
        right:10
    },
    iconGoogle:{right:10}

});