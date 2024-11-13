import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigation from './navigation/appNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {COLORS} from './constants';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.bgColor} />
    </Provider>
  );
};

export default App;
