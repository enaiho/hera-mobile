import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHttpPost} from '../../hooks/useHttp';
import SolaceConfig from "../../solace_config";



const FinishReg = ({ route,navigation }) => {

    const {screenWidth,screenHeight,user} = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;


    let user_rec = JSON.parse(user);

    
    const getStarted = async() => {


        // setup the value in the async storage and use that to persist data over the different screens.
        // 1. setup a key
        // 2. navigate to the Panic Screen


        const payload = {"phone":user_rec.phone};
        const response = await useHttpPost(`${BASE_URL}/user/get_rec_phone`,payload);
        const { message,authenticated,user } = response.data;


        try {

            await AsyncStorage.setItem('userdata_key',JSON.stringify(user) ); // the user object coming has already been stringified.
            navigation.navigate("Panic",{
                screenWidth:screenWidth,
                screenHeight:screenHeight,
                user:JSON.stringify(user)

            });

        } catch (e) {
            console.log(e.message);
        }
    }

    return (



        <View style={styles.container}>

            <Text style={styles.txtNumber}>Onboarded Successfully </Text>
            <View style={styles.semiContainer}>

                <Text>Thank you for choosing Solace. We believe that your registration on the platform is one step to
                    safety we are committed to ensuring that we keep you safe.  </Text>

                <TouchableOpacity
                    style={ styles.btn }
                    onPress={getStarted}>
                    <Text style={ styles.btnText }>Let's Get Started</Text>

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
        width:343,
        height:32,
        left:16,
    },
    semiContainer:{

        margin:40

    }

});

export default FinishReg