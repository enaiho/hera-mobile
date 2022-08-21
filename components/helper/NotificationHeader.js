import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, {Path,Line} from 'react-native-svg';




export default function NotificationHeader(){


	const props = {screenWidth:350};
	const styles = _styles(props);

	return(

		<>
			<View style={styles.header}>
					<View style={styles.backBtn}>
						
						<TouchableOpacity
	                     onPress = { () => navigation.goBack() }>
	                        <Svg style={styles.headerImage} width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
	                          <Path d="M10.9998 21.5C10.616 21.5 10.232 21.3535 9.93945 21.0605L0.939453 12.0605C0.353516 11.4746 0.353516 10.5254 0.939453 9.93945L9.93945 0.939453C10.5254 0.353516 11.4746 0.353516 12.0605 0.939453C12.6465 1.52539 12.6465 2.47461 12.0605 3.06055L4.12086 11L12.0615 18.9406C12.6474 19.5266 12.6474 20.4758 12.0615 21.0617C11.7685 21.3547 11.3841 21.5 10.9998 21.5Z" fill="#191414" />
	                        </Svg>
	                    </TouchableOpacity>

					</View>
					<View>
						<Text style={styles.txtTitle}>Notifications</Text>
					</View>

					<View style={styles.settingsBtn}>
						<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<Path fill-rule="evenodd" clip-rule="evenodd" d="M23.0297 14.903C23.2684 15.0408 23.4143 15.2972 23.4143 15.5625C23.4143 16.3641 21.3424 20.2031 20.4197 20.2047C20.287 20.2047 20.153 20.1706 20.0332 20.1014L17.8432 18.8367C17.0125 19.5469 16.0511 20.1038 15.0002 20.4759V23.0016C15.0002 23.3531 14.7564 23.6297 14.3711 23.744C13.5916 23.9073 12.7455 24 11.958 24C11.1705 24 10.3689 23.9062 9.58754 23.7422C9.24217 23.67 9.0002 23.3533 9.0002 23.0006V20.475C7.9502 20.1047 6.98926 19.5469 6.15737 18.837L3.96737 20.1017C3.84747 20.1709 3.71359 20.205 3.58084 20.205C2.55521 20.205 0.587402 16.2234 0.587402 15.5625C0.587402 15.2972 0.73323 15.0408 0.971918 14.903L3.15676 13.6416C3.05842 13.1086 3.0002 12.5625 3.0002 12C3.0002 11.4375 3.05832 10.8937 3.1569 10.358L0.972059 9.09656C0.733418 8.95875 0.587543 8.70234 0.587543 8.43703C0.587543 7.63594 2.65661 3.79453 3.58098 3.79453C3.71364 3.79453 3.8477 3.82875 3.96723 3.89812L6.15957 5.16094C6.98926 4.45219 7.9502 3.89531 9.0002 3.52312V0.9975C9.0002 0.645 9.24395 0.328312 9.58707 0.255984C10.3666 0.0926719 11.1705 0 12.0002 0C12.8299 0 13.6314 0.0926719 14.4129 0.255937C14.7582 0.328125 15.0002 0.644859 15.0002 0.9975V3.52312C16.0502 3.89531 17.0111 4.45219 17.843 5.16295L20.033 3.89827C20.1529 3.82906 20.2868 3.795 20.4196 3.795C21.4452 3.795 23.413 7.77656 23.413 8.4375C23.413 8.70277 23.2672 8.95917 23.0285 9.09703L20.8436 10.3584C20.942 10.8914 21.0002 11.4797 21.0002 12C21.0002 12.5203 20.9439 13.1062 20.8449 13.6416L23.0297 14.903ZM8.2502 12C8.2502 14.0677 9.93254 15.75 12.0002 15.75C14.0674 15.75 15.7502 14.0677 15.7502 12C15.7502 9.93234 14.0674 8.25 12.0002 8.25C9.93301 8.25 8.2502 9.93234 8.2502 12Z" fill="#191414"/>
						</Svg>

					</View>
			</View>
		</>

	);

}

const _styles = (props) => StyleSheet.create({

	header:{
    	borderWidth:0,
	    borderColor:"#000000",
	    flexDirection:"row",
	    justifyContent: "space-between",
	    height:100,
	    top:45
    },
    txt:{
    	color:"red"
    },
    backBtn:{
    	left:20
    },
    settingsBtn:{
    	right:20
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