// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import React from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 249, height: 249, resizeMode: 'cover', margin: 20, borderRadius: 30 }}
      />
      <ActivityIndicator
        animating={true}
        color="black"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97F1DA',

  },
  background: {
    flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
