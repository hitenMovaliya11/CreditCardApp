import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  PanResponder,
  ImageBackground,
  Image,
} from 'react-native';
import NoDataFound from './NoDataFound'; 
import {RFValue} from 'react-native-responsive-fontsize';
import Chip from '../../assets/svg/Chip';
import Wifi from '../../assets/svg/Wifi';
import { useCardContext } from '../CardContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CardDetail = () => {
  const { cards } = useCardContext();
  const cardsPan = useRef(new Animated.ValueXY()).current;
  const [cardData, setCardData] = useState([]);
  const { addCard } = useCardContext();

  const loadData = async() =>{
    if(cardData.length === 0){
      const existingData = await AsyncStorage.getItem('cardData');
      addCard(JSON.parse(existingData))
    }else{
      setCardData(cards)
    }

  }
  useEffect(()=>{
    loadData();
    setCardData(cards);
  },[cards])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        cardsPan.setValue({x: gestureState.dx, y: 0});
      },
      onPanResponderRelease: (event, gestureState) => {
        if (Math.abs(gestureState.dx) > 120) {
          Animated.timing(cardsPan, {
            toValue: {x: gestureState.dx > 0 ? width : -width, y: 0},
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            cardsPan.setValue({x: 0, y: 0});
            setCardData(prevCardData => {
              const newCardData = [...prevCardData];
              newCardData.shift(); // Remove the first card
              newCardData.push(prevCardData[0]); // Move the first card to the end
              return newCardData;
            });
          });
        } else {
          Animated.spring(cardsPan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const renderEmptyList = () => {
    return <NoDataFound />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {cardData?.length === 0
          ? renderEmptyList()
          : cardData?.map((card, i) => {
              const {
                bankName,
                cardNumber,
                cardHolder,
                expiryDate,
                backgroundIndex,
              } = card;

              const cardStyle = {
                zIndex: cardData.length - i,
                top: i * 30,
                transform: [{translateX: i === 0 ? cardsPan.x : 0}],
              };

              return (
                <Animated.View
                  key={i}
                  {...(i === 0 ? panResponder.panHandlers : {})}
                  style={[styles.card, cardStyle]}>
                  <ImageBackground
                    source={backgroundImages[backgroundIndex]}
                    style={styles.cardBackground}
                    resizeMode="cover">
                    <Text style={styles.bankName}>{bankName}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.chip}>
                        <Chip />
                      </View>
                      <View style={styles.contactlessIcon}>
                        <Wifi />
                      </View>
                    </View>
                    <Text style={styles.cardNumber}>{cardNumber}</Text>
                    <View style={styles.cardInfo}>
                      <View>
                        <Text style={styles.label}>Card Holder Name</Text>
                        <Text style={styles.cardHolder}>{cardHolder}</Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Expire Date</Text>
                        <Text style={styles.expiryDate}>{expiryDate}</Text>
                      </View>
                      <View>
                        <Image
                          source={require('../../assets/visa.png')}
                          style={styles.visaLogo}
                        />
                      </View>
                    </View>
                  </ImageBackground>
                </Animated.View>
              );
            })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'space-between',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
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
});

export default CardDetail;
