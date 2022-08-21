import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Emoji from 'react-native-emoji';
export default function Safety({route, navigation}){


    const { screenWidth,screenHeight }  = route.params;
    const props = {screenWidth:screenWidth, screenHeight:screenHeight};
    const styles = _styles(props);
    
    const finishSafety = () => navigation.navigate("Panic");

    return (

        
        <View style={styles.container}>

            <View style={styles.panicGrpTxt}>

                <View style={styles.smileyFace}>
                    <Emoji name="smiley" style={{fontSize: 70, color: "white"}} />
                </View>

                <Text></Text>
                <Text style={styles.txtSafe}> We are glad you 're safe.  </Text>

                <Text></Text>

            </View>
            <View style={styles.safetyFinish}>


                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={ ()=> finishSafety() }>
                    <Text style={styles.txtFinish}>Done</Text>
                </TouchableOpacity>

                <Text></Text>

                {/*<TouchableOpacity style={styles.noBtn}>*/}
                {/*    <Text style={styles.txtNoBtn}>No I 'm not</Text>*/}
                {/*</TouchableOpacity>*/}


            </View>
        
        </View>
    )
}




export const _styles = (props) => StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    finishButton:{
        backgroundColor: "#03C108",
        borderRadius:60,
        width:props.screenWidth-90,
        height:47,
        justifyContent:"center",
        alignItems:"center"
    },
    noBtn:{
        backgroundColor: "#FFFFFF",
        borderRadius:8,
        width:props.screenWidth-90,
        height:47,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#F03738",
        borderStyle:"solid",
        borderWidth:1
    },

    txtFinish:{
        textAlign: 'center',
        color: '#ffffff',
        fontFamily:"EuclidCircularLight"
    },
    txtNoBtn:{
        fontFamily:"EuclidCircularLight",
        color:"#F03738"
    },
    txtSafe:{
        fontFamily:"EuclidCircularBold",
        fontSize:20
    },
    safetyFinish:{

        flex:1,
        justifyContent:'flex-end',
        bottom:props.screenHeight-720
    },
    panicGrpTxt:{
        flex:3,
        justifyContent:"center",
        alignItems:"center"
    }

  }); 
  