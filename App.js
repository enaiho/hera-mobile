

/*
-- uncomment this when pushing this to production.
import Bugsnag from '@bugsnag/expo';
Bugsnag.start();
*/


import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';


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
import SignIn from './components/authenticate/SignIn';
import ManageCircle from './components/onboarding/ManageCircle';
import Settings from './components/user/Settings';
import EditProfile from './components/user/EditProfile';
import EmergencyContacts from './components/user/EmergencyContacts';
import PanicEmergencyMessage from './components/user/PanicEmergencyMessage';
import * as Location from 'expo-location';
import * as Battery from 'expo-battery';
import SolaceConfig from "./solace_config";




import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';
import {useHttpGet,useHttpPost} from './hooks/useHttp';


const Stack  = createStackNavigator();



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



export default function App() {


  const [IsReady, SetIsReady] = useState(false);
  const [IsAuth, SetAuth] = useState(false);
  const [screenWidth,screenHeight] = [Dimensions.get("window").width,Dimensions.get("window").height];
  const BASE_URL = SolaceConfig.SERVER_URL;

   
   useEffect(() => {
    
      Notifications.addNotificationReceivedListener(handleNotification);
      // Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);

  },[]);

  const handleNotification = async(notification) => {
    

    // console.log(`Request: ${notification}`);

    // console.log( "egg" );
    // console.log( notification );

    // data": Object {
    //   "body": "{\"test\":\"Test\"}",
    //   "experienceId": "@enaiho/Hera",
    //   "message": "This is a test notification",
    //   "projectId": "d2c6b4da-c735-4f53-93f3-a40211ddc966",
    //   "scopeKey": "@enaiho/Hera",
    // },


    const { trigger } = notification.request;



    const { body,message } = trigger.remoteMessage.data;
    const parseDataFromPN = JSON.parse(body);
    const { triggerId,email,pushType } = parseDataFromPN;



    // const dataFromPN = JSON.parse(b)

    //{"triggerId":"","email":"osahonmichael@yahoo.com","pushType":"location"}
    // console.log( typeof body);
    // return;


    if( pushType === "location" ){


      // resend the instance to the user


      const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      const batteryDetails = await Battery.getPowerStateAsync();
      const payload = {

        location: JSON.stringify( location ),
        email: email,
        triggerId:triggerId,
        batteryDetails:JSON.stringify(batteryDetails)

      }


      try{
       

        const response = await useHttpPost(`${BASE_URL}/user/submit_trigger_instance`,payload);
        const data = response.data;

        if( data.status === true ){
          console.log( "instance submited" ); // we would create a logger to keep track that the data was actually submitted
        }
        else{  console.log( data );  }




      }
      catch(e){

        console.log( e.message );

      }
      
    }

  }

  // const _handleNotificationResponse = response => {
  //   console.log(`Response: ${response}`);
  // };

  const LoadFonts = async () => {
    await useFonts();
  };



  const isUserAuthenticated = async() => {

    const userdata_key = await AsyncStorage.getItem('userdata_key' );
    if( userdata_key === "" || userdata_key === undefined || userdata_key === null ) return false;

    return false;

  }


  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => alert("error in loading font.")} // throw a friendly message to the user.
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
              <Stack.Screen name="ManageCircle" screenWidth={screenWidth} screenHeight={screenHeight} options={{headerShown: false}}>
                {(props) => <ManageCircle {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{headerShown: false}}></Stack.Screen>



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

          <Stack.Screen name="ManageCircle" screenWidth={screenWidth} screenHeight={screenHeight} options={{headerShown: false}}>
            {(props) => <ManageCircle {...props} />}
          </Stack.Screen>



          <Stack.Screen name="PhoneNumberEntry" component={PhoneNumberEntry} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="VerifyPhone" component={VerifyPhone} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="CreatePIN" component={CreatePIN} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="ConfirmPIN" component={ConfirmPIN} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="FinishReg" component={FinishReg} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Panic" component={Panic} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="PanicActivate" component={PanicActivate} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Safety" component={Safety} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="PanicEmergencyMessage" component={PanicEmergencyMessage} options={{headerShown: false}}></Stack.Screen>

         
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