import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../constants';
import {rS} from '../../utils/responsize.size';
import SafeArea from '../../utils/SafeArea';
import {IPageProps} from '../../types/NavigationProps';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../components/LoadingModal';
import {
  lowercaseRegex,
  numberRegex,
  symbolRegex,
  uppercaseRegex,
} from '../../utils/InputAuthentications';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const inputErrorStyles = {
  textAlign: 'left',
  width: wp(90),
  color: COLORS.error,
  paddingTop: rS(SPACING.h13),
  fontSize: rS(FONT_SIZES.h9),
};

const Signup = ({navigation}: IPageProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [conditionsMet, setConditionsMet] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cPasswordError, setCpasswordError] = useState('');

  const hasUpper = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSymbol = symbolRegex.test(password);

  const lengthValid = password.length < 8;
  const emailIsValid = email.includes('@');
  const goToSignUpPage = () => navigation.navigate('Login');

  useEffect(() => {
    if (email.length === 0) {
      setEmailError('');
    } else if (!emailIsValid) {
      setEmailError("email must include '@' symbol");
    } else {
      setEmailError('');
    }

    if (password.length === 0) {
      setPasswordError('');
    } else if (lengthValid) {
      setPasswordError('password must be at least 8 characters long');
    } else if (!hasUpper) {
      setPasswordError('password must include at least one uppercase letter');
    } else if (!hasLowercase) {
      setPasswordError('password must include at least one lowercase letter');
    } else if (!hasNumber) {
      setPasswordError('password must contain at least one number');
    } else if (!hasSymbol) {
      setPasswordError('password must contain at least one symbol');
    } else {
      setPasswordError('');
    }

    if (cpassword.length === 0) {
      setCpasswordError('');
    } else if (cpassword !== password) {
      setCpasswordError('passwords do not match');
    } else {
      setCpasswordError('');
    }

    setConditionsMet(
      emailIsValid &&
        !lengthValid &&
        hasUpper &&
        hasLowercase &&
        hasNumber &&
        hasSymbol,
    );
  }, [password, email, cpassword]);

  const handleSignup = () => {
    !conditionsMet && Alert.alert('Please fill in your details correctly');
    if (conditionsMet) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log('User account created & signed in!');
          return user.updateProfile({
            displayName: fullName,
          });
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
    }
  };

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
          }}>
          <View
            style={{
              width: '100%',
              marginTop: rS(SPACING.h1),
            }}>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h4),
                fontFamily: FONT_FAMILY.sb,
              }}>
              Create Account
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              gap: rS(SPACING.h10),
              width: '100%',
              marginVertical: rS(SPACING.h5),
              marginHorizontal: 'auto',
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <InputField
                label="Name"
                placeholder="Enter your full name"
                query={text => setFullName(text)}
                value={fullName}
              />
              <Text style={inputErrorStyles}></Text>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <InputField
                label="Email"
                placeholder="Enter your email"
                query={text => setEmail(text)}
                value={email}
              />
              <Text style={inputErrorStyles}>{emailError}</Text>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <InputField
                label="Password"
                placeholder="Enter your password"
                query={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
              />
              <Text style={inputErrorStyles}>{passwordError}</Text>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <InputField
                label="Confirm Password"
                placeholder="Enter password again"
                query={text => setCpassword(text)}
                value={cpassword}
                secureTextEntry={true}
              />
              <Text style={inputErrorStyles}>{cPasswordError}</Text>
            </View>
          </View>
          <PrimaryButton
            onPress={handleSignup}
            title="Sign Up"
            buttonStyle={{
              marginTop: rS(SPACING.h7),
            }}
          />
          <View
            style={{
              marginVertical: rS(SPACING.h5),
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 'auto',
              }}>
              <Text style={{}}>Already have an account? </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={goToSignUpPage}>
                <Text
                  style={{
                    color: COLORS.normalgreen,
                  }}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default Signup;

const styles = StyleSheet.create({});
