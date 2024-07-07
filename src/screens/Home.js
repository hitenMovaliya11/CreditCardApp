import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoDataFound from './NoDataFound'; // Import the NoDataFound component
import Fingerprint from '../../assets/svg/Fingerprint';
import Card from '../../assets/svg/Card';
import Drop from '../../assets/svg/Drop';
import Health from '../../assets/svg/Health';
import Edu from '../../assets/svg/Edu';
import ICONS from '../component/Icons';
import Plane from '../../assets/svg/Plane';
import CardDetails from './CardDetails'; // Import the CardDetails component
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import { useCardContext } from '../CardContext';

const Home = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState('fingerprint');

  const addNewCard = () => {
    navigation.navigate('card');
  };

  const handleIconPress = icon => {
    setSelectedIcon(icon);
  };

  const renderIcon = (icon, isSelected) => {
    switch (icon) {
      case 'fingerprint':
        return <Fingerprint isSelected={isSelected} />;
      case 'credit-card':
        return <Plane isSelected={isSelected} />;
      case 'drop':
        return <Drop isSelected={isSelected} />;
      case 'health':
        return <Health isSelected={isSelected} />;
      case 'edu':
        return <Edu isSelected={isSelected} />;
      case 'chip':
        return <Card isSelected={isSelected} />;
      default:
        break;
    }
  };

  useEffect(()=>{
// AsyncStorage.clear()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowDirection}>
          <LinearGradient
            colors={['#3603FF', '#FB5CD8', '#FAFF00']}
            style={styles.headerIcon}
          />
          <View style={styles.tipsContainer}>
            <ICONS.MaterialCommunityIcons
              name="lightbulb-outline"
              size={16}
              color="#FAB60F"
            />
            <Text style={styles.tipsText}>Tips</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>All your credit cards</Text>
        <Text style={styles.headerSubtitle}>
          Find all your credit cards here
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.iconRow}>
          {['fingerprint', 'credit-card', 'drop', 'health', 'edu', 'chip'].map(
            icon => (
              <TouchableOpacity
                key={icon}
                onPress={() => handleIconPress(icon)}>
                {renderIcon(icon, selectedIcon === icon)}
              </TouchableOpacity>
            ),
          )}
        </View>
        {selectedIcon === 'fingerprint' ? (
          <CardDetails />
        ) : (
          <NoDataFound />
        )}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addNewCard();
        }}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#000000',
    padding: 20,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP(2),
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    fontFamily: 'helvetica-light',
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP(5),
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 6,
    paddingLeft: 15,
    paddingRight: 15,
  },
  tipsText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontSize: RFValue(14),
  },
  content: {
    flex: 1,
    backgroundColor: '#252525',
    padding: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#000000',
  },
});

export default Home;
