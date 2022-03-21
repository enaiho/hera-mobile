import React,{useState} from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    ActivityIndicator,
    Button,
    Alert,
    TextInput

} from 'react-native';
import{ Ionicons,MaterialIcons } from '@expo/vector-icons'


export default function Login(){

    const pressMe = (param) => {
        console.log(param);
    }
    const todos = [
        { name: "Michael", sport:"Football",key:"1" },
        { name: "Isaac", sport:"Basketball",key:"2" }
    ];


    const [loader,toggleLoader] = useState(false);
    const controlLoader = () => {
        if( loader === true ){

            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );

            toggleLoader(false);
            return;
        }
        
        toggleLoader(true);
    
    }
    const triggerAlert = () => {

        Alert.alert(
            "Alert Title",
            "Are you sure you wanna delete",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }
    return(

        
            <View>

                {/* <TouchableOpacity onPress={ ()=> pressMe("Michael") }>
                    <Text style={styles.container} >This is the Login Page</Text>
                </TouchableOpacity>

                <FlatList 
                    data={ todos }
                    renderItem = { ({item}) => (
                        <Text> { item.name } </Text>
                    )}
                
                /> */}

                <TextInput 
                    placeholder="My Name"
                    
                    />

                <ActivityIndicator 
                    
                    animating={loader}
                    size="large" 
                    color="#00ff00"
                    hidesWhenStopped={loader} // this is for iOS implementation
                    
                />

                <Button 
                    title="Initiate Loader"
                    onPress={ ()=>{ controlLoader() } }
                /> 


                <Text>This is a test </Text>

                <Ionicons name="md-checkmark-circle" size={32} color="blue" />
                <MaterialIcons name="delete" size={30} color="red" onPress={ ()=>{ triggerAlert() } } />

            </View>


    )
}

// const styles = StyleSheet.create({

//     container:{
        
//         paddingTop:10,
//         backgroundColor:"tomato",
//         justifyContent:"center",
//         textAlign:"center"
//     }
// })