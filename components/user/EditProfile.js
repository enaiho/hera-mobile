import React,{useState} from "react";
import { StyleSheet,View,Text,Alert,ActivityIndicator,ToastAndroid } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CheckBox from 'expo-checkbox';
import axios from "axios";
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";
import SelectDropdown from 'react-native-select-dropdown';
import {useHttpPut,useHttpPost} from '../../hooks/useHttp';



const EditProfile = ({ route,navigation }) => {



    const {
        screenWidth,
        screenHeight,
        user
    } = route.params;




    const user_data = JSON.parse( user ); console.log(user_data);
    const user_id = user_data._id;




    const [email, onChangeEmail] = useState(user_data.email);
    const [lname, onChangeLname] = useState(user_data.lname);
    const [fname, onChangeFname] = useState(user_data.fname);
    const [gender, onChangeGender] = useState(null);
    const [bloodGroup, onChangeBloodGroup] = useState(null);
    const [message, setMessage] = useState(user_data.message);
 

    const [animating,setAnimating] = useState(false);
    const [isDisabled, toggleButton] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;
    const genderData = ["Male", "Female"];
    const bloodGroupData = ["0+", "A", "AB"];




    const [gender_option,bg_option] = [user_data.gender,user_data.bloodGroup];
    let [genderDefaultText,bgDefaultText] = ["Select Gender", "Select Blood Group"];


    if( gender_option !== undefined ) genderDefaultText = gender_option;
    if( bg_option !== undefined ) bgDefaultText = bg_option;  



    const saveProfileChanges = async () => {
       


        if( fname === "" || fname === undefined ) return ToastAndroid.show("First Name cannot be empty. ", ToastAndroid.SHORT); 
        if( lname === "" || lname === undefined ) return ToastAndroid.show("Last Name cannot be empty. ", ToastAndroid.SHORT);
        if( email === "" || email === undefined ) return ToastAndroid.show("Email Address cannot be empty. ", ToastAndroid.SHORT);              
        

        setAnimating(true);

         
        const payload = {
            fname:fname,
            lname:lname,
            email:email,
            gender:gender,
            bloodGroup: bloodGroup,
            message:message
        }

        try{

            const response = await useHttpPut(`${BASE_URL}/user/update_profile/${user_id}`,payload);
            const data = response.data;


            const { message,status,user } = data;
            
            setAnimating(false);

            if( status === false ) return ToastAndroid.show(`Server Error: ${data.message}. `, ToastAndroid.LONG);

            
            setTimeout( ()=> {
                return navigation.navigate( "Panic",{ screenWidth:screenWidth, screenHeight:screenHeight, user:JSON.stringify(user)  });
            },2000) 
            ToastAndroid.show(`${data.message}. Navigating to panic screen. `, ToastAndroid.SHORT);

            

        }
        catch(e) {

            setAnimating(false);
            return ToastAndroid.show(`Client Exception Error: ${e.message}. `, ToastAndroid.SHORT);
        }


    }

    
    return (


        <View style={styles.container}>

            
            <View style={styles.viewWelcome}>
                

                <Text style={styles.txtNew}>Edit Profile </Text>

                <Text></Text>

                <View style={styles.semiContainer}>


                    <TextInput 
                        style={[styles.txtInput,styles.txtFname]}
                        onChangeText={onChangeFname}
                        keyboardType="ascii-capable"
                        placeholder="First Name"
                        value={fname}
                        

                        
                    />

                    <Text></Text>

                    <TextInput 
                        style={[styles.txtInput,styles.txtFname]}
                        onChangeText={onChangeLname}
                        keyboardType="ascii-capable"
                        placeholder="Last Name"
                        value={lname}
                        
                    />

                    <Text></Text>



                    <SelectDropdown
                        data={genderData}
                        defaultButtonText={genderDefaultText}
                        buttonStyle={ styles.genderInput }
                        buttonTextStyle = { styles.genderInputTxt }
                        onSelect={(selectedItem, index) => {
                            onChangeGender(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
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

                    <SelectDropdown
                        data={bloodGroupData}
                        defaultButtonText={bgDefaultText}
                        buttonStyle={ styles.genderInput }
                        buttonTextStyle = { styles.genderInputTxt }
                        onSelect={(selectedItem, index) => {
                            onChangeBloodGroup(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />

                    <Text></Text>

                    <Text style={styles.txtEmergencyHeader}>Emergency Message</Text>
                    <Text></Text>
                    <Text style={styles.txtEmergencyBody}>When you’re in an emergency, Solace will send this preset message to your emergency contacts. </Text>
                    <Text></Text>


                    <TextInput

                        style={[styles.txtInput,styles.txtEmail]}
                        onChangeText={setMessage}
                        keyboardType="email-address"
                        placeholder="Emergency message"
                        value={message}
                        multiline = {true}
                        numberOfLines = {10}
                        
                    />

                    
                </View>

               
                <Text></Text>
                <Text></Text>
                <Text></Text>

                 <View>

                    <TouchableOpacity 
                        style={ styles.btn }
                        disabled={ isDisabled }
                        onPress = { saveProfileChanges }>
                        <Text style={ styles.btnText }>Save Changes</Text>
                    </TouchableOpacity>                

                    <Text></Text>
                    <ActivityIndicator 
                        size="small" 
                        color="#0000ff"
                        animating={animating} 

                    />


                </View>

            </View>


        </View>

    )
};

export const _styles = (props) =>  StyleSheet.create({

    container:{
        justifyContent:"center",
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
        alignSelf:"center",
        
        borderRadius:60,
        width:props.screenWidth-50,

        

       
    },
    btnText:{
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        textAlign:"center"
    },
    txtNew:{
        fontFamily:"EuclidCircularBold",
        fontSize:24,
        color:"#0A1F44",
        left:13,
        alignSelf: "center",
        justifyContent: "center"
        
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
    },
    genderInput:{
        width:props.screenWidth-30,
        borderColor: "#F0F2F4",
        borderWidth:1,
        borderRadius:8
    },
    genderInputTxt:{
        fontFamily: "EuclidCircularBold"
    },
    txtEmergencyHeader:{
        fontSize:16,
        fontFamily:"EuclidCircularBold"
    },
    txtEmergencyBody:{
        fontFamily:"EuclidCircularLight"
    }


});

export default EditProfile