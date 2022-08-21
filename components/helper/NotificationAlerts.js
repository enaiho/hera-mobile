
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Svg, {Path,Line} from 'react-native-svg';



export default function NotificationAlerts( { screenWidth, screenHeight }  ){


	const props = { screenWidth:screenWidth, screenHeight:screenHeight };
	const styles = _styles(props);

	return(

		<>
			<View style={styles.mainNotificationContainer}>

				<View style={ styles.notificationItem } >

					<View style={styles.notificationIcon}>
						<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M12.8672 0.173822L21.8672 3.92382C22.7016 4.27023 23.25 5.09054 23.25 5.95773C23.25 17.9905 14.3953 23.9999 11.9953 23.9999C9.61875 23.9999 0.75 18.0562 0.75 5.95773C0.75 5.09054 1.29844 4.27023 2.13797 3.92382L11.1375 0.173822C11.3677 0.0786191 11.7538 0.000244141 12.0028 0.000244141C12.2503 0.000244141 12.6387 0.0786191 12.8672 0.173822ZM16.229 10.1071C16.4109 9.89476 16.5 9.63418 16.5 9.37492C16.5 9.02804 16.2375 8.24992 15.3764 8.20862C15.0595 8.20862 14.7445 8.34128 14.5214 8.60059L10.8122 12.929L9.42047 11.5373C9.20063 11.3176 8.91286 11.2077 8.625 11.2077C7.98281 11.2077 7.5 11.7332 7.5 12.3327C7.5 12.6609 7.60781 12.9515 7.82953 13.1282L10.0795 15.3782C10.2905 15.5891 10.5776 15.7077 10.875 15.7077C10.8801 15.7077 10.8858 15.7078 10.8919 15.7078C11.0318 15.7086 11.4273 15.7109 11.729 15.3571L16.229 10.1071Z" fill="#03C108"/>
</Svg>

					</View>
					<View style={styles.notificationContent}>

						<Text>Image</Text>
						<Text>Lorem Ipsum stuff for the user </Text>
						<Text style={styles.txtStuff}>This is the body of the Lorem Ipsum that I was talking about </Text>

					</View>
					<View style={styles.notificationTime}>
						<Text> Today  11:50pm </Text>
					</View>

				</View>

			</View>

		</>
	);
}

const _styles = (props) => StyleSheet.create({


	notificationItem:{
		flexDirection:"row",
		justifyContent: "space-between"
	},
	mainNotificationContainer:{
		width:props.screenWidth,
		top:20
	},
	notificationIcon:{
		left:20
	},
	notificationTime:{
		right:100
	},
	notificationContent:{
		left:45,
		flexWrap: "wrap"
	},
	txtStuff:{
		flexWrap: "wrap"
	}

});

