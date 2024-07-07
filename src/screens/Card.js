import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
  Image,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Chip from '../../assets/svg/Chip';
import Wifi from '../../assets/svg/Wifi';
import {RFValue} from 'react-native-responsive-fontsize';
import { useCardContext } from '../CardContext';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 0.63;

const backgroundImages = [
  require('../../assets/cardBg/CardOne.png'),
  require('../../assets/cardBg/CardTwo.png'),
  require('../../assets/cardBg/CardFour.png'),
  require('../../assets/cardBg/CardFive.png'),
  require('../../assets/cardBg/CardSeven.png'),
  require('../../assets/cardBg/CardEight.png'),
  require('../../assets/cardBg/CardNine.png'),
  require('../../assets/cardBg/CardTen.png'),
];

const Card = () => {
  const navigation = useNavigation();
  const { addCard } = useCardContext();
  const [cardData, setCardData] = useState({
    bankName: 'Bank of Designers',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    backgroundIndex: 0,
    id: Date.now(),
  });

  useEffect(() => {
    const newBackgroundIndex = Math.floor(
      Math.random() * backgroundImages.length,
    );
    setCardData({...cardData, backgroundIndex: newBackgroundIndex});
  }, []);

  const saveCardData = async () => {
    if (validateInputs()) {
      try {
        const existingData = await AsyncStorage.getItem('cardData');
        const existingCards = JSON.parse(existingData);
        if (existingData == null) {
          const updatedCards = [cardData];
          await AsyncStorage.setItem('cardData', JSON.stringify(updatedCards));
          addCard(updatedCards)
        } else {
          const updatedCards = [...existingCards, cardData];
          await AsyncStorage.setItem('cardData', JSON.stringify(updatedCards));
          addCard(updatedCards)
        }
        navigation.navigate('home');
        ToastAndroid.show('Card data saved successfully', ToastAndroid.SHORT);
      } catch (error) {
        console.error('Error saving card data:', error);
      }
    }
  };

  const validateInputs = () => {
    if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      Alert.alert('Error', 'Invalid card number. Please enter 16 digits.');
      return false;
    }
    if (cardData.cardHolder.trim().length < 2) {
      Alert.alert('Error', 'Please enter a valid cardholder name.');
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
      Alert.alert('Error', 'Invalid expiry date. Use MM/YY format.');
      return false;
    }
    if (!/^\d{3}$/.test(cardData.cvv)) {
      Alert.alert('Error', 'Invalid CVV. Please enter 3 digits.');
      return false;
    }
    return true;
  };

  const formatCardNumber = text => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleInputChange = (name, value) => {
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    }
    if (name === 'expiryDate') {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    setCardData({...cardData, [name]: value});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Card</Text>
      </View>

      <View style={styles.card}>
        <ImageBackground
          source={backgroundImages[cardData.backgroundIndex]}
          style={styles.cardBackground}
          resizeMode="cover">
          <Text style={styles.bankName}>{cardData.bankName}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.chip}>
              <Chip />
            </View>
            <View style={styles.contactlessIcon}>
              <Wifi />
            </View>
          </View>
          <Text style={styles.cardNumber}>
            {cardData.cardNumber || '•••• •••• •••• ••••'}
          </Text>
          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.label}>Card Holder Name</Text>
              <Text style={styles.cardHolder}>
                {cardData.cardHolder || 'YOUR NAME'}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Expire Date</Text>
              <Text style={styles.expiryDate}>
                {cardData.expiryDate || 'MM/YY'}
              </Text>
            </View>
            <View>
              <Image
                source={require('../../assets/visa.png')}
                style={styles.visaLogo}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardData.cardNumber}
          placeholderTextColor={"#000"}
          onChangeText={text => handleInputChange('cardNumber', text)}
          keyboardType="numeric"
          maxLength={19}
        />
        <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          value={cardData.cardHolder}
          placeholderTextColor={"#000"}
          onChangeText={text => handleInputChange('cardHolder', text)}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="MM/YY"
            value={cardData.expiryDate}
            placeholderTextColor={"#000"}
            onChangeText={text => handleInputChange('expiryDate', text)}
            keyboardType="numeric"
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="CVV"
            value={cardData.cvv}
            placeholderTextColor={"#000"}
            onChangeText={text => handleInputChange('cvv', text)}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveCardData}>
        <Text style={styles.saveButtonText}>Save Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backArrow: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 20,
  },
  cardBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  bankName: {
    fontSize: RFValue(14),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  contactlessIcon: {
    right: -10,
    position: 'absolute',
  },
  chip: {
    marginBottom: 20,
    left: -3,
  },
  cardNumber: {
    fontSize: RFValue(18),
    color: 'white',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginTop: -30,
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: RFValue(10),
    color: '#ddd',
    marginBottom: 5,
    fontFamily: 'SpaceGrotesk-Light',
  },
  cardHolder: {
    fontSize: RFValue(14),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  expiryDate: {
    fontSize: RFValue(14),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  visaLogo: {
    width: 50,
    height: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color:"#000"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
