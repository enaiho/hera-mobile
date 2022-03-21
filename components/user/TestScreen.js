import React,{useState,useEffect} from "react";
import { Button, View,Text } from "react-native";

const TestScreen = () => {

    
    
    const [name, setName] = useState("Michael");
    const [count, setCount] = useState(0);
    const clickMe = () => {
        setName("Isaac");

    }
    const incrementCount = () => {
        setCount( prevCount=>prevCount+1)        
    }

    useEffect( ()=>{
        console.log("component onMount");
    },[] )

    useEffect(()=>{
        console.log("count state terminal changed. ");
    },[count] )

    return(

        <View>
            <Text>This is a test screen. My name is  {name} </Text>
            <Text> Counter: {count} </Text>
            <View>
                
                <Button title="click me" onPress={ clickMe } />
                <Button title="increment count" onPress={incrementCount} />
            
            </View>
        </View>

    )

}

export default TestScreen;

