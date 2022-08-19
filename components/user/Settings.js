import React,{useState} from "react";
import Svg, {
    Path,Line
} from 'react-native-svg';
import { StyleSheet,View,Text,Image,FlatList,Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashEmergencyContact } from "./FlashEmergencyContact";



const Settings = ({ route,navigation }) => {

    
    const {screenWidth,screenHeight,user} = route.params;
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const [refresh,setRefresh] = useState(false);


    // console.log( user );


    const user_data = JSON.parse( user );




    const { fname,lname } = user_data;

    const menuData = [

        {
            id:1,
            name:"Emergency Contacts",
            navigationScreen: "EmergencyContacts",
            svgPathD: `<Svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.66676C11 6.87584 9.20941 8.66678 7.00003 8.66678C4.79064 8.66678 3.00001 6.87584 3.00001 4.66676C3.00001 2.45769 4.79064 0.666748 7.00003 0.666748C9.20941 0.666748 11 2.45769 11 4.66676ZM0 15.5829C0 12.5923 2.42407 10.1673 5.41565 10.1673H8.58441C11.575 10.1673 14.0001 12.5923 14.0001 15.5829C14.0001 16.1829 13.5157 16.6673 12.9157 16.6673H1.08313C0.485002 16.6673 0 16.1829 0 15.5829ZM14.9719 10.6668H12.6641C14.1001 11.8449 15.0001 13.6074 15.0001 15.5824C15.0001 15.9824 14.8813 16.3512 14.6876 16.6668H19.0001C19.5532 16.6668 20.0001 16.2168 20.0001 15.6387C20.0001 12.9043 17.7626 10.6668 14.9719 10.6668ZM17 5.16677C17 7.10115 15.4343 8.66678 13.4999 8.66678C12.5249 8.66678 11.6468 8.26678 11.0127 7.62646C11.6271 6.79615 11.9999 5.77677 11.9999 4.66676C11.9999 3.83551 11.7749 3.06144 11.4149 2.37019C11.9987 1.9341 12.7152 1.66675 13.4999 1.66675C15.4343 1.66675 17 3.23238 17 5.16677Z" fill="#191414"/></Svg>`
            

        },
        {
            id:2,
            name:"Manage Dependents",
            navigationScreen: "ManageDependents",
            svgPathD: `<Svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.66676C11 6.87584 9.20941 8.66678 7.00003 8.66678C4.79064 8.66678 3.00001 6.87584 3.00001 4.66676C3.00001 2.45769 4.79064 0.666748 7.00003 0.666748C9.20941 0.666748 11 2.45769 11 4.66676ZM0 15.5829C0 12.5923 2.42407 10.1673 5.41565 10.1673H8.58441C11.575 10.1673 14.0001 12.5923 14.0001 15.5829C14.0001 16.1829 13.5157 16.6673 12.9157 16.6673H1.08313C0.485002 16.6673 0 16.1829 0 15.5829ZM14.9719 10.6668H12.6641C14.1001 11.8449 15.0001 13.6074 15.0001 15.5824C15.0001 15.9824 14.8813 16.3512 14.6876 16.6668H19.0001C19.5532 16.6668 20.0001 16.2168 20.0001 15.6387C20.0001 12.9043 17.7626 10.6668 14.9719 10.6668ZM17 5.16677C17 7.10115 15.4343 8.66678 13.4999 8.66678C12.5249 8.66678 11.6468 8.26678 11.0127 7.62646C11.6271 6.79615 11.9999 5.77677 11.9999 4.66676C11.9999 3.83551 11.7749 3.06144 11.4149 2.37019C11.9987 1.9341 12.7152 1.66675 13.4999 1.66675C15.4343 1.66675 17 3.23238 17 5.16677Z" fill="#191414"/></Svg>`
        },
        {
            id:3,
            name:"Share with Friends",
            svgPathD: `<Svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.66676C11 6.87584 9.20941 8.66678 7.00003 8.66678C4.79064 8.66678 3.00001 6.87584 3.00001 4.66676C3.00001 2.45769 4.79064 0.666748 7.00003 0.666748C9.20941 0.666748 11 2.45769 11 4.66676ZM0 15.5829C0 12.5923 2.42407 10.1673 5.41565 10.1673H8.58441C11.575 10.1673 14.0001 12.5923 14.0001 15.5829C14.0001 16.1829 13.5157 16.6673 12.9157 16.6673H1.08313C0.485002 16.6673 0 16.1829 0 15.5829ZM14.9719 10.6668H12.6641C14.1001 11.8449 15.0001 13.6074 15.0001 15.5824C15.0001 15.9824 14.8813 16.3512 14.6876 16.6668H19.0001C19.5532 16.6668 20.0001 16.2168 20.0001 15.6387C20.0001 12.9043 17.7626 10.6668 14.9719 10.6668ZM17 5.16677C17 7.10115 15.4343 8.66678 13.4999 8.66678C12.5249 8.66678 11.6468 8.26678 11.0127 7.62646C11.6271 6.79615 11.9999 5.77677 11.9999 4.66676C11.9999 3.83551 11.7749 3.06144 11.4149 2.37019C11.9987 1.9341 12.7152 1.66675 13.4999 1.66675C15.4343 1.66675 17 3.23238 17 5.16677Z" fill="#191414"/></Svg>`
        },
        {
            id:4,
            name:"Help & Support",
            svgPathD: `<Svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.66676C11 6.87584 9.20941 8.66678 7.00003 8.66678C4.79064 8.66678 3.00001 6.87584 3.00001 4.66676C3.00001 2.45769 4.79064 0.666748 7.00003 0.666748C9.20941 0.666748 11 2.45769 11 4.66676ZM0 15.5829C0 12.5923 2.42407 10.1673 5.41565 10.1673H8.58441C11.575 10.1673 14.0001 12.5923 14.0001 15.5829C14.0001 16.1829 13.5157 16.6673 12.9157 16.6673H1.08313C0.485002 16.6673 0 16.1829 0 15.5829ZM14.9719 10.6668H12.6641C14.1001 11.8449 15.0001 13.6074 15.0001 15.5824C15.0001 15.9824 14.8813 16.3512 14.6876 16.6668H19.0001C19.5532 16.6668 20.0001 16.2168 20.0001 15.6387C20.0001 12.9043 17.7626 10.6668 14.9719 10.6668ZM17 5.16677C17 7.10115 15.4343 8.66678 13.4999 8.66678C12.5249 8.66678 11.6468 8.26678 11.0127 7.62646C11.6271 6.79615 11.9999 5.77677 11.9999 4.66676C11.9999 3.83551 11.7749 3.06144 11.4149 2.37019C11.9987 1.9341 12.7152 1.66675 13.4999 1.66675C15.4343 1.66675 17 3.23238 17 5.16677Z" fill="#191414"/></Svg>`
        },
        {
            id:5,
            name:"About Solace",
            svgPathD: `<Svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.66676C11 6.87584 9.20941 8.66678 7.00003 8.66678C4.79064 8.66678 3.00001 6.87584 3.00001 4.66676C3.00001 2.45769 4.79064 0.666748 7.00003 0.666748C9.20941 0.666748 11 2.45769 11 4.66676ZM0 15.5829C0 12.5923 2.42407 10.1673 5.41565 10.1673H8.58441C11.575 10.1673 14.0001 12.5923 14.0001 15.5829C14.0001 16.1829 13.5157 16.6673 12.9157 16.6673H1.08313C0.485002 16.6673 0 16.1829 0 15.5829ZM14.9719 10.6668H12.6641C14.1001 11.8449 15.0001 13.6074 15.0001 15.5824C15.0001 15.9824 14.8813 16.3512 14.6876 16.6668H19.0001C19.5532 16.6668 20.0001 16.2168 20.0001 15.6387C20.0001 12.9043 17.7626 10.6668 14.9719 10.6668ZM17 5.16677C17 7.10115 15.4343 8.66678 13.4999 8.66678C12.5249 8.66678 11.6468 8.26678 11.0127 7.62646C11.6271 6.79615 11.9999 5.77677 11.9999 4.66676C11.9999 3.83551 11.7749 3.06144 11.4149 2.37019C11.9987 1.9341 12.7152 1.66675 13.4999 1.66675C15.4343 1.66675 17 3.23238 17 5.16677Z" fill="#191414"/></Svg>`
        }

    ];


    const redirectScreen = (screen) => {
        navigation.navigate(screen,{ screenWidth:screenWidth, screenHeight:screenHeight, user: route.params.user }); 
    }

    const MenuList = ({ props }) => {


        const {id,name,navigationScreen} = props; 
        return (



            <View style={styles.menuItem}>
                

                <Svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.66676C11 6.87584 9.20941 8.66678 7.00003 8.66678C4.79064 8.66678 3.00001 6.87584 3.00001 4.66676C3.00001 2.45769 4.79064 0.666748 7.00003 0.666748C9.20941 0.666748 11 2.45769 11 4.66676ZM0 15.5829C0 12.5923 2.42407 10.1673 5.41565 10.1673H8.58441C11.575 10.1673 14.0001 12.5923 14.0001 15.5829C14.0001 16.1829 13.5157 16.6673 12.9157 16.6673H1.08313C0.485002 16.6673 0 16.1829 0 15.5829ZM14.9719 10.6668H12.6641C14.1001 11.8449 15.0001 13.6074 15.0001 15.5824C15.0001 15.9824 14.8813 16.3512 14.6876 16.6668H19.0001C19.5532 16.6668 20.0001 16.2168 20.0001 15.6387C20.0001 12.9043 17.7626 10.6668 14.9719 10.6668ZM17 5.16677C17 7.10115 15.4343 8.66678 13.4999 8.66678C12.5249 8.66678 11.6468 8.26678 11.0127 7.62646C11.6271 6.79615 11.9999 5.77677 11.9999 4.66676C11.9999 3.83551 11.7749 3.06144 11.4149 2.37019C11.9987 1.9341 12.7152 1.66675 13.4999 1.66675C15.4343 1.66675 17 3.23238 17 5.16677Z" fill="#191414"/>
                </Svg>
                <TouchableOpacity
                    style={ styles.btnMenu }
                    onPress ={  () =>  redirectScreen(navigationScreen)  }>
                    <Text style={ styles.btnTxtMenu }>{name}</Text>
                </TouchableOpacity>


            </View>
        
        );
    };


    const logoutUser = async() => {


        await AsyncStorage.removeItem('userdata_key'); // the user object coming has already been stringified.
        return navigation.navigate("Registration");


    }


    const logoutPrompt = () => {



        // alert( "testing logout user" );
        // setModalVisible(true);



      Alert.alert('Logout from Solace', 'Are you sure you want to logout from Solace?', [
          {
            text: 'No'
          },
          { text: 'Yes', onPress: () => logoutUser() },
        
        ]);




    }

    const renderMenuItem = ({ item }) => <MenuList props={item} />
    return (


        <>

            <View style={styles.container}>


                <View style={styles.accountSettings}>

                    <Text style={styles.txtNumber}>Account Settings </Text>
                        <Image
                          style={styles.imgProfile}
                          source={require('../../assets/images/avatar.jpeg')}
                        />

                      <Text style={styles.profileName}>{fname} {lname}</Text>


                      <TouchableOpacity
                        style={ styles.btnEditProfile }
                        onPress={ () => navigation.navigate("EditProfile", { screenWidth:screenWidth,screenHeight:screenHeight,user:user }) }>

                        <Text style={ styles.btnText }>Edit Profile</Text>

                      </TouchableOpacity>


                    <FlatList

                        data={menuData} 
                        renderItem={renderMenuItem} 
                        keyExtractor={item => item.id} 
                        extraData={refresh}
                        refreshing={true}
                        style={styles.settingsMenu}

                    />



                     <View style={styles.semiContainer}>

                         <TouchableOpacity
                            style={ styles.btn }
                            onPress = { logoutPrompt }>
                            <Text style={ styles.btnTxtLogout }>Log out</Text>
                        </TouchableOpacity>

                    </View>
                </View>           
            </View>

            <FlashEmergencyContact 
                navigation={navigation}
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                user={user}

             />

         </>


    )
};

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center"
    },
    btn:{
        
        backgroundColor:"#FFFFFF",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"5.1%",
        borderRadius:60,
        width:props.screenWidth-50,
        borderWidth:1,
        borderColor:"#90979E"
    },
    btnEditProfile:{
        textTransform:"lowercase",
        backgroundColor:"#03C108",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"18.1%",
        borderRadius:60,
        width:props.screenWidth-50,
        alignSelf:"center"
    },
    btnText:{
        color:"#FFFFFF",
        fontFamily:"EuclidCircularLight",
        fontSize:14
    },
    btnTxtLogout:{
        color:"#60646A",
        fontFamily:"EuclidCircularLight",
        fontSize:14,
        textTransform:"uppercase"
    },
    txtNumber:{
        fontFamily:"EuclidCircularBold",
        fontSize:24,
        color:"#0A1F44",
        width:343,
        height:32,
        textAlign:"center",
        alignSelf:"center"

    },
    
    imgProfile:{
        resizeMode: 'cover',
        width:100,
        height:100,                        
        borderRadius:100,
        justifyContent: "center",
        alignSelf:"center",
        top:20
    },
    accountSettings:{
        top:50
    },
    settingsMenu:{
        bottom:50
    },
    profileName:{
        textAlign:"center",
        alignSelf:"center",
        top:40,
        fontSize:16,
        fontFamily:"EuclidCircularBold"
    },
    semiContainer:{
        bottom:50
    },
    btnMenu:{ 
        height:48,
        justifyContent:"center",
        width:props.screenWidth-50,
        borderWidth:0,
        borderColor:"#90979E",
        left:12,

    },
    btnTxtMenu:{

        fontFamily:"EuclidCircularBold",
        fontSize:14,
        color:"#191414",
        bottom:15
        
    },
    menuItem:{
        flexDirection:"row",
        left:20,
        top:10
    }


});

export default Settings