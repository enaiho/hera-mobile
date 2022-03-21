

import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    EuclidCircularBold: require('../assets/fonts/euclid/EuclidCircularA-Bold.ttf'),
    EuclidCircularLight: require('../assets/fonts/euclid/EuclidCircularA-Light.ttf'),
  });