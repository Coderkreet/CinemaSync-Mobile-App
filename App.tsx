import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DetailsPage from './Components/Pages/DetailsPage';
import Home from './Components/Pages/Home';
import PhotoCarousel from './Components/PhotoCarousel';
import TrendingSection from './Components/TrendingSection';

import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';






export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();  // Hide splash screen after some delay
    }, 2000);  // Adjust delay if needed
  }, []);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
<PhotoCarousel/>
<TrendingSection/>

      </View>
     </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  scrollView: {
  paddingTop:20,
    backgroundColor: '#000000', // Entire app background black
  },
  container: {
    // flex: 1,
    backgroundColor: '#000000'// Black background
    // marginTop:20,
    // alignItems: 'center',
  },
  // text: {
  //   color: '#FFFFFF', // White text for visibility
  //   fontSize: 18,
  // },
  // appContainer: {
  //   flex: 1,
  //   backgroundColor: 'white',
  // },
});
