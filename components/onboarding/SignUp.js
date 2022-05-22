import React,{useState} from "react";
import { StyleSheet,View,Text,Alert,ActivityIndicator } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CheckBox from 'expo-checkbox';
import axios from "axios";
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";

const SignUp = ({ route,navigation }) => {

    const {
        screenWidth,
        screenHeight,
        phone,
        otp_code
    } = route.params;



    const [email, onChangeEmail] = useState(null);
    const [lname, onChangeLname] = useState(null);
    const [fname, onChangeFname] = useState(null);
    const [errMessage, setErrorMessage] = useState(null);
    const [animating,setAnimating] = useState(false);
    const [password,onChangePassword] = useState(null)
    const [isDisabled, toggleButton] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;


    // store the value as an object and persist through screens 
    // submit the number to the server and generate a 4 digit code and send it via sms
    // once it is sent, return a response to the user and move to the verify your number page



    const registerUser = async () => {
       


        if( fname === "" || fname === undefined ){

            setTimeout( () =>{
                setErrorMessage("");
            } ,5000) 
            
            setErrorMessage("First name cannot be empty. ");               
            return;
        }

        else if( lname === "" || lname === undefined ){


            setTimeout( () =>{
                setErrorMessage("");
            } ,5000) 
            
            setErrorMessage("Last name cannot be empty. ");               
            return;

        }
        else if( email === "" || email === undefined ){

           setTimeout( () =>{
                setErrorMessage("");
            } ,5000) 
            
            setErrorMessage("Email address cannot be empty. ");               
            return;

        }


        // setAnimating(true);


        const user = {
            email:email,
            lname:lname,
            fname:fname,
            phone:phone,
        }


        // don't push the data to the server yet, 
        //push the data after I have selected my emergency contacts



        return navigation.navigate("ManageCircle",{
            screenWidth:screenWidth,
            screenHeight:screenHeight,
            user:JSON.stringify(user)
        });






        // const response = await axios.post(`${BASE_URL}/user/register`,user);
        // const data = response.data;


        
        // if( data.status === true ){


        //     return navigation.navigate("ManageCircle",{
        //         screenWidth:screenWidth,
        //         screenHeight:screenHeight,
        //         otp_code:data.otp_code,
        //         user:JSON.stringify(user)
        //     });


        // }

        
        // setAnimating(false);
        // setTimeout( () =>{
        //     setErrorMessage("");
        // } ,5000) 
        
        // setErrorMessage(data.message);               
        // return;

    }
    
    return (

        <View style={styles.container}>


            
            <View style={styles.viewWelcome}>
                


                <Text style={styles.txtNew}>You 're new to Solace. </Text>
                <Text style={styles.txtNew}>Welcome! </Text>
                <Text style={styles.txtSub}>Tell us a little about yourself?</Text>


                <Text></Text>
                <Text></Text>
                <Text></Text>


                <View style={styles.semiContainer}>


                    <TextInput 
                        style={[styles.txtInput,styles.txtFname]}
                        onChangeText={onChangeFname}
                        keyboardType="ascii-capable"
                        placeholder="First Name"
                        

                        
                    />


                    <Text></Text>


                    <TextInput 
                        style={[styles.txtInput,styles.txtFname]}
                        onChangeText={onChangeLname}
                        keyboardType="ascii-capable"
                        placeholder="Last Name"
                        

                        
                    />

                    <Text></Text>


                    <TextInput 
                        style={[styles.txtInput,styles.txtEmail]}
                        onChangeText={onChangeEmail}
                        keyboardType="email-address"
                        placeholder="Email address"
                        value={email}
                        
                        />
                    
                    <Text></Text>



                    <TouchableOpacity
                        onPress = { () => setToggleCheckBox( !toggleCheckBox ) }>
                        <View style={styles.chkBox}>

                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                            <Text style={styles.txtAgree}>I agree to Solace's Term of Service</Text>
                        
                        </View>
                    </TouchableOpacity>


                    <Text></Text>

                    <Text style={styles.errorMessage}> {errMessage} </Text>
                    
                </View>


            </View>

                <View>
                <TouchableOpacity 
                    style={ styles.btn }
                    disabled={ isDisabled }
                    onPress = { registerUser }>
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
    txtEmail:{
        width:props.screenWidth-30,
        height:48,
        textAlign:"center",
        fontFamily:"EuclidCircularLight"
    },
    txtFname:{
        
        width:props.screenWidth-30,
        height:48,
        textAlign: "center",
        fontFamily:"EuclidCircularLight"
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
    txtNew:{
        fontFamily:"EuclidCircularBold",
        fontSize:24,
        color:"#0A1F44",
        left:13
        
    },
    txtSub:{
        top:10,
        fontFamily:"EuclidCircularLight",
        fontSize:12,
        left:13
    },
    semiContainer:{

        margin:10

    },
    txtAgree:{
        fontFamily:"EuclidCircularBold",
        fontSize:12,
        marginTop:2,
        left:10
    },
    chkBox:{
        flexDirection:"row"
    },
    viewWelcome:{
        top:50
    },
    txtInput:{
        borderRadius:8,
        borderWidth:1,
        borderColor:"#DFE4E8"
    },
    errorMessage:{
        top:10,
        fontFamily:"EuclidCircularLight",
        fontSize:12,
        color:"#F03738"
    }


});

export default SignUp