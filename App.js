import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import Card from './src/screens/Card';
import CardDetail from './src/screens/CardDetails';
import { CardProvider } from './src/CardContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
       <CardProvider>
         <NavigationContainer>
          <Stack.Navigator
            initialRouteName="splashScreen"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="splashScreen" component={SplashScreen} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="cardDetail" component={CardDetail} />
            <Stack.Screen name="card" component={Card} />

          </Stack.Navigator>
        </NavigationContainer>
       </CardProvider>
  );
};

export default App;
