import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeArea from '../../utils/SafeArea';
import {COLORS, FONT_SIZES, SPACING} from '../../constants';
import {rS} from '../../utils';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import {IPageProps} from '../../types/NavigationProps';
import {KeyboardAvoidingView, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../components/LoadingModal';
import {useSelector} from 'react-redux';

const Login = ({navigation}: IPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const tryUser = useSelector((state: any) => state.currentUser);
  console.log(tryUser);
  const handleSignin = () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User account created & signed in!');
        console.log(user);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const goToSignUpPage = () => navigation.navigate('Signup');
  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LoadingModal isVisible={isLoading} />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: rS(SPACING.h7),
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <View style={{width: '100%', marginTop: rS(SPACING.h1)}}>
            <Text style={{fontSize: rS(FONT_SIZES.h3), fontWeight: '900'}}>
              Login
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              gap: rS(SPACING.h8),
              width: '100%',
              marginVertical: rS(SPACING.h5),
            }}>
            <InputField
              label="Email"
              placeholder="Enter your email"
              query={text => setEmail(text)}
              value={email}
              keyboardtype="email-address"
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              query={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <PrimaryButton
            title="Login"
            buttonStyle={{marginTop: rS(SPACING.h7)}}
            onPress={handleSignin}
          />
          <View
            style={{
              width: '100%',
              marginVertical: rS(SPACING.h5),
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={goToSignUpPage}>
                <Text style={{color: COLORS.normalgreen}}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default Login;

const styles = StyleSheet.create({});
