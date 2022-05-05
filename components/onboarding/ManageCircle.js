import React,{useState,useEffect} from "react";
import { 
    StyleSheet,
    View,
    Text,
    Dimensions,
    Modal,
    FlatList,
    ScrollView,
    StatusBar,
    Button,
    Alert,
    ActivityIndicator,
    TouchableNativeFeedback,
    TouchableOpacity,
    ToastAndroid


} from "react-native";
import Svg, {
    Path,
} from 'react-native-svg';
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import * as Contacts from 'expo-contacts';
import Checkbox from 'expo-checkbox';
import {useHttpPost} from '../../hooks/useHttp';
import Constants from 'expo-constants';
import SolaceConfig from "../../solace_config";



const ManageCircle = ({ route,navigation }) => {


    const [code, verifyCode] = useState(null);
    const [isDisabled, toggleButton] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [status,setStatus] = useState(null);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const {screenWidth,screenHeight,user} = route.params;

    
    const styleProps = {screenWidth:screenWidth,screenHeight:screenHeight};
    const styles = _styles(styleProps);
    const BASE_URL = SolaceConfig.SERVER_URL;


    const [contactData, setContactData] = useState(null);
    const [preContactData, setPreContactData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedContacts,setSelectedContacts] = useState([]);
   

    useEffect(()=>{


        (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {

        setStatus(status);

        var  { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
 

        if( data.length > 0 ) {
            setPreContactData( data );
            setContactData(data);  
        }


      }


    })();


    },[]);




    // console.log(selectedContacts);
 



    var DATA = preContactData;


    const removeContact = (id) => {


        for(let i=0; i<selectedContacts.length; i++){

            if( selectedContacts[i].id === id ){

                selectedContacts[i] = undefined;
                break;

            }

        }

        setSelectedContacts(selectedContacts.filter( (contact) => contact !== undefined  ));
    }


    const changeItem = ( id ) => {


        let selectedId = "";
        let tempContactData = contactData.map( (contact)=> {

            if( contact.lookupKey === id ){

                if( !contact.checked ) {
                    
                    contact.checked = true;
                    selectedContacts.push( {id:contact.lookupKey, name:contact.name, phone: contact.phoneNumbers[0].number } );

                }
                else {
                    contact.checked = false;
                    selectedId = id;
                }

                return contact;

            }

            return contact;
        });


        if( selectedId != "" ){


            for(let i=0; i<selectedContacts.length; i++){

                if( selectedContacts[i].id === selectedId ){

                    selectedContacts[i] = undefined;
                    selectedId  = "";
                    break;

                }

            }

        }

        setSelectedContacts(selectedContacts.filter( (contact) => contact !== undefined  ));
        setContactData(tempContactData);
        setRefresh(true);
    }



    // onValueChange={() => changeItem( props.lookupKey  )}
    //                 color={props.checked ? '#4630EB' : undefined}



    // <Text style={styles.txtRenderPhone}>({phone})</Text>





    const isContactSelected = (contacts,lookupKey) => {


        if( contacts.length === 0 || contacts === undefined ) return false;
        for( let i=0; i<contacts.length; i++ ){
            if( contacts[i].id === lookupKey ) return true;
        }

        return false;

    }



    const Item = ({ props }) => {


        let checked = props.checked;
        let lookupKey = props.lookupKey;
        const phoneNumbers = props.phoneNumbers;
        const phone = phoneNumbers !== undefined ? phoneNumbers[0].number : "";


        return (


                 <TouchableOpacity
                 onPress={ ()=>changeItem(lookupKey) }
                 style={ isContactSelected(selectedContacts,lookupKey) ? styles.selected : styles.item}>
                
                    
                    <Text style={styles.title}>{props.name}  <Text style={styles.txtPhone}>({phone})</Text></Text>
                                    

                </TouchableOpacity>

            
        );

    
    };


    const setUpUser = async () => {


        if( selectedContacts.length === 0 ){  
            ToastAndroid.show("Please select at least one emergency contact. ", ToastAndroid.SHORT);
            return;
        }


        setAnimating(true);

        const payload = {
            user:user,
            contacts:JSON.stringify(selectedContacts)
        };
        const response = await axios.post(`${BASE_URL}/user/register`,payload);
        const data = response.data;

        if( data.status === true ){

            return navigation.navigate("FinishReg",{
                screenWidth:screenWidth,
                screenHeight:screenHeight,
                user:user
            });

        }

        
        setAnimating(false);
        ToastAndroid.show(`Server Error: ${data.message}`, ToastAndroid.SHORT);               
       
    }


    const SelectedItem = ({ props }) => {

        return (
        
        <View style={styles.item}>
            

            <View>
                <Text>{props.name} </Text>
                <Text style={styles.txtRenderPhone}>( {props.phone} )</Text>
            </View>

            <View>
                <Button 
                    title="Remove"
                    onPress={ () => removeContact(props.id)  }
                />
            </View>


        </View>
        );


    }


      const renderItem = ({ item }) => <Item props={item} />; 
      const renderSelectedContact = ({ item }) => <SelectedItem props={item} />;
      const searchContact = (value) => {
        

        let newContactData = DATA.filter( data => data.name.toLowerCase().includes(value.toLowerCase()) );
        if( newContactData.length >=0 && value.length > 0 ) setContactData(newContactData);
        else setContactData(DATA);                
        

        setRefresh(true);


    }    

    return (


        <View style={styles.container}>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>


                  <View style={styles.modalView}>


                        <TextInput 
                        style={styles.txtSearchContact}
                        onChangeText={ searchContact }
                        placeholder="Search Contact"

                        ></TextInput>

                        <Text></Text>
                      
                      <FlatList 
                        data={contactData} 
                        renderItem={renderItem} 
                        keyExtractor={item => item.id} 
                        extraData={refresh}
                        refreshing={true} />
                    
                  </View>

                </View>

              </Modal>

            <Text style={styles.txtNumber}>Setup Emergency Contacts </Text>
            <View style={styles.semiContainer}>


                <Svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M0.5 32C0.5 14.3269 14.8269 0 32.5 0C50.1731 0 64.5 14.3269 64.5 32C64.5 49.6731 50.1731 64 32.5 64C14.8269 64 0.5 49.6731 0.5 32Z" fill="#03C108"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M34.5001 23.3335C34.5001 27.7517 30.9188 31.3336 26.5001 31.3336C22.0813 31.3336 18.5 27.7517 18.5 23.3335C18.5 18.9154 22.0813 15.3335 26.5001 15.3335C30.9188 15.3335 34.5001 18.9154 34.5001 23.3335ZM12.5 45.1658C12.5 39.1846 17.3481 34.3345 23.3313 34.3345H29.6688C35.6501 34.3345 40.5001 39.1846 40.5001 45.1658C40.5001 46.3658 39.5314 47.3346 38.3314 47.3346H14.6663C13.47 47.3346 12.5 46.3658 12.5 45.1658ZM42.4439 35.3336H37.8282C40.7001 37.6898 42.5001 41.2148 42.5001 45.1649C42.5001 45.9649 42.2626 46.7024 41.8751 47.3336H50.5002C51.6064 47.3336 52.5002 46.4336 52.5002 45.2774C52.5002 39.8086 48.0251 35.3336 42.4439 35.3336ZM46.4999 24.3335C46.4999 28.2023 43.3686 31.3336 39.4999 31.3336C37.5499 31.3336 35.7936 30.5336 34.5255 29.2529C35.7542 27.5923 36.4999 25.5535 36.4999 23.3335C36.4999 21.671 36.0499 20.1229 35.3299 18.7404C36.4974 17.8682 37.9305 17.3335 39.4999 17.3335C43.3686 17.3335 46.4999 20.4648 46.4999 24.3335Z" fill="white"/>
                </Svg>

                <Text></Text>

                <Text style={styles.txtEmergency}>Emergency Contacts</Text>
                <Text></Text>


                <Text style={styles.txtSub}>You currently have no emergency contacts added to your circle</Text>


                <TouchableOpacity 
                    style={ styles.btn }
                    onPress={ () => setModalVisible(true) }>
                    <Text style={ styles.btnText }>Add Emergency Contact(s)</Text>
                </TouchableOpacity>






            </View>


              <FlatList 
                data={selectedContacts} 
                renderItem={renderSelectedContact} 
                keyExtractor={item => item.id} 
                extraData={refresh}
                style={styles.listSelected} />


                <TouchableOpacity 
                    style={ styles.btnFinish }
                    onPress={ setUpUser }>
                    <Text style={ styles.btnTextFinish }>Finish</Text>

                </TouchableOpacity>


                <ActivityIndicator 
                    size="small" 
                    color="#0000ff"
                    animating={animating} 

                />

        </View>
    
    )

};

