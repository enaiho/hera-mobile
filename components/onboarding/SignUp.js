import React,{useState} from "react";
import { StyleSheet,View,Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";


const SignUp = ({ route,navigation }) => {

    const {
        screenWidth,
        screenHeight,
        phone,
        email_address,
        family_name,
        given_name
    } = route.params;





    const [email, onChangeEmail] = useState(email_address);
    const [lname, onChangeLname] = useState(family_name);
    const [fname, onChangeFname] = useState(given_name);
    const [password,onChangePassword] = useState(null)
    const [isDisabled, toggleButton] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = "http://192.168.100.52:5000";


    // store the value as an object and persist through screens 
    // submit the number to the server and generate a 4 digit code and send it via sms
    // once it is sent, return a response to the user and move to the verify your number page

    const registerUser = async () => {
        
        const user = {
            email:email,
            lname:lname,
            fname:fname,
            phone:phone,
            password:password
        }
        const response = await axios.post(`${BASE_URL}/user/register`,user);
        const data = response.data;

        console.log(data);

        if( data.status === true ){
            return navigation.navigate("VerifyPhone",{
                screenWidth:screenWidth,
                screenHeight:screenHeight,
                otp_code:data.otp_code,
                user:JSON.stringify(user)
            });
        }
        
        alert(data.message);
    }
    
    return (

        <View style={styles.container}>
            
            <View style={styles.viewWelcome}>
                <Text style={styles.txtNew}>It seems you might </Text>
                <Text style={styles.txtNew}>be new to Hera. Welcome! </Text>
            </View>

            <Text></Text>
            <Text></Text>
            <Text></Text>
            
            <View style={styles.name}>

                <TextInput 
                    style={styles.txtFname}
                    onChangeText={onChangeFname}
                    keyboardType="ascii-capable"
                    placeholder="First Name"
                    value={given_name}

                    
                />
                <TextInput 
                    style={styles.txtLname}
                    onChangeText={onChangeLname}
                    keyboardType="ascii-capable"
                    placeholder="Last Name"
                    value={family_name}
                    
                />

            </View>
             
            <View style={styles.semiContainer}>
                <TextInput 
                    style={styles.txtEmail}
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                    placeholder="Email address"
                    value={email}
                    
                    />
                
                <Text></Text>


                <TextInput
                    style={styles.txtEmail}
                    onChangeText={onChangePassword}
                    placeholder="Password"
                    secureTextEntry={true}


                />


                <TouchableOpacity
                    onPress = { () => setToggleCheckBox( !toggleCheckBox ) }>
                    <View style={styles.chkBox}>

                        <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={styles.txtAgree}>I agree to Hera's Term of Service</Text>
                    
                    </View>
                </TouchableOpacity>
                
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
        justifyContent:"center",
        alignItems:"center"
    },
    txtEmail:{
        borderColor:"#DFE4E8",
        width:props.screenWidth-30,
        height:48,
        borderWidth:1,
        borderRadius:5,
        textAlign:"center",
        fontFamily:"EuclidCircularLight"
    },
    txtFname:{
        borderColor:"#DFE4E8",
        width:props.screenWidth-220,
        height:48,
        borderWidth:1,
        borderRadius:5,
        textAlign: "center",
        fontFamily:"EuclidCircularLight"
    },
    txtLname:{
        marginLeft:5,
        borderColor:"#DFE4E8",
        width:props.screenWidth-220,
        height:48,
        borderWidth:1,
        borderRadius:5,
        textAlign: "center",
        fontFamily:"EuclidCircularLight"
    },


    name:{
        flexDirection:"row",
        justifyContent:"space-between",
        
        
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
    txtNew:{
        fontFamily:"EuclidCircularBold",
        fontSize:24,
        color:"#0A1F44",
        height:32,
        textAlign:"justify",  

    },
    semiContainer:{

        margin:10

    },
    txtAgree:{
        fontFamily:"EuclidCircularBold",
        fontSize:12,
        marginTop:7
    },
    chkBox:{
        flexDirection:"row"
    }


});

export default SignUp