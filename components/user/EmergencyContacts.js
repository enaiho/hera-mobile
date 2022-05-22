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



const EmergencyContacts = ({ route,navigation }) => {


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
            
                <Text style={styles.title}>  {props.name}  </Text>
                                

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
                <Text style={styles.txtRenderPhone}></Text>
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



            <Text style={styles.txtNumber}>Emergency Contacts </Text>
            <View style={styles.semiContainer}>


                 <Text></Text>
             
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
        top:70,
        alignSelf:"center",
        justifyContent:"center"
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
    fontFamily:"EuclidCircularBold"
    },
    listSelected:{
        margin:-100,
    },
    listSelected1:{
        top:-100,
    },
    txtRenderPhone:{
        fontFamily:"EuclidCircularBold"
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

export default EmergencyContacts
