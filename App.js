import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Panic from './components/user/Panic';
import PanicActivate from './components/user/PanicActivate';
import Safety from './components/user/Safety';
import PhoneNumberEntry from './components/onboarding/PhoneNumberEntry';
import Registration from './components/onboarding/Registration';
import VerifyPhone from './components/onboarding/VerifyPhone';
import SignUp from './components/onboarding/SignUp';
import CreatePIN from './components/onboarding/CreatePIN';
import ConfirmPIN from './components/onboarding/ConfirmPIN';
import FinishReg from './components/onboarding/FinishReg';
import SignIn from "./components/authenticate/SignIn";


import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';

const Stack  = createStackNavigator();

export default function App() {


  const [IsReady, SetIsReady] = useState(false);
  const [IsAuth, SetAuth] = useState(false);
  const [screenWidth,screenHeight] = [Dimensions.get("window").width,Dimensions.get("window").height];
  const LoadFonts = async () => {
    await useFonts();
  };
  const isUserAuthenticated = async() => {

    const userdata_key = await AsyncStorage.getItem('userdata_key' );
    if( userdata_key !== "" || userdata_key !== undefined ) return true;

    return false;

  }


  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}} // throw a friendly message to the user.
      />
    );
  }


  isUserAuthenticated().then(response => SetAuth(response));


  if( IsAuth ){

    return (

        <View style={styles.container}>

          <NavigationContainer>
            <Stack.Navigator>

              <Stack.Screen name="Panic" screenWidth={screenWidth} options={{ headerShown:false }}>
                {(props) => <Panic {...props} />}
              </Stack.Screen>

              <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name="PhoneNumberEntry" component={PhoneNumberEntry} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name="VerifyPhone" component={VerifyPhone} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name="CreatePIN" component={CreatePIN} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name="PanicActivate" component={PanicActivate} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name="Safety" component={Safety} options={{headerShown: false}}></Stack.Screen>


            </Stack.Navigator>
          </NavigationContainer>



        </View>
    );

  }

  return (


    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Registration" options={{ headerShown:false }}>
            {(props) => <Registration {...props} />}
          </Stack.Screen>


          <Stack.Screen name="PhoneNumberEntry" component={PhoneNumberEntry} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="VerifyPhone" component={VerifyPhone} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="CreatePIN" component={CreatePIN} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="ConfirmPIN" component={ConfirmPIN} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="FinishReg" component={FinishReg} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Panic" component={Panic} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}></Stack.Screen>

          {/*
          <Stack.Screen name="TestScreen" component={TesstScreen}></Stack.Screen>
          */}

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});