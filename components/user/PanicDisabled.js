import React, { useState,useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity

} from 'react-native';

export default function PanicDisabled({ route, navigation}){

    useEffect( ()=>{
        if( pin.length == 4 ) authenticatePin()
    })


    const { screenWidth } = route.params;
    const pinCircleRadius = (screenWidth/2)-80;
    const keyCircleRadius = (screenWidth/2)-110;
    const [pin,updatePin] = useState("");
    const [textPin,updateTextPin] = useState("");

    const hashPin = (pin) => {

        setTimeout( ()=>{
            pin = pin.slice(0, -1) + '*';
            updatePin(pin);
        },1000);
        
    }

    const generateButton = (value,keyCircleRadius) => {
        

        return (
        <TouchableOpacity
            onPress={()=>pressKey(value,hashPin)}
            style={ [styles.key,{

                "width":keyCircleRadius,
                "height":keyCircleRadius,
                "borderRadius":keyCircleRadius/2,
                "marginRight":keyCircleRadius-70   
                
                }]}>
            <Text style={styles.keyText}>{value}</Text>
        </TouchableOpacity>
        );

    }

    const pressKey = (value,hashPin) => {
        updatePin( prevPin=>`${prevPin+value}` )
        updateTextPin(prevPin=>`${prevPin+value}`);
        hashPin(`${pin+value}`);
    }

    const authenticatePin = () =>{

        // send pin to server


        updatePin(""); // this pin would only reset once we have sent the request to the server. 
        updateTextPin("");

        if ( textPin.length > 0 ){

            console.log( "authenticating.." + textPin );
            navigation.navigate("Safety",{
                screenWidth:screenWidth
            });            

        }

    }

    return (

        <View style={styles.container}>
            
            
            <Text style={styles.safeText}>Enter PIN if you 're safe </Text>
            <Text></Text>


            <View style={[styles.pinCircle, { width:pinCircleRadius,height:pinCircleRadius,borderRadius:pinCircleRadius/2 } ]}>
                <Text style={styles.inputPin}> { pin } </Text>
            </View>

            <Text></Text>
            <Text></Text>
            
            <View style={styles.keypadGroup}>


                { generateButton(1,keyCircleRadius) }
                { generateButton(2,keyCircleRadius) }
                { generateButton(3,keyCircleRadius) }
                


            </View>
            <Text></Text>
            <View style={styles.keypadGroup}>

                { generateButton(4,keyCircleRadius) }
                { generateButton(5,keyCircleRadius) }
                { generateButton(6,keyCircleRadius) }

            </View>
            <Text></Text>
            <View style={styles.keypadGroup}>

                { generateButton(7,keyCircleRadius) }
                { generateButton(8,keyCircleRadius) }
                { generateButton(9,keyCircleRadius) }

            </View>
            <Text></Text>
            <View style={styles.keypadGroup}>

                { generateButton(0,keyCircleRadius) }
                { generateButton("<",keyCircleRadius) }
                
            </View>

        </View>
    )
}

const styles =  StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#34b9fd",
        justifyContent: "center",
        alignItems:"center"
    },
    safeText:{
        fontSize:20,
        textAlign:'center',
        color:"#ffffff",
        fontWeight: "bold",
        letterSpacing: 1
    },
    pinCircle:{
        backgroundColor:"#68D8FF",
        justifyContent: "center",
        alignItems: "center"
    },
    inputPin:{
        textAlign:"center",
        color:"#ffffff",
        fontSize: 20
    },
    keypadGroup:{
        flexDirection:"row",
        justifyContent: "space-between",
        
    
    },
    key:{
        backgroundColor:"#0bcaff",
        justifyContent: "center",
        alignItems: "center",
        
    },
    keyText:{
        color:"#fff",
        fontSize:28
    }


  })