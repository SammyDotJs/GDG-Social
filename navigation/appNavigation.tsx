import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Tabs/Home/HomeScreen';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getCurrentUser} from '../redux/currentUserInfo';
import LoadingModal from '../components/LoadingModal';
import TabNavigator from '../screens/TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [initRoute, setInitRoute] = useState('Signup');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  //   const use = auth().currentUser
  //   console.log(use,"p")

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    console.log(user, 'uh');
    // setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      setInitRoute('Tabs');
    } else {
      setInitRoute('Login');
    }
  };

  useEffect(() => {
    console.log('Testing');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View>
        <LoadingModal isVisible={true} />
      </View>
    );
  }
  console.log(user);
  // if (!user) {
  //   return (
  //     <View>
  //       <Text>yooo</Text>
  //     </View>
  //   );
  // }
  return (
    <Stack.Navigator
      initialRouteName={initRoute}
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
