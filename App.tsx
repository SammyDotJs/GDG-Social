import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {COLORS} from './constants';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.bgColor} />
    </Provider>
  );
};

export default App;
