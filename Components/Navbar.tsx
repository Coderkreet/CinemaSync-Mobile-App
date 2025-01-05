import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

export default function Navbar() {
  return (
    <View>
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../Assets/Home.png')} style={styles.icon} />
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../Assets/Play.png')} style={styles.icon} />
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../Assets/Home.png')} style={styles.icon} />
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  zIndex:20,
    backgroundColor: 'gray',
    width: '100%',        // Make the container take the full width of the screen
    height: 50,           // Set height for the navbar
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-around',  // Distribute space evenly between the icons
    alignItems: 'center', // Vertically center the icons
    paddingHorizontal: 20, // Optional: Add horizontal padding for better spacing
  },
  iconContainer: {
    flex: 1,               // Each icon will take up equal space in the row
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});
