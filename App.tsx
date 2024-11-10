import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
    </Provider>
  );
};

export default App;