export const _styles = (props) =>  StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    txtPhone:{
        fontWeight:"bold"
    },
    btn:{
        textTransform:"lowercase",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"8.1%",
        borderRadius:60,
        width:props.screenWidth-150,
        borderColor:"#90979E",
        borderWidth:1
    },
    btnFinish:{
        textTransform:"lowercase",
        backgroundColor:"#03C108",
        height:48,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:60,
        width:props.screenWidth-50,
        bottom:20
    },


    btnText:{
        color:"#00A6FF",
        fontFamily:"EuclidCircularLight",
        fontSize:14
    },

    btnTextFinish:{
        color:"#ffffff",
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
        top:70
    },
    semiContainer:{
        margin:110,
        justifyContent:"center",
        alignItems:"center"

    },
    txtEmergency:{
        fontFamily:"EuclidCircularBold",
        color:"#0A1F44",
        fontSize:16,
        lineHeight:24
    },
    txtSub:{
        fontFamily:"EuclidCircularLight"
    },

      centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  txtSearchContact:{

    borderWidth:1,
    borderStyle:"dotted",
    width:300,
    height:50,
    borderRadius:10,
    fontFamily:"EuclidCircularLight",
    textAlign:"center"

  },
  item:{

    width:300,
    height:30,
    justifyContent:"space-between",
    marginVertical:7,
    backgroundColor:"#EEEEEE",
    borderRadius:10,
    flexDirection:"row"
   
  },

  selected:{

    width:300,
    height:30,
    justifyContent:"space-between",
    marginVertical:7,
    backgroundColor:"#03C108",
    borderRadius:10,
    flexDirection:"row",
    borderWidth:0
    

  },
  title:{
    fontFamily:"EuclidCircularLight"
    },
    listSelected:{
        margin:-50
    },
    txtRenderPhone:{
        fontWeight:"bold",
        fontFamily:"EuclidCircularLight"
    },


  /* modal stuff */ 


  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});

export default ManageCircle


