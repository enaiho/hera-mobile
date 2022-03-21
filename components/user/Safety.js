import React from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View

} from 'react-native';
import Emoji from 'react-native-emoji';
export default function Safety({route, navigation}){

    const { screenWidth }  = route.params;
    //const emoji = emoticons.parse('[GRIMACING FACE]');
    //const smileyCircleRadius = (screenWidth/2)-80;

    
    const finishSafety = () =>{

        // alert("finish safety. ");
        navigation.navigate("Panic");

    }

    return (

        
        <View style={styles.container}>

            <View style={styles.smileyFace}>

                <Emoji name="smiley" style={{fontSize: 35, color: "white"}} />

            </View>

            <Text></Text>
            <Text> We are glad you are very safe.  </Text>

            <Text></Text>

            <TouchableOpacity 
                style={styles.finishButton}
                onPress={ ()=> finishSafety() }>

                <Text style={styles.txtFinish}>Finish</Text>

            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity>

                <Text>No I 'm not</Text>

            </TouchableOpacity>
        
        </View>


    )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    finishButton:{
        backgroundColor:'#0081FF',
        width: '50%',
        height: '10%',
        justifyContent: 'center',
    },
    txtFinish:{
       
        textAlign: 'center',
        color: '#ffffff'
    }

  }); 
  