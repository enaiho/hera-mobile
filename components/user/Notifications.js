import React from 'react';
import Svg, {Path,Line} from 'react-native-svg';
import { View,Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationAlerts from '../helper/NotificationAlerts';
import NotificationActivities from '../helper/NotificationActivities';
import NotificationHeader from '../helper/NotificationHeader';

const Tab = createMaterialTopTabNavigator();

export default function Notifications( { route:{ params: { screenWidth,screenHeight } },navigation } ){

	const props = {screenWidth:screenWidth};
	const styles = _styles(props);

	return (

		<>
			<NotificationHeader />

			<Tab.Navigator 
				screenOptions={{
				    tabBarLabelStyle: { fontSize: 12, fontFamily:"EuclidCircularBold" },
				    tabBarActiveTintColor: '#03C108',
				    tabBarInactiveTintColor: '#818FA3'
				}}>
		      <Tab.Screen name="Alerts">
		      	{ (props) => <NotificationAlerts { ...props } screenWidth={screenWidth} screenHeight={screenHeight} />}
		      </Tab.Screen>
		      <Tab.Screen name="Activities" component={NotificationActivities} />
		    </Tab.Navigator>

		</>
	)
}

export const _styles = (props) => StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    txt:{
    	color:"red"
    },
    footer:{
    	position: "absolute",
    	bottom:0
    },
    txtTitle:{
        fontFamily:"EuclidCircularBold",
        fontSize:24,
        color:"#0A1F44",
        width:343,
        height:32,
        textAlign:"center",
        alignSelf:"center",
    }

});
