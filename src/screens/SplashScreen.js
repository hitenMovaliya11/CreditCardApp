import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {
  widthPercentageToDP as Wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Text from '../../assets/logo/Text.js';
import Logo from '../../assets/logo/Logo.js';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'home'}],
      });
    }, 2000);

    return () => clearTimeout(timeout); // Clean up the timeout on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/screen.png')}
        resizeMode="cover"
        style={styles.splashImg}
      />
      <Animatable.View
        animation="slideInLeft"
        duration={1000}
        style={styles.overlay}>
        <Logo />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={2000}
        style={styles.overlayText}>
        <Text />
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: hp(17),
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    width: '100%',
    position: 'absolute',
    top: hp(7),
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Wp(38),
    height: hp(12),
  },
  textLogo: {
    width: Wp(43),
    height: hp(3.2),
  },
});
